"use client"

import type { FC } from "react"
import eventColorsObj, { EventColors } from "@/constants/eventColors"
import { AccordionContent } from "@radix-ui/react-accordion"
import { useForm } from "react-hook-form"

import { AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export type EventTypeFormValues = {
  name: string
  location: string
  description: string
  slug: string
  color: keyof EventColors
}

interface EventTypeFormProps {
  onSubmit: (formData: EventTypeFormValues) => void
  initialData: EventTypeFormValues
  isTabOpen: boolean
}

const EventTypeForm: FC<EventTypeFormProps> = ({
  onSubmit,
  initialData,
  isTabOpen,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    setValue,
  } = useForm<EventTypeFormValues>({
    defaultValues: initialData,
  })

  return (
    <>
      <AccordionTrigger
        className={`justify-start rounded-md border ${
          isTabOpen ? "rounded-b-none" : ""
        } p-4`}
      >
        <div className="flex flex-1 items-center space-x-2 text-start">
          <div
            className={`h-5 w-5 rounded-full bg-${
              eventColorsObj[`${watch("color")}`].className
            }`}
          ></div>
          <div className="flex flex-col">
            <p className="text-sm">What event is this?</p>
            <p className="text-xs text-muted-foreground">
              {watch("name") ? watch("name") + ", " : null}{" "}
              {watch("location") ? watch("location") : "No location given"}
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="rounded-md rounded-t-none border border-t-0 p-4">
        <form
          onSubmit={handleSubmit((formData) => onSubmit(formData))}
          className="flex max-w-fit flex-col space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="eventName">Event name *</Label>
            <Input
              {...register("name", { required: true, disabled: isSubmitting })}
              type="text"
              id="eventName"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventLocation">Location</Label>
            <Input
              {...register("location", { disabled: isSubmitting })}
              type="text"
              id="eventLocation"
              placeholder="Add a location"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDescription">Description/Instructions</Label>
            <Textarea
              {...register("description")}
              id="eventDescription"
              placeholder="Write a summary and any details your invitee should know about the event."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventLink">Event link *</Label>
            <p className="text-sm font-light">
              next-calendar.com/noamdahandev/{watch("slug")}
            </p>
            <Input
              {...register("slug", { required: true, disabled: isSubmitting })}
              type="text"
              id="eventLink"
              placeholder="Add a location"
            />
          </div>
          <div className="space-y-2">
            <Label>Event color *</Label>
            <RadioGroup
              onValueChange={(val: keyof EventColors) => setValue("color", val)}
              defaultValue={watch("color")}
              className="flex"
            >
              {Object.entries(eventColorsObj).map(([colorName, color]) => (
                <div
                  key={color.id}
                  className="align-center group relative mb-4 flex justify-center"
                >
                  <RadioGroupItem
                    indicator="check"
                    indicatorClassName="h-5 w-5 text-white"
                    value={colorName}
                    id={color.id}
                    className={`h-9 w-9 rounded-full bg-${color.className} border-none`}
                  />
                  <Label
                    className="absolute -bottom-6 text-sm font-light capitalize opacity-0 transition-opacity group-hover:opacity-100"
                    htmlFor={color.id}
                  >
                    {colorName}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="border-t"></div>
          <div className="space-x-2">
            <Button
              type="button"
              variant={"link"}
              size={"sm"}
              className="max-w-min text-secondary-foreground"
            >
              Cancel
            </Button>
            <Button type="submit" size={"sm"} className="max-w-min">
              Next
            </Button>
          </div>
        </form>
      </AccordionContent>
    </>
  )
}

export default EventTypeForm
