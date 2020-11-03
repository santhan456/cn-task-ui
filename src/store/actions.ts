export const FETCH_NEWS_PENDING = "FETCH_NEWS_PENDING";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_ERROR = "FETCH_NEWS_ERROR";

export function fetchNewsPending() {
  return {
    type: FETCH_NEWS_PENDING,
  };
}

export function fetchNewsSuccess(data: any) {
  return {
    type: FETCH_NEWS_SUCCESS,
    data
  }
}

export function fetchNewsError(error: Error) {
  return {
    type: FETCH_NEWS_ERROR,
    error: error,
  };
}