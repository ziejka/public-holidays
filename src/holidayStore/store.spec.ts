import { describe, expect, it, vi } from 'vitest'
import { CountryResponse, HolidayResponse, HolidayType } from '../services/openHolidaysService'
import { HolidayBasicInfoType, Months, createStore } from "./store"

describe('store', () => {
  const fakeFetch = vi.fn()
  beforeAll(() => {
    vi.stubGlobal('fetch', fakeFetch)
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  const holidaysMock: HolidayResponse[] = [{
    name: [{
      text: 'Holiday 1',
      language: "EN",
    }],
    startDate: '2023-06-15',
    endDate: '2023-06-16',
    nationwide: true,
    id: "t1",
    subdivisions: [{ code: "", shortName: '2' }],
    type: HolidayType.Public
  },
  {
    name: [{
      text: 'Holiday 2',
      language: "EN",
    }],
    startDate: '2023-01-15',
    endDate: '2023-01-16',
    nationwide: true,
    id: "t2",
    subdivisions: [{ code: "", shortName: '2' }],
    type: HolidayType.Public,
  }]

  it('should get countries and mapped them', async () => {
    const { getCountries, countries$ } = createStore()
    const responseData: CountryResponse[] = [{
      isoCode: "EN",
      name: [{
        language: 'EN',
        text: "England"
      }],
      officialLanguages: ["EN"]
    }]

    fakeFetch.mockResolvedValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(responseData),
    }))

    const expected = [{
      isoCode: "EN",
      name: "England",
    }]

    await getCountries()
    countries$.subscribe(data => {
      expect(data).toEqual(expected)
    })
  })

  it('should gets public holidays and store them ', async () => {
    const { getForCountryByYear, holidays$ } = createStore()
    fakeFetch.mockResolvedValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(holidaysMock),
    }))

    const expected = getExpected(holidaysMock)

    await getForCountryByYear({ countryCode: "EN", year: "2023" })

    holidays$.subscribe(data => {
      expect(data).toEqual(expected)
    })
  })

  it('should gets public holidays return filtered value without filter', async () => {
    const { getForCountryByYear, filtered$ } = createStore()
    fakeFetch.mockResolvedValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(holidaysMock),
    }))

    const expected = getExpected(holidaysMock)

    await getForCountryByYear({ countryCode: "EN", year: "2023" })

    filtered$.subscribe(data => {
      expect(data).toEqual(expected)
    })
  })

  it('should handle fetch countries error', async () => {
    const { getForCountryByYear, error$ } = createStore()
    fakeFetch.mockRejectedValue(Promise.resolve({
      ok: false,
      error: () => Promise.reject("error"),
    }))

    await getForCountryByYear({ countryCode: "EN", year: "2023" })

    error$.subscribe(data => {
      expect(data).toEqual("Holidays fetch failed try again")
    })
  })

  it('should handle fetch holidays error', async () => {
    const { getForCountryByYear, error$ } = createStore()
    fakeFetch.mockRejectedValue(Promise.resolve({
      ok: false,
      error: () => Promise.reject("error"),
    }))

    await getForCountryByYear({ countryCode: "EN", year: "2023" })

    error$.subscribe(data => {
      expect(data).toEqual("Holidays fetch failed try again")
    })
  })

  it('should gets public holidays return filtered value for given month', async () => {
    const { getForCountryByYear, filtered$, selectedMonth$ } = createStore()
    fakeFetch.mockResolvedValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(holidaysMock),
    }))

    const expected = getExpected([holidaysMock[1]])

    await getForCountryByYear({ countryCode: "EN", year: "2023" })
    selectedMonth$.next(Months.January)

    filtered$.subscribe(data => {
      expect(data).toEqual(expected)
    })
  })
})

function getExpected(holidays: HolidayResponse[]): HolidayBasicInfoType[] {
  return holidays.map(holiday => ({
    id: holiday.id,
    startDate: holiday.startDate,
    endDate: holiday.endDate,
    date: new Date(holiday.startDate).toLocaleDateString('en', {
      day: 'numeric',
      month: 'long',
    }),
    name: holiday.name[0].text
  }))
}