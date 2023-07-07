import { BehaviorSubject, Observable, combineLatestWith, map } from "rxjs";
import { CountryResponse, HolidayResponse, IOpenHolidayGetter, OpenHolidayGetter } from "../services/openHolidaysService";

const defaultGetter = new OpenHolidayGetter()

export enum Months {
  All = "00",
  January = "01",
  February = "02",
  March = "03",
  April = "04",
  May = "05",
  June = "06",
  July = "07",
  August = "08",
  September = "09",
  October = "10",
  November = "11",
  December = "12",
}

export type CountryType = {
  isoCode: string;
  name: string;
}

export type HolidayBasicInfoType = {
  id: string
  date: string
  startDate: string
  endDate: string
  name: string
}

export function createStore() {
  const countriesRaw$ = new BehaviorSubject<CountryResponse[]>([])
  const holidaysRaw$ = new BehaviorSubject<HolidayResponse[]>([])
  const selectedMonth$ = new BehaviorSubject<Months>(Months.All)
  const error$ = new BehaviorSubject<string>('')

  const holidays$: Observable<HolidayBasicInfoType[]> = holidaysRaw$.pipe(
    map((holidays) => holidays.map(holiday => ({
      id: holiday.id,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
      date: new Date(holiday.startDate).toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
      }),
      name: holiday.name[0].text
    })))
  )

  const countries$: Observable<CountryType[]> = countriesRaw$.pipe(
    map((countries) => countries.map(c => ({
      isoCode: c.isoCode,
      name: c.name[0].text
    })))
  )

  const filtered$: Observable<HolidayBasicInfoType[]> = holidays$.pipe(
    combineLatestWith(selectedMonth$),
    map(([holidays, month]) => holidays.filter(filterByMonth(month)))
  )

  function getMonth(date: string) {
    return date.substring(5, 7)
  }

  function filterByMonth(month: Months) {
    return function (holiday: HolidayBasicInfoType) {
      if (month === Months.All) {
        return true
      }

      const startMonth = getMonth(holiday.startDate)
      const endMonth = getMonth(holiday.endDate)

      if (startMonth === month || endMonth === month) {
        return true
      }
    }
  }

  async function getCountries(getter: IOpenHolidayGetter = defaultGetter): Promise<void> {
    error$.next('')
    try {
      const response = await getter.countries()
      if (!response.ok) {
        throw response.error
      }
      countriesRaw$.next(response.data)
    } catch (error) {
      error$.next('Countries fetch failed try again')
    }
  }

  async function getForCountryByYear(
    { countryCode, year }: { countryCode: string, year: string },
    getter: IOpenHolidayGetter = defaultGetter): Promise<void> {
    error$.next('')
    try {
      if (parseInt(year) < 2020) {
        error$.next('Calendar is available from 2020')
        return
      }
      const validFrom = `${year}-01-01`
      const validTo = `${year}-12-31`
      const response = await getter.holidays({
        countryIsoCode: countryCode,
        validFrom,
        validTo,
        languageIsoCode: 'EN',
      })
      if (!response.ok) {
        throw response.error
      }
      holidaysRaw$.next(response.data)
    } catch (error) {
      error$.next('Holidays fetch failed try again')
    }
  }

  return {
    filtered$,
    holidays$,
    selectedMonth$,
    countries$,
    error$,
    getCountries,
    getForCountryByYear
  }
}

export const {
  filtered$,
  holidays$,
  selectedMonth$,
  countries$,
  error$,
  getCountries,
  getForCountryByYear } = createStore()