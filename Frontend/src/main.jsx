import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./Components/Auth/Signup.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Auth/Login.jsx";
import { Toaster } from "./Components/ui/sonner.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Jobs from "./Components/Jobs.jsx";
import Browse from "./Components/Browse.jsx";
import Profile from "./Components/Profile.jsx";
import JobDescription from "./Components/JobDescription.jsx";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Companies from "./Components/Admin/Companies.jsx";
import CompanyCreate from "./Components/Admin/CompanyCreate.jsx";
import CompanySetups from "./Components/Admin/CompanySetups.jsx";
import AdminJobs from "./Components/Admin/AdminJobs.jsx";
import PostJob from "./Components/Admin/PostJob.jsx";
import Applicants from "./Components/Admin/Applicants.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import UserProtectedRoute from "./Components/UserProtectedRoute.jsx";

const persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {
        path: "/jobs",
        element: (
          <UserProtectedRoute>
            <Jobs />
          </UserProtectedRoute>
        ),
      },
      {
        path: "/browse",
        element: (
          <UserProtectedRoute>
            <Browse />
          </UserProtectedRoute>
        ),
      },
      { path: "/profile", element: <Profile /> },
      { path: "/jobdescription/:id", element: <JobDescription /> },
      {
        path: "/admin/companies",
        element: (
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/create",
        element: (
          <ProtectedRoute>
            <CompanyCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/company/:id",
        element: (
          <ProtectedRoute>
            <CompanySetups />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute>
            <AdminJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post/job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: (
          <ProtectedRoute>
            <Applicants />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
