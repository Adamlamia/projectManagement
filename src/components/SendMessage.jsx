import { useState } from "react"


const SendMessage = () => {
const [value, setValue] = useState("");
console.log(value);

  return (
    <div className="bg bg-secondary-content bottom-0 w-full py-3 shadow-lg rounded">
        <form className="flex">
            <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
            <button className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">Send</button>
        </form>
    </div>
     
  )
}

export default SendMessage