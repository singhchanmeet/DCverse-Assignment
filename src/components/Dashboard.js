import React, { useState, useEffect } from 'react';
import AvatarCard from './AvatarCard';
import AvatarFormModal from './AvatarFormModal';

const Dashboard = () => {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [apiSource, setApiSource] = useState('reqres'); // 'reqres' or 'dummyjson'
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const fetchAvatars = async (source) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response, data;
      
      if (source === 'reqres') {
        response = await fetch('https://reqres.in/api/users?page=1');
        data = await response.json();
        setAvatars(data.data.slice(0, 3)); // Only get first 3 avatars
      } else {
        response = await fetch('https://dummyjson.com/users?limit=3');
        data = await response.json();
        setAvatars(data.users); // DummyJSON format
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch avatars. Please try again later.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvatars(apiSource);
  }, [apiSource]);

  const username = "Alex"; // Placeholder username

  const handleCreateAvatar = () => {
    setCurrentAvatar(null);
    setIsModalOpen(true);
  };

  const handleEditAvatar = (avatar) => {
    setCurrentAvatar(avatar);
    setIsModalOpen(true);
  };

  const handleModalClose = (formData) => {
    if (formData) {
      if (currentAvatar) {
        // Edit existing avatar
        setAvatars(prev => 
          prev.map(avatar => 
            avatar.id === currentAvatar.id || avatar.id === currentAvatar.id ? 
            { ...avatar, 
              first_name: formData.first_name,
              last_name: formData.last_name,
              firstName: formData.first_name, // For DummyJSON format
              lastName: formData.last_name,   // For DummyJSON format
              email: formData.email,
              avatar: formData.avatar,
              image: formData.avatar  // For DummyJSON format
            } : avatar
          )
        );
      } else {
        // Add new avatar
        const newAvatar = {
          id: Date.now(),
          first_name: formData.first_name,
          last_name: formData.last_name,
          firstName: formData.first_name, // For DummyJSON format
          lastName: formData.last_name,   // For DummyJSON format
          email: formData.email,
          avatar: formData.avatar,
          image: formData.avatar  // For DummyJSON format
        };
        setAvatars(prev => [...prev, newAvatar]);
      }
    }
    setIsModalOpen(false);
    setCurrentAvatar(null);
  };

  const handleApiChange = (e) => {
    setApiSource(e.target.value);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className={`bg-gradient-to-r ${theme === 'dark' ? 'from-blue-900 to-purple-900' : 'from-blue-600 to-purple-600'} text-white py-8 px-4 sm:px-6 lg:px-8 shadow-lg`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">AI Avatar Dashboard</h1>
              <p className="mt-2 text-blue-100">Welcome back, {username}! Ready to create some amazing avatars?</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                <label htmlFor="apiSource" className="text-sm text-white">Data Source:</label>
                <select 
                  id="apiSource" 
                  value={apiSource} 
                  onChange={handleApiChange}
                  className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="reqres">ReqRes API</option>
                  <option value="dummyjson">DummyJSON API</option>
                </select>
              </div>
              
              <button 
                onClick={toggleTheme}
                className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                {theme === 'light' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    <span className="text-sm">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {/* Avatars Section */}
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Your Avatars</h2>
            <button 
              onClick={handleCreateAvatar}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition-colors flex items-center space-x-1 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>New Avatar</span>
            </button>
          </div>
          
          {isLoading ? (
            <div className={`flex justify-center items-center h-60 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading avatars...</p>
              </div>
            </div>
          ) : error ? (
            <div className={`${theme === 'dark' ? 'bg-red-900/30 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-700'} border px-4 py-3 rounded-md`}>
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {avatars.map((avatar) => (
                <AvatarCard 
                  key={avatar.id} 
                  avatar={avatar} 
                  onEdit={handleEditAvatar}
                />
              ))}
            </div>
          )}

          {!isLoading && !error && avatars.length === 0 && (
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8 text-center`}>
              <div className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
              </div>
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>No Avatars Found</h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-6`}>Create your first avatar to get started.</p>
              <button 
                onClick={handleCreateAvatar}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md shadow-md transition-colors"
              >
                Create Avatar
              </button>
            </div>
          )}
        </div>

        {/* UI Demo Notice */}
        <div className={`mt-8 ${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-800 text-yellow-200' : 'bg-yellow-50 border-yellow-400 text-yellow-700'} border-l-4 p-4 rounded-md`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                <strong>Demo Only:</strong> Changes are stored in the browser memory and will be lost on refresh. No data is being sent to any backend.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Floating Button (visible on mobile only) */}
      <button 
        onClick={handleCreateAvatar}
        className="md:hidden fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      
      {/* Avatar Form Modal */}
      <AvatarFormModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        initialData={currentAvatar}
        title={currentAvatar ? "Edit Avatar" : "Create New Avatar"}
        submitButtonText={currentAvatar ? "Save Changes" : "Create Avatar"}
      />
    </div>
  );
};

export default Dashboard;