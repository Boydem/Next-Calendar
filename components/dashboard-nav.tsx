import Link from "next/link"

import { cn } from "@/lib/utils"

export function DashboardNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard/event-types"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Event Types
      </Link>
      <Link
        href="/dashboard/scheduled-events"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Scheduled Events
      </Link>
      <Link
        href="/dashboard/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
