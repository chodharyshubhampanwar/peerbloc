"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          // queries: {
          //   staleTime: 4 * 1000,
          //   refetchInterval: 4 * 1000,
          // },
        },
      })
  )

  return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>

  )
}

export default ReactQueryProvider;