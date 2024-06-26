import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import RootLayout from "./shared/components/Layouts/RootLayout";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { userId, token, login, logout } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Users /> },
        { path: "places/new", element: <NewPlace /> },
        { path: ":userId/places", element: <UserPlaces /> },
        { path: "places/:placeId", element: <UpdatePlace /> },
        { path: "auth", element: <Auth /> },
      ],
    },
  ]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <RouterProvider router={router} />
      <Toaster />
    </AuthContext.Provider>
  );
}

export default App;
