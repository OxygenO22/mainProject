import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import { ToDo } from '../../pages/toDo/ToDo'
import { Bank } from '../../pages/bank/Bank'
import { Crosses } from '../../ui/extraLesson/superCrosses/Crosses'
import { MainWithIgor } from '../../pages/withIgor/MainWithIgor'
import { ModalWrapper } from '../../ui/extraLesson/modal/ModalWrapper'
import { NotFound } from '../../pages/notFound/NotFound'
import { S2hw1Microtask } from '../../pages/s2hw1/S2hw1Microtask'
import { S2eLesson1 } from '../../pages/s2eLesson1/S2eLesson1'
import { LocalStorage } from '../../pages/localStorage/LocalStorage'
import { S2eLesson2 } from '../../pages/s2eLesson2/S2eLesson2'
import { S2eLesson3 } from '../../pages/s2eLesson3/S2eLesson3'
import { MaterialUI } from '../../pages/materialUI/MaterialUI'
import { ReducerTestsToDo } from '../../pages/reducerTests/ReducerTestsToDo'
import { ReduxTKMain } from '../../pages/reduxTK/ReduxTKMain'
import Sp3L2Todo from '../../pages/sprint3lesson2/Sp3L2Todo'
import { ReduxMain } from '../../pages/sprint3lesson2/ReduxMain'
import { ReduxMainLesson3 } from '../../pages/sprint3lesson2 - Copy/ReduxMainLesson3'
import { Sp3Le4MainStoryBook } from '../../pages/sprint3Extralesson4/Sp3Le4MainStoryBook'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ToDo />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/crosses" element={<Crosses />} />
          <Route path="/modal" element={<ModalWrapper />} />
          <Route path="/atm" element={<MainWithIgor />} />
          <Route path="/s2hw1" element={<S2hw1Microtask />} />
          <Route path="/s2eLesson1" element={<S2eLesson1 />} />
          <Route path="/s2eLesson2" element={<S2eLesson2 />} />
          <Route path="/s2eLesson3" element={<S2eLesson3 />} />
          <Route path="/LSCounter" element={<LocalStorage />} />
          <Route path="/MaterialUI" element={<MaterialUI />} />
          <Route path="/ReducerTests" element={<ReducerTestsToDo />} />
          <Route path="/ReduxTK" element={<ReduxTKMain />} />
          <Route path="/Sp3L2Todo" element={<ReduxMain />} />
          <Route path="/Sp3L3Todo" element={<ReduxMainLesson3 />} />
          <Route path="/Sp3Le4StoryBook" element={<Sp3Le4MainStoryBook />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
