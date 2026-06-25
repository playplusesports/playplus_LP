"use client"

import { useEffect, useState } from "react"
import "../app/overdrive.css"

// Overdrive-style single-page homepage for Play+.
// Markup + vanilla effects ported from playplus/overdrive/index.html and
// rebranded to Play+ with real 制作実績. All styles live in app/overdrive.css,
// scoped under the .od wrapper so they never leak into other routes.

// 制作実績（実名）。status は正直に表記する。
const WORKS = [
  { tag: "Web", title: "KOHAKU アートオークション", desc: "オンラインオークション基盤をフルスクラッチ開発（決済・自動進行・通知）。", img: "/works/01.svg" },
  { tag: "Web", title: "Hu-Mam", desc: "ブランドコーポレートサイトの企画・制作・公開までを一貫対応。", img: "/works/02.svg" },
  { tag: "Web & SNS", title: "CAFEMANO", desc: "Googleビジネスプロフィール最適化でMEO集客を強化。", img: "/works/03.svg" },
  { tag: "Web & SNS", title: "mauve（モーヴ）", desc: "サイト制作＋集客分析・改善運用を一貫サポート。", img: "/works/04.svg" },
  { tag: "eSports", title: "eスポーツ大会 運営・配信", desc: "企画から当日運営・ライブ配信まで一貫プロデュース。", img: "/works/05.svg" },
  { tag: "Tools", title: "業務自動化ツール群", desc: "LINE公式管理 / 議事録Bot / 死活監視を内製開発。", img: "/works/06.svg" },
]

// ヒーロー背景スライド（フリー画像 / public/hero）。Event→eSports→Web→Design を巡回。
const HERO_IMAGES = ["/hero/01.jpg", "/hero/04.jpg", "/hero/06.jpg", "/hero/02.jpg", "/hero/05.jpg"]

// 旧サイトから踏襲したコンテンツ
const PROBLEMS = [
  "イベントを開催したいがやり方がわからない",
  "Webサイトを作りたいが制作会社が多すぎて選べない",
  "デザインを頼みたいがイメージを言語化できない",
  "ITやSNSが必要だと感じているが手が回らない",
  "社内に詳しい人材がいない",
  "予算感がわからず相談しにくい",
]

const SOLUTIONS = ["イベントの企画・運営支援", "集客用Webサイト制作", "バナー・ポスター・ロゴ制作", "参加者管理・導線設計", "SNS活用支援"]

const BENEFITS = [
  { mk: "◆", t: "ワンストップ対応", d: "企画から制作まで一括対応で手間を削減。" },
  { mk: "▲", t: "イベント特化", d: "大会運営の実務経験をもとに設計。" },
  { mk: "●", t: "柔軟な対応", d: "企業・団体・個人すべて対応可能。" },
  { mk: "¥", t: "相談しやすい価格帯", d: "小規模案件から対応。" },
  { mk: "⚡", t: "スピード対応", d: "最短1週間でLP制作可能。" },
]

const PRICING = [
  { nm: "イベントプロデュース", amt: "50,000", unit: "円〜" },
  { nm: "Web制作・保守運用", amt: "5,000", unit: "円〜／月" },
  { nm: "デザイン制作", amt: "5,000", unit: "円〜" },
  { nm: "ロゴ作成", amt: "10,000", unit: "円〜" },
  { nm: "Googleビジネスプロフィール設定", amt: "9,800", unit: "円" },
  { nm: "Instagram初期設定＋投稿5本", amt: "14,800", unit: "円" },
  { nm: "SEO / MEO / LLMO対策", amt: "15,000", unit: "円〜／月" },
]

const FAQS = [
  { q: "何も決まっていなくても相談できますか？", a: "はい、「こんなことがしたい」というざっくりとしたイメージだけでもご相談いただけます。ヒアリングを通じて、目的に合った企画をご一緒に考えていきます。" },
  { q: "小規模イベントでも依頼できますか？", a: "可能です。個人主催の大会や少人数のイベントにも対応しています。規模に関わらず、企画から当日の運営サポートまで柔軟にお手伝いいたします。" },
  { q: "修正は可能ですか？", a: "納品前の修正は対応いたします。初回のご確認時にフィードバックをいただき、ご納得いただけるまで調整を行います。回数や範囲はプランによって異なります。" },
  { q: "納期はどれくらいですか？", a: "LP制作は最短1週間程度、通常のWebサイト制作は2〜4週間が目安です。内容やボリュームによって変動しますので、お早めにご相談ください。" },
  { q: "オンライン対応可能ですか？", a: "全国対応可能です。打ち合わせはZoomやGoogle Meetなどで行えますので、遠方の方でも問題ありません。チャットやメールでのやり取りも柔軟に対応します。" },
]

export function OverdriveHome() {
  // ヒーロー背景: フリー画像を5秒ごとにクロスフェード
  const [heroIdx, setHeroIdx] = useState(0)
  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return
    const id = setInterval(() => setHeroIdx((p) => (p + 1) % HERO_IMAGES.length), 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const cleanups: Array<() => void> = []
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches

    /* ===== background particle network ===== */
    ;(function () {
      const c = document.getElementById("fx") as HTMLCanvasElement | null
      if (!c) return
      const x = c.getContext("2d")
      if (!x) return
      let W = 0, H = 0
      const pts: { x: number; y: number; vx: number; vy: number; r: number }[] = []
      const mouse = { x: -999, y: -999 }
      const DPR = Math.min(window.devicePixelRatio || 1, 2)
      function size() { W = c!.width = innerWidth * DPR; H = c!.height = innerHeight * DPR; c!.style.width = innerWidth + "px"; c!.style.height = innerHeight + "px" }
      size()
      const COUNT = innerWidth < 760 ? 28 : 56
      for (let i = 0; i < COUNT; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3 * DPR, vy: (Math.random() - .5) * .3 * DPR, r: (Math.random() * 1.6 + .6) * DPR })
      const onResize = () => size()
      const onMove = (e: MouseEvent) => { mouse.x = e.clientX * DPR; mouse.y = e.clientY * DPR }
      addEventListener("resize", onResize); addEventListener("mousemove", onMove)
      const cols = ["#4660ff", "#f5321e", "#ff7a1a"]
      let raf = 0
      function draw() {
        if (document.hidden) { raf = requestAnimationFrame(draw); return }
        x!.clearRect(0, 0, W, H)
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i]; p.x += p.vx; p.y += p.vy
          if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1
          const dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.hypot(dxm, dym)
          if (dm < 140 * DPR) { const f = (140 * DPR - dm) / (140 * DPR); p.x += dxm / dm * f * 1.6; p.y += dym / dm * f * 1.6 }
          x!.beginPath(); x!.arc(p.x, p.y, p.r, 0, 7); x!.fillStyle = cols[i % 3]; x!.globalAlpha = .42; x!.fill()
          for (let j = i + 1; j < pts.length; j++) {
            const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y)
            if (d < 130 * DPR) { x!.globalAlpha = (1 - d / (130 * DPR)) * .16; x!.strokeStyle = "#4660ff"; x!.lineWidth = DPR * .6; x!.beginPath(); x!.moveTo(p.x, p.y); x!.lineTo(q.x, q.y); x!.stroke() }
          }
        }
        x!.globalAlpha = 1; raf = requestAnimationFrame(draw)
      }
      draw()
      cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener("resize", onResize); removeEventListener("mousemove", onMove) })
    })()

    /* ===== loader ===== */
    ;(function () {
      const msgs = ["INITIALIZING SYSTEM", "LOADING ASSETS", "COMPILING SHADERS", "CALIBRATING ENGINE", "READY"]
      const boot = document.getElementById("boot"), bar = document.getElementById("bootBar"), pct = document.getElementById("bootPct")
      if (!boot || !bar || !pct) return
      let p = 0
      const iv = setInterval(() => {
        p += Math.random() * 16 + 6; if (p > 100) p = 100
        bar.style.width = p + "%"; pct.textContent = ("0" + Math.floor(p)).slice(-2); boot.textContent = msgs[Math.min(Math.floor(p / 22), 4)]
        if (p >= 100) { clearInterval(iv); setTimeout(() => { document.getElementById("loader")?.classList.add("done") }, 420) }
      }, 180)
      cleanups.push(() => clearInterval(iv))
    })()

    /* ===== custom cursor ===== */
    ;(function () {
      const c = document.getElementById("cur"), d = document.getElementById("curDot")
      if (!c || !d) return
      let x = 0, y = 0, cx = 0, cy = 0, raf = 0
      const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; d.style.left = x + "px"; d.style.top = y + "px" }
      addEventListener("mousemove", onMove)
      const loop = () => { cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.left = cx + "px"; c.style.top = cy + "px"; raf = requestAnimationFrame(loop) }
      loop()
      const hots: Element[] = Array.from(document.querySelectorAll("[data-hot],.od a,.od .btn"))
      const enter = () => c.classList.add("hot"), leave = () => c.classList.remove("hot")
      hots.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave) })
      cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener("mousemove", onMove); hots.forEach((el) => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave) }) })
    })()

    /* ===== nav + progress + fps ===== */
    ;(function () {
      const nav = document.getElementById("nav"), prog = document.getElementById("prog"), fps = document.getElementById("fps")
      let last = performance.now(), frames = 0, acc = 0, raf = 0
      const onScroll = () => { if (nav) nav.classList.toggle("scr", scrollY > 40); const h = document.documentElement.scrollHeight - innerHeight; if (prog) prog.style.width = (scrollY / h * 100) + "%" }
      addEventListener("scroll", onScroll)
      const tick = (now: number) => { frames++; acc += now - last; last = now; if (acc >= 500) { if (fps) fps.textContent = String(Math.round(frames * 1000 / acc)); frames = 0; acc = 0 } raf = requestAnimationFrame(tick) }
      raf = requestAnimationFrame(tick)
      cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll) })
    })()

    /* ===== burger ===== */
    ;(function () {
      const b = document.getElementById("burger"), l = document.getElementById("navLinks")
      if (!b || !l) return
      const toggle = () => { b.classList.toggle("x"); l.classList.toggle("open") }
      b.addEventListener("click", toggle)
      const links = Array.from(l.querySelectorAll("a"))
      const close = () => { b.classList.remove("x"); l.classList.remove("open") }
      links.forEach((a) => a.addEventListener("click", close))
      cleanups.push(() => { b.removeEventListener("click", toggle); links.forEach((a) => a.removeEventListener("click", close)) })
    })()

    /* ===== reveal ===== */
    ;(function () {
      const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }) }, { threshold: .14 })
      document.querySelectorAll(".od .rv,.od .st").forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    })()

    /* ===== count up ===== */
    ;(function () {
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement, to = +(el.dataset.to || "0"); let t0: number | null = null
          const step = (ts: number) => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / 1500, 1), ease = 1 - Math.pow(1 - p, 3); el.textContent = String(Math.round(ease * to)); if (p < 1) requestAnimationFrame(step) }
          requestAnimationFrame(step); io.unobserve(el)
        })
      }, { threshold: .6 })
      document.querySelectorAll(".od .ct").forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    })()

    /* ===== 3D tilt cards ===== */
    ;(function () {
      const cards = Array.from(document.querySelectorAll<HTMLElement>(".od .tilt"))
      const move = (card: HTMLElement) => (e: MouseEvent) => { const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; card.style.transform = "perspective(800px) rotateY(" + (px * 12) + "deg) rotateX(" + (-py * 12) + "deg) translateZ(8px)" }
      const leave = (card: HTMLElement) => () => { card.style.transform = "perspective(800px) rotateY(0) rotateX(0)" }
      const handlers = cards.map((card) => { const m = move(card), l = leave(card); card.addEventListener("mousemove", m); card.addEventListener("mouseleave", l); return { card, m, l } })
      cleanups.push(() => handlers.forEach(({ card, m, l }) => { card.removeEventListener("mousemove", m); card.removeEventListener("mouseleave", l) }))
    })()

    /* ===== timeline ===== */
    ;(function () {
      const tl = document.querySelector<HTMLElement>(".od .tl"), fill = document.getElementById("tlFill"), steps = document.querySelectorAll(".od .ts")
      if (!tl || !fill) return
      const upd = () => { const r = tl.getBoundingClientRect(); let prog = (innerHeight * .6 - r.top) / r.height; prog = Math.max(0, Math.min(1, prog)); fill.style.height = (prog * 100) + "%"; steps.forEach((s, i) => s.classList.toggle("on", prog >= i / steps.length)) }
      addEventListener("scroll", upd); addEventListener("resize", upd); upd()
      cleanups.push(() => { removeEventListener("scroll", upd); removeEventListener("resize", upd) })
    })()

    /* ===== pinned logo reveal ===== */
    ;(function () {
      const wrap = document.getElementById("logoReveal"); if (!wrap) return
      const stage = wrap.querySelector<HTMLElement>(".pin-stage"); if (!stage) return
      const noPin = window.matchMedia("(prefers-reduced-motion:reduce)")
      let inView = false, raf = 0
      const clamp01 = (v: number) => v < 0 ? 0 : v > 1 ? 1 : v
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      const clearVars = () => { ["--p-scale", "--p-opacity", "--p-rot", "--p-glow", "--p-tag"].forEach((k) => stage.style.removeProperty(k)) }
      const update = () => {
        raf = 0
        if (noPin.matches) { clearVars(); return }
        const r = wrap.getBoundingClientRect(); const travel = r.height - innerHeight
        if (travel <= 0) { clearVars(); return }
        const p = clamp01(-r.top / travel)
        let scale, opacity, rot, glow, tag
        if (p < .4) { const k = p / .4; scale = lerp(.2, 1, k); opacity = k; rot = 360 * k; glow = .4 * k; tag = 0 }
        else if (p < .7) { const k = (p - .4) / .3; scale = lerp(1, 1.8, k); opacity = 1; rot = 360; glow = lerp(.4, 1, k); tag = 0 }
        else { const k = (p - .7) / .3; scale = lerp(1.8, 1.5, k); opacity = 1; rot = 360; glow = 1; tag = k }
        stage.style.setProperty("--p-scale", String(scale)); stage.style.setProperty("--p-opacity", String(opacity)); stage.style.setProperty("--p-rot", rot + "deg"); stage.style.setProperty("--p-glow", String(glow)); stage.style.setProperty("--p-tag", String(tag))
      }
      const request = () => { if (raf) return; raf = requestAnimationFrame(update) }
      const io = new IntersectionObserver((es) => { inView = es[0].isIntersecting; if (inView) request() }, { rootMargin: "0px" })
      io.observe(wrap)
      const onScroll = () => { if (inView) request() }
      const onResize = () => request()
      addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onResize)
      if (noPin.matches) clearVars(); else request()
      cleanups.push(() => { io.disconnect(); cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onResize) })
    })()

    /* ===== fake audio visualizer ===== */
    ;(function () {
      const wrap = document.getElementById("viz"); if (!wrap) return
      const n = innerWidth < 760 ? 28 : 48; const bars: HTMLElement[] = []
      for (let i = 0; i < n; i++) { const s = document.createElement("span"); wrap.appendChild(s); bars.push(s) }
      let t = 0, running = false, raf = 0
      const io = new IntersectionObserver((es) => { running = es[0].isIntersecting }); io.observe(wrap)
      const anim = () => { if (running && !reduce) { t += .08; for (let i = 0; i < n; i++) { const v = Math.abs(Math.sin(t + i * .4)) * .6 + Math.abs(Math.sin(t * 1.7 + i * .9)) * .4; bars[i].style.height = (v * 100) + "%" } } raf = requestAnimationFrame(anim) }
      anim()
      cleanups.push(() => { cancelAnimationFrame(raf); io.disconnect(); bars.forEach((b) => b.remove()) })
    })()

    return () => { cleanups.forEach((fn) => fn()) }
  }, [])

  return (
    <div className="od">
      <canvas id="fx" />
      <div className="cur" id="cur" />
      <div className="cur-dot" id="curDot" />
      <div className="prog" id="prog" />

      <div className="content">
        {/* NAV */}
        <nav id="nav">
          <a href="#top" className="logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/logo.png" alt="Play+" className="logo-img" />PLAY+</a>
          <ul className="nav-links" id="navLinks">
            <li><a href="#services"><span>01</span>Services</a></li>
            <li><a href="#work"><span>02</span>Work</a></li>
            <li><a href="#pricing"><span>03</span>Pricing</a></li>
            <li><a href="#faq"><span>04</span>FAQ</a></li>
            <li><a href="#contact"><span>05</span>Contact</a></li>
          </ul>
          <div className="burger" id="burger"><span /><span /><span /></div>
        </nav>

        {/* HERO */}
        <header className="hero" id="top">
          <div className="hero-bg" aria-hidden="true">
            {HERO_IMAGES.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={src} src={src} alt="" className={`hero-slide${i === heroIdx ? " on" : ""}`} />
            ))}
          </div>
          <span className="hero-tag"><i />Creative Tech Studio / Play+</span>
          <h1>
            <span className="row r1"><b>WE MAKE</b></span>
            <span className="row r3"><b className="outline">PLAY+</b></span>
          </h1>
          <p className="hero-sub">
            イベント・デザイン・Web/SNS・eスポーツ。
            4つの領域を「動く体験」で接続するクリエイティブテックスタジオ。
            このサイト自体が、私たちの技術力のデモです。
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn solid"><span>START PROJECT</span></a>
            <a href="#work" className="btn"><span>VIEW WORK</span></a>
          </div>
          <div className="hero-meta">
            <div>SCROLL <b>↓</b></div>
          </div>
        </header>

        {/* TICKER */}
        <div className="ticker">
          <div className="ticker-tr">
            <em>EVENT <s>◆</s> DESIGN <s>◆</s> WEB &amp; SNS <s>◆</s> ESPORTS <s>◆</s> MOTION <s>◆</s> </em>
            <em>EVENT <s>◆</s> DESIGN <s>◆</s> WEB &amp; SNS <s>◆</s> ESPORTS <s>◆</s> MOTION <s>◆</s> </em>
          </div>
        </div>

        {/* PROBLEM */}
        <section id="problem">
          <div className="head rv">
            <div className="k">System // 01</div>
            <h2>Your Issues</h2>
            <p>こんなお悩みありませんか？ — Play+ が一気通貫で引き受けます。</p>
          </div>
          <div className="qgrid">
            {PROBLEMS.map((q, i) => (
              <div className={`qitem rv${i % 4 ? ` d${i % 4}` : ""}`} key={q}><i>?</i><p>{q}</p></div>
            ))}
          </div>
          <p className="q-note rv">多くの企業・団体が、同じ悩みを抱えています。</p>
        </section>

        {/* SOLUTION */}
        <section id="solution">
          <div className="sol">
            <div className="rv">
              <h2>その課題、<br /><b>すべて解決</b>できます。</h2>
              <p className="lead">企画段階から伴走し、目的に合わせた最適な形をご提案します。</p>
              <div className="chips">
                {SOLUTIONS.map((s) => <s key={s}>{s}</s>)}
              </div>
            </div>
            <div className="sol-badge rv d1">
              <div className="big">1</div>
              <div className="t">ワンストップ対応</div>
              <div className="s">「やりたい」を形にするまで</div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services">
          <div className="head rv">
            <div className="k">System // 02</div>
            <h2>Capabilities</h2>
            <p>4つの事業を、独立したサービスではなくひとつの体験設計エンジンとして提供します。カードにマウスを乗せると傾きます。</p>
          </div>
          <div className="grid">
            <div className="card c1 tilt rv" data-hot>
              <div className="inner">
                <div className="no">01</div>
                <h3>EVENT</h3>
                <p>企画・運営・当日進行まで一貫対応。リアルとオンラインのハイブリッド設計が得意領域です。</p>
                <div className="chips"><s>企画</s><s>運営</s><s>配信</s></div>
              </div>
            </div>
            <div className="card c2 tilt rv d1" data-hot>
              <div className="inner">
                <div className="no">02</div>
                <h3>DESIGN</h3>
                <p>ロゴ・グラフィック・モーション。見た目の強さと、伝わる設計の両立にこだわります。</p>
                <div className="chips"><s>VI</s><s>グラフィック</s><s>3D</s></div>
              </div>
            </div>
            <div className="card c3 tilt rv d2" data-hot>
              <div className="inner">
                <div className="no">03</div>
                <h3>WEB / SNS</h3>
                <p>サイト制作からSNS運用・MEO/SEOまで。数値で改善し続ける運用が本質です。</p>
                <div className="chips"><s>制作</s><s>運用</s><s>分析</s></div>
              </div>
            </div>
            <div className="card c4 tilt rv d3" data-hot>
              <div className="inner">
                <div className="no">04</div>
                <h3>ESPORTS</h3>
                <p>大会運営・配信・コミュニティ構築。競技シーンの熱量をビジネスへ接続します。</p>
                <div className="chips"><s>大会</s><s>配信</s><s>運営</s></div>
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="st rv"><div className="n"><span className="ct" data-to="4">0</span></div><p>事業領域</p></div>
            <div className="st rv d1"><div className="n"><span className="ct" data-to="100">0</span><s>%</s></div><p>一貫対応率</p></div>
            <div className="st rv d2"><div className="n"><span className="ct" data-to="24">0</span><s>h</s></div><p>初回返信目安</p></div>
            <div className="st rv d3"><div className="n"><span className="ct" data-to="60">0</span><s>fps</s></div><p>描画目標値</p></div>
          </div>

          <div className="viz-wrap rv" id="viz" />
        </section>

        {/* BENEFITS */}
        <section id="benefits">
          <div className="head rv">
            <div className="k">System // 03</div>
            <h2>Why Play+</h2>
            <p>選ばれる理由。ワンストップ × イベント特化 × スピード。</p>
          </div>
          <div className="bgrid">
            {BENEFITS.map((b, i) => (
              <div className={`bcard rv${i % 4 ? ` d${i % 4}` : ""}`} key={b.t} data-hot>
                <div className="mk">{b.mk}</div>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LOGO REVEAL (pinned scroll) */}
        <section className="pin-wrap" id="logoReveal" aria-label="Logo reveal">
          <div className="pin-stage">
            <div className="pin-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Play+" className="pin-logo-img" />
            </div>
            <p className="pin-catch">好きを、もっと面白く。</p>
            <p className="pin-tagline"><span />Play+ — Creative Tech Studio<span /></p>
          </div>
        </section>

        {/* WORK */}
        <section id="work">
          <div className="head rv">
            <div className="k">System // 04</div>
            <h2>Selected Work</h2>
            <p>自社プロダクトからクライアントワークまで。手がけた制作・運営の一部です。</p>
          </div>
          <div className="wgrid">
            {WORKS.map((w, i) => (
              <div className={`wcard rv${i % 4 ? ` d${i % 4}` : ""}`} key={w.title} data-hot>
                <div className="wcard-img">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={w.img} alt={`${w.title} のサムネイル`} loading="lazy" /></div>
                <div className="wcard-body">
                  <span className="wcard-cat">{w.tag}</span>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing">
          <div className="head rv">
            <div className="k">System // 05</div>
            <h2>Pricing</h2>
            <p>参考料金。内容によりお見積りいたします。</p>
          </div>
          <div className="prgrid">
            {PRICING.map((p, i) => (
              <div className={`prcard rv${i % 4 ? ` d${i % 4}` : ""}`} key={p.nm} data-hot>
                <div className="nm">{p.nm}</div>
                <div className="amt">{p.amt}<s>{p.unit}</s></div>
              </div>
            ))}
          </div>
          <p className="pr-note rv">※ 表示は税込・目安です。詳細は <a href="/services/web">Web制作</a> / <a href="/services/meo">SEO/MEO/LLMO</a> の各ページをご覧ください。</p>
        </section>

        {/* PROCESS */}
        <section id="process">
          <div className="head rv">
            <div className="k">System // 06</div>
            <h2>Workflow</h2>
            <p>ヒアリングから振り返りまで。各フェーズで数値と仮説を共有し、判断を一緒に行います。</p>
          </div>
          <div className="tl rv">
            <div className="tl-fill" id="tlFill" />
            <div className="ts"><p className="tn">PHASE 01</p><h4>HEARING</h4>
              <p>目的・予算・KPIを言語化。曖昧な「なんとなく」を測れる目標に変換します。</p></div>
            <div className="ts"><p className="tn">PHASE 02</p><h4>DESIGN</h4>
              <p>企画とデザインの方向性を複数案で提示。根拠を添えて選べる状態にします。</p></div>
            <div className="ts"><p className="tn">PHASE 03</p><h4>BUILD</h4>
              <p>進捗を可視化しながら制作・運営。中間レビューで軌道修正します。</p></div>
            <div className="ts"><p className="tn">PHASE 04</p><h4>REVIEW</h4>
              <p>結果をKPIで評価し、次の打ち手を提案。一度きりで終わらせません。</p></div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="head rv">
            <div className="k">System // 07</div>
            <h2>FAQ</h2>
            <p>よくある質問。気になる点はお気軽にどうぞ。</p>
          </div>
          <div className="faq rv">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p className="a">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="contact">
          <h2 className="rv">START YOUR<br />PROJECT</h2>
          <div className="marq">
            <em>LET&apos;S TALK</em><em>★</em><em>LET&apos;S TALK</em><em>★</em>
            <em>LET&apos;S TALK</em><em>★</em><em>LET&apos;S TALK</em><em>★</em>
          </div>
          <a href="/contact" className="btn solid rv d1"><span>お問い合わせフォーム</span></a>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="fcol">
            <a href="#top" className="logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/logo.png" alt="Play+" className="logo-img" />PLAY+</a>
            <p>4つの領域を「動く体験」で接続するクリエイティブテックスタジオ。</p>
          </div>
          <div className="fcol">
            <h5>Menu</h5>
            <a href="/services/web">Webサイト制作・保守</a>
            <a href="/services/meo">SEO / MEO / LLMO対策</a>
            <a href="/works">実績</a>
            <a href="/news">お知らせ</a>
            <a href="/contact">お問い合わせ</a>
          </div>
          <div className="fcol">
            <h5>Connect</h5>
            <a href="https://lin.ee/pYn3rVU" target="_blank" rel="noopener noreferrer">LINEで無料相談</a>
            <a href="/contact">お問い合わせフォーム</a>
          </div>
          <div className="copy">
            <span>© 2026 Play+</span>
            <span>BUILT WITH CANVAS + CSS</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
