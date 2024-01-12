import { useCallback, useRef } from "react"




export const useDebounce = (delay = 500, notDelayFirstTime = true) => {
  
  const isFirtTime = useRef(notDelayFirstTime)
  const debouncing = useRef<NodeJS.Timeout>()

  const debounce = useCallback((func: () => void) => {

    if (isFirtTime.current) {
      isFirtTime.current = false
      func()
    } else {

        if (debouncing.current) {
        clearTimeout(debouncing.current)
        }

        debouncing.current = setTimeout(() => { func() }, delay)
    }

  }, [delay])

  return {debounce}
}