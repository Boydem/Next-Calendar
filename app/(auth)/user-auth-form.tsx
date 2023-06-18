"use client"

import { HTMLAttributes } from "react"
import { registerUserSchema, registerUserSchemaType } from "@/constants/schemas"
import { userService } from "@/services/user.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  page: "login" | "register"
}

export function UserAuthForm({ className, page, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
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
    try {
      if (page === "login") {
        signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          callbackUrl: "/",
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            setError("root", { type: "serverError", message: callback.error })
            toast({
              variant: "destructive",
              title: "Oops, Something went wrong",
              description: callback.error,
            })
          } else clearErrors("root.serverError")
          if (callback?.ok && !callback.error) {
            toast({ variant: "default", title: "Logged in successfully!" })
          }
        })
        return
      }
      const data = await userService.registerUser(credentials)
      if (data.error) {
        setError("root", { type: "serverError", message: data.error })
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong",
          description: data.error,
        })
        return
      } else clearErrors("root.serverError")
      // if (!data.user) return null
      signIn("credentials", {
        email: data.user.email,
        password: credentials.password,
        callbackUrl: "/",
      })
    } catch (err) {
      console.log("err:", err)
    }
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit((credentials) => onSubmit(credentials))}>
        <div className="grid gap-2">
          {errors.root ? (
            <Alert className="mb-3" variant={"destructive"}>
              <Icons.warning className="h-4 w-4" />
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          ) : null}
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email", { disabled: isSubmitting, required: true })}
              id="email"
              placeholder="jsmith@example.com"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
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
                  {...register("name", {
                    disabled: isSubmitting,
                    required: true,
                  })}
                  placeholder="John Smith"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
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
                {...register("password", {
                  disabled: isSubmitting,
                  required: true,
                })}
                id="password"
                placeholder="•••••"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
              />
              {errors?.password?.message && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button disabled={isSubmitting} className="mt-3">
            {isSubmitting && (
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
      <Button
        onClick={() => signIn("google")}
        variant="outline"
        type="button"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}
