"use client";

import { QueryClient } from "@tanstack/query-core";
import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
