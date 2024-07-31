import { TodoListType } from "../../../reducerTests/ReducerTestsToDo";
import { AppRootStateType } from "../store";

export const todolistsSelector = (state: AppRootStateType): TodoListType[] => state.todolists