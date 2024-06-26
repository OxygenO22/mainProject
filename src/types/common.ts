export type TaskStateType = {
    [todoListId: string] : TaskType[]
}

export type TaskType = {  
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all'|'active'|'completed'

export type PageTitleType = {
    pageTitle: string
}