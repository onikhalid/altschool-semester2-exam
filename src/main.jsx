import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import { ErrorBoundary } from './components'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from '../error-page.jsx';
import { Overview, Repositories, Root } from './routes';
import { UserDataProvider } from './lib/provider';
import RepositoryDetail from './routes/RepositoryDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "repos/",
        element: <Repositories />,
      },
      {
        path: "repos/:repoId",
        element: <RepositoryDetail />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
