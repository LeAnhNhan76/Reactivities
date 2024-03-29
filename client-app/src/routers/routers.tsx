import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout/Layout";
import { routingConstants } from "../constants/routing.constant";
import Activities from "../pages/Activities/Activities";
import ActivityDetail from "../pages/ActivityDetail/ActivityDetail";
import Errors from "../pages/Errors/Errors";
import NotFound from "../pages/NotFound/NotFound";
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
