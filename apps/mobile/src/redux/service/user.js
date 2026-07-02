import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, LOGIN_API, UserDetails, USERS_API } from "../../constants/apiUrl";
import { SetHeader } from "./HeaderSet";

const UsersApi = createApi({
    reducerPath: "loginUser",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: async (headers) => {
            await SetHeader(headers)
            return headers
        }
    }),
    tagTypes: ["Users", "UsersDetails", "get_Change_Settings", "Login", "/getUserBasicDetails", "UsersDes", "UsersRole", "createRoleOnPage", "UpdateRoleonPage", "UsersCreate", "ImageUpload", "getUserImage", "token_fcm_hod", "get_refresh_token", "token_fcm", "Otp", "/change_password", "get_Hod_Details", "LoginLogs"],
    endpoints: (builder) => ({


        loginUser: builder.mutation({
            query: (payload) => ({
                url: LOGIN_API,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["Login"],
        }),
        getUsers: builder.query({
            query: () => {

                return {
                    url: USERS_API,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["Users"],

        }),

            getUserDet: builder.query({
                query: () => {

                    return {
                        url: `${USERS_API}/getUserDet`,
                        method: "GET",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },

                    };
                },
                providesTags: ["Users"],
            }),

                getDesignation: builder.query({
                    query: () => {

                        return {
                            url: `${USERS_API}/getDesignation`,
                            method: "GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },

                        };
                    },
                    providesTags: ["UsersDes"],
                }),
                getRolesOnPage: builder.query({
                    query: (params) => {

                        return {
                            url: `${USERS_API}/getRolesOnPage`,
                            method: "GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                            params,
                        };
                    },
                    providesTags: ["UsersRole"],
                }), getUserRolesOnPage: builder.query({
                    query: (params) => {

                        return {
                            url: `${USERS_API}/getUserRolesOnPage`,
                            method: "GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                            params,
                        };
                    },
                    providesTags: ["UsersRole"],
                }), getCreatedRolesOnPage: builder.query({
                    query: (params) => {

                        return {
                            url: `${USERS_API}/getCreatedRolesOnPage`,
                            method: "GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                            params,
                        };
                    },
                    providesTags: ["UsersRole"],
                }),
                createRoleOnPage: builder.mutation({
                    query: (payload) => ({
                        url: USERS_API + "/createRoleOnPage",
                        method: "POST",
                        body: payload,
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }),
                    invalidatesTags: ["createRoleOnPage"],
                }),
                UpdateRoleOnPage:
                    builder.mutation({
                        query: (payload) => ({
                            url: USERS_API + "/UpdateRoleOnPage",
                            method: "POST",
                            body: payload,
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                        }),
                        invalidatesTags: ["UpdateRoleonPage"],
                    }),

                createUser: builder.mutation({
                    query: (payload) => ({
                        url: USERS_API,
                        method: "POST",
                        body: payload,
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }),
                    invalidatesTags: ["UsersCreate", "UsersDetails"],
                }),


                getCompanycode: builder.query({
                    query: (params) => {

                        return {
                            url: `${USERS_API}/getCompanyCode`,
                            method: "GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                            params,
                        };
                    },
                    providesTags: ["UsersRole"],
                }),
                getEmployeeids: builder.query({
                    query: (params) => {
                        return {
                            url: `${USERS_API}/getEmployeeIds`,
                            method: "GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                            params,
                        };
                    },
                    providesTags: ["UsersRole"],
                }),
                get_Change_Settings: builder.query({
                    query: ({ params }) => {
                        return {
                            url: `${USERS_API}/get_Change_Settings`,
                            method: "GET",
                            params
                        };
                    },
                    providesTags: ["get_Change_Settings"],
                }),
            }),
        });

        export const {
            useLoginUserMutation,
            useGetUsersQuery,
            useCreateUserMutation,
            useGetUserDetQuery,
            useGetDesignationQuery,
            useGetRolesOnPageQuery,
            useCreateRoleOnPageMutation,
            useUpdateRoleOnPageMutation,
            useGetCompanycodeQuery,
            useGetEmployeeidsQuery,
            useGetUserRolesOnPageQuery,
            useGetCreatedRolesOnPageQuery,
            useGet_Change_SettingsQuery,
        } = UsersApi;

        export default UsersApi;
