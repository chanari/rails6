import {AxiosResponse} from "axios";
import {useState} from "react";

const useSession = () => {
  const AUTH_HEADERS = ["access-token", "token-type", "client", "expiry", "uid"]
  // const [userSession, setUserSession] = useState(null)

  const sessionInfo = () => {
    let session = {}
    AUTH_HEADERS.forEach((header) => session[header] = localStorage.getItem(header))

    return session
  }

  const setSessionInfo = (response: AxiosResponse) => {
    const {headers} = response

    if (headers) {
      AUTH_HEADERS.forEach((header) => localStorage.setItem(header, headers[header]))
      // setUserSession(userInfo())
    }
  }

  const deleteSessionInfo = () => {
    AUTH_HEADERS.forEach((header) => localStorage.removeItem(header))
    // setUserSession(null)
  }

  const userInfo = () => {
    const isSession = AUTH_HEADERS.every(header => !!localStorage.getItem(header))
    const expiryTime = parseInt(localStorage.getItem("expiry")) * 1000
    if (isSession && expiryTime > Date.now()) return {email: localStorage.getItem("client")}

    return null
  }

  return {sessionInfo, setSessionInfo, deleteSessionInfo, userInfo}
}

export default useSession
