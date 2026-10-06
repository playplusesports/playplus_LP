import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Play+ — 遊びに、プラスを。Web・アプリ・AI・動画・イベント'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const FONT_URL = 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-700-normal.woff'
const PLUS_GRID_COLUMNS = 24
const PLUS_GRID_ROWS = 13
const PILLAR_CODES = ['WEB', 'APP', 'AI', 'VIDEO', 'EVENT']

export default async function Image() {
  const fontResponse = await fetch(FONT_URL)
  if (!fontResponse.ok) throw new Error(`OG画像用フォントの取得に失敗しました（status ${fontResponse.status}）`)
  const fontData = await fontResponse.arrayBuffer()

  const pluses = Array.from({ length: PLUS_GRID_COLUMNS * PLUS_GRID_ROWS }, (_, index) => index)

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#06071a', fontFamily: '"Noto Sans JP"' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', padding: '10px 14px' }}>
          {pluses.map((index) => (
            <div key={index} style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22265e', fontSize: 22 }}>
              +
            </div>
          ))}
        </div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 90px', width: '100%' }}>
          <div style={{ display: 'flex', color: '#6d76ff', fontSize: 26, letterSpacing: 6 }}>PLAY+ / CREATIVE TECH STUDIO</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28, color: '#ffffff', fontSize: 124, lineHeight: 1.08 }}>
            <span>遊びに、</span>
            <span style={{ display: 'flex' }}>
              プラス<span style={{ color: '#ff4a3a' }}>を。</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: 28, marginTop: 40, color: '#9a9dc4', fontSize: 28 }}>
            {PILLAR_CODES.map((code) => (
              <span key={code} style={{ display: 'flex' }}>
                <span style={{ color: '#6d76ff', marginRight: 8 }}>+</span>
                {code}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Noto Sans JP', data: fontData, style: 'normal', weight: 700 }],
    },
  )
}
