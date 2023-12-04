import React, { useEffect, useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { collection, doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";
import "@blocknote/core/style.css";

const TextEditor = ({ projectId }) => {
  const editor = useBlockNote({});
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Listen for content changes in the editor
    editor.onEditorContentChange(() => {
      // Update the state with the top-level blocks
      setBlocks(editor.topLevelBlocks);

      // Store the content in Firebase
      storeContentInFirebase(editor.topLevelBlocks, projectId);
    });

    // Fetch and display the stored content on component mount
    fetchAndDisplayStoredContent(projectId);
  }, [editor, projectId]);

  const storeContentInFirebase = async (content, projectId) => {
    try {
      const projectDocRef = doc(db, "projects", projectId);
      await setDoc(projectDocRef, { content }, { merge: true });
    } catch (error) {
      console.error("Error storing content in Firebase:", error);
    }
  };

  const fetchAndDisplayStoredContent = async (projectId) => {
    try {
      const projectDoc = await doc(db, "projects", projectId);
      const projectData = (await projectDoc.get()).data();

      if (projectData && projectData.content) {
        // Set the editor's content to the stored content
        editor.setContent(projectData.content);
      }
    } catch (error) {
      console.error("Error fetching stored content:", error);
    }
  };

  return (
    <div>
      {/* BlockNote editor view */}
      <BlockNoteView editor={editor} />

      {/* Display JSON representation of blocks */}
      <pre>{JSON.stringify(blocks, null, 2)}</pre>
    </div>
  );
};

export default TextEditor;
