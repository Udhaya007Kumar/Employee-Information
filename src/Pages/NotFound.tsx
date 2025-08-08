
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <h1 className="text-6xl font-bold text-[#00E096] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#0095FF] hover:bg-[#00E096] text-white px-5 py-2 rounded-lg shadow transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
