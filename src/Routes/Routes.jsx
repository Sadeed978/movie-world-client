import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ErrorPage from '../Pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path:'/',
    Component:Root,
     errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/Login',
        Component:Login
      },
      {
        path:'/Register',
        Component:Register
      },
      
    ]
  }
]);