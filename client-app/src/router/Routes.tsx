import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import ActivityForm from "../features/activities/form/ActivityForm";
import { HomePage } from "../features/home/HomePage";
import App from "../layout/App";
import Login from "../features/login/Login";
import Register from "../features/register/Register";

export const routes: RouteObject[] = [
    {
        path: '',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'createActivities', element: <ActivityForm />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />}
        ]
    }
];

export const router = createBrowserRouter(routes);