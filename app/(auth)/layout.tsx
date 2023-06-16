import { Metadata } from "next"
import { Command } from "lucide-react"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: "Authentication",
    template: `%s - 'Authentication Page'`,
  },
  description: siteConfig.description,
}

interface AuthenticationLayoutProps {
  children: React.ReactNode
}

export default function AuthenticationLayout({
  children,
}: AuthenticationLayoutProps) {
  return (
    <div className="container relative grid flex-1 flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80)",
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Command className="mr-2 h-6 w-6" /> Next-Calendar
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Next-Calendar has saved me countless hours of work and
              helped me schedule lessons with my clients faster than ever
              before. Highly recommended!&rdquo;
            </p>
            <footer className="text-sm">Adi Katzir</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  )
}
