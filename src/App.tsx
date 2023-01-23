import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Blog } from "./pages/Blog/Blog"
import { Home } from "./pages/Home/Home"
import { Projects } from "./pages/Projects/Projects"
import { ViewPost } from "./pages/ViewPost/ViewPost"
import { fetchAuthMe } from "./store/slices/async/auth/authSlice"
import { useAppDispatch } from "./hooks/hooks"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ViewPost />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    </Routes>
  )
}

export default App
