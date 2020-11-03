import {
    fetchNewsPending,
    fetchNewsSuccess,
    fetchNewsError,
  } from "./actions";
  
  export function fetchNews(page?: string) {
    return (dispatch: any) => {
      dispatch(fetchNewsPending());
      fetch(`http://localhost:2000/news?q=politics&page=${page}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw res.error;
          }
          dispatch(fetchNewsSuccess(res));
          return res;
        })
        .catch((error) => {
          dispatch(fetchNewsError(error));
        });
    };
  }