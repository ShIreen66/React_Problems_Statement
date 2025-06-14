import React, { useState, useRef } from 'react';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);
  const photoInputRef = useRef();

  const handlePhotoChange = () => {
    const file = photoInputRef.current.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPhoto(imageURL);
    }
  };

  const showPreview = name || bio || photo;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start justify-center">
      
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Fill Your Profile</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Your Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
          <input
            type="file"
            accept="image/*"
            ref={photoInputRef}
            onChange={handlePhotoChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          {photo && (
            <img
              src={photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />
          )}
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-600">{bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
