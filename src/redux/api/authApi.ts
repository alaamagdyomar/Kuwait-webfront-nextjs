import { apiSlice } from "./index";
import { Auth, User } from "@/types/queries";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<
      Auth,
      {
        phone: string;
        phone_country_code: string;
        password: string;
        session_id?: string;
        device_token?: string;
      }
    >({
      query: (body) => ({
        url: `login`,
        body: { ...body, platform: "web", device_token: "1234" },
        method: "post",
        validateStatus: (response, result) => result.status == "200" && result.success,
      }),
    }),
    register: builder.query<
      Auth,
      {
        phone: string;
        phone_country_code: string;
        password: string;
        password_confirmation: string;
        device_token: string;
        session_id?: string;
        email?: string;
      }
    >({
      query: (body) => ({
        url: `web-register`,
        body,
        method: "post",
        validateStatus: (response, result) => {
          return result.status === "200";
        },
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: `logout`,
        method: "post",
        validateStatus: (response, result) => result.status == "200" && result.success,
      }),
    }),
    verify: builder.query<
      Auth,
      {
        phone: string;
        phone_country_code: string;
        code: string;
        type: "register" | "reset";
      }
    >({
      query: (body) => ({
        url: `web-verify`,
        body,
        method: "post",
        validateStatus: (response, result) => result.status === "200",
      }),
    }),

    resendOtp: builder.query<
      Auth,
      {
        phone: string;
        phone_country_code: string;
        type: "register" | "reset";
      }
    >({
      query: (body) => ({
        url: `resend-otp`,
        body,
        method: "post",
        validateStatus: (response, result) => result.status == 200,
      }),
    }),
    getAuthenticatedUser: builder.query<User, { id: number }>({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: "get",
        validateStatus: (response, result) => {
          return response.status == 200;
        },
      }),
    }),

    resetPassword: builder.query<
      any,
      { phone: string; phone_country_code: string }
    >({
      query: (body) => ({
        url: `reset-password`,
        body,
        method: "post",
        validateStatus: (response, result) =>
          result.status == 200 && result.success,
      }),
    }),

    forgotPassword: builder.query<
      User,
      {
        phone: string;
        phone_country_code: string;
        new_password: string;
        new_password_confirmation: string;
      }
    >({
      query: (body) => ({
        url: `new-password`,
        body,
        method: "post",
        validateStatus: (response, result) =>
          result.status == 200 && result.success,
      }),
    }),
    changePassword: builder.mutation<
      User,
      {
        params: { password: string; password_confirmation: string };
      }
    >({
      query: ({ params }) => ({
        url: `change/password`,
        params: { ...params },
        method: "post",
        validateStatus: (response, result) => response.status == 200,
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useLazyRegisterQuery,
  useLazyLogoutQuery,
  useLazyVerifyQuery,
  useLazyForgotPasswordQuery,
  useGetAuthenticatedUserQuery,
  useChangePasswordMutation,
  useLazyResendOtpQuery,
  useLazyResetPasswordQuery,
} = authApi;
