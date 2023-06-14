import React from "react";
import {
  BlockNoteView,
  defaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";

const TextEditor = () => {
  const newSlashMenuItems = defaultReactSlashMenuItems;

  const editor = useBlockNote(
    { slashMenuItems: newSlashMenuItems },
    {
      editorDOMAttributes: {
        class: "textEditorStyle",
      },
    }
  );
  return (
    <div placeholder="Bio">
      <div>
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
