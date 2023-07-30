export type Pokemon = {
  id: number;
  name: string;
  classfication: string;
}

export type AppState = "UNREQUESTED" | "EMPTY_RESULTS" | "LOADING" | "ERROR" | "FETCHED_RESULTS";