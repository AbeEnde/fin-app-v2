import { createBrowserRouter, Link, RouterProvider } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Login from "./pages/Login"
import Register from "./pages/Register"
import TransactionImport from "./pages/TransactionImport"
import Header from "./pages/Header"
import DashboardTest, { loader } from "./components/DashboardTest"

const theme = createTheme({
  palette: {
    primary: {
      main: "#17C3B2"
    },
    lightWhite: {
      main: "rgba(255, 255, 255, 0.9)"
    },
    greyText: {
      main: "#454545"
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <DashboardTest />,
        loader: loader
      },
      { path: "TransactionImport", element: <TransactionImport /> }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/logout", element: <p>logout</p> }
])

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
