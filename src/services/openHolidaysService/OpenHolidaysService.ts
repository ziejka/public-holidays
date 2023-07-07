/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Representation of a country reference */
export interface CountryReference {
  /**
   * Country ISO code
   * @minLength 1
   * @example "DE"
   */
  isoCode: string;
}

/** Representation of a country as defined in ISO 3166-1 */
export interface CountryResponse {
  /**
   * ISO 3166-1 country code
   * @minLength 1
   * @example "DE"
   */
  isoCode: string;
  /**
   * Localized country names
   * @example [{"language":"EN","text":"Germany"},{"language":"DE","text":"Deutschland"}]
   */
  name: LocalizedText[];
  /**
   * Official ISO-639-1 language codes
   * @example ["DE"]
   */
  officialLanguages: string[];
}

/** Representation of a holiday by date */
export interface HolidayByDateResponse {
  /** Additional localized comments */
  comment?: LocalizedText[] | null;
  /** Representation of a country reference */
  country: CountryReference;
  /**
   * Unqiue holiday id
   * @format uuid
   * @example "ff3b77a3-8c31-47af-b1c7-f26dd51f3c19"
   */
  id: string;
  /** Localized names of the holiday */
  name: LocalizedText[];
  /**
   * Is the holiday nationwide?
   * @example true
   */
  nationwide: boolean;
  /** List of subdivision references */
  subdivisions: SubdivisionReference[];
  /** Type of holiday */
  type: HolidayType;
}

/** Representation of a holiday */
export interface HolidayResponse {
  /** Additional localized comments */
  comment?: LocalizedText[] | null;
  /**
   * End date of the holiday
   * @format date
   * @example "2022-12-31"
   */
  endDate: string;
  /**
   * Unqiue holiday id
   * @format uuid
   * @example "ff3b77a3-8c31-47af-b1c7-f26dd51f3c19"
   */
  id: string;
  /** Localized names of the holiday */
  name: LocalizedText[];
  /**
   * Is the holiday nationwide?
   * @example true
   */
  nationwide: boolean;
  /**
   * Start date of the holiday
   * @format date
   * @example "2022-01-01"
   */
  startDate: string;
  /** List of subdivision references */
  subdivisions: SubdivisionReference[];
  /** Type of holiday */
  type: HolidayType;
}

/** Type of holiday */
export enum HolidayType {
  Public = "Public",
  Bank = "Bank",
  School = "School",
  BackToSchool = "BackToSchool",
  EndOfLessons = "EndOfLessons",
}

/** Representation of a language as defined in ISO-639-1 */
export interface LanguageResponse {
  /**
   * ISO-639-1 language code
   * @minLength 1
   * @example "DE"
   */
  isoCode: string;
  /**
   * Localized language names
   * @example [{"language":"DE","text":"Deutsch"},{"language":"EN","text":"German"}]
   */
  name: LocalizedText[];
}

/** A localized text string */
export interface LocalizedText {
  /**
   * ISO-639-1 language code
   * @minLength 1
   */
  language: string;
  /**
   * The localized text
   * @minLength 1
   */
  text: string;
}

/** Statistical data of the holidays database */
export interface StatisticsResponse {
  /**
   * The youngest holiday start date in the database
   * @format date
   */
  youngestStartDate: string;
  /**
   * The oldest holiday start date in the database
   * @format date
   */
  oldestStartDate: string;
}

/** Representation of a subdivision reference */
export interface SubdivisionReference {
  /**
   * Subdivision code
   * @minLength 1
   * @example "DE-BE"
   */
  code: string;
  /**
   * Short name for display
   * @minLength 1
   * @example "BE"
   */
  shortName: string;
}

/** Representation of a subdivision */
export interface SubdivisionResponse {
  /**
   * Localized categories of the subdivision
   * @example [{"language":"DE","text":"Bundesland"},{"language":"EN","text":"Federal state"}]
   */
  category: LocalizedText[];
  /** Child subdivisions */
  children?: SubdivisionResponse[] | null;
  /**
   * Subdivision code
   * @minLength 1
   * @example "DE-BE"
   */
  code: string;
  /**
   * Localized comments of the subdivision
   * @example null
   */
  comment: LocalizedText[];
  /**
   * ISO 3166-2 subdivision code (if defined)
   * @example "DE-BE"
   */
  isoCode?: string | null;
  /**
   * Localized names of the subdivision
   * @example [{"language":"DE","text":"Berlin"},{"language":"EN","text":"Berlin"}]
   */
  name: LocalizedText[];
  /** Official languages as ISO-639-1 codes */
  officialLanguages: string[];
  /**
   * Short name for display
   * @minLength 1
   * @example "BE"
   */
  shortName: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OpenHolidays API v1
 * @version v1
 * @license Open Database License (https://github.com/openpotato/openholidaysapi.data/blob/main/LICENSE)
 * @contact The OpenHolidays API Project (https://www.openholidaysapi.org)
 *
 * Open Data API for public and school holidays
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  countries = {
    /**
     * No description
     *
     * @tags Regional
     * @name CountriesList
     * @summary Returns a list of all supported countries
     * @request GET:/Countries
     */
    countriesList: (
      query?: {
        /**
         * ISO-639-1 code of a language or empty
         * @example "DE"
         */
        languageIsoCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CountryResponse[], any>({
        path: `/Countries`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  languages = {
    /**
     * No description
     *
     * @tags Regional
     * @name LanguagesList
     * @summary Returns a list of all used languages
     * @request GET:/Languages
     */
    languagesList: (
      query?: {
        /**
         * ISO-639-1 code of a language or empty
         * @example "DE"
         */
        languageIsoCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LanguageResponse[], any>({
        path: `/Languages`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  publicHolidays = {
    /**
     * No description
     *
     * @tags Holidays
     * @name PublicHolidaysList
     * @summary Returns list of public holidays for a given country
     * @request GET:/PublicHolidays
     */
    publicHolidaysList: (
      query: {
        /**
         * ISO 3166-1 code of the country
         * @example "DE"
         */
        countryIsoCode: string;
        /**
         * ISO-639-1 code of a language or empty
         * @example "DE"
         */
        languageIsoCode?: string;
        /**
         * Start of the date range
         * @format date
         * @example "2023-01-01"
         */
        validFrom: string;
        /**
         * End of the date range
         * @format date
         * @example "2023-12-31"
         */
        validTo: string;
        /**
         * Code of the subdivision or empty
         * @example "DE-BE"
         */
        subdivisionCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HolidayResponse[], any>({
        path: `/PublicHolidays`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  publicHolidaysByDate = {
    /**
     * No description
     *
     * @tags Holidays
     * @name PublicHolidaysByDateList
     * @summary Returns a list of public holidays from all countries for a given date.
     * @request GET:/PublicHolidaysByDate
     */
    publicHolidaysByDateList: (
      query: {
        /**
         * ISO-639-1 code of a language or empty
         * @example "DE"
         */
        languageIsoCode?: string;
        /**
         * Date of interest
         * @format date
         * @example "2023-12-25"
         */
        date: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HolidayByDateResponse[], any>({
        path: `/PublicHolidaysByDate`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  schoolHolidays = {
    /**
     * No description
     *
     * @tags Holidays
     * @name SchoolHolidaysList
     * @summary Returns list of official school holidays for a given country
     * @request GET:/SchoolHolidays
     */
    schoolHolidaysList: (
      query: {
        /**
         * ISO 3166-1 code of the country
         * @example "DE"
         */
        countryIsoCode: string;
        /**
         * ISO-639-1 code of a language or empty
         * @example "DE"
         */
        languageIsoCode?: string;
        /**
         * Start of the date range
         * @format date
         * @example "2023-01-01"
         */
        validFrom: string;
        /**
         * End of the date range
         * @format date
         * @example "2023-12-31"
         */
        validTo: string;
        /**
         * Code of the subdivision or empty
         * @example "DE-MV"
         */
        subdivisionCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HolidayResponse[], any>({
        path: `/SchoolHolidays`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  schoolHolidaysByDate = {
    /**
     * No description
     *
     * @tags Holidays
     * @name SchoolHolidaysByDateList
     * @summary Returns a list of school holidays from all countries for a given date.
     * @request GET:/SchoolHolidaysByDate
     */
    schoolHolidaysByDateList: (
      query: {
        /**
         * ISO-639-1 code of a language or empty
         * @example "DE"
         */
        languageIsoCode?: string;
        /**
         * Date of interest
         * @format date
         * @example "2023-12-25"
         */
        date: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HolidayByDateResponse[], any>({
        path: `/SchoolHolidaysByDate`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  statistics = {
    /**
     * No description
     *
     * @tags Statistics
     * @name PublicHolidaysList
     * @summary Returns statistical data about public holidays for a given country.
     * @request GET:/Statistics/PublicHolidays
     */
    publicHolidaysList: (
      query: {
        /**
         * ISO 3166-1 code of the country
         * @example "DE"
         */
        countryIsoCode: string;
        /**
         * Code of the subdivision or empty
         * @example "DE-BE"
         */
        subdivisionCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<StatisticsResponse, any>({
        path: `/Statistics/PublicHolidays`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name SchoolHolidaysList
     * @summary Returns statistical data about school holidays for a given country
     * @request GET:/Statistics/SchoolHolidays
     */
    schoolHolidaysList: (
      query: {
        /**
         * ISO 3166-1 code of the country
         * @example "DE"
         */
        countryIsoCode: string;
        /**
         * Code of the subdivision or empty
         * @example "DE-BE"
         */
        subdivisionCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<StatisticsResponse, any>({
        path: `/Statistics/SchoolHolidays`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  subdivisions = {
    /**
     * No description
     *
     * @tags Regional
     * @name SubdivisionsList
     * @summary Returns a list of relevant subdivisions for a supported country (if any)
     * @request GET:/Subdivisions
     */
    subdivisionsList: (
      query: {
        /**
         * ISO 3166-1 code of the country
         * @example "DE"
         */
        countryIsoCode: string;
        /**
         * ISO-639-1 code of a language or empty
         * @example "DE"
         */
        languageIsoCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SubdivisionResponse[], any>({
        path: `/Subdivisions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
