import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 text-center">
      {/* Animated 404 */}
      <h1 className="text-7xl font-extrabold text-[#00E096] mb-4 animate-bounce">
        404
      </h1>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-md">
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Back Home Button */}
      <Link
        to="/"
        className="bg-[#0095FF] hover:bg-[#00E096] text-white px-6 py-2 rounded-lg shadow transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
