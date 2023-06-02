import Landing from "./components/landing/Landing";
import NavBar from "./components/HomePage/Navbar";
import Library from "./components/HomePage/library/Library";
import Search from "./components/HomePage/search/Search";
import BookDetails from "./components/books/BookDetails";
import BookViewer from "./components/books/BookEmbeddedViewer";
import ActivateAccount from "./components/landing/authentication/ActivateAccount";
import ChangePassword from "./components/landing/authentication/ChangePassword";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { MyContext } from "./context/authCTX";
import { useContext } from "react";

function App() {
  const ctx = useContext(MyContext);

  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    {
      path: "/hp/:username",
      element: <NavBar username={(ctx.user && ctx.user.firstName) || "u"} />,
      children: [
        {
          path: "/hp/:username/lib",
          element: <Library shelves={(ctx.user && ctx.user.shelves) || []} />,

        },
        {
          path: "/hp/:username/search",
          element: <Search />,

        },
        {
          path: "/hp/:username/details/:bookId",
          element: <BookDetails />,

        },
        {
          path: "/hp/:username/details/:bookId/preview",
          element: <BookViewer />,

        },
        {
          path: "/hp/:username/auth/changePassword",
          element: <ChangePassword />,

        },
      ],
    },
    { path: "/auth/confirm-email/:token", element: <ActivateAccount /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
