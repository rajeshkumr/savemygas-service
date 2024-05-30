const gasSearchTypeDef = `
type LocationBySearchTerm {
    stations: StationData
  }
  
  type StationData {
    count: Int
    cursor: Cursor
    results: [Station]
  }
  
  type Cursor {
    next: String
  }
  
  type Station {
    address: Address
    fuels: [String]
    id: ID
    name: String
    prices: [Price]
  }
  
  type Address {
    country: String
    line1: String
    line2: String
    locality: String
    postalCode: String
    region: String
  }
  
  type Price {
    cash: Float
    credit: Credit
  }
  
  type Credit {
    nickname: String
    postedTime: String
    price: Float
  }
`

const stationSearchTypeDef = `

type StationData {
  fuels: [String]
  prices: [Price]
  price: Float
}

type Price {
  cash: Float
  credit: Credit
}

type Credit {
  postedTime: String
  price: Float
}`

export const gasStationsTypeDef = `
${gasSearchTypeDef}
${stationSearchTypeDef}
  type Query {
    gas(query: String): LocationBySearchTerm
    station(query: String): StationData
    }
`