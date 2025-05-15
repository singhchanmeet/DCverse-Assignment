import React from 'react';

const AvatarCard = ({ avatar, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
      <div className="w-full h-48 bg-gray-200 overflow-hidden relative group">
        <img 
          src={avatar.avatar || avatar.image || `/api/placeholder/200/200`} 
          alt={`${avatar.first_name || avatar.firstName}'s avatar`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="font-medium text-gray-800 text-lg">{`${avatar.first_name || avatar.firstName} ${avatar.last_name || avatar.lastName}`}</h3>
        <p className="text-gray-600 text-sm mb-4">{avatar.email}</p>
        <button 
          onClick={() => onEdit(avatar)} 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors flex items-center space-x-1"
        >
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default AvatarCard;