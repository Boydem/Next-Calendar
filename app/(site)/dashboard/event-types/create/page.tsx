"use client"

import { useEffect, useState, type FC } from "react"
import Link from "next/link"
import {
  AvailabilityFormSchemaType,
  EventTypeFormSchemaType,
} from "@/constants/zodSchemas"

import { cn } from "@/lib/utils"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

import AvailabilityForm from "../availability-form"
import EventTypeForm from "../event-type-form"

interface CreateEventData {
  eventTypeValues: EventTypeFormSchemaType
  availabilityValues: AvailabilityFormSchemaType
}

const CreateEventTypePage: FC = () => {
  const [openTab, setOpenTab] = useState<
    "" | "availablity-form" | "event-type-form"
  >("event-type-form")
  const [data, setData] = useState<CreateEventData>({
    eventTypeValues: {
      name: "",
      location: "",
      description: "",
      slug: "",
      color: "red",
    },
    availabilityValues: {
      durationInMinutes: 30,
      bookingRangeInDays: 60,
      availabilitySchedule: {
        intervals: [
          {
            day: "sunday",
            from: "09:00",
            to: "17:00",
            isActiveDay: true,
          },
          {
            day: "monday",
            from: "09:00",
            to: "17:00",
            isActiveDay: true,
          },
          {
            day: "tuesday",
            from: "09:00",
            to: "17:00",
            isActiveDay: true,
          },
          {
            day: "wednesday",
            from: "09:00",
            to: "17:00",
            isActiveDay: true,
          },
          {
            day: "thursday",
            from: "09:00",
            to: "17:00",
            isActiveDay: true,
          },
          {
            day: "friday",
            from: "09:00",
            to: "17:00",
            isActiveDay: false,
          },
          {
            day: "saturday",
            from: "09:00",
            to: "17:00",
            isActiveDay: false,
          },
        ],
      },
    },
  })
  const [isFirstStepValid, setIsFirstStepValid] = useState<boolean>(false)

  function onEventTypeFormSubmit(formData: EventTypeFormSchemaType) {
    if (!isFirstStepValid) return
    setData((prevData) => ({
      ...prevData,
      eventTypeValues: { ...formData },
    }))
    setOpenTab("availablity-form")
  }

  function onAvailabilityFormSubmit(formData: AvailabilityFormSchemaType) {
    setData((prevData) => ({
      ...prevData,
      availabilityValues: { ...formData },
    }))
  }

  useEffect(() => {
    toast({
      variant: "default",
      title: "Sending data:",
      description: <p>{JSON.stringify(data)}</p>,
    })
  }, [data])

  return (
    <>
      <div className="relative flex items-center justify-center">
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

      <Accordion
        defaultValue={"event-type-form"}
        value={openTab}
        type="single"
        collapsible
        className="w-full space-y-4"
        onValueChange={(val: "" | "availablity-form" | "event-type-form") =>
          setOpenTab(val)
        }
      >
        <AccordionItem value="event-type-form" className="border-none">
          <EventTypeForm
            onSubmit={onEventTypeFormSubmit}
            initialData={data.eventTypeValues}
            isTabOpen={openTab === "event-type-form"}
            setIsFirstStepValid={setIsFirstStepValid}
          />
        </AccordionItem>
        <AccordionItem
          disabled={!isFirstStepValid}
          value="availablity-form"
          className={`border-none ${!isFirstStepValid ? "opacity-50" : ""}`}
        >
          <AvailabilityForm
            onSubmit={onAvailabilityFormSubmit}
            initialData={data.availabilityValues}
            isTabOpen={openTab === "availablity-form"}
          />
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default CreateEventTypePage
