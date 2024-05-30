import axios from "axios";

const baseUrl = 'https://www.gasbuddy.com/graphql';

// Gas Stations Search Endpoint
export async function gas(search: string) {
  try {
    console.log("search", search);
    const headers = {
      'Content-Type': 'application/json'
    };
    const payload = {
      operationName: "LocationBySearchTerm",
      variables: {
        fuel: 1,
        maxAge: 0,
        search: search || "V5E"
      },
      query: `
      query LocationBySearchTerm(
        $brandId: Int
        $cursor: String
        $maxAge: Int
        $search: String
      ) {
        locationBySearchTerm(search: $search) {
          stations(brandId: $brandId, cursor: $cursor, maxAge: $maxAge) {
            count
            cursor {
              next
            }
            results {
              address {
                country
                line1
                line2
                locality
                postalCode
                region
              }
              fuels
              id
              name
              prices {
                cash {
                  nickname
                  postedTime
                  price
                }
                credit {
                  nickname
                  postedTime
                  price
                }
              }
            }
          }
          trends {
            areaName
            country
            today
            todayLow
            trend
          }
        }
      }      
      `
    };
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.locationBySearchTerm;
    // const lowestGasPrice = parseFloat(data.data.locationBySearchTerm.trends[0].today);
    // const averageGasPrice = parseFloat(data.data.locationBySearchTerm.trends[0].todayLow);

    // console.log('Lowest Gas Price:', lowestGasPrice, 'USD');
    // console.log('Average Gas Price:', averageGasPrice, 'USD');

    // Use the values as needed
    // For example, updating the UI or setting sensor values in a smart home application
  } catch (error) {
    console.error('Error fetching gas prices:', error);
  }
}

export async function station(stationId: string) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    const payload = {
      operationName: 'GetStation',
      variables: {
        id: stationId // Replace with the actual station ID
      },
      query: `query GetStation($id: ID!) {
        station(id: $id) {
          fuels
          prices {
            cash {
              postedTime
              price
            }
            credit {
              postedTime
              price
            }
          }
        }
      }`
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    let price = null;
    const cashPrice = data.data.station.prices[0].cash?.price;
    const creditPrice = data.data.station.prices[0].credit?.price;

    if (cashPrice && cashPrice > 0) {
      price = cashPrice;
    }
    if (creditPrice && creditPrice > 0 && (!price || creditPrice < price)) {
      price = creditPrice;
    }

    const gasStationData = {
      fuels: data.data.station.fuels,
      prices: data.data.station.prices,
      price: price
    };

    console.log('Gas Station Data:', gasStationData);
    return gasStationData;

  } catch (error) {
    console.error('Error fetching gas station data:', error);
  }
}