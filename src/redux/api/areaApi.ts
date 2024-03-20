import { apiSlice } from "./index";
import { AppQueryResult, Area } from "@/types/queries";
import { Locale } from "@/types/index";

export const areaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAreas: builder.query<AppQueryResult<Area[]>, string | number | void | undefined>({
      query: (country_id) => ({
        url: `area`,
        headers: {
          ...(country_id && { "X-COUNTRY": country_id }),
        },
        validateStatus: (response, result) => result.status == "200" && result.success,
      }),
    }),
  }),
});

export const { useGetAreasQuery, useLazyGetAreasQuery } = areaApi;
