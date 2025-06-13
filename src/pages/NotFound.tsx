import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import { MapPin } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-xl mx-auto">
          <div className="mb-6 text-amber-500">
            <MapPin className="w-20 h-20 mx-auto" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Looks like we took a wrong turn! This page doesn't exist or has been moved.
          </p>
          
          <Link to="/">
            <Button primary>Return Home</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;