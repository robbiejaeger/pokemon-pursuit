export type Pokemon = {
  id: number;
  name: string;
  classfication: string;
};

export type AppState = "UNREQUESTED" | "EMPTY_RESULTS" | "LOADING" | "ERROR" | "FETCHED_RESULTS";

export type RequestInfo = {
  retries: number;
  allResults: Pokemon[];
  error: string;
};