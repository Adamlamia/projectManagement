import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";

const FileList = ({ projectId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const storage = getStorage();
    const projectFilesRef = ref(storage, `files/${projectId}`);

    listAll(projectFilesRef)
      .then(async (res) => {
        const filesArray = await Promise.all(
          res.items.map(async (itemRef) => {
            const downloadUrl = await getDownloadURL(itemRef);
            return {
              name: itemRef.name,
              downloadUrl,
            };
          })
        );

        setFiles(filesArray);
      })
      .catch((error) => {
        console.error("Error listing files:", error);
      });
  }, [projectId]);

  const handleDeleteFile = async (fileName) => {
    const storage = getStorage();
    const fileRef = ref(storage, `files/${projectId}/${fileName}`);

    try {
      await deleteObject(fileRef);
      console.log("File deleted successfully!");
      
      // Update the file list after deletion
      const updatedFiles = files.filter(file => file.name !== fileName);
      setFiles(updatedFiles);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>File Name</th>
            <th>Link</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{file.name}</td>
              <td>
                <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
                  Open
                </a>
              </td>
              <td>
                <button onClick={() => handleDeleteFile(file.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
