import {
    fetchNewsPending,
    fetchNewsSuccess,
    fetchNewsError,
  } from "./actions";

  const endPoint: string = "https://cn-node.herokuapp.com";
  // const endPoint: string = "http://localhost:2000";
  
  export function fetchNews(searchInput?: string, page?: string) {
    return (dispatch: any) => {
      dispatch(fetchNewsPending());
      fetch(`${endPoint}/news?q=${searchInput}&page=${page}`)
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