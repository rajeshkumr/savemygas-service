# Service gives price of gas and its stations bases on location. It is using Elysia with Bun runtime

## Getting Started

### Development

To start the development server run:
```bash
bun run dev
```

### Build

To make the production build:
```bash
bun run build
```

### Test

To make test:
```bash
bun run test
```

### Run

To run the build using production env:
```bash
bun run start
```

Open http://localhost:3000/ with your browser to see the result.

## API usage

# GraphQL Query for Gas Stations

This document provides an overview of the GraphQL query used to retrieve data about gas stations. This query fetches detailed information about gas stations based on a provided search term.

## Query Overview

The query retrieves the following data for gas stations:

- The total count of stations
- Cursor information for pagination
- Available fuel types
- Price information
- Detailed address information

## Query Structure

### Input

The query takes a single input variable:

- `query` (String): The search term used to filter gas stations.

### Output

The output includes detailed information structured as follows:

```graphql
query Query($query: String) {
  gas(query: $query) {
    stations {
      count
      cursor {
        next
      }
      fuels
      price
      prices {
        cash
        credit {
          nickname
          postedTime
          price
        }
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
      }
    }
  }
}

## GraphQL Query for Gas Station Information

```graphql
query Query($query: String) {
  station(query: $query) {
    count
    cursor {
      next
    }
    fuels
    price
    prices {
      credit {
        nickname
        postedTime
        price
      }
      cash
    }
    results {
      prices {
        credit {
          nickname
          postedTime
          price
        }
        cash
      }
      name
      id
      fuels
      address {
        country
        line1
        line2
        locality
        postalCode
        region
      }
    }
  }
}
