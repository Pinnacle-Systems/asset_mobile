import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, COMMON_MAST } from "../../constants/apiUrl";
import { SetHeader } from "./HeaderSet";


const commonMast = createApi({
    reducerPath: 'commonMast',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: async (headers) => {
            await SetHeader(headers)
            return headers
        }
    }),
    tagTypes: ['commonMast', 'get_chat', 'barcode'],
    endpoints: (builder) => ({
        getFinYear: builder.query({
            query: () => {
                return {
                    url: COMMON_MAST,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['commonMast'],
        }),
        getBuyerName: builder.query({
            query: () => {
                return {
                    url: `${COMMON_MAST}/getBuyer`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['commonMast'],
        }),
        getMonth: builder.query({
            query: ({ params }) => {
                return {
                    url: `${COMMON_MAST}/getMonth`,
                    method: 'GET',
                    params,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['commonMast'],
        }),
        getchat: builder.query({
            query: (params) => {
                return {
                    url: `${COMMON_MAST}/get_chat`,
                    method: 'GET',
                    params,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['get_chat'],
        }),
        getCompCodeData: builder.query({
            query: ({ params }) => {
                return {
                    url: `${COMMON_MAST}/getCompCodeData`,
                    method: 'GET',
                    params,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['commonMast'],
        }),
        getBarcodeData: builder.query({
            query: (params) => {
                return {
                    url: `${COMMON_MAST}/getBarcodeDetails`,
                    method: 'GET',
                    params,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }
            },
            providesTags: ['barcode'],
        }),
        getAuditAssestDetails: builder.query({
            query: (params) => {
                return {
                    url: `${COMMON_MAST}/getAuditAssestDetails`,
                    method: 'GET',
                    params,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }
            },
            providesTags: ['barcode'],
        }),
        getAuditVarianceReport: builder.query({
            query: (params) => {
                return {
                    url: `${COMMON_MAST}/getAuditVarianceReport`,
                    method: 'GET',
                    params,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }
            },
            providesTags: ['barcode'],
        }),
        delete_Common: builder.mutation({
            query: (payload) => ({
                url: `${COMMON_MAST}/delete`,
                method: "POST",
                body: payload,
                params: payload?.params,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },

            }),
            invalidatesTags: ["common_delete"],
        }),

        Addchat: builder.mutation({
            query: (payload) => ({
                url: `${COMMON_MAST}/chat`,
                method: "POST",
                body: payload,
                params: payload?.params,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },

            }),
            invalidatesTags: ["get_chat"],
        })

        ,
        update_Common: builder.mutation({
            query: (payload) => ({
                url: `${COMMON_MAST}/update`,
                method: "POST",
                body: payload,
                params: payload?.params,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },

            }),
            invalidatesTags: ["update_delete"],
        }),
        SaveBarcodeDetails: builder.mutation({
            query: (payload) => ({
                url: `${COMMON_MAST}/SaveBarcodeDetails`,
                method: "POST",
                body: payload,
                params: payload?.params,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },

            }),
            invalidatesTags: ["barcode"],
        }),
         getRoomMaster: builder.query({
            query: ({ floorId, divisionId }) => {
                return {
                    url: `${COMMON_MAST}/master/rooms`,
                    method: 'GET',
                    params: { floorId, divisionId },
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['commonMast'],
        }),
        getFloorMaster: builder.query({
            query: ({ buildingId, divisionId }) => {
                return {
                    url: `${COMMON_MAST}/master/floors`,
                    method: 'GET',
                    params: { buildingId, divisionId },
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['commonMast'],
        }),
        getBuildingMaster: builder.query({
            query: (divisionId) => {
                return {
                    url: `${COMMON_MAST}/master/buildings`,
                    method: 'GET',
                    params: { divisionId },
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['commonMast'],
        }),
        getDivisionMaster: builder.query({
            query: () => {
                return {
                    url: `${COMMON_MAST}/master/divisions`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['commonMast'],
        }),
        // ──────────────────────────────────────────────────────
    }),
})

export const {
    useGetFinYearQuery,
    useGetBuyerNameQuery,
    useGetMonthQuery,
    useGetCompCodeDataQuery,
    useUpdate_CommonMutation,
    useDelete_CommonMutation,
    useGetchatQuery,
    useAddchatMutation,
    useLazyGetBarcodeDataQuery,
    useSaveBarcodeDetailsMutation,
    useGetAuditAssestDetailsQuery,
    useGetAuditVarianceReportQuery,
    useGetRoomMasterQuery,
    useGetFloorMasterQuery,
    useGetBuildingMasterQuery,
    useGetDivisionMasterQuery,

} = commonMast;

export default commonMast;