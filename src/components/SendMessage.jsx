import { useState } from "react"


const SendMessage = () => {
const [value, setValue] = useState("");
console.log(value);

const handleSendmessage = (e) => {
  e.preventDefault();
  console.log(value);
  setValue("");//make the textbox clean again
}

  return (
    <div className="sendMessageContainer">
        <form onSubmit={handleSendmessage} className="flex">
            <input value={value} onChange={e => setValue(e.target.value)} className="px-2 input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
            <button type="submit" className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">Send</button>
        </form>
    </div>
     
  )
}

export default SendMessage