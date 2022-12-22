import axios, { AxiosInstance } from "axios";

import { storageAuthTokenGet } from "@storage/storageAuthToken";

import { AppError } from "@utils/AppErrors";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}
 const api = axios.create({
    baseURL: 'http://192.168.1.103:3333'
}) as APIInstanceProps;

api.registerInterceptTokenManager = singOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => response,  async (requestError) => {

    if(requestError.response?.status === 401) {
      if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {

        const oldToken = await storageAuthTokenGet();

        if(!oldToken) {
          singOut();
          return Promise.reject(requestError);
        }

      }

      singOut();

    }

    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    }

    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export { api }