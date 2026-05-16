import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MOCK_DATA } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 md:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            {/* Search or other topbar items can go here */}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden md:block">{MOCK_DATA.users.full_name}</span>
            <Avatar>
              <AvatarImage src={MOCK_DATA.users.avatar_url} />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}
