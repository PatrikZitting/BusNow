import { DIGITRANSIT_API_KEY } from '@env';

// Details for fetching from DigiTransit API
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

// Fetch gtfsId by using name/number of stop from DigiTransit API
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