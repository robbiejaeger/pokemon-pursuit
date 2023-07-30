import { AppState } from './types';

type ShowAppStateProps = {
  appState: AppState;
  searchTerm: string;
}

function ShowAppState({ appState, searchTerm }: ShowAppStateProps) {
  switch (appState) {
    case "UNREQUESTED":
      return <p>Type in the input above to find some Pokemon!</p>
    case "EMPTY_RESULTS":
      return <p>{`No results for ${searchTerm}.`}</p>
    case "LOADING":
      return <p>Loading results...</p>
    case "ERROR":
      return <p>Something went wrong. Please try again later.</p>
    case "FETCHED_RESULTS":
      return null;
    default:
      return null
  }
}

export default ShowAppState;