"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus, LogOut, Eye, EyeOff, ImagePlus, X as XIcon, Newspaper, Briefcase } from "lucide-react"

// --- Types ---

type NewsItem = {
  id: string
  date: string
  category: string
  title: string
  content: string
  imageUrl?: string
}

type WorkItem = {
  id: string
  title: string
  category: string
  description: string
  period: string
  location: string
  scale: string
  tags: string[]
  imageUrl?: string
}

const newsCategories = ["お知らせ", "イベント", "メディア", "実績"]
const worksCategories = ["大会運営", "イベント運営", "Web制作", "デザイン"]

type Tab = "news" | "works"

// --- Image Upload Helper ---

async function uploadImage(file: File): Promise<string | null> {
  const formData = new FormData()
  formData.append("file", file)
  const res = await fetch("/api/upload", { method: "POST", body: formData })
  if (res.ok) {
    const { url } = await res.json()
    return url
  }
  return null
}

// --- Main Component ---

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [tab, setTab] = useState<Tab>("news")

  // News state
  const [news, setNews] = useState<NewsItem[]>([])
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [isCreatingNews, setIsCreatingNews] = useState(false)

  // Works state
  const [works, setWorks] = useState<WorkItem[]>([])
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null)
  const [isCreatingWork, setIsCreatingWork] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => {
        if (res.ok) {
          setIsLoggedIn(true)
          fetchNews()
          fetchWorks()
        }
      })
      .catch(() => {})
  }, [])

  async function handleLogin() {
    setLoginError("")
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setIsLoggedIn(true)
      setPassword("")
      fetchNews()
      fetchWorks()
    } else {
      setLoginError("パスワードが正しくありません")
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" })
    setIsLoggedIn(false)
    setNews([])
    setWorks([])
  }

  // --- News CRUD ---

  async function fetchNews() {
    const res = await fetch("/api/news", { cache: "no-store" })
    if (res.ok) setNews(await res.json())
  }

  async function saveNews(item: Omit<NewsItem, "id"> & { id?: string }) {
    setLoading(true)
    await fetch("/api/news", {
      method: item.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
    await fetchNews()
    setEditingNews(null)
    setIsCreatingNews(false)
    setLoading(false)
  }

  async function deleteNews(id: string) {
    if (!confirm("この記事を削除しますか？")) return
    setLoading(true)
    setNews((prev) => prev.filter((n) => n.id !== id))
    await fetch("/api/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    await fetchNews()
    setLoading(false)
  }

  // --- Works CRUD ---

  async function fetchWorks() {
    const res = await fetch("/api/works", { cache: "no-store" })
    if (res.ok) setWorks(await res.json())
  }

  async function saveWork(item: Omit<WorkItem, "id"> & { id?: string }) {
    setLoading(true)
    await fetch("/api/works", {
      method: item.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
    await fetchWorks()
    setEditingWork(null)
    setIsCreatingWork(false)
    setLoading(false)
  }

  async function deleteWork(id: string) {
    if (!confirm("この実績を削除しますか？")) return
    setLoading(true)
    setWorks((prev) => prev.filter((w) => w.id !== id))
    await fetch("/api/works", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    await fetchWorks()
    setLoading(false)
  }

  // --- Login Screen ---

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">管理画面</h1>
            <p className="text-sm text-muted-foreground mt-1">パスワードを入力してください</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="パスワード"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {loginError && <p className="text-sm text-red-500">{loginError}</p>}
            <Button onClick={handleLogin} className="w-full">ログイン</Button>
          </div>
        </div>
      </div>
    )
  }

  // --- News Form ---

  if (editingNews || isCreatingNews) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <h1 className="text-2xl font-bold text-foreground mb-8">
            {editingNews ? "記事を編集" : "新しい記事"}
          </h1>
          <NewsForm
            initial={editingNews || undefined}
            onSave={saveNews}
            onCancel={() => { setEditingNews(null); setIsCreatingNews(false) }}
            loading={loading}
          />
        </div>
      </div>
    )
  }

  // --- Works Form ---

  if (editingWork || isCreatingWork) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <h1 className="text-2xl font-bold text-foreground mb-8">
            {editingWork ? "実績を編集" : "新しい実績"}
          </h1>
          <WorkForm
            initial={editingWork || undefined}
            onSave={saveWork}
            onCancel={() => { setEditingWork(null); setIsCreatingWork(false) }}
            loading={loading}
          />
        </div>
      </div>
    )
  }

  // --- Main List View ---

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">管理画面</h1>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={tab === "news" ? "default" : "outline"}
            onClick={() => setTab("news")}
          >
            <Newspaper className="h-4 w-4 mr-2" />
            ニュース
          </Button>
          <Button
            variant={tab === "works" ? "default" : "outline"}
            onClick={() => setTab("works")}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            実績
          </Button>
        </div>

        {/* News Tab */}
        {tab === "news" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">ニュース一覧</h2>
              <Button onClick={() => setIsCreatingNews(true)}>
                <Plus className="h-4 w-4 mr-2" />
                新規作成
              </Button>
            </div>
            {news.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">ニュース記事がありません</p>
            ) : (
              <div className="space-y-3">
                {news.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-accent">{item.category}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon" onClick={() => setEditingNews(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteNews(item.id)} disabled={loading}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Works Tab */}
        {tab === "works" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">実績一覧</h2>
              <Button onClick={() => setIsCreatingWork(true)}>
                <Plus className="h-4 w-4 mr-2" />
                新規作成
              </Button>
            </div>
            {works.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">実績がありません</p>
            ) : (
              <div className="space-y-3">
                {works.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-accent">{item.category}</span>
                        <span className="text-xs text-muted-foreground">{item.period}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon" onClick={() => setEditingWork(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteWork(item.id)} disabled={loading}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// --- News Form Component ---

function NewsForm({
  initial,
  onSave,
  onCancel,
  loading,
}: {
  initial?: NewsItem
  onSave: (item: Omit<NewsItem, "id"> & { id?: string }) => void
  onCancel: () => void
  loading: boolean
}) {
  const toInputDate = (d: string) => d.replace(/\./g, "-")
  const toDisplayDate = (d: string) => d.replace(/-/g, ".")
  const [date, setDate] = useState(toInputDate(initial?.date || new Date().toISOString().split("T")[0]))
  const [category, setCategory] = useState(initial?.category || newsCategories[0])
  const [title, setTitle] = useState(initial?.title || "")
  const [content, setContent] = useState(initial?.content || "")
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "")
  const [uploading, setUploading] = useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const url = await uploadImage(file)
    if (url) setImageUrl(url)
    setUploading(false)
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ id: initial?.id, date: toDisplayDate(date), category, title, content, imageUrl: imageUrl || undefined }) }} className="space-y-6">
      <FormField label="日付">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input" required />
      </FormField>
      <FormField label="カテゴリ">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input">
          {newsCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </FormField>
      <FormField label="タイトル">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="記事のタイトル" className="form-input" required />
      </FormField>
      <FormField label="本文">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="記事の内容" rows={6} className="form-input resize-y" required />
      </FormField>
      <ImageUploadField imageUrl={imageUrl} setImageUrl={setImageUrl} uploading={uploading} onUpload={handleImageUpload} />
      <FormActions loading={loading} uploading={uploading} onCancel={onCancel} />
    </form>
  )
}

// --- Works Form Component ---

function WorkForm({
  initial,
  onSave,
  onCancel,
  loading,
}: {
  initial?: WorkItem
  onSave: (item: Omit<WorkItem, "id"> & { id?: string }) => void
  onCancel: () => void
  loading: boolean
}) {
  const [title, setTitle] = useState(initial?.title || "")
  const [category, setCategory] = useState(initial?.category || worksCategories[0])
  const [description, setDescription] = useState(initial?.description || "")
  const [period, setPeriod] = useState(initial?.period || "")
  const [location, setLocation] = useState(initial?.location || "")
  const [scale, setScale] = useState(initial?.scale || "")
  const [tagsText, setTagsText] = useState(initial?.tags?.join(", ") || "")
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "")
  const [uploading, setUploading] = useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const url = await uploadImage(file)
    if (url) setImageUrl(url)
    setUploading(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const tags = tagsText.split(/[,、]/).map((t) => t.trim()).filter(Boolean)
    onSave({ id: initial?.id, title, category, description, period, location, scale, tags, imageUrl: imageUrl || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="タイトル">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="実績のタイトル" className="form-input" required />
      </FormField>
      <FormField label="カテゴリ">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input">
          {worksCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </FormField>
      <FormField label="説明">
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="実績の説明" rows={4} className="form-input resize-y" required />
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField label="期間">
          <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="2025年8月" className="form-input" />
        </FormField>
        <FormField label="場所">
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="東京都内" className="form-input" />
        </FormField>
        <FormField label="規模">
          <input type="text" value={scale} onChange={(e) => setScale(e.target.value)} placeholder="参加者128名" className="form-input" />
        </FormField>
      </div>
      <FormField label="タグ（カンマ区切り）">
        <input type="text" value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="企画, 運営, 配信" className="form-input" />
      </FormField>
      <ImageUploadField imageUrl={imageUrl} setImageUrl={setImageUrl} uploading={uploading} onUpload={handleImageUpload} />
      <FormActions loading={loading} uploading={uploading} onCancel={onCancel} />
    </form>
  )
}

// --- Shared Components ---

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      {children}
    </div>
  )
}

function ImageUploadField({
  imageUrl, setImageUrl, uploading, onUpload,
}: {
  imageUrl: string
  setImageUrl: (url: string) => void
  uploading: boolean
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">画像（任意）</label>
      {imageUrl ? (
        <div className="relative inline-block">
          <img src={imageUrl} alt="プレビュー" className="max-h-48 rounded-lg border border-border" />
          <button type="button" onClick={() => setImageUrl("")} className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-white hover:opacity-80">
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-border bg-card hover:border-accent/50 transition-colors cursor-pointer">
          <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">{uploading ? "アップロード中..." : "クリックして画像を選択"}</span>
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" disabled={uploading} />
        </label>
      )}
    </div>
  )
}

function FormActions({ loading, uploading, onCancel }: { loading: boolean; uploading: boolean; onCancel: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <Button type="submit" disabled={loading || uploading}>{loading ? "保存中..." : "保存"}</Button>
      <Button type="button" variant="outline" onClick={onCancel}>キャンセル</Button>
    </div>
  )
}
