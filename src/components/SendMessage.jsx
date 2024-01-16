import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Enter Valid Message!");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setValue("");
  };

  return (
    <div className="">
      <form onSubmit={handleSendMessage} className="flex">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input input-bordered input-sm w-full max-w-xs"
          type="text"
          placeholder="Type Here"
        />
        <button
          type="submit"
          className="btn btn-primary ml-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
