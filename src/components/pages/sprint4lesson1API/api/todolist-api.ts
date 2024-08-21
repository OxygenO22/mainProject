import axios, { AxiosInstance } from "axios";

  const instance: AxiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
      "API-KEY": "c658e6f4-b2ed-4db1-aa3f-e647bb94e78c",
    },
  })

  export const todolistApi = {
    getTodoLists() {
        return instance.get<TodolistTypeAPI[]>(`/todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<ResponseTypeAPI<{item: TodolistTypeAPI}>>(`/todo-lists`, {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseTypeAPI>(`/todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string) {
        return instance.put<ResponseTypeAPI>(`/todo-lists/${todoId}`, {title})
    },
};

export type TodolistTypeAPI = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseTypeAPI<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[],
    resultCode: number,
}

/* type CreateTodolistType = {
    data: {item: TodolistType}
    fieldsErrors: string[]
    messages: string[],
    resultCode: number,
}

type DeleteAndUpdateTodolistType = {
    data: {},
    fieldsErrors: string[]
    messages: string[],
    resultCode: number
} */