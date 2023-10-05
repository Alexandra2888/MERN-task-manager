import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "./pages/homeLayout";
import {NotFound} from "./pages/notFound";
import {EditTask} from "./pages/editTask";
import {Task} from "./components/task";
import {Home} from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ]
  },
  {
    path: '/task',
    element: <Task/>
  },
  {
    path: '/edit-task/:id',
    element: <EditTask/>
  }
]);

export const App = () => {
  return (
    <RouterProvider router={router} />
  );
};
