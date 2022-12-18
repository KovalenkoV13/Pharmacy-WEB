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
  /** Id cat id */
  id_cat_id: number;
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
  public baseUrl: string = "http://127.0.0.1:8000/api";
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
 * @baseUrl http://127.0.0.1:8000/api
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  category = {
    /**
     * @description Возвращает категории
     *
     * @tags category
     * @name CategoryList
     * @summary Список категорий
     * @request GET:/category/
     * @secure
     */
    categoryList: (
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
        path: `/category/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags category
     * @name CategoryCreate
     * @request POST:/category/
     * @secure
     */
    categoryCreate: (data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/category/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags category
     * @name CategoryUpdate
     * @request PUT:/category/
     * @secure
     */
    categoryUpdate: (data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/category/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags category
     * @name CategoryDelete
     * @request DELETE:/category/
     * @secure
     */
    categoryDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/category/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  good = {
    /**
     * No description
     *
     * @tags good
     * @name GoodList
     * @request GET:/good/
     * @secure
     */
    goodList: (
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
        path: `/good/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags good
     * @name GoodCreate
     * @request POST:/good/
     * @secure
     */
    goodCreate: (data: Good, params: RequestParams = {}) =>
      this.request<Good, any>({
        path: `/good/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags good
     * @name GoodUpdate
     * @request PUT:/good/
     * @secure
     */
    goodUpdate: (data: Good, params: RequestParams = {}) =>
      this.request<Good, any>({
        path: `/good/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags good
     * @name GoodDelete
     * @request DELETE:/good/
     * @secure
     */
    goodDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/good/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  og = {
    /**
     * No description
     *
     * @tags og
     * @name OgList
     * @request GET:/og/
     * @secure
     */
    ogList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/og/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags og
     * @name OgCreate
     * @request POST:/og/
     * @secure
     */
    ogCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/og/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags og
     * @name OgUpdate
     * @request PUT:/og/
     * @secure
     */
    ogUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/og/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags og
     * @name OgDelete
     * @request DELETE:/og/
     * @secure
     */
    ogDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/og/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  orders = {
    /**
     * @description Возвращает список всех заказов
     *
     * @tags orders
     * @name OrdersList
     * @summary Список всех заказов
     * @request GET:/orders/
     * @secure
     */
    ordersList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orders/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersCreate
     * @request POST:/orders/
     * @secure
     */
    ordersCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersUpdate
     * @request PUT:/orders/
     * @secure
     */
    ordersUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersDelete
     * @request DELETE:/orders/
     * @secure
     */
    ordersDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/users/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersCreate
     * @request POST:/users/
     * @secure
     */
    usersCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/
     * @secure
     */
    usersUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersDelete
     * @request DELETE:/users/
     * @secure
     */
    usersDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
