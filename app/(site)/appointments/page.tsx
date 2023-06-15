import type { FC } from "react"
import moment from "moment"

import { Appointment, columns } from "./columns"
import { DataTable } from "./data-table"

interface AppointmentPageProps {}

const data: Appointment[] = [
  {
    date: Date.now() - 1512052,
    id: "m5gr84i9",
    name: "Yaakov",
    status: "pending",
    email: "ken99@yahoo.com",
  },
  {
    date: Date.now() - 121684888,
    id: "3u1reuv4",
    name: "Amir",
    status: "done",
    email: "Abe45@gmail.com",
  },
  {
    date: Date.now() - 501684888,
    id: "derv1ws0",
    name: "Moshe",
    status: "confirmed",
    email: "Monserrat44@gmail.com",
  },
  {
    date: Date.now() - 961684888,
    id: "5kma53ae",
    name: "Dana",
    status: "done",
    email: "Silas22@gmail.com",
  },
  {
    date: Date.now() - 561684888,
    id: "bhqecj4p",
    name: "Yaron",
    status: "canceled",
    email: "carmella@hotmail.com",
  },
]

const AppointmentPage: FC<AppointmentPageProps> = async () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-semibold border-b-[1px] pb-2.5">
        Appointments Table
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default AppointmentPage
