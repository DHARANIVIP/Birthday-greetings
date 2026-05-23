import React, { useEffect, useState } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Memories from './pages/Memories'
import Test from './pages/Test'
import OpeningAnimation from './components/OpeningAnimation'
import CountdownPortal from './components/CountdownPortal'

const App = () => {

  const MyRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='love-Letter' element={<LoveLetter />}></Route>
        <Route path='memories' element={<Memories />}></Route>
        <Route path='test' element={<Test />}></Route>
      </Route>
    </Route>
  ))

  const [isLocked, setIsLocked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const startSurpriseFlow = () => {
    setIsLocked(false);
    setLoading(true);
    setTimeout(() => setAnimateOut(true), 8400);
    setTimeout(() => setLoading(false), 9000);
    setTimeout(() => setShowContent(true), 8600);
  };

  return (
    <>
      {
        isLocked && <CountdownPortal onUnlock={startSurpriseFlow} />
      }
      {
        !isLocked && loading && <OpeningAnimation animateOut={animateOut}/>
      }
      {
        !isLocked && showContent && <RouterProvider router={MyRoute} />
      }
    </>
  )
}

export default App