"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Monitor, Palette, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const fallbackImages = [
  "bg-gradient-to-br from-purple-900 to-blue-900",
  "bg-gradient-to-br from-amber-900 to-yellow-900",
  "bg-gradient-to-br from-emerald-900 to-teal-900",
  "bg-gradient-to-br from-orange-900 to-red-900",
  "bg-gradient-to-br from-blue-900 to-cyan-900",
]

export function HeroSection() {
  const [images, setImages] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch work images
  useEffect(() => {
    fetch("/api/works")
      .then((res) => res.json())
      .then((data) => {
        const urls = data
          .filter((w: { imageUrl?: string }) => w.imageUrl)
          .map((w: { imageUrl: string }) => w.imageUrl)
        setImages(urls)
      })
      .catch(() => {})
  }, [])

  // Cycle images every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Slideshow */}
      {images.length > 0 ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex]}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      ) : null}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm text-sm text-muted-foreground">
            企業・団体のための制作支援サービス
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
        >
          イベントの企画・運営から
          <br />
          <span className="text-accent">Web制作・デザイン</span>まで
          <br />
          ワンストップで対応
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-12 text-pretty"
        >
          「何から始めればいいかわからない」
          <br className="sm:hidden" />
          そんな企業・団体様をサポートします
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button size="lg" asChild className="text-base px-8 py-6">
            <a href="/contact">
              無料相談はこちら
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
            <a href="#services">サービスを見る</a>
          </Button>
        </motion.div>

        {/* Service Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="h-5 w-5 text-accent" />
            <span>大会プロデュース</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="h-5 w-5 text-accent" />
            <span>Web制作</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Palette className="h-5 w-5 text-accent" />
            <span>デザイン制作</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  )
}
