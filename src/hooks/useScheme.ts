import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCookie, setCookie } from "cookies-next"
import { useEffect } from "react"
import { queryKey } from "src/constants/queryKey"

type Scheme = "light" | "dark"
type SetScheme = (scheme: Scheme) => void

const useScheme = (): [Scheme, SetScheme] => {
  const queryClient = useQueryClient()

  // 처음 로드할 때 "light"로 초기화
  const { data } = useQuery({
    queryKey: queryKey.scheme(),
    initialData: "light",  // 초기 데이터를 "light"로 설정
  })

  // data가 없으면 "light"로 설정
  const scheme = data === "dark" ? "dark" : "light"

  const setScheme = (scheme: "light" | "dark") => {
    setCookie("scheme", scheme)
    queryClient.setQueryData(queryKey.scheme(), scheme)
  }

  useEffect(() => {
    if (!window) return

    // 처음 로드할 때는 항상 "light"로 설정
    setScheme("light")
  }, [])

  return [scheme, setScheme]
}

export default useScheme
