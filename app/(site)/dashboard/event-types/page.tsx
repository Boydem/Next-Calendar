import { FC } from "react"
import Link from "next/link"
import { Copy, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarDateRangePicker } from "@/components/date-range-picker"

interface AppointmentPageProps {}

const AppointmentPage: FC<AppointmentPageProps> = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Event Types</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
        </div>
      </div>
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-t-4 border-t-purple-600 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-col items-start justify-between space-y-1">
              <CardTitle className="text-xl font-bold">
                Coding lesson with Noam Dahan
              </CardTitle>
              <CardDescription>60 mins, One-on-One</CardDescription>
              <Link href={"/"} className="text-sm text-primary">
                View booking page
              </Link>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between space-y-1 border-t py-3">
              <Link
                href={"/"}
                className="flex items-center space-x-1 text-xs text-primary"
              >
                <Copy className="h-3 w-3" />
                <span>Copy link</span>
              </Link>
              <Button
                size={"sm"}
                variant={"outline"}
                className="flex items-center space-x-1 rounded-full  text-primary"
              >
                <Share2 className="h-3 w-3" />
                <span>Share</span>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-cyan-600 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-col items-start justify-between space-y-1">
              <CardTitle className="text-xl font-bold">
                Coffe meeting with Noam Dahan
              </CardTitle>
              <CardDescription>15 mins, One-on-One</CardDescription>
              <Link href={"/"} className="text-sm text-primary">
                View booking page
              </Link>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between space-y-1 border-t py-3">
              <Link
                href={"/"}
                className="flex items-center space-x-1 text-xs text-primary"
              >
                <Copy className="h-3 w-3" />
                <span>Copy link</span>
              </Link>
              <Button
                size={"sm"}
                variant={"outline"}
                className="flex items-center space-x-1 rounded-full text-primary"
              >
                <Share2 className="h-3 w-3" />
                <span>Share</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default AppointmentPage
