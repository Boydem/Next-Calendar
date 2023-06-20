import z from "zod"

import { ColorNames } from "./eventColors"

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

const EventColor = z.enum(ColorNames)

export type EventTypeFormSchemaType = z.infer<typeof eventTypeFormSchema>

export const eventTypeFormSchema = z.object({
  name: z
    .string({
      required_error: "Required field",
    })
    .min(1, { message: "Name must contain at least 1 charachter(s)" })
    .nonempty(),
  location: z.string().optional(),
  description: z.string().optional(),
  slug: z
    .string({ required_error: "Required field" })
    .nonempty()
    .min(1, { message: "Link must contain at least 1 charachter(s)" })
    .regex(
      /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,

      {
        message:
          "The link can only contain english charachters and numbers, use '-' to seperate words",
      }
    ),
  color: EventColor,
})
// name: "",
// location: "",
// description: "",
// slug: "",
// color: "red",

const WeekDay = z.enum([
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
])

export type WeekDayType = z.infer<typeof WeekDay>

export type AvailabilityFormSchemaType = z.infer<typeof availabilityFormSchema>

export const availabilityFormSchema = z.object({
  durationInMinutes: z
    .number()
    .min(1, { message: "Must be bigger than or equal to 1 min." })
    .max(720, { message: "Must be less than or equal to 720 min." })
    .refine((value) => Number.isInteger(value), {
      message: "Must enter an integer number",
    }),

  bookingRangeInDays: z
    .number()
    .min(1, { message: "Must be bigger than or equal to 1 day." })
    .refine((value) => Number.isInteger(value), {
      message: "Must enter an integer number",
    }),

  availabilitySchedule: z.object({
    timezone: z.string().optional(),
    intervals: z.array(
      z.object({
        day: WeekDay,
        from: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          message: "Invalid time format. Must be in the format 'HH:mm'.",
        }),
        to: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          message: "Invalid time format. Must be in the format 'HH:mm'.",
        }),
        isActiveDay: z.boolean(),
      })
      // .refine(
      //   ({ from, to }) => {
      //     const [fromHours, fromMinutes] = from.split(":")
      //     const [toHours, toMinutes] = to.split(":")
      //     if (
      //       Number(toHours) < Number(fromHours) ||
      //       (Number(toHours) === Number(fromHours) &&
      //         Number(toMinutes) < Number(fromMinutes))
      //     ) {
      //       return false
      //     }
      //     return true
      //   },
      //   {
      //     message:
      //       "Invalid time. The 'to' time cannot occur before the 'from' time.",
      //   }
      // )
    ),
  }),
})

// durationInMinutes: number
// bookingRangeInDays: number
// availabilitySchedule: {
//   timezone?: string
//   intervals: Array<{
//     day: WeekDay
//     from: string
//     to: string
//     isActiveDay: boolean
//   }>
// }
