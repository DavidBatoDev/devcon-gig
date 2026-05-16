import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header({
  showActions = true,
  light = false,
}: {
  showActions?: boolean
  light?: boolean
}) {
  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur ${
        light
          ? "border-[#d8e2f2] bg-white/95 supports-[backdrop-filter]:bg-white/90"
          : "border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image src="/dv_rectangle.png" alt="DEVCON GIG" width={140} height={32} className="h-8 w-auto" />
          </Link>
        </div>
        {showActions ? (
          <div className="flex items-center gap-4">
            <nav
              className={`hidden md:flex items-center gap-6 text-sm font-medium ${
                light ? "text-[#607a9f]" : "text-muted-foreground"
              }`}
            >
              <Link href="#features" className={`transition-colors ${light ? "hover:text-[#1d2c44]" : "hover:text-foreground"}`}>Features</Link>
              <Link href="#how-it-works" className={`transition-colors ${light ? "hover:text-[#1d2c44]" : "hover:text-foreground"}`}>How it Works</Link>
            </nav>
            <Link href="/">
              <Button size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  )
}
