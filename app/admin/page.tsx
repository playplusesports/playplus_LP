"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus, LogOut, Eye, EyeOff, ImagePlus, X as XIcon } from "lucide-react"

type NewsItem = {
  id: string
  date: string
  category: string
  title: string
  content: string
  imageUrl?: string
}

const categories = ["お知らせ", "イベント", "メディア", "実績"]

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [news, setNews] = useState<NewsItem[]>([])
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Check auth on mount
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => {
        if (res.ok) {
          setIsLoggedIn(true)
          fetchNews()
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
    } else {
      setLoginError("パスワードが正しくありません")
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" })
    setIsLoggedIn(false)
    setNews([])
  }

  async function fetchNews() {
    const res = await fetch("/api/news", { cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      setNews(data)
      return data
    }
    return null
  }

  async function handleSave(item: Omit<NewsItem, "id"> & { id?: string }) {
    setLoading(true)
    if (item.id) {
      await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
    } else {
      await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
    }
    await fetchNews()
    setEditing(null)
    setIsCreating(false)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("この記事を削除しますか？")) return
    // Optimistic UI: remove from list immediately
    setNews((prev) => prev.filter((n) => n.id !== id))
    const res = await fetch("/api/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (!res.ok) {
      // Revert on failure
      await fetchNews()
    }
  }

  // Login screen
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
                aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
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

  // Edit/Create form
  if (editing || isCreating) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <h1 className="text-2xl font-bold text-foreground mb-8">
            {editing ? "記事を編集" : "新しい記事"}
          </h1>
          <NewsForm
            initial={editing || undefined}
            onSave={handleSave}
            onCancel={() => { setEditing(null); setIsCreating(false) }}
            loading={loading}
          />
        </div>
      </div>
    )
  }

  // News list
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">ニュース管理</h1>
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新規作成
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {news.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">ニュース記事がありません</p>
        ) : (
          <div className="space-y-3">
            {news.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-accent">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditing(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

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
  const [date, setDate] = useState(initial?.date || new Date().toISOString().split("T")[0].replace(/-/g, "."))
  const [category, setCategory] = useState(initial?.category || categories[0])
  const [title, setTitle] = useState(initial?.title || "")
  const [content, setContent] = useState(initial?.content || "")
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "")
  const [uploading, setUploading] = useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: formData })
    if (res.ok) {
      const { url } = await res.json()
      setImageUrl(url)
    }
    setUploading(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ id: initial?.id, date, category, title, content, imageUrl: imageUrl || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">日付</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="2026.04.01"
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">カテゴリ</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="記事のタイトル"
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">本文</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="記事の内容"
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-y"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">画像（任意）</label>
        {imageUrl ? (
          <div className="relative inline-block">
            <img src={imageUrl} alt="プレビュー" className="max-h-48 rounded-lg border border-border" />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-white hover:opacity-80"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-border bg-card hover:border-accent/50 transition-colors cursor-pointer">
            <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              {uploading ? "アップロード中..." : "クリックして画像を選択"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading || uploading}>
          {loading ? "保存中..." : "保存"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
      </div>
    </form>
  )
}
