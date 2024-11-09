import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout/Layout";
import { RoutingConstants } from "../constants/routing.constant";
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
          { path: RoutingConstants.Activities, element: <Activities /> },
          {
            path: RoutingConstants.ActivityDetail,
            element: <ActivityDetail />,
          },
          { path: RoutingConstants.Errors, element: <Errors /> },
          { path: RoutingConstants.Profile, element: <Profile /> },
          { path: RoutingConstants.NotFound, element: <NotFound /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
