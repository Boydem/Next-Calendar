// "use client"

import { type FC } from "react"
import { notFound } from "next/navigation"
import { User } from "@prisma/client"

interface UserUrlPageProps {
  params: { userUrl: string }
}

async function fetchUser(userUrl: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${userUrl}`, {
      cache: "no-store",
      method: "GET",
    })

    if (!res.ok) {
      return undefined
    }

    return res.json()
  } catch (err) {
    console.log("err:", err)
  }
}

const UserUrlPage: FC<UserUrlPageProps> = async ({ params }) => {
  const { userUrl } = params
  const user = (await fetchUser(userUrl)) as User | undefined
  // const router = useRouter()
  if (!user) notFound()
  return <div>{JSON.stringify(user)}</div>
}

export default UserUrlPage
