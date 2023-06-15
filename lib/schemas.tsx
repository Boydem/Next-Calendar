import z from "zod"

export type registerUserSchemaType = z.infer<typeof registerUserSchema>

export const registerUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Password should be minimum 5 charachters"),
  name: z
    .string()
    .regex(/^[A-Za-z\s]*$/, "The username must contain only english letters"),
})

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Password should be minimum 5 charachters"),
})
