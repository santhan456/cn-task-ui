  
import { State } from "./reducer";

export function getNewsList(state: State): any[] {
  const { articles } = state;
  return articles;
}

export function getNewsLoadingState(state: State): boolean {
  return state.isLoading;
}

export function getPageNumber(state: State): string | undefined{
  return state.page;
}