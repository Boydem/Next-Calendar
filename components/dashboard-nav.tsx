"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function DashboardNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  console.log("pathname:", pathname)

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={`text-sm ${
          pathname === "/dashboard" ? "" : "text-muted-foreground"
        } font-medium transition-colors hover:text-primary`}
      >
        Overview
      </Link>
      <Link
        href="/dashboard/event-types"
        className={`text-sm ${
          pathname === "/dashboard/event-types" ? "" : "text-muted-foreground"
        } font-medium transition-colors hover:text-primary`}
      >
        Event Types
      </Link>
      <Link
        href="/dashboard/scheduled-events"
        className={`text-sm ${
          pathname === "/dashboard/scheduled-events"
            ? ""
            : "text-muted-foreground"
        } font-medium transition-colors hover:text-primary`}
      >
        Scheduled Events
      </Link>
      <Link
        href="/dashboard/settings"
        className={`text-sm ${
          pathname === "/dashboard/settings" ? "" : "text-muted-foreground"
        } font-medium transition-colors hover:text-primary`}
      >
        Settings
      </Link>
    </nav>
  )
}
