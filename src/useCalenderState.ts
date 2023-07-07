import { create } from "zustand";
import { Api, CountryResponse, HolidayResponse } from "./services/openHolidaysService/OpenHolidaysAPI";

type GetPublicHolidaysForCountry = (params: { countryCode: string, year: string }) => Promise<void>
type CalendarStateType = {
  supportedCountries: CountryResponse[]
  publicHolidays: HolidayResponse[]
  filtered: HolidayResponse[]
  getSupportedCountries: () => Promise<void>
  getHolidaysForCountryByYear: GetPublicHolidaysForCountry
  filter: (month: string) => void,
}

const api = new Api({
  baseUrl: 'https://openholidaysapi.org'
})

type SetMethod = (partial: Partial<CalendarStateType>) => void

function getSupportedCountries(set: SetMethod) {
  return async function (): Promise<void> {
    try {
      const response = await api.countries.countriesList()
      if (!response.ok) {
        throw response.error
      }
      set({ supportedCountries: response.data })
    } catch (error) {
      // ToDo handle error
      console.log(error);
    }
  }
}

function getPublicHolidaysForCountry(set: SetMethod): GetPublicHolidaysForCountry {
  return async function ({ countryCode, year }) {
    // validate inputs
    const validFrom = `${year}-01-01`
    const validTo = `${year}-12-31`
    try {
      const response = await api.publicHolidays.publicHolidaysList({
        countryIsoCode: countryCode,
        validFrom,
        validTo,
        languageIsoCode: 'EN',
      })
      if (!response.ok) {
        throw response.error
      }
      set({ publicHolidays: response.data })
    } catch (error) {
      // ToDo handle error
      console.log(error);
    }
  }
}

function getMonth(date: string) {
  return date.substring(5, 7)
}

function filterByMonth(month: string) {
  return function (holiday: HolidayResponse) {
    if (month === "00") {
      return true
    }

    const startMonth = getMonth(holiday.startDate)
    const endMonth = getMonth(holiday.endDate)

    if (startMonth === month || endMonth === month) {
      return true
    }
  }
}

function filter(set: SetMethod, get: () => CalendarStateType): (month: string) => void {
  return function (month: string) {
    const filtered = get().publicHolidays.filter(filterByMonth(month))
    set({ filtered })
  }
}

export const useCalendarState = create<CalendarStateType>((set, get) => {
  return {
    supportedCountries: [],
    publicHolidays: [],
    filtered: [],
    getHolidaysForCountryByYear: getPublicHolidaysForCountry(set),
    getSupportedCountries: getSupportedCountries(set),
    filter: filter(set, get)
  }
})