import axios from 'axios';

const axiosApiInstance = axios.create();

export default function createApiInstance() {
  axiosApiInstance.interceptors.request.use(
    async (config) => {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNjNzI2Njc5NTdjNjAwMTcyMzIwZjAiLCJpYXQiOjE2NDA3ODg2MDl9.7Ux4sIWIOy3fm4NsXHQVF8t913HqrWlnboWD0qoEMdA`,
      };
      config.baseURL = 'https://api-nodejs-todolist.herokuapp.com';
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}

export async function apiGet<T, U>(url: string, options?: T): Promise<U> {
  const { data } = await axiosApiInstance.get<U>(url, options);
  return data;
}

export async function apiPut<T, U>(url: string, body: U, options?: T) {
  const { data } = await axiosApiInstance.put(url, body, options);
  return data;
}

export async function apiDelete<T>(url: string, options?: T) {
  const { data } = await axiosApiInstance.delete(url, options);
  return data;
}

export async function apiPost<T, U>(url: string, body: U, options?: T) {
  const { data } = await axiosApiInstance.post(url, body, options);
  return data;
}
