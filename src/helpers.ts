import { RequestInfo } from './types';

function formatSearchURL(query: string, nextPageToken: string | null): string {
  if (nextPageToken) {
    return `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}?page=${nextPageToken}`;
  }
  return `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}`;
}

export async function getPokemonResultFromAPI(
  query: string, 
  nextPageToken: string | null, 
  requestInfo: RequestInfo
): Promise<RequestInfo> {
  const URL = formatSearchURL(query, nextPageToken);
  
  try {
    const response = await fetch(URL);
    if (response.ok) {
      var results = await response.json();
      requestInfo.allResults.push(...results.pokemon);
      requestInfo.retries = 0;
    } else {
      // Retry under chaos mode and flakiness
      if (requestInfo.retries > 5) {
        throw new Error("We tried to get results, but something went wrong. Try again later.");
      }
      requestInfo.retries++;
      return getPokemonResultFromAPI(query, nextPageToken, requestInfo);
    }

    const newNextPage = results.nextPage;
    if (newNextPage) {
      return getPokemonResultFromAPI(query, newNextPage, requestInfo);
    } else {
      return requestInfo;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      requestInfo.error = err.message;
      console.error(err.message);
    } else {
      console.error(err);
    }
    return requestInfo;
  }
}