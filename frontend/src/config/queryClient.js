const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 min
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});
