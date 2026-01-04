import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import DashboardLayout from "../Layout/DashboardLayout";
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
import Watchlist from "../Pages/Watchlist";
import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import About from "../Pages/About";

export const router = createBrowserRouter([
  {
    path:'/',
    Component:Root,
     errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        loader:()=>fetch('https://movie-world-server-navy.vercel.app/highRatedMovies'),
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
        loader:()=>fetch('https://movie-world-server-navy.vercel.app/movies'),
        Component:Movies
      },
      {
        path:'/about',
        element:<About></About>

      },
     
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute>
     <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
         {
          path:'/dashboard',
          element:<Dashboard></Dashboard>

        },
        {
          path:'/dashboard/profile',
          element:<Profile></Profile>

        },
        
      
        {
          path:'/dashboard/Movies/:id',
          loader:({params})=>fetch(`https://movie-world-server-navy.vercel.app/moviesById/${params.id}`),
          element:<MoviesDetails></MoviesDetails>
        },

        {
          path:'/dashboard/update/:id',
          element:<MovieUpdates></MovieUpdates>
        },
        {
          path:'/dashboard/add',
          element:<AddMovie></AddMovie>
      
        },
        {
          path:'/dashboard/MyColection',
          element:<MyCollections></MyCollections>
      
        },
        {
          path:'/dashboard/Watchlist',
          element:<Watchlist></Watchlist>
        },

    ]
  }
]);