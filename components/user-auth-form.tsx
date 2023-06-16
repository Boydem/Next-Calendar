"use client"

import { HTMLAttributes, useState } from "react"
import { userService } from "@/services/user.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { registerUserSchema, registerUserSchemaType } from "@/lib/schemas"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  page: "login" | "register"
}

export function UserAuthForm({ className, page, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string>("")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUserSchemaType>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  if (errors) console.log("errors:", errors)

  async function onSubmit(credentials: registerUserSchemaType) {
    setIsLoading(true)
    try {
      if (page === "login") {
        const res = await signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          callbackUrl: "/",
          redirect: false,
        })

        if (res?.error) {
          setServerError(res.error)
          toast({
            variant: "destructive",
            title: "Oops, Something went wrong",
            description: res.error,
          })
        } else setServerError("")
        console.log("res:", res)
        return
      }
      const data = await userService.registerUser(credentials)
      if (data.error) {
        setServerError(data.error)
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong",
          description: data.error,
        })
        return
      } else setServerError("")
      // if (!data.user) return null
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
      <form onSubmit={handleSubmit((credentials) => onSubmit(credentials))}>
        <div className="grid gap-2">
          {serverError ? (
            <Alert className="mb-3" variant={"destructive"}>
              <Icons.warning className="h-4 w-4" />
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          ) : null}
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="jsmith@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            {errors?.email?.message && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
            {page === "register" ? (
              <div className="grid gap-2">
                <Label className="text-muted-foreground" htmlFor="name">
                  Full Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Smith"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                />
                {errors?.name?.message && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
            ) : null}
            <div className="grid gap-2">
              <Label className="text-muted-foreground" htmlFor="password">
                Password
              </Label>
              <Input
                {...register("password")}
                id="password"
                placeholder="•••••"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
              {errors?.password?.message && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button disabled={isLoading} className="mt-3">
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
