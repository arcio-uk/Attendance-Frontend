import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const NotFound = () => (
  <div className="flex flex-col bg-zinc-100 rounded-2xl p-10 md:text-6xl text-5xl text-shadow-xl text-gray-900 shadow-lg h-50 space-y-10">
    <div className="flex-auto font-light text-center">404 - Not Found!</div>
    <Link to="/" className="flex-auto text-center text-2xl">
      <Button>Go Home</Button>

    </Link>
  </div>
);

export default NotFound;
