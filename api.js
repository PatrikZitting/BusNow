import { DIGITRANSIT_API_KEY } from '@env';

async function fetchGraphQLData(query, variables = {}) {
  const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'digitransit-subscription-key': DIGITRANSIT_API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function fetchStopIdByNameOrNumber(nameOrNumber) {
    const query = `
      {
        stops(name: "${nameOrNumber}") {
          gtfsId
          name
          code
          lat
          lon
        }
      }
    `;
  
    const data = await fetchGraphQLData(query);
    return data.data.stops; // Array of stops
  }
  

export default fetchGraphQLData;