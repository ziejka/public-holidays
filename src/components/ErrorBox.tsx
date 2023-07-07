import { useObservableState } from "observable-hooks"
import { useHolidayContext } from "../holidayStore"

export const ErrorBox: React.FC = () => {
  const holidayContext = useHolidayContext()
  const error = useObservableState(holidayContext.error$, '')

  const handleOnClick = () => {
    holidayContext.error$.next('')
  }

  if (!error) {
    return null
  }

  return (
    <button onClick={handleOnClick} className="w-fit px-8 py-2 rounded-lg bg-red-300 text-red-950 border-2 border-red-400 mx-auto text-center">
      {error.toString()}<span className="ml-5">❌</span>
    </button>
  )
}