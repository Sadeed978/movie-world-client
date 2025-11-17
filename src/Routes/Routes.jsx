import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ErrorPage from '../Pages/ErrorPage';
import Movies from "../Pages/Movies";
import MoviesDetails from "../Pages/MoviesDetails";
import AddMovie from "../Pages/AddMovie";
import MovieUpdates from "../Pages/MovieUpdates";
import PrivateRoute from "../PrivateRoute";
import MyCollections from "../Pages/MyCollections";

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
      {
        path:'/Movies',
        loader:()=>fetch('http://localhost:3000/movies'),
        Component:Movies
      },
      {
        path:'/Movies/:id',
        loader:({params})=>fetch(`http://localhost:3000/moviesById/${params.id}`),
        Component:MoviesDetails
      },
      {
        path:'/Movies/update/:id',
        element:<PrivateRoute><MovieUpdates></MovieUpdates></PrivateRoute>
      },
      {
        path:'/Movies/add',
        element:<PrivateRoute><AddMovie></AddMovie></PrivateRoute>
    
      },
      {
        path:'Movies/MyColection',
        element:<PrivateRoute><MyCollections></MyCollections></PrivateRoute>
    
      },
    ]
  }
]);