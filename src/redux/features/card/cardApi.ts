import { baseApi } from "@/api/baseApi";
import { TCard } from "../cardOverview";
import { TResponse } from "../types";
import {
  TCardMetricsParams,
  TCardMetricsResponse,
  TCreateCardPayload,
  TEditCardPayload,
} from ".";

const cardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<TResponse<TCard[]>, void>({
      query: () => `/card`,
      providesTags: ["Card", "Transaction"],
    }),
    getCardById: build.query<TResponse<TCard>, string>({
      query: (id) => `/card/${id}`,
    }),

    createCard: build.mutation<TResponse<TCard>, TCreateCardPayload>({
      query: (payload) => ({
        url: "/card",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Card"],
    }),
    editCard: build.mutation<TResponse<TCard>, TEditCardPayload>({
      query: ({ payload, cardId }) => ({
        url: `/card/${cardId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Card"],
    }),
    deleteCard: build.mutation<TResponse<TCard>, string>({
      query: (id) => ({
        url: `/card/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Card"],
    }),
    getCardMetrics: build.query<
      TResponse<TCardMetricsResponse>,
      TCardMetricsParams
    >({
      query: ({ cardId, year, monthIndex, timezone }) => ({
        url: `/card/${cardId}/metrics`,
        params: { year, monthIndex, timezone },
      }),
      providesTags: ["Card", "Transaction"],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardMetricsQuery,
  useEditCardMutation,
  useGetCardByIdQuery,
} = cardApi;
