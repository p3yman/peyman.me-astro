import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "./layouts/Default";
import { Posts } from "./pages/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/settings",
        element: <div>Settings</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
