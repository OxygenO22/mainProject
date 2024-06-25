import React, { useState } from "react";
import { DataFilterTaskType, Todolist } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = { 
  id: string; 
  title: string;
};
type TasksStateType = {
  [key: string]: DataFilterTaskType;
};

/* 1.      Плюсы Реакта: 1. Производительность (без Реакта перерисовывается весь DOM, благодаря сравнению Виртуальных DOMов перерисовывается только необходимая часть DOM). 2. Масштабируемость (компоненты)
2.      Как работает Реакт (рендер-т.е. первый запуск, затем уже ререндеры): запускаем yarn start-> начнет отрисовываться index.html, запускается script-> babel транспилятор превращает JSX в JS->index.tsx->App.tsx (компоненты возвращают JSX)-> создается Virtual DOM (это объект, легковесная версия DOM, у него есть только СВОЙСТВА, но нет методов, и к СВОЙСТВАМ мы доступа не имеем. DOM хранится в браузере, а Virtual DOM в оперативной памяти
компьютера )->на основе Virtual DOM создается DOM, который отрисовывается в браузере. (Когда React создает новый виртуальный дом, он заменяет старый виртуальный дом ссылкой на новый объект в памяти. Garbage collector удаляет старый неактуальный виртуальный дом из-за отсутствия ссылок на него.)

Игорь Юдинцев 20:08
3.      DOM (это объект-в нем есть свойства и методы) HTML-документ в виде древовидной структуры объектов (узлов). Узел- это объект в структуре дерева: элементы HTML (тэги), текст, атрибуты (src, href, class,Id, disabled, style, placeholder, required) и комментарии. 

4.  useState-это функция, предоставляющая возможность добавлять состояние (state) в функциональные компоненты. Работает асинхронно (Она планирует обновление состояния, но не обновляет его непосредственно в момент вызова

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    console.log('Current count:', count);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

). Тип данных, возвращаемый useState, всегда является массивом, где первый элемент содержит текущее значение состояния (может принимать в себя, как примитивы, так и объекты, массивы, функции- это позволяет вычислять начальное состояние с использованием сложной логики или на основе предыдущего состояния), а второй элемент - функцию для его обновления. При обновлении состояния с помощью этой функции React перерисовывает компонент, чтобы отразить новое состояние.

5 Ререндер компоненты происходит: когда изменяется стейт (setState), родитель изменился-это приводит к ререндеру дочерней (от изменений дочерней в родителе ничего не произойдет), и приход новых пропсов, Изменение контекста(Context Provider),  Рендер это сравнение, а затем идет перерисовка.

6 Методы DOM всего 8:
createElement(tagName) - создает новый элемент указанного типа.
getElementById(id) - возвращает элемент с указанным идентификатором.
appendChild(node) - добавляет дочерний узел в конец списка дочерних узлов.
removeChild(node) - удаляет указанный дочерний узел из элемента.


7 
  window - представляет окно браузера и содержит глобальный объект    document.
  document - представляет целый HTML-документ.
  nodeName - имя узла.
  nodeValue - значение узла.
*/

/* https://www.coze.com/store/bot - чат бот */

export const S2eLesson1 = () => {
  // let todolistID1 = v1();
  // let todolistID2 = v1();
  //
  // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
  //     {id: todolistID1, title: 'What to learn', filter: 'all'}, //0
  //      {id: todolistID2, title: 'What to buy', filter: 'all'},  //1
  // ])
  //
  // let [tasks, setTasks] = useState({
  //     [todolistID1]: [
  //         {id: v1(), title: "HTML&CSS", isDone: true},
  //         {id: v1(), title: "JS", isDone: true},
  //         {id: v1(), title: "ReactJS", isDone: false},
  //         {id: v1(), title: "Rest API", isDone: false},
  //         {id: v1(), title: "GraphQL", isDone: false},
  //     ],
  //     [todolistID2]: [
  //         {id: v1(), title: "HTML&CSS2", isDone: true},
  //         {id: v1(), title: "JS2", isDone: true},
  //         {id: v1(), title: "ReactJS2", isDone: false},
  //         {id: v1(), title: "Rest API2", isDone: false},
  //         {id: v1(), title: "GraphQL2", isDone: false},
  //     ]
  // });

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistId1, title: "What to learn" },
    { id: todolistId2, title: "What to buy" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: {
      data: [
        { id: v1(), title: "HTML&CSS1111", isDone: true },
        { id: v1(), title: "JS1111", isDone: true },
      ],
      filter: "all",
    },
    [todolistId2]: {
      data: [
        { id: v1(), title: "HTML&CSS22222", isDone: true },
        { id: v1(), title: "JS2222", isDone: true },
      ],
      filter: "all",
    },
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistId));
    delete tasks[todolistId];
    console.log(tasks);
  };

  function removeTask(todolistId: string, taskId: string) {
    /* setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId),
    }); */
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.filter((el) => el.id !== taskId),
      },
    });
  }

  function addTask(todolistId: string, title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    /* setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] }); */
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
    setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})
  }

  function changeStatus(
    todolistId: string,
    taskId: string,
    newIsDone: boolean
  ) {
    /* setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((el) =>
        el.id === taskId ? { ...el, isDone: newIsDone } : el
      ),
    }); */

    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.map((el) =>
          el.id === taskId ? { ...el, isDone: newIsDone } : el
        ),
      },
    });
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    /* setTodolists(
      todolists.map((el) =>
        el.id === todolistId ? { ...el, filter: value } : el
      )
    ); */
    setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter: value}})
  }

  return (
    <div className="App">
      {todolists.map((el) => {
        let tasksForTodolist = tasks[el.id].data;
        /*if (tasks[el.id].filter === "active") {
          tasksForTodolist = tasks[el.id].data.filter(
            (t) => t.isDone === false
          );
        }
        if (tasks[el.id].filter === "completed") {
          tasksForTodolist = tasks[el.id].data.filter((t) => t.isDone === true);
        } */
        return (
          <Todolist
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tasks[el.id].filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
};
