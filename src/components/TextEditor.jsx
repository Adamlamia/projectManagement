import React from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

const TextEditor = () => {
  const editor = useBlockNote();
  return (
    <textarea className="w-max textarea textarea-bordered" placeholder="Bio">
      <BlockNoteView editor={editor} />
    </textarea>
  );
};

export default TextEditor;
