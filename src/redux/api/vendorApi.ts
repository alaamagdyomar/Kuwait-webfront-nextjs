import { apiSlice } from './index';
import { AppQueryResult, Branch } from '@/types/queries';

export const vendorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query<
      AppQueryResult<Branch[]>, number | string
    >({
      query: (id) => ({
        url: `branches?vendor_id=${id}`,
        validateStatus: (response, result) => result.status == 200,
      }),
    }),

  }),
});

export const { useLazyGetBranchesQuery, useGetBranchesQuery } = vendorApi;
