import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import Managetimeline from "./pages/Managetimeline";
import ManageProjects from "./pages/ManageProjects";
import Viewproject from "./pages/Viewproject";
import UpdatePassword from "./pages/UpdateProject";
import UpdateProjects from "./pages/UpdateProject";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getuser } from "./Redux/Slices/UserSlice";
import ViewProject from "./pages/Viewproject";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/timeline" element={<Managetimeline />} />
        <Route path="/manage/projects" element={<ManageProjects />} />
        <Route path="/view/project/:id" element={<Viewproject />} />
        <Route path="/update/project/:id" element={<UpdateProjects />} />
        <Route path="/view/project/:id" element={<ViewProject />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
