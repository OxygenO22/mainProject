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
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists`, {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoId}`, {title})
    },
};

type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<T = {}> = {
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