import { ApolloServer } from "apollo-server-express";

import { createContext, onSubscriptionConnect } from "./context";
import { rootSchema } from "./rootSchema";
import { Environment, ENVIRONMENT } from "~/infra/config";

export const createApolloServer = () =>
  new ApolloServer({
    schema: rootSchema,
    context: createContext,
    subscriptions: {
      // @ts-ignore
      onConnect: onSubscriptionConnect
    },
    plugins: [
      {
        requestDidStart: (requestContext) => {
          console.log(
            `\n\n${requestContext.request.operationName} operation started`
          );
        }
      }
    ],
    debug: ENVIRONMENT === Environment.development,
    tracing: ENVIRONMENT === Environment.development,
    introspection: ENVIRONMENT !== Environment.production,
    playground: {
      settings: {
        "request.credentials": "include"
      }
    },
    engine:
      ENVIRONMENT === Environment.production
        ? {
            reportSchema: true,
            debugPrintReports: true
          }
        : false
  });
