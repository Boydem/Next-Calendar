import { httpService } from "./https.service"

export const userService = {
  registerUser,
}

async function registerUser(credentials: {
  email: string
  password: string
  name: string
}) {
  return await httpService.post("/auth/register", credentials)
}
