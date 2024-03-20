import { apiSlice } from "./index";
import { AppQueryResult, Area, Cart } from "@/types/queries";
import { Locale } from "@/types/index";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartProducts: builder.query<
      AppQueryResult<Cart>,
      { session_id?: string; user_id?: string | number }
    >({
      query: ({ session_id, user_id }) => ({
        url: `cart`,
        params: {
          ...(session_id ? { session_id: session_id } : {}),
          ...(user_id ? { user_id: user_id } : {}),
        },
        validateStatus: (response, result) => result.status == "200" && result.success,
      }),
      providesTags: ["cart"],
      keepUnusedDataFor: 0,
    }),

    updateCartProduct: builder.mutation<
      AppQueryResult<Area[]>,
      {
        session_id?: string;
        user_id?: string | number;
        cart_item_id: string | number;
        quantity: string | number;
        type: "increment" | "decrement";
      }
    >({
      query: ({ session_id, user_id, cart_item_id, quantity, type }) => ({
        url: `cart/update`,
        method: "post",
        body: {
          ...(session_id ? { session_id: session_id } : {}),
          ...(user_id ? { user_id: user_id } : {}),
          cart_item_id,
          quantity,
          type,
        },
        validateStatus: (response, result) => result.status == "200" && result.success,
      }),
      invalidatesTags: ["cart"],
    }),

    deleteCartProduct: builder.mutation<
      AppQueryResult<Area[]>,
      {
        session_id?: string;
        user_id?: string | number;
        cart_item_id: string | number;
      }
    >({
      query: ({ session_id, user_id, cart_item_id }) => ({
        url: `cart/delete`,
        method: "post",
        body: {
          ...(session_id ? { session_id: session_id } : {}),
          ...(user_id ? { user_id: user_id } : {}),
          cart_item_id,
        },
        validateStatus: (response, result) => result.status == "200" && result.success,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartProductsQuery,
  useDeleteCartProductMutation,
  useUpdateCartProductMutation,
} = cartApi;
