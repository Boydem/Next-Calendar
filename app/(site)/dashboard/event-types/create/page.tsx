"use client"

import { useState, type FC } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"

import AvailabilityForm, { AvailabilityFormValues } from "../availability-form"
import EventTypeForm, { EventTypeFormValues } from "../event-type-form"

interface CreateEventData {
  eventTypeValues: EventTypeFormValues
  availabilityValues: AvailabilityFormValues
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
      // excludeWeekends: true,
      availabilitySchedule: {
        rules: [
          {
            day: "sunday",
            intervals: { from: "09:00", to: "17:00" },
            isActiveDay: true,
          },
          {
            day: "monday",
            intervals: { from: "09:00", to: "17:00" },
            isActiveDay: true,
          },
          {
            day: "tuesday",
            intervals: { from: "09:00", to: "17:00" },
            isActiveDay: true,
          },
          {
            day: "tuesday",
            intervals: { from: "09:00", to: "17:00" },
            isActiveDay: true,
          },
          {
            day: "wednesday",
            intervals: { from: "09:00", to: "17:00" },
            isActiveDay: true,
          },
          {
            day: "thursday",
            intervals: { from: "09:00", to: "17:00" },
            isActiveDay: true,
          },
          {
            day: "friday",
            intervals: { from: "09:00", to: "17:00" },
            isActiveDay: false,
          },
          {
            day: "saturday",
            intervals: { from: "09:00", to: "17:00" },
            isActiveDay: false,
          },
        ],
      },
    },
  })

  function onEventTypeFormSubmit(formData: EventTypeFormValues) {
    setData((prevData) => ({
      ...prevData,
      eventTypeValues: { ...formData },
    }))
  }

  function onAvailabilityFormSubmit(formData: AvailabilityFormValues) {
    setData((prevData) => ({
      ...prevData,
      availabilityValues: { ...formData },
    }))
  }

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

      <Accordion
        defaultValue="event-type-form"
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
          />
        </AccordionItem>
        <AccordionItem value="availablity-form" className="border-none">
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
