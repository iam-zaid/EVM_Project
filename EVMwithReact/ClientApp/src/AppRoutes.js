import ConfirmedPage from "./components/ConfirmPage";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/HomePage";
import ConfirmedPage from "./ConfirmedPage";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
