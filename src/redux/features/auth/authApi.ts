import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TSigninPayload, TSignupPayload, TUser } from "./types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TResponse<TUser>, TSigninPayload>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation<TResponse<TUser>, TSignupPayload>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
