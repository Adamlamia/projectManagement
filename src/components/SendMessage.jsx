//import { async } from "@firebase/util";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();

  const handleSendmessage = async (e) => {
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
      console.log(error);
    }
    // console.log(value);
    setValue(""); //make the textbox clean again
  };

  return (
    <div className="">
      <form onSubmit={handleSendmessage} className="flex">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input input-bordered input-sm w-full max-w-xs"
          type="text"
          placeholder="Type Here"
        />
        <button
          type="submit"
          className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
