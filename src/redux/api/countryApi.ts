import { apiSlice } from "./index";
import { AppQueryResult, Country } from "@/types/queries";
import { replace, startCase } from "lodash";

export const countryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<AppQueryResult<Country[]>, void | undefined>({
      query: () => ({
        url: `country`,
        validateStatus: (response, result) => result.status == "200" && result.success,
      }),
    }),
    getCountryByName: builder.query<AppQueryResult<Country>, string>({
      query: (name) => ({
        url: `country/${startCase(replace(name, "-", " "))}`,
        validateStatus: (response, result) => result.status == "200" && result.success,
      }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useLazyGetCountriesQuery,
  useGetCountryByNameQuery,
  useLazyGetCountryByNameQuery,
} = countryApi;
