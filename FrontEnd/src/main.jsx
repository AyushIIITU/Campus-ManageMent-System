import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ComplainPostProvider from "./ComplainPostProvider.jsx";
import ComplainPost from "./ComplainPost.jsx";
import CreatePost from "./CreatePost.jsx";
import StudentLogin from "./Componets/StudentLogIn/StudentLogin.jsx";
import YourPost from "./YourPost.jsx";
import AdminLogin from "./Componets/AdminLogin/AdminLogin.jsx";
import AdminMain from "./Componets/AdminLogin/AdminMain.jsx";
import StudentComplains from "./Componets/AdminLogin/StudentComplains.jsx";
import { Toaster } from "react-hot-toast";
import Bus from "./Componets/BusBooking/Bus.jsx";
import CreateApllication from "./CreateApllication.jsx";
import Gard from "./Componets/CoustomRoutes/Gard.jsx";
import Machine from "./Componets/WashingMachineControlling/Machine.jsx";
import Washing from "./Componets/WashingMachine/Washing.jsx";
import WashingWithGard from "./Componets/WashingMachine/WashingWithGard.jsx";
// import ComplainPostProvider from "./ComplainPostProvider.jsx";
/* case "home":
        navigate('/StudentPanel');
        break;
        // return <ComplainPostProvider/>;
 
       
      case "Create post":
        // return <ComplainPost/>;
        navigate("/StudentPanel/CreatePost");
        break;
      case "Laundary":
        // return <ComplainPost/>;
        navigate("/StudentPanel/Laundary");
        break;
      case "Book Bus":
        // return <ComplainPost/>;
        navigate("/StudentPanel/BookBus");
        break;
      case "Application":
        // return <ComplainPost/>;
        navigate("/StudentPanel/Application");
        break;*/
const router = createBrowserRouter([
  {
    path: "/StudentLogin",
    element: <StudentLogin />,
  },
  {
    path:"/GardLogin",
    element: <Gard/>
  },
  {
    path:'/WashingMachineControling',
    element:<Machine/>,
  },
  {
    path: "/AdminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/AdminPanel",
    element: <AdminMain />,
    children: [
      {
        path: "",
        element: <StudentComplains />,
      },
      {
        path: "BookBus",
        element: <Bus />,
      },
    ],
  },

  {
    path: "/StudentPanel",
    element: <App />,
    children: [
      {
        path: "",
        element: <ComplainPostProvider />,
      },
      {
        path: "CreatePost",
        element: <CreatePost />,
      },
      {
        path: "Laundary",
        element: <WashingWithGard/>,
      },
      {
        path: "BookBus",
        element: <Bus />,
      },
      {
        path: "Application",
        element: <CreateApllication />,
      },
      {
        path: "YourPost",
        element: <YourPost />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
    {/* <App/> */}
  </React.StrictMode>
);
