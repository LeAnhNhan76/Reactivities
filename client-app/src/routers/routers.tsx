import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Activities from "../pages/Activities/Activities";
import ActivityDetail from "../pages/ActivityDetail/ActivityDetail";
import Layout from "../components/Layout/Layout";
import NotFound from "../pages/NotFound/NotFound";
import Errors from "../pages/Errors/Errors";
import Profile from "../pages/Profile/Profile";
import { routingConstants } from "../constants/routing.constant";

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
          { path: routingConstants.Home, element: <Home /> },
          { path: routingConstants.Activities, element: <Activities /> },
          {
            path: routingConstants.ActivityDetail,
            element: <ActivityDetail />,
          },
          { path: routingConstants.Errors, element: <Errors /> },
          { path: routingConstants.Profile, element: <Profile /> },
          { path: routingConstants.NotFound, element: <NotFound /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
