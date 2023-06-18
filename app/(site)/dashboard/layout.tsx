import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"
import { getServerSession } from "next-auth"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard-nav"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

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

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/login")

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b bg-muted">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <DashboardNav />
          <div className="ml-auto flex items-center space-x-4">
            <Link
              href="/dashboard/event-types/create"
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "align-center flex space-x-1",
                })
              )}
            >
              <Plus className="h-4 w-4" />
              <span>Create</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="container mt-6 space-y-4 rounded-md border p-8 pt-6">
        {children}
      </div>
    </>
  )
}
