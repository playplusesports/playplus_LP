import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const SESSION_COOKIE_NAME = 'admin_session'
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24

// 署名鍵は管理パスワードから作る。パスワードを変えると既存のセッションはすべて無効になる。
function signingKey(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    throw new Error('ADMIN_PASSWORD が設定されていないため管理画面の認証ができません')
  }
  return password
}

function sign(expiresAt: string): string {
  return createHmac('sha256', signingKey()).update(`admin-session:${expiresAt}`).digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

export function isCorrectPassword(input: unknown): boolean {
  return typeof input === 'string' && safeEqual(input, signingKey())
}

// 値は「有効期限(ミリ秒).署名」。署名を作れるのはサーバーだけなので、Cookieを手で作っても通らない。
export function createSessionToken(): string {
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000)
  return `${expiresAt}.${sign(expiresAt)}`
}

function isValidSessionToken(token: string): boolean {
  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature) return false
  if (Number(expiresAt) < Date.now()) return false
  return safeEqual(signature, sign(expiresAt))
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? ''
  return isValidSessionToken(token)
}
