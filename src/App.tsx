import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Home } from "./pages/Home/Home"
import { fetchAuthMe } from "./store/slices/async/auth/authSlice"
import { useAppDispatch } from "./hooks/hooks"
import { SavedPosts } from "./pages/Saved/SavedPosts"
import { RecentsPosts } from "./pages/Recents/RecentsPosts"

const ViewPost = React.lazy(
  () => import(/* webpackChunkName: "ViewPost" */ "./pages/ViewPost/ViewPost")
)

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
        <Route
          path="/blog/:id"
          element={
            <React.Suspense fallback={<div>loading...</div>}>
              <ViewPost />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
