import { useEffect } from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout";
import { AppProvider } from "./context/AppContext";
import About from "./pages/About";
import Admin from "./pages/Admin";
import CallUs from "./pages/CallUs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import PlaceOrder from "./pages/PlaceOrder";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import TrackOrder from "./pages/TrackOrder";
import { logWebsiteVisit } from "./services/googleSheets";

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const fullPath = `${location.pathname}${location.search}`;
    void logWebsiteVisit(fullPath);
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

  return (
    <AppProvider>
      <Router>
        <RouteTracker />
        <Routes>
          <Route path="/admin123" element={<Admin />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/call" element={<CallUs />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
