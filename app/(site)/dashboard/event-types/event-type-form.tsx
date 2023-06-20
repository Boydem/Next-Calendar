"use client"

import { useEffect, type FC } from "react"
import eventColorsMap, { EventColors } from "@/constants/eventColors"
import {
  EventTypeFormSchemaType,
  eventTypeFormSchema,
} from "@/constants/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { AccordionContent } from "@radix-ui/react-accordion"
import { useForm } from "react-hook-form"

import { AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface EventTypeFormProps {
  onSubmit: (formData: EventTypeFormSchemaType) => void
  initialData: EventTypeFormSchemaType
  isTabOpen: boolean
  setIsFirstStepValid: (val: boolean) => void
}

const EventTypeForm: FC<EventTypeFormProps> = ({
  onSubmit,
  initialData,
  isTabOpen,
  setIsFirstStepValid,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, isValid, defaultValues },
    setValue,
  } = useForm<EventTypeFormSchemaType>({
    resolver: zodResolver(eventTypeFormSchema),
    defaultValues: initialData,
    mode: "all",
    resetOptions: { keepValues: true, keepDefaultValues: true },
  })

  useEffect(() => {
    setIsFirstStepValid(isValid)
  }, [setIsFirstStepValid, isValid])

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
              eventColorsMap[`${watch("color")}`].className
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
              {...register("name", {
                required: true,
                disabled: isSubmitting,
                value: initialData.name,
              })}
              type="text"
              id="eventName"
            />
            {errors?.name ? (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventLocation">Location</Label>
            <Input
              {...register("location", {
                disabled: isSubmitting,
              })}
              type="text"
              id="eventLocation"
              placeholder="Add a location"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDescription">Description/Instructions</Label>
            <Textarea
              {...register("description", { value: initialData.description })}
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
              {...register("slug", {
                required: true,
                disabled: isSubmitting,
                value: initialData.slug,
              })}
              type="text"
              id="eventLink"
              placeholder="Your event type link"
            />
            {errors?.slug ? (
              <p className="text-xs text-destructive">{errors.slug.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label>Event color *</Label>
            <RadioGroup
              onValueChange={(val: keyof EventColors) => setValue("color", val)}
              defaultValue={watch("color")}
              className="flex"
            >
              {Object.entries(eventColorsMap).map(([colorName, color]) => (
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
