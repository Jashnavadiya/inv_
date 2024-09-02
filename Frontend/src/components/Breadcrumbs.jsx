import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using routing

const Breadcrumbs = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-gray-700">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === crumbs.length - 1 ? (
              <span className="font-bold">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="text-blue-500 hover:underline">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
