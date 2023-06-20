"use client"

import { useState, type FC } from "react"
import {
  AvailabilityFormSchemaType,
  availabilityFormSchema,
} from "@/constants/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, Trash } from "lucide-react"
import { useForm } from "react-hook-form"

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AvailabilityFormProps {
  onSubmit: (formData: AvailabilityFormSchemaType) => void
  initialData: AvailabilityFormSchemaType
  isTabOpen: boolean
}

const AvailabilityForm: FC<AvailabilityFormProps> = ({
  onSubmit,
  initialData,
  isTabOpen,
}) => {
  const [isCustomSchedule, setIsCustomSchedule] = useState(true)
  const [isCustomDuration, setIsCustomDuration] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<AvailabilityFormSchemaType>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: initialData,
    mode: "all",
  })

  if (errors) console.log("errors:", errors)
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
          <div className="space-y-2 border-b pb-4">
            <Label htmlFor="dateRange">Date range *</Label>
            <p className="text-xs text-muted-foreground">
              Invitees can schedule...
            </p>
            <div className="inline-flex flex-wrap items-center space-x-2">
              <Input
                {...register("bookingRangeInDays", {
                  required: true,
                  disabled: isSubmitting,
                  valueAsNumber: true,
                })}
                type="number"
                id="dateRange"
                className={`w-[100px] ${
                  errors?.bookingRangeInDays ? "border-destructive" : ""
                }`}
              />
              <p>Days into the future</p>
              {errors?.bookingRangeInDays ? (
                <p className="mt-2 basis-full text-xs text-destructive">
                  {errors.bookingRangeInDays.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2 border-b pb-4">
            <Label htmlFor="eventDuration">Event duration *</Label>
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
                {[15, 30, 45, 60, "Custom"].map((duration, index) => (
                  <SelectItem key={index + "dt"} value={duration + ""}>
                    {duration !== "Custom" ? duration + " min" : duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isCustomDuration ? (
              <div className="inline-flex flex-wrap items-center space-x-2">
                <Input
                  className={`w-[80px] ${
                    errors?.durationInMinutes ? "border-destructive" : ""
                  }`}
                  {...register("durationInMinutes", {
                    disabled: isSubmitting,
                    valueAsNumber: true,
                  })}
                  type="number"
                  id="eventDuration"
                  placeholder="Add a location"
                />
                <p>Min</p>
                {errors?.durationInMinutes ? (
                  <p className="mt-2 basis-full text-xs text-destructive">
                    {errors.durationInMinutes.message}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>
                How do you want to offer your availability for this event type?
              </Label>
              <p className="text-xs text-muted-foreground">
                Select one of your schedules or define custom hours specific to
                this type of event.
              </p>
            </div>
            <div className="inline-flex items-center space-x-2">
              <Button
                onClick={() => setIsCustomSchedule(false)}
                type="button"
                variant={"outline"}
                size={"sm"}
                className={`${!isCustomSchedule ? "border-primary" : ""}`}
              >
                Use an existing schedule
              </Button>
              <Button
                onClick={() => setIsCustomSchedule(true)}
                type="button"
                variant={"outline"}
                size={"sm"}
                className={`${isCustomSchedule ? "border-primary" : ""}`}
              >
                Set custom hours
              </Button>
            </div>
            {!isCustomSchedule ? (
              <Select
                onValueChange={(val: string) => {
                  setValue("durationInMinutes", +val)
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
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                    Time zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="flex flex-col">
                    {initialData.availabilitySchedule.intervals.map(
                      (interval, index) => (
                        <li className="border-t px-6 py-4" key={interval.day}>
                          <div className="flex items-center justify-between space-x-4 ">
                            <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                              <div className="flex items-center space-x-4">
                                <Checkbox
                                  defaultChecked={interval.isActiveDay}
                                  checked={watch(
                                    `availabilitySchedule.intervals.${index}.isActiveDay`
                                  )}
                                  onCheckedChange={(val) => {
                                    setValue(
                                      `availabilitySchedule.intervals.${index}.isActiveDay`,
                                      val as boolean
                                    )
                                  }}
                                />
                                <p className="min-w-[60px] font-semibold uppercase">
                                  {interval.day.substring(0, 3)}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Input
                                  {...register(
                                    `availabilitySchedule.intervals.${index}.from`
                                  )}
                                  className="max-w-[100px]"
                                  type="text"
                                  defaultValue={interval.from}
                                />
                                <span>{" - "}</span>
                                <Input
                                  {...register(
                                    `availabilitySchedule.intervals.${index}.to`
                                  )}
                                  className="max-w-[100px]"
                                  type="text"
                                  defaultValue={interval.to}
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() =>
                                setValue(
                                  `availabilitySchedule.intervals.${index}.isActiveDay`,
                                  false
                                )
                              }
                              variant={"ghost"}
                              size={"sm"}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                          {errors?.availabilitySchedule?.intervals &&
                          (errors.availabilitySchedule.intervals[index]?.from ||
                            errors.availabilitySchedule.intervals[index]
                              ?.to) ? (
                            <p className="mt-2 basis-full text-xs text-destructive">
                              {errors?.availabilitySchedule?.intervals[index]
                                ?.from?.message ||
                                errors?.availabilitySchedule?.intervals[index]
                                  ?.to?.message}
                            </p>
                          ) : null}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}
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
