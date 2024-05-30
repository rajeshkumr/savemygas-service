import { GraphQLResolveInfo } from 'graphql';

export interface ResolverContext {
  // Define any properties you have in your context here
}

export interface QueryArgs {
  query: string;
}

export interface ResolverFunction {
  (
    obj: any,
    args: QueryArgs,
    context: ResolverContext,
    info: GraphQLResolveInfo
  ): any;
}