import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Suspect from '../pages/Suspect/Suspect';
import SuspectDetails from '../pages/SuspectDetails/SuspectDetails';
import Witness from '../pages/Witness/Witness';
import Clues from '../pages/Clues/Clues';
import Accusation from '../pages/Accusation/Accusation';
import Result from '../pages/Result/Result';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/accusation', element: <Accusation />, },
      { path: '/suspects', element: <Suspect />, },
      { path: '/suspect-details', element: <SuspectDetails />, },
      { path: '/witnesses', element: <Witness />, },
      { path: '/clues', element: <Clues />, },
      { path: '/result', element: <Result />, },
      { path: '/suspect-details/:id', element: <SuspectDetails />, },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  }
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}