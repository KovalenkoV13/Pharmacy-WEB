/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Cart {
  /** Id */
  id: number;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /** Cost */
  cost: number;
  /**
   * Img
   * @minLength 1
   */
  img: string;
  /**
   * User profile userprofile
   * @minLength 1
   */
  user_profile_userprofile: string;
}

export interface Category {
  /** Id cat */
  id_cat: number;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Prim
   * @minLength 1
   */
  prim: string;
}

export interface Good {
  /**
   * Name
   * @minLength 1
   * @maxLength 500
   */
  name: string;
  /**
   * Brand
   * @minLength 1
   * @maxLength 1000
   */
  brand: string;
  /** Cost */
  cost: number;
  /**
   * Img
   * @minLength 1
   * @maxLength 100
   */
  img: string;
}

export interface OrderGood {
  /** Id */
  id: number;
  /** Id order */
  id_order: number;
  /**
   * Namegood
   * @minLength 1
   */
  namegood: string;
}

export interface Orders {
  /** Id */
  id: number;
  /** Sum */
  sum: number;
  /**
   * Adress
   * @minLength 1
   */
  adress: string;
  /**
   * Users
   * @minLength 1
   */
  users: string;
  /**
   * Time create
   * @format date
   */
  time_create: string;
  /**
   * Time update
   * @format date
   */
  time_update: string;
  goods: (string | null)[];
  /**
   * Status
   * @minLength 1
   */
  status: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://127.0.0.1:8000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Pharmacy API
 * @version v1
 * @baseUrl http://127.0.0.1:8000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  accounts = {
    /**
     * No description
     *
     * @tags accounts
     * @name AccountsAuthenticatedList
     * @request GET:/accounts/authenticated
     * @secure
     */
    accountsAuthenticatedList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/accounts/authenticated`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsCsrfCookieList
     * @request GET:/accounts/csrf_cookie
     * @secure
     */
    accountsCsrfCookieList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/accounts/csrf_cookie`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsDeleteDelete
     * @request DELETE:/accounts/delete
     * @secure
     */
    accountsDeleteDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/accounts/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsGetUsersList
     * @request GET:/accounts/get_users
     * @secure
     */
    accountsGetUsersList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/accounts/get_users`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsLoginCreate
     * @request POST:/accounts/login
     * @secure
     */
    accountsLoginCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/accounts/login`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsLogoutCreate
     * @request POST:/accounts/logout
     * @secure
     */
    accountsLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/accounts/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsRegisterCreate
     * @request POST:/accounts/register
     * @secure
     */
    accountsRegisterCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/accounts/register`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags api
     * @name ApiCartList
     * @request GET:/api/cart/
     * @secure
     */
    apiCartList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Cart[];
        },
        any
      >({
        path: `/api/cart/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCartCreate
     * @request POST:/api/cart/
     * @secure
     */
    apiCartCreate: (data: Cart, params: RequestParams = {}) =>
      this.request<Cart, any>({
        path: `/api/cart/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCartUpdate
     * @request PUT:/api/cart/
     * @secure
     */
    apiCartUpdate: (data: Cart, params: RequestParams = {}) =>
      this.request<Cart, any>({
        path: `/api/cart/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCartDelete
     * @request DELETE:/api/cart/
     * @secure
     */
    apiCartDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/cart/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCartRead
     * @request GET:/api/cart/{id}/
     * @secure
     */
    apiCartRead: (
      id: number,
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Cart[];
        },
        any
      >({
        path: `/api/cart/${id}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCartCreate2
     * @request POST:/api/cart/{id}/
     * @originalName apiCartCreate
     * @duplicate
     * @secure
     */
    apiCartCreate2: (id: number, data: Cart, params: RequestParams = {}) =>
      this.request<Cart, any>({
        path: `/api/cart/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCartUpdate2
     * @request PUT:/api/cart/{id}/
     * @originalName apiCartUpdate
     * @duplicate
     * @secure
     */
    apiCartUpdate2: (id: number, data: Cart, params: RequestParams = {}) =>
      this.request<Cart, any>({
        path: `/api/cart/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCartDelete2
     * @request DELETE:/api/cart/{id}/
     * @originalName apiCartDelete
     * @duplicate
     * @secure
     */
    apiCartDelete2: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/cart/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Возвращает категории
     *
     * @tags api
     * @name ApiCategoryList
     * @summary Список категорий
     * @request GET:/api/category/
     * @secure
     */
    apiCategoryList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Category[];
        },
        any
      >({
        path: `/api/category/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCategoryCreate
     * @request POST:/api/category/
     * @secure
     */
    apiCategoryCreate: (data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/api/category/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCategoryUpdate
     * @request PUT:/api/category/
     * @secure
     */
    apiCategoryUpdate: (data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/api/category/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCategoryDelete
     * @request DELETE:/api/category/
     * @secure
     */
    apiCategoryDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/category/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiGoodList
     * @request GET:/api/good/
     * @secure
     */
    apiGoodList: (
      query?: {
        name?: string;
        min_price?: number;
        max_price?: number;
        /** A search term. */
        search?: string;
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Good[];
        },
        any
      >({
        path: `/api/good/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiGoodCreate
     * @request POST:/api/good/
     * @secure
     */
    apiGoodCreate: (data: Good, params: RequestParams = {}) =>
      this.request<Good, any>({
        path: `/api/good/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiGoodUpdate
     * @request PUT:/api/good/
     * @secure
     */
    apiGoodUpdate: (name ,data: Good, params: RequestParams = {}) =>
      this.request<Good, any>({
        path: `/api/good/${name}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiGoodDelete
     * @request DELETE:/api/good/
     * @secure
     */
    apiGoodDelete: (name, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/good/${name}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOgList
     * @request GET:/api/og/
     * @secure
     */
    apiOgList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: OrderGood[];
        },
        any
      >({
        path: `/api/og/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOgCreate
     * @request POST:/api/og/
     * @secure
     */
    apiOgCreate: (data: OrderGood, params: RequestParams = {}) =>
      this.request<OrderGood, any>({
        path: `/api/og/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOgUpdate
     * @request PUT:/api/og/
     * @secure
     */
    apiOgUpdate: (data: OrderGood, params: RequestParams = {}) =>
      this.request<OrderGood, any>({
        path: `/api/og/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOgDelete
     * @request DELETE:/api/og/
     * @secure
     */
    apiOgDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/og/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOrdersList
     * @request GET:/api/orders/
     * @secure
     */
    apiOrdersList: (
      query?: {
        /** A page number within the paginated result set. */
        time_update_after?: string;
        time_update_before?: string;
        status?: string;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Orders[];
        },
        any
      >({
        path: `/api/orders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOrdersCreate
     * @request POST:/api/orders/
     * @secure
     */
    apiOrdersCreate: (data: Orders, params: RequestParams = {}) =>
      this.request<Orders, any>({
        path: `/api/orders/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOrdersUpdate
     * @request PUT:/api/orders/
     * @secure
     */
    apiOrdersUpdate: (id, data: Orders, params: RequestParams = {}) =>
      this.request<Orders, any>({
        path: `/api/orders/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOrdersDelete
     * @request DELETE:/api/orders/
     * @secure
     */
    apiOrdersDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/orders/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOrdersRead
     * @request GET:/api/orders/{id}/
     * @secure
     */
    apiOrdersRead: (
      id: number,
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Orders[];
        },
        any
      >({
        path: `/api/orders/${id}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOrdersCreate2
     * @request POST:/api/orders/{id}/
     * @originalName apiOrdersCreate
     * @duplicate
     * @secure
     */
    apiOrdersCreate2: (id: number, data: Orders, params: RequestParams = {}) =>
      this.request<Orders, any>({
        path: `/api/orders/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOrdersUpdate2
     * @request PUT:/api/orders/{id}/
     * @originalName apiOrdersUpdate
     * @duplicate
     * @secure
     */
    apiOrdersUpdate2: (id: number, data: Orders, params: RequestParams = {}) =>
      this.request<Orders, any>({
        path: `/api/orders/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiOrdersDelete2
     * @request DELETE:/api/orders/{id}/
     * @originalName apiOrdersDelete
     * @duplicate
     * @secure
     */
    apiOrdersDelete2: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/orders/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags profile
     * @name ProfileUpdateUserUpdate
     * @request PUT:/profile/update_user
     * @secure
     */
    profileUpdateUserUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/profile/update_user`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags profile
     * @name ProfileUserList
     * @request GET:/profile/user
     * @secure
     */
    profileUserList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/profile/user`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
