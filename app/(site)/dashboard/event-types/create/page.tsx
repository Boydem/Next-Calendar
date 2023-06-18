"use client"

import type { FC } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateEventTypePageProps {}

const CreateEventTypePage: FC<CreateEventTypePageProps> = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      location: "",
      description: "",
      url: "",
      color: "",
    },
  })

  return (
    <>
      <div className="relative flex items-center justify-center border-b pb-6 ">
        <Link
          href={"/dashboard/event-types"}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
              className: "absolute left-0",
            })
          )}
        >
          Back
        </Link>
        <h2 className="text-2xl font-medium tracking-tight">
          Create New Event Type
        </h2>
      </div>
      <div className="space-y-6">
        <form className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 border-b pb-4">
            <div className="h-5 w-5 rounded-full bg-cyan-600"></div>
            <div className="flex flex-col">
              <p className="text-sm">What event is this?</p>
              <p className="text-xs text-muted-foreground">
                Coffee, In-person meeting
              </p>
            </div>
          </div>
          <div className="max-w-[400px] space-y-2">
            <Label htmlFor="eventName">Event name *</Label>
            <Input
              {...register("name", { required: true })}
              type="text"
              id="eventName"
            />
          </div>
          <div className="max-w-[400px] space-y-2">
            <Label htmlFor="eventLocation">Location</Label>
            <Input
              {...register("location")}
              type="text"
              id="eventLocation"
              placeholder="Add a location"
            />
          </div>
          <div className="max-w-[400px] space-y-2">
            <Label htmlFor="eventDescription">Description/Instructions</Label>
            <Textarea
              {...register("description")}
              id="eventDescription"
              placeholder="Write a summary and any details your invitee should know about the event."
            />
          </div>
          <div className="max-w-[400px] space-y-2">
            <Label htmlFor="eventLink">Event link *</Label>
            <Input
              {...register("url", { required: true })}
              type="text"
              id="eventLink"
              placeholder="Add a location"
            />
          </div>
          <div className="border-t"></div>
        </form>
      </div>
    </>
  )
}

export default CreateEventTypePage
