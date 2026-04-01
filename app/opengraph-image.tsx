import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Play+ - イベントプロデュース・Web制作・デザイン支援'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 50%, #0a0a2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Play+
          </div>
        </div>
        <div
          style={{
            fontSize: '32px',
            color: '#a0a0d0',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          イベントプロデュース
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#7070a0',
            marginTop: '12px',
          }}
        >
          Web制作・デザイン支援
        </div>
      </div>
    ),
    { ...size }
  )
}
