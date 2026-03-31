import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (session?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'パスワードが正しくありません' }, { status: 401 })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  return NextResponse.json({ success: true })
}
