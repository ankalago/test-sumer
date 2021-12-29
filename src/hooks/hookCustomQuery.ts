import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';

export const useCustomQuery = <T>(
  queryKey: any[] | string,
  functionExecute?: any,
  options?: UseQueryOptions<any, AxiosError, T, any>
) => useQuery(queryKey, functionExecute, options);

export const useCustomMutation = <T, U>(
  queryKey: any[] | string,
  functionExecute?: any,
  options?: UseMutationOptions<T, AxiosError, U>
) => useMutation<T, AxiosError, U>(queryKey, functionExecute, options);
