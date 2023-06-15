"use client"

import { FormEvent, HTMLAttributes, SyntheticEvent, useState } from "react"
import { userService } from "@/services/user.service"
import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  page: "login" | "register"
}

export function UserAuthForm({ className, page, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    const form = new FormData(e.target as HTMLFormElement)
    const credentials = {
      email: form.get("email") as string,
      name: form.get("name") as string,
      password: form.get("password") as string,
    }
    try {
      if (page === "login") {
        const res = await signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          callbackUrl: "/",
          redirect: false,
        })
        if (res?.error) {
          setError(res.error)
        }
        console.log("res:", res)
        return
      }
      const data = await userService.registerUser(credentials)
      if (data.error) setError(data.error)
      if (!data.user) return null
      signIn("credentials", {
        email: data.user.email,
        password: credentials.password,
        callbackUrl: "/",
      })
    } catch (err) {
      console.log("err:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="jsmith@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            {page === "register" ? (
              <div className="grid gap-2">
                <Label className="text-muted-foreground" htmlFor="name">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Smith"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                />
              </div>
            ) : null}
            <div className="grid gap-2">
              <Label className="text-muted-foreground" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="•••••"
                name="password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {page === "register" ? "Sign Up with Email" : "Sign In with Email"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}
