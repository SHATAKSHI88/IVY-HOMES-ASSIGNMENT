import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Rentals from "./pages/Rentals";
import Projects from "./pages/Projects";
import Saved from "./pages/Saved";
import Insights from "./pages/Insights";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <Listings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listings/:listingId"
          element={
            <ProtectedRoute>
              <ListingDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rentals"
          element={
            <ProtectedRoute>
              <Rentals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to="/listings" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/listings" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;