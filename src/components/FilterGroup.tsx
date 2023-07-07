import { useObservableState } from "observable-hooks";
import { Months, useHolidayContext } from "../holidayStore";
import { useEffect, useMemo } from "react";
import { SelectBox } from "./SelectBox";
import { Button } from "./Button";
import { Input } from "./Input";

type PropsType = {
  children?: React.ReactNode
}

export const FilterGroup: React.FC<PropsType> = () => {
  const holidayContext = useHolidayContext()
  const countries = useObservableState(holidayContext.countries$, [])

  useEffect(() => {
    holidayContext.getCountries()
  }, [holidayContext])

  const handleMonthChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    holidayContext.selectedMonth$.next(e.target.value as Months)
  }

  // the approach using from is recommended by https://react.dev/
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const countryCode = formData.get('countryCode') as string
    const year = formData.get('year') as string;

    if (!countryCode || !year) {
      return
    }

    holidayContext.getForCountryByYear({
      countryCode,
      year,
    })
  }

  const countriesMemo = useMemo(() => countries.map(c => ({ value: c.isoCode, text: c.name })), [countries])
  const monthsMemo = useMemo(() => Object.entries(Months).map(([key, value]) => ({ value, text: key })), [])

  return <section className="flex flex-col gap-2 w-fit mx-auto">
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center">
      <div className="grid gap-4 grid-cols-2 items-center">
        <SelectBox label="Country:" name="countryCode" items={countriesMemo} />
        <Input label="Year: " name='year' type='number' placeholder='2020' defaultValue={(new Date().getFullYear().toString())} />
      </div>
      <Button type="submit" label="Get holidays" />
    </form>
    <div className="mx-auto mt-4 pt-4 border-t border-neutral-300 w-full">
      <SelectBox label="Filter by month:" name="month" items={monthsMemo} onChange={handleMonthChange} />
    </div>
  </section>
}
