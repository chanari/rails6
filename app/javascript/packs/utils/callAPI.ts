import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";
import useSession from "./session";

interface APIPayload {
  method: string,
  path: string,
  query?: object,
  body?: object | FormData,
}

let csrfToken: HTMLMetaElement = document.head.querySelector(`meta[name="csrf-token"]`)
if (csrfToken) axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken.content

const useAPI = (payload: APIPayload) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [errResponse, setErrResponse] = useState(null)
  const {sessionInfo, setSessionInfo} = useSession()

  const callAPI = () => {
    setLoading(true)
    const toastId = toast.loading('Loading...')
    axios({
      method: payload.method,
      url: payload.path,
      params: payload.query,
      data: payload.body,
      headers: sessionInfo(),
    })
      .then((response) => {
        setResponse(response.data)
        setSessionInfo(response)
        toast.success('Finished!', {id: toastId})
      }).catch((error) => {
        setErrResponse(error)
        toast.error('Failed!!', {id: toastId})
      }).finally(() => setLoading(false))
  }

  return { callAPI, loading, response, errResponse }
}

export default useAPI
