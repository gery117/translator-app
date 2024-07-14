// import { createApi } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const options = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
    headers: {
        'x-rapidapi-key': 'e8124269abmshcb92d2fa75b6976p1caf58jsn2f880e7585f0',
        'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    data: {
        from: 'auto',
        to: 'en',
        text: 'Xin chào cảm ơn bạn đã sử dụng dịch vụ của chúng tôi'
    }
};

export const textApi = createApi({
    reducerPath: 'textApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://google-translate113.p.rapidapi.com/api/v1/translator/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'KEY');
            headers.set('x-rapidapi-host', 'google-translate113.p.rapidapi.com')
        }
    }),
    endpoints: (builder) =>({
        getTranslation: builder.query({
            query: (params) => 'test'
        })
    })
})