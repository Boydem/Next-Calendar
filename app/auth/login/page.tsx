import type { FC } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <>
      <Link
        href="/auth/register"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Dont have an account yet ?
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Log in to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to login your account
        </p>
      </div>
      <UserAuthForm page={"login"} />
    </>
  )
}

export default LoginPage
