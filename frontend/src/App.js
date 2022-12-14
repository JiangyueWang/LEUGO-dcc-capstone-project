// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyCollection from "./pages/MyCollectionPage/MyCollectionPage";
import WishListPage from "./pages/WishListPage/WishListPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
// import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage />
            // {/* <PrivateRoute> */}
              // <HomePage />
            // </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path=":username/collection" element={<MyCollection />}></Route>
        <Route path=":username/wishlist" element={<WishListPage />}></Route>
        <Route path="/search" element={<SearchResultsPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
