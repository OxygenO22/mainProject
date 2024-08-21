import axios, { AxiosInstance } from "axios";

  const instance: AxiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
      "API-KEY": "c658e6f4-b2ed-4db1-aa3f-e647bb94e78c",
    },
  })

  export const tasksApi = {
    getTasks(todoId: string) {
        return instance.get<TasksTypeAPI>(`/todo-lists/${todoId}/tasks`)
    },
    createTasks(todoId: string, title: string) {
        return instance.post<ResponseTypeAPI<{item: TasksTypeAPI}>>(`/todo-lists/${todoId}/tasks`, {title})
    },
    deleteTasks(todoId: string, taskId: string) {
        return instance.delete<ResponseTypeAPI>(`/todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTasks(todoId: string, taskId: string, title: string) {
        return instance.put<ResponseTypeAPI>(`/todo-lists/${todoId}/tasks/${taskId}`, {title})
    },
};

export type TasksTypeAPI = {
  items: TasksTypeItemsAPI[]
}

type TasksTypeItemsAPI = {
  addedDate: string
  deadline: string
  description: string
  id: string
  order: number
  priority: number
  startDate: string
  status: number
  title: string
  todoListId: string
}

type ResponseTypeAPI<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[],
    resultCode: number,
}