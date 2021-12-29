import { AxiosRequestConfig } from 'axios';
import { apiGet, apiPost, apiPut } from './api';
import { Todo } from '../entities/Todo';

const options: AxiosRequestConfig = {};

export async function updateTodo(data: Partial<Todo>) {
  return await apiPut<AxiosRequestConfig, Partial<Todo>>(`/task/${data._id}`, { completed: data.completed }, options);
}

export const getTodos = async () =>
  await apiGet<AxiosRequestConfig, Todo>(`/task`, options);
