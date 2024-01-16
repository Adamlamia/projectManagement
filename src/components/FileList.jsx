import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const FileList = ({ projectId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const storage = getStorage();
    const projectFilesRef = ref(storage, `files/${projectId}`);

    listAll(projectFilesRef)
      .then(async (res) => {
        console.log("Files listed successfully:", res);

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

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>File Name</th>
            <th>Link</th>
            <th>Download</th>
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
                <button
                  onClick={() => {
                    window.open(file.downloadUrl, '_blank');
                  }}
                >
                  Download
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
