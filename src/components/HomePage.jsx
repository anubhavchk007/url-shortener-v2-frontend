import { SparklesIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate = useNavigate();
    
    function shortenerPage() {
        navigate('/shorten');
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 px-4 text-white">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 max-w-2xl w-full flex flex-col items-center text-center shadow-xl shadow-blue-800/20 animate-fade-in-up gap-6">
        <SparklesIcon className="h-12 w-12 text-blue-500 animate-bounce" />

        <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
          Welcome to <span className="text-blue-500">Shawtyfi</span>
        </h1>

        <p className="text-lg text-gray-300">
          Transform long, messy URLs into short and memorable links in seconds.
        </p>

        <button 
        onClick={shortenerPage}
        className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-105 duration-300">
          🚀 Start Now!
        </button>
      </div>
    </div>
  );
};

export default HomePage;
