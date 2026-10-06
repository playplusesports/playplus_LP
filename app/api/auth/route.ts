import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  isAuthenticated,
  isCorrectPassword,
} from '@/lib/auth'

export async function GET() {
  if (await isAuthenticated()) {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (isCorrectPassword(password)) {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: '/',
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'パスワードが正しくありません' }, { status: 401 })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
  return NextResponse.json({ success: true })
}
