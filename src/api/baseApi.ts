"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://budget-buddy-tracker-server.vercel.app/api",
  // baseUrl: "https://development-budget-buddy-track-server.vercel.app/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseapi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["CardOverview", "Card", "Budget", "Transaction"],
});
