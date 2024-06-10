import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';

const Drive = () => {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const messages = [
    'Loading your data...',
    'Gathering information...',
    'Please wait a moment...',
  ];


  const fetchFiles = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setLoadingText(messages[randomIndex]);
    setLoading(true);
    const formData = new FormData();
    formData.append('username', username);

    fetch('https://aws-python-workshop.onrender.com/s3_list', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setFiles(data.file_names);
    })
    .catch(error => {
      console.error('Error fetching files:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleAddFile = (e) => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setLoadingText(messages[randomIndex]);
    setLoading(true);
    const file = e.target.files[0];
    setFileName(file.name);
  
    const formData = new FormData();
    formData.append('files', file);
    formData.append('username', username);
  
    fetch('https://aws-python-workshop.onrender.com/s3_upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        fetchFiles();
        setFileName('');
      } else {
        console.error('Error uploading file:', data.error);
      }
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    })
    .finally(() => {
        setLoading(false);
    });
  };

  const handleDeleteFile = (fileName) => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setLoadingText(messages[randomIndex]);
    setLoading(true);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('filename', fileName);

    fetch('https://aws-python-workshop.onrender.com/s3_delete', {
      method: 'DELETE',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        fetchFiles();
      } else {
        console.error('Error deleting file:', data.error);
      }
    })
    .catch(error => {
      console.error('Error deleting file:', error);
    })
    .finally(() => {
        setLoading(false);
    });
  };

  const handleDownloadFile = (fileName) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('filename', fileName);

    fetch('https://aws-python-workshop.onrender.com/s3_download', {
      method: 'POST',
      body: formData,
      responseType: 'blob'
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error downloading file:', error);
    });
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    setFiles([]);
  };

  return (
    <div className="p-4 px-16">
      <div className="flex mb-4 pt-6 pb-8">
        <input
          type="text"
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Enter User name"
        />
        <button
          onClick={fetchFiles}
          className="bg-blue-500 text-white p-2 ml-2 border rounded hover:bg-blue-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faCheck} /> Submit
        </button>
        <label htmlFor="file-upload" className="bg-green-500 text-white p-2 ml-2 border rounded hover:bg-green-600 focus:outline-none cursor-pointer">
          <FontAwesomeIcon icon={faPlus} /> Add Files
          <input id="file-upload" type="file" className="hidden" onChange={handleAddFile} />
        </label>
      </div>
      {loading ? (
        <Loader loadingText={loadingText} />
      ) : (
        <ul>
          {files && files.map(file => (
            <li key={file} className="flex items-center justify-between mb-2 p-2 border rounded px-4 pt-4 pb-4">
              <span>{file}</span>
              <div>
                <button
                  onClick={() => handleDownloadFile(file)}
                  className="bg-gray-600 text-white p-2 mr-2 border rounded hover:bg-gray-700 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                <button
                  onClick={() => handleDeleteFile(file)}
                  className="bg-red-500 text-white p-2 border rounded hover:bg-red-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Drive;
