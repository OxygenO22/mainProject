import {FilterValuesType, TodolistType} from '../TodoAPI';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsType} from './todolists-reducer';
import { TaskStateType } from '../../../../types/common';
import { Dispatch } from 'redux';
import {  tasksApi } from '../api/tasks-api';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType = RemoveTaskActionType | AddTaskActionType
 | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType | SetTodoListsType | ReturnType<typeof setTasksAC>;


const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            /* const stateCopy = {...state};

            let tasks = stateCopy[action.todolistId];
            // найдём нужную таску:
            let task = tasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy; */
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            /* const stateCopy = {...state};

            let tasks = stateCopy[action.todolistId];
            // найдём нужную таску:
            let task = tasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
            }
            return stateCopy; */
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};

            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        case 'SET_TODOLISTS': {
            return action.todos.reduce((acc, tl) => {
                acc[tl.id] = [];
                return acc;
            }, state )
        }
        case 'SET-TASKS': {
            return {...state, [action.todoId]: action.tasks}
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', todolistId, taskId } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string,
                                   title: string,
                                   todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}



// Action Creator Для запроса на бек
const setTasksAC = (todoId: string, tasks: any) => ({type: 'SET-TASKS', tasks, todoId} as const)

// Thunk Creator - можно передавать пропсы
export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todoId)
        .then((res) => dispatch(setTasksAC(todoId, res.data.items)))
}

/*export const createTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    tasksApi.createTasks(todoId, title)
        .then((res) => dispatch(setTasksAC(todoId, res.data.items)))
}

 export const deleteTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todoId)
        .then((res) => dispatch(setTasksAC(todoId, res.data.items)))
}

export const updateTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todoId)
        .then((res) => dispatch(setTasksAC(todoId, res.data.items)))
} */


