import {
  type FetchOptions,
  type MappedResponseType,
  ofetch,
  type ResponseType,
} from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const rawApiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

let refreshPromise: Promise<boolean> | null = null;

const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/google",
  "/auth/email-verification",
  "/auth/forgot-password",
  "/auth/reset-password",
];

function isPublicEndpoint(request: string) {
  return PUBLIC_ENDPOINTS.some((endpoint) => request.includes(endpoint));
}

async function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        await rawApiClient("/auth/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        return true;
      } catch {
        return false;
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

function redirectToLogin() {
  if (typeof window !== "undefined") {
    window.location.assign("/login");
  }
}

export async function apiClient<T = any, R extends ResponseType = "json">(
  request: string,
  options: FetchOptions<R> = {},
): Promise<MappedResponseType<R, T>> {
  try {
    return await rawApiClient<T, R>(request, options);
  } catch (error: unknown) {
    const status = (error as { response?: { status?: number } })?.response
      ?.status;

    if (
      status !== 401 ||
      isPublicEndpoint(request) ||
      request.includes("/auth/refresh-token")
    ) {
      throw error;
    }

    const refreshed = await refreshAccessToken();

    if (!refreshed) {
      redirectToLogin();
      throw error;
    }

    try {
      return await rawApiClient<T, R>(request, options);
    } catch (retryError: unknown) {
      const retryStatus = (retryError as { response?: { status?: number } })
        ?.response?.status;

      if (retryStatus === 401) {
        redirectToLogin();
      }

      throw retryError;
    }
  }
}
