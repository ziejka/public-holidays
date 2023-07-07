import { createContext, useContext } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import {
  CountryType,
  HolidayBasicInfoType,
  Months,
  countries$,
  error$,
  filtered$, getCountries, getForCountryByYear, selectedMonth$,
} from "./store";

type HolidayContextType = {
  filtered$: Observable<HolidayBasicInfoType[]>
  countries$: Observable<CountryType[]>
  selectedMonth$: BehaviorSubject<Months>
  error$: BehaviorSubject<string>
  getCountries: () => Promise<void>
  getForCountryByYear: ({ countryCode, year }: { countryCode: string, year: string }) => Promise<void>
}

const HolidayContext = createContext<HolidayContextType>({
  filtered$,
  countries$,
  selectedMonth$,
  error$,
  getCountries,
  getForCountryByYear
})

type PropsType = {
  children?: React.ReactNode
};

export const HolidayContextProvider: React.FC<PropsType> = ({ children }) =>
  <HolidayContext.Provider value={
    {
      filtered$,
      countries$,
      selectedMonth$,
      error$,
      getCountries,
      getForCountryByYear
    }
  }>
    {children}
  </HolidayContext.Provider>

export const useHolidayContext = () => useContext(HolidayContext)