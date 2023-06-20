"use client"

import { useState, type FC } from "react"
import { Calendar } from "lucide-react"
import { useForm } from "react-hook-form"

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type WeekDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"

export type AvailabilityFormValues = {
  durationInMinutes: number
  bookingRangeInDays: number
  // excludeWeekends: boolean
  availabilitySchedule: {
    timezone?: string
    rules: Array<{
      intervals: { from: string; to: string }
      day: WeekDay
      isActiveDay: boolean
    }>
  }
}

interface AvailabilityFormProps {
  onSubmit: (formData: AvailabilityFormValues) => void
  initialData: AvailabilityFormValues
  isTabOpen: boolean
}

const AvailabilityForm: FC<AvailabilityFormProps> = ({
  onSubmit,
  initialData,
  isTabOpen,
}) => {
  const [isCustomDuration, setIsCustomDuration] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    setValue,
  } = useForm<AvailabilityFormValues>({
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
          <Calendar className="h-5 w-5" />
          <div className="flex flex-col">
            <p className="text-sm">When can people book this event?</p>
            <p className="text-xs text-muted-foreground">
              {watch("durationInMinutes")} {" minutes, "}
              {watch("bookingRangeInDays")} calendar days
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
            <Label htmlFor="dateRange">Date range *</Label>
            <p className="text-xs">Invitees can schedule...</p>
            <div className="inline-flex items-center space-x-2">
              <Input
                {...register("bookingRangeInDays", {
                  required: true,
                  disabled: isSubmitting,
                })}
                type="number"
                id="dateRange"
                className="w-[100px]"
              />
              <p>Days into the future</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDuration">Duration</Label>
            <Select
              onValueChange={(val: string) => {
                if (val === "Custom") {
                  setIsCustomDuration(true)
                  return
                } else {
                  setIsCustomDuration(false)
                  setValue("durationInMinutes", +val)
                }
              }}
              defaultValue={initialData.durationInMinutes + ""}
            >
              <SelectTrigger id="eventDuration" className="w-[160px]">
                <SelectValue
                  placeholder={watch("durationInMinutes") + " min"}
                />
              </SelectTrigger>
              <SelectContent>
                {[15, 30, 45, 60, "Custom"].map((duration) => (
                  <SelectItem value={duration + ""}>
                    {duration !== "Custom" ? duration + " min" : duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isCustomDuration ? (
              <div className="inline-flex items-center space-x-2">
                <Input
                  {...register("durationInMinutes", { disabled: isSubmitting })}
                  type="number"
                  id="eventDuration"
                  placeholder="Add a location"
                  className="w-[80px]"
                />
                <p>Min</p>
              </div>
            ) : null}
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

export default AvailabilityForm
