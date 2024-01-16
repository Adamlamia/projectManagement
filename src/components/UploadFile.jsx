import React, { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const UploadFile = ({ projectId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `files/${projectId}/${selectedFile.name}`);

      uploadBytes(storageRef, selectedFile).then((snapshot) => {
        console.log("File uploaded successfully!");
        // You can update the UI or trigger other actions upon successful upload
      });
    } else {
      console.error("No file selected for upload.");
    }
  };

  return (
    <div>
      <input
        type="file"
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        onChange={handleFileChange}
      />
      <button className="btn btn-primary mt-2" onClick={handleUpload}>
        Upload File
      </button>
    </div>
  );
};

export default UploadFile;
