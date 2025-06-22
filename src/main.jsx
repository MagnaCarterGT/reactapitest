import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Dogs from "./pages/Dogs.jsx";
import Root from "./routes/root.jsx";
import PagerDuty from "./pages/PagerDuty.jsx";
import ErrorPage from "./error-page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/dogs",
        element: <Dogs/>,
    },
    {
        path: "/pagerDuty",
        element: <PagerDuty/>,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);