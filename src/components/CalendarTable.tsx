import { useObservableState } from "observable-hooks"
import { useHolidayContext } from "../holidayStore"

export const CalendarTable = () => {
  const holidayContext = useHolidayContext()
  const filtered = useObservableState(holidayContext.filtered$, [])

  return !!filtered.length &&
    <table className="border-2 border-neutral-500 w-fit rounded-md border-separate border-spacing-0 mx-auto">
      <thead>
        <tr className="bg-neutral-300">
          <td className="px-2 py-1 font-bold">Date</td>
          <td className="pl-2 pr-4 py-1 font-bold">Public Holiday Reason</td>
        </tr>
      </thead>
      <tbody>
        {filtered.map(holiday =>
          <tr key={holiday.id} className=" odd:bg-neutral-200">
            <td className="pl-4 py-1 pr-8">
              {holiday.date}
            </td>
            <td className="pl-2 py-1">
              {holiday.name}
            </td>
          </tr>
        )}
      </tbody>
    </table>
}