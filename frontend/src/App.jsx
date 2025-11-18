import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import DustbinHistory from "./components/DustbinHistory";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedRoute/ProtectedAdminRoute";
import MapProvider from "./components/maps/MapProvider";
import DustbinList from "./components/pages/DustbinList";
import UserList from "./components/admin/UserList";
import UserDialog from "./components/helper/UserDialog";
import DustbinListUser from "./components/pages/dustbinListUser";
import UserNavigator from "./components/user/userNavigation";
import ProtectedUserRoute from "./components/ProtectedRoute/ProtectedUserRoute";
import Navigation from "./components/admin/Navigation";
import ProtectedCollectorRoute from "./components/ProtectedRoute/ProtectedCollectorRoute";
import RouteCalculator from "./components/maps/RouteCalulator";
import CollectorNavigaton from "./components/user/collectorNavigaton";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <Navigation />
                <Routes>
                  <Route path="" element={<AdminDashboard />} />
                  <Route path="dustbin-location" element={<MapProvider />} />
                  <Route path="dustbin" element={<DustbinList />} />
                  <Route path="user" element={<UserList />} />
                  <Route path="history/:id" element={<DustbinHistory />} />
                </Routes>
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/collector/*"
            element={
              <ProtectedCollectorRoute>
                <CollectorNavigaton />
                <Routes>
                  <Route path="" element={<UserDashboard />} />
                  <Route path="dustbin-location" element={<MapProvider />} />
                  <Route path="dustbin" element={<DustbinListUser />} />
                  <Route path="route" element={<RouteCalculator />} />
                </Routes>
              </ProtectedCollectorRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <ProtectedUserRoute>
                <UserNavigator />
                <Routes>
                  <Route path="" element={<UserDashboard />} />
                  <Route path="dustbin-location" element={<MapProvider />} />
                  <Route path="dustbin" element={<DustbinListUser />} />
                </Routes>
              </ProtectedUserRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
