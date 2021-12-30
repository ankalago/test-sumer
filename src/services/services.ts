import { AxiosRequestConfig } from 'axios';
import { apiDelete, apiGet, apiPost, apiPut } from './api';
import { Todo } from '../entities/Todo';

const options: AxiosRequestConfig = {};

export const deleteTodo = async (data: Partial<Todo>) =>
  await apiDelete<AxiosRequestConfig>(`/task/${data._id}`, options);

export const addNewTodo = async (data: Partial<Todo>) =>
  await apiPost<AxiosRequestConfig, Partial<Todo>>(`/task`, data, options);

export const updateTodo = async (data: Partial<Todo>) =>
  await apiPut<AxiosRequestConfig, Partial<Todo>>(`/task/${data._id}`, { completed: data.completed }, options);

export const getTodos = async () =>
  await apiGet<AxiosRequestConfig, Todo>(`/task`, options);
