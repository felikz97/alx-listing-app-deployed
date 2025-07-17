import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
      <p>&copy; {new Date().getFullYear()} ALX Listing App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
