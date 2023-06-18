import { Metadata } from "next"
import { Plus } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s - 'Dashboard Page'`,
  },
  description: siteConfig.description,
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b bg-muted">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <DashboardNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button size={"sm"}>
              <Plus />
              <span>Create</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="container mt-6 space-y-4 rounded-md border p-8 pt-6">
        {children}
      </div>
    </>
  )
}
