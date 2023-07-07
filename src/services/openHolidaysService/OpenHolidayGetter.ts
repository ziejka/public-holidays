import { Api, CountryResponse, HolidayResponse, HttpResponse } from "./OpenHolidaysService";
import { GetHolidayQueryType, IOpenHolidayGetter } from "./IOpenHolidayGetter";

export class OpenHolidayGetter implements IOpenHolidayGetter {
  api: Api<unknown>;

  constructor() {
    this.api = new Api({
      baseUrl: 'https://openholidaysapi.org'
    })
  }

  countries(): Promise<HttpResponse<CountryResponse[], any>> {
    return this.api.countries.countriesList()
  }

  holidays(query: GetHolidayQueryType): Promise<HttpResponse<HolidayResponse[], any>> {
    return this.api.publicHolidays.publicHolidaysList(query)
  }
}