import qs from "qs";
import CryptoJS from "crypto-js";

import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
// import CryptoJS from "crypto-js";
import { Model, TokenType } from "./model";
/* The GHL class is responsible for handling authorization, making API requests, and managing access
tokens and refresh tokens for a specific resource. */
export class GHL {
  public model: Model;

  constructor() {
    this.model = new Model();
  }

  /**
   * The `authorizationHandler` function handles the authorization process by generating an access token
   * and refresh token pair.
   * @param {string} code - The code parameter is a string that represents the authorization code
   * obtained from the authorization server. It is used to exchange for an access token and refresh token
   * pair.
   */
  async authorizationHandler(code: string) {
    if (!code) {
      console.warn(
        "Please provide code when making call to authorization Handler"
      );
    }
    await this.generateAccessTokenRefreshTokenPair(code);
  }

  decryptSSOData(key: string) {
    console.log(key);
    const data = CryptoJS.AES.decrypt(
      key.toString(),
      process.env.GHL_APP_SSO_KEY as string
    ).toString(CryptoJS.enc.Utf8);
    console.log(data);

    return JSON.parse(data);
  }

  // decryptSSOData(key: string) {
  //   console.log(key);
  //   try {
  //     const str = "0d42ec37-9620-4d63-a113-8a3a8f064a04";
  //     const keys =
  //       "U2FsdGVkX19HMLKhYCHi6Dsb6usaomwP7lDUgJtLzMglvFDG3Ieic57nYMxOjNaC7XRBYGVTUiCuJbxVv2U9fV+sBiKBdE2D0230QRCR/UlGB/qb1ocFVTUfpGO95IejiOjJu+bmIUjpw1WI38LtlUtQ+uZBv7mGeVwQFs8EbbmxXPjELA7BT3SDKENMhmGECdmGEW6GDw6FPsw/82zt8w==";
  //     const decryptedData = CryptoJS.AES.decrypt(key, str);
  //     console.log(decryptedData);

  //     const dat = decryptedData.toString(CryptoJS.enc.Utf8);
  //     console.log("asd" + dat);

  //     return JSON.parse(dat);
  //   } catch (error) {
  //     console.error("Error decrypting data:", error);
  //     return null; // or handle the error in an appropriate way
  //   }
  // }

  /**
   * The function creates an instance of Axios with a base URL and interceptors for handling
   * authorization and refreshing access tokens.
   * @param {string} resourceId - The `resourceId` parameter is a string that represents the locationId or companyId you want
   * to make api call for.
   * @returns an instance of the Axios library with some custom request and response interceptors.
   */
  requests(resourceId: string) {
    const baseUrl = process.env.GHL_API_DOMAIN;

    if (!this.model.getAccessToken(resourceId)) {
      throw new Error("Installation not found for the following resource");
    }

    const axiosInstance = axios.create({
      baseURL: baseUrl,
    });

    axiosInstance.interceptors.request.use(
      async (requestConfig: InternalAxiosRequestConfig) => {
        try {
          requestConfig.headers["Authorization"] = `${
            TokenType.Bearer
          } ${this.model.getAccessToken(resourceId)}`;
        } catch (e) {
          console.error(e);
        }
        return requestConfig;
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          return this.refreshAccessToken(resourceId).then(() => {
            originalRequest.headers.Authorization = `Bearer ${this.model.getAccessToken(
              resourceId
            )}`;
            return axios(originalRequest);
          });
        }

        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }

  /**
   * The function checks if an installation exists for a given resource ID i.e locationId or companyId.
   * @param {string} resourceId - The `resourceId` parameter is a string that represents the ID of a
   * resource.
   * @returns a boolean value.
   */
  checkInstallationExists(resourceId: string) {
    return !!this.model.getAccessToken(resourceId);
  }

  /**
   * The function `getLocationTokenFromCompanyToken` retrieves a location token from a company token and
   * saves the installation information.
   * @param {string} companyId - A string representing the ID of the company.
   * @param {string} locationId - The `locationId` parameter is a string that represents the unique
   * identifier of a location within a company.
   */
  async getLocationTokenFromCompanyToken(
    companyId: string,
    locationId: string
  ) {
    const res = await this.requests(companyId).post(
      "/oauth/locationToken",
      {
        companyId,
        locationId,
      },
      {
        headers: {
          Version: "2021-07-28",
        },
      }
    );
    this.model.saveInstallationInfo(res.data);
  }

  private async refreshAccessToken(resourceId: string) {
    try {
      const resp = await axios.post(
        `${process.env.GHL_API_DOMAIN}/oauth/token`,
        qs.stringify({
          client_id: process.env.GHL_APP_CLIENT_ID,
          client_secret: process.env.GHL_APP_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: this.model.getRefreshToken(resourceId),
        }),
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      );
      this.model.setAccessToken(resourceId, resp.data.access_token);
      this.model.setRefreshToken(resourceId, resp.data.refresh_token);
    } catch (error: any) {
      console.error(error?.response?.data);
    }
  }

  private async generateAccessTokenRefreshTokenPair(code: string) {
    try {
      const resp = await axios.post(
        `${process.env.GHL_API_DOMAIN}/oauth/token`,
        qs.stringify({
          client_id: process.env.GHL_APP_CLIENT_ID,
          client_secret: process.env.GHL_APP_CLIENT_SECRET,
          grant_type: "authorization_code",
          code,
        }),
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      );
      const respo = await axios.post(
        `${process.env.VUE_APP_XANO_USER_WEBHOOK}`,
        JSON.stringify({
          access_token: resp.data.access_token,
          refresh_token: resp.data.refresh_token,
          companyId: resp.data.companyId,
          locationId: resp.data.locationId,
        }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "content-type": "application/json",
          },
        }
      );
      console.log(respo);

      this.model.saveInstallationInfo(resp.data);
    } catch (error: any) {
      console.error(error?.response?.data);
    }
  }
}
