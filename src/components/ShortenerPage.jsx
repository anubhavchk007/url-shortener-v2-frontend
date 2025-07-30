import { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { BackendBaseUrl } from '../config/BackendBaseUrl';

const ShortenerPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const getSafeUrl = (url) => {
    return url.startsWith("http")
        ? url
        : "https://" + url;
  };

  const handleShorten = async () => {
    if (!longUrl.trim() || !longUrl.includes(".")) {
        toast.error("Please enter a valid URL");
        return;
    }
    try {
        const response = await axios.post(`${BackendBaseUrl}/shorten`, {
            url: longUrl,
        });
        if (!longUrl.startsWith("http")) {
            setLongUrl((prev) => "https://" + prev);
        }
        toast.success("Done!");
        const shrtCode = response.data.shortCode;
        const shortUrl = `${BackendBaseUrl}/shorten/redirect/${shrtCode}`;
        setShortenedLinks([{ longUrl, shortUrl, shrtCode }, ...shortenedLinks]);
        setLongUrl('');
    } catch (err) {
        toast.error("Something went wrong!");
        console.error(err);
    }
  };

  const handleCopy = async (url, index) => {
    await navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleDelete = async (index) => {
    try {
        await axios.delete(`${BackendBaseUrl}/shorten/${shortenedLinks[index].shrtCode}`);
        toast.success("Deleted successfully!");
        setShortenedLinks((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
        toast.error("Something went wrong!");
        console.log(err);
    }
  };

  const handleRedirect = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 px-4 py-12 text-white">
      <div className="max-w-3xl mx-auto space-y-12 animate-fade-in-up">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl shadow-blue-900/30 text-center space-y-4">
          <h1 className="text-6xl font-extrabold ml-[-25px]">
            
            <span>🔗Shawty</span>
            <span className='text-blue-500'>fi</span>
            </h1>
          <p className="text-gray-300">Paste a long URL to get a sleek, shareable short link.</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter your long URL..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <button
              onClick={handleShorten}
              className="bg-blue-600 hover:bg-blue-700 w-50 transition px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-blue-500/40"
            >
              ✂️ Shorten
            </button>
          </div>
        </div>

        {/* List */}
        {shortenedLinks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">📋 Your Shortened URLs</h2>
            <ul className="space-y-3">
              {shortenedLinks.map((link, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-sm transition hover:shadow-md hover:bg-white/20"
                >
                  <div className="flex-1 break-words text-sm mb-2 sm:mb-0">
                    <a 
                        href={getSafeUrl(link.longUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-400 hover:underline"
                    >
                        {link.longUrl}
                    </a>
                    <a
                      href={link.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Short URL
                    </a>
                  </div>

                  <div className="mt-2 sm:mt-0 sm:ml-4 flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleCopy(link.shortUrl, index)}
                      className="flex items-center gap-1 text-sm bg-gray-700 hover:bg-gray-800 px-3 py-1.5 rounded-md transition"
                    >
                      {copiedIndex === index ? (
                        <>
                          <CheckIcon className="w-4 h-4 text-green-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <ClipboardDocumentIcon className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleRedirect(link.shortUrl)}
                      className="flex items-center gap-1 text-sm bg-gray-700 hover:bg-gray-800 px-3 py-1.5 rounded-md transition"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Redirect
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className="flex items-center gap-1 text-sm bg-gray-700 hover:bg-gray-800 px-3 py-1.5 rounded-md transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenerPage;


