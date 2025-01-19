import useSWR from "swr";
import { endpoints } from "./endpoints";
import apiClient from "./apiClient";

type Endpoints = typeof endpoints;

type ServiceKeys = keyof Endpoints;
type ActionKeys<S extends ServiceKeys> = keyof Endpoints[S];

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export const useFetch = <T, S extends ServiceKeys, A extends ActionKeys<S>>(
  service: S,
  action: A,
  params?: Parameters<
    Endpoints[S][A] extends (...args: any) => any ? Endpoints[S][A] : never
  >[0],
) => {
  const endpoint =
    typeof endpoints[service][action] === "function"
      ? (endpoints[service][action] as (...args: any) => string)(params)
      : (endpoints[service][action] as string);

  const { data, error, isLoading, mutate } = useSWR<T>(endpoint, fetcher);

  return { data, error, isLoading, mutate };
};
