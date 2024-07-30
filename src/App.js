import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./pages/Layout/MainLayout";
import {ToastContainer} from "react-toastify";
import OrderIndex from "./pages/Order/OrderIndex";
import OrderNew from "./pages/Order/OrderNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<OrderIndex />} />
          <Route path="/orders/new" element={<OrderNew />} />
          <Route path="*" element={<h1>404 Page</h1>} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
