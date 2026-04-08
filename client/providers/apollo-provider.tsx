"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { useMemo } from "react";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
        : "https://job-board-t9m8.onrender.com/graphql",
    }),
    cache: new InMemoryCache(),
  }), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
