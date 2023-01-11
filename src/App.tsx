import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { fetchAuthMe } from "./store/async/login/loginSlice";
import { useAppDispatch } from "./store/store";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Registration />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
