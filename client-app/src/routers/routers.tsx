import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Activities from "../pages/Activities/Activities";
import ActivityDetail from "../pages/ActivityDetail/ActivityDetail";
import Layout from "../components/Layout/Layout";
import NotFound from "../pages/NotFound/NotFound";
import Errors from "../pages/Errors/Errors";
import Profile from "../pages/Profile/Profile";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          { path: "", element: <Home /> },
          { path: "/home", element: <Home /> },
          { path: "/activities", element: <Activities /> },
          { path: "/activities/:id", element: <ActivityDetail /> },
          { path: "/errors", element: <Errors /> },
          { path: "/profile", element: <Profile /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
