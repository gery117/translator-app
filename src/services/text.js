// import { createApi } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const textApi = createApi({
    reducerPath: 'textApi',
    endpoints: (builder) =>({
        getTranslation: builder.query({
            query: (params) => 'test'
        })
    })
})