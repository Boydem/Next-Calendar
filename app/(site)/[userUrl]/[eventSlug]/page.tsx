import type { FC } from "react"

interface EventPageProps {
  params: { eventSlug: string; userUrl: string }
}

const EventPage: FC<EventPageProps> = async ({ params }) => {
  const { eventSlug, userUrl } = params

  return (
    <>
      <div>This is an event page with params : {userUrl + "/" + eventSlug}</div>
      <div>{JSON.stringify(params)}</div>
    </>
  )
}

export default EventPage
