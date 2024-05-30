import { GraphQLResolveInfo } from 'graphql';
import { gas, station } from '../model/gas';
import { ResolverContext, QueryArgs } from '../types/index'

export const gasStationsResolver = {
  Query: {
    gas: (obj: any, args: QueryArgs, context: ResolverContext, info: GraphQLResolveInfo) => {
      return gas(args.query);
    },
    station: (obj: any, args: QueryArgs, context: ResolverContext, info: GraphQLResolveInfo) => {
      return station(args.query);
    },
  }
};
