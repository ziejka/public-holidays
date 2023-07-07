import { CountryResponse, HolidayResponse, HttpResponse } from "./OpenHolidaysService"

export type GetHolidayQueryType = {
  countryIsoCode: string;
  validFrom: string;
  validTo: string;
  languageIsoCode: string;
}

export interface IOpenHolidayGetter {
  countries(): Promise<HttpResponse<CountryResponse[], any>>
  holidays(query: GetHolidayQueryType): Promise<HttpResponse<HolidayResponse[], any>>
}