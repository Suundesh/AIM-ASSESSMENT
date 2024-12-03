import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "../App.css";
import Dashboard from "../views/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={3000}
        closeOnClick
        newestOnTop={true}
      />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
