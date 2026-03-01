import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import CityListing from './pages/CityListing';
import CityLanding from './pages/CityLanding';
import Blog from './pages/Blog';
import Support from './pages/Support';
import FAQ from './pages/FAQ';
import HotelMatch from './pages/HotelMatch';
import NotFound from './pages/NotFound';
import UnderConstruction from './pages/UnderConstruction';
import Waitlist from './pages/Waitlist';
import BrowseGallery from './pages/BrowseGallery';
import BecomePartner from './pages/BecomePartner';
import DirectoryPreview from './pages/DirectoryPreview';
import Booking from './pages/Booking';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/browse" element={<BrowseGallery />} />
          <Route path="/destinations" element={<CityListing />} />
          <Route path="/destination/:cityName" element={<CityLanding />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/quiz" element={<UnderConstruction />} />
          <Route path="/hotel-match" element={<HotelMatch />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/preview" element={<DirectoryPreview />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;