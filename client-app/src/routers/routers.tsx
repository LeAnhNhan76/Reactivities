import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Activities from "../pages/Activities/Activities";
import ActivityDetail from "../pages/ActivityDetail/ActivityDetail";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "activities", element: <Activities /> },
      { path: "activities/:id", element: <ActivityDetail /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
