import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Home } from "./pages/Home/Home"
import { ViewPost } from "./pages/ViewPost/ViewPost"
import { fetchAuthMe } from "./store/slices/async/auth/authSlice"
import { useAppDispatch } from "./hooks/hooks"
import { SavedPosts } from "./components/Posts/SavedPosts"
import { RecentsPosts } from "./components/Posts/RecentsPosts"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

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
