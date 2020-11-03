import {
    FETCH_NEWS_PENDING,
    FETCH_NEWS_SUCCESS,
  } from "./actions";
  
  export interface State {
    articles: any[];
    isLoading: boolean;
    page?: string;
    totalResults?: number
  }
  
  const defaultState: State = {
    articles: [],
    isLoading: false,
    page: "1",
  };
  
  export const reducer = function (state: State = defaultState, action: any) {
    switch (action.type) {
      case FETCH_NEWS_PENDING:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_NEWS_SUCCESS:{
        const {articles, totalResults} = action.data;
        return {
            ...state,
            articles,
            totalResults,
            isLoading: false,
        };
      }
      default:
        return state;
    }
  };