import Axios, { Method } from "axios"

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://airbnb-backend-8iks.onrender.com/api/"
    : "//localhost:3000/api/"

var axios = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get(endpoint: string, data?: any) {
    return ajax(endpoint, "GET", data)
  },
  post(endpoint: string, data: any) {
    return ajax(endpoint, "POST", data)
  },
  put(endpoint: string, data: any) {
    return ajax(endpoint, "PUT", data)
  },
  delete(endpoint: string, data: any) {
    return ajax(endpoint, "DELETE", data)
  },
}

async function ajax(endpoint: string, method: Method, data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data: data,
      params: method === "GET" ? data : null,
    })
    return res.data
  } catch (err: any) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    console.dir(err)
    if (err.response && err.response.status === 401) {
      sessionStorage.clear()
      window.location.assign("/")
    }
    throw err
  }
}
