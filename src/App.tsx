import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Home } from "./pages/Home/Home"
import { ViewPost } from "./pages/ViewPost/ViewPost"
import { fetchAuthMe } from "./store/slices/async/auth/authSlice"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"
import { SavedPosts } from "./components/Posts/SavedPosts"
import { RecentsPosts } from "./components/Posts/RecentsPosts"
import { RootState } from "./store/store"

function App() {
  const dispatch = useAppDispatch()

  // const { theme } = useAppSelector((state: RootState) => state.posts)

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])
  // useEffect(() => {
  //   document.body.style.transition = `background-color 0.3s ease-in`
  //   document.body.style.backgroundColor = theme ? "#1D1D1D" : "#f7f8f8"
  //   localStorage.setItem("theme", `${theme}`)
  // }, [theme])

  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/saved" element={<SavedPosts />} />
        <Route path="/recents" element={<RecentsPosts />} />
        <Route path="/blog/:id" element={<ViewPost />} />
      </Route>
    </Routes>
  )
}

export default App
