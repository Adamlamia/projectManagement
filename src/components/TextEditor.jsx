import React, { useEffect, useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import "@blocknote/core/style.css";
import { db } from "../firebase"; // Assuming you have a file exporting your Firebase instance


const TextEditor = ({ currentUser }) => {
  const editor = useBlockNote({});
  const [blocks, setBlocks] = useState([]);
  const [editorContent, setEditorContent] = useState([]);

  useEffect(() => {
    // Fetch editor content when the component mounts
    const fetchEditorContent = async () => {
      try {
        // Check if currentUser is defined before accessing its properties
        if (currentUser && currentUser.uid) {
          const userDoc = await getDoc(doc(db, "userProfile", currentUser.uid));
          const userData = userDoc.data();
          if (userData && userData.editorContent) {
            setEditorContent(userData.editorContent);
            // Set the editor content
            editor.setContent(userData.editorContent);
          }
        }
      } catch (error) {
        console.error("Error fetching editor content:", error);
      }
    };
  
    fetchEditorContent();
  }, [currentUser, editor]);
  

  const handleSave = async () => {
    // Get the current content of the editor
    const currentContent = editor.topLevelBlocks;

    // Update or add the content to Firebase
    try {
      await setDoc(doc(db, "userProfile", currentUser.uid), {
        ...editorContent,
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
      <pre>{JSON.stringify(blocks, null, 2)}</pre>
    </div>
  );
};

export default TextEditor;
