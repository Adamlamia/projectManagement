import React, { useEffect, useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import "@blocknote/core/style.css";
import { db } from "../firebase"; // Assuming you have a file exporting your Firebase instance

const TextEditor = ({ projectId }) => {
  const editor = useBlockNote({});
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Fetch content from Firebase when the component mounts
    const fetchContent = async () => {
      try {
        const projectDoc = await getDoc(doc(db, "projects", projectId));
        const projectData = projectDoc.data();
        if (projectData && projectData.editorContent) {
          // Set the editor content if it exists in the database
          editor.setContent(projectData.editorContent);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [editor, projectId]);

  const handleSave = async () => {
  // Fetch the existing project data from Firebase
  try {
    const projectDoc = await getDoc(doc(db, "projects", projectId));
    const existingProjectData = projectDoc.data();

    // Get the current content of the editor
    const currentContent = editor.topLevelBlocks;

    // Update or add the content to Firebase, preserving existing fields
    await setDoc(doc(db, "projects", projectId), {
      ...existingProjectData,
      editorContent: currentContent,
    });

    console.log("Content saved successfully!");
  } catch (error) {
    console.error("Error saving content:", error);
  }
};


  return (
    <div>
      {/* BlockNote editor view */}
      <BlockNoteView editor={editor} />

      {/* Save button */}
      <button onClick={handleSave}>Save</button>

      {/* Display JSON representation of blocks */}
      
    </div>
  );
};

export default TextEditor;
