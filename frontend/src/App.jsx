import { useState } from "react"
import * as XLSX from "xlsx"
import axios from "axios"
function App() {
  function handleFile(event) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
      const data = event.target.result
      const workbook = XLSX.read(data, { type: "ArrayBuffer" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 'A' })
      const totalemail = emailList.map(function (item) {
        return item.A
      })
      console.log(totalemail)
      setemailList(totalemail)
    }
    reader.readAsArrayBuffer(file)
  }
  const [msg, setMsg] = useState("")
  const [sub, setSub] = useState("")
  const [emailList, setemailList] = useState([])
  const [status, setstatus] = useState(false)
  // history section

  const [history, sethistory] = useState([])
  const [showHistory, setshowHistory] = useState(false)
  // body function
  const handleMsg = (event) => {
    setMsg(event.target.value)
  }
  // subject function
  const handleSub = (event) => {
    setSub(event.target.value)
  }
  // send function
  const send = () => {
    setstatus(true)
    axios.post("https://passkey.onrender.com/sendmail", { msg: msg, sub: sub, emailList: emailList })
      .then(function (data) {
        if (data.data === true) {
          alert("Email sent successfully")
          setstatus(false)
        }
        else {
          alert("Failed")
        }
      })
  }
  function fetchHistory() {
    axios.get("https://passkey.onrender.com/history")
      .then(res => {
        sethistory(res.data)
        setshowHistory(true)
      })
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-black text-green-600 text-center">
        <h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
      </div>
      <div className="bg-gray-950 text-green-400 text-center">
        <h1 className="font-medium px-5 py-3">We will help your business by sending multiple email at once</h1>
      </div>
      <div className="bg-black text-green-600 text-center">
        <h1 className="font-medium px-5 py-3">Drag and Drop</h1>
      </div>
      <div className="bg-gray-850 flex flex-col items-center text-black p-2">
        <input onChange={handleSub} value={sub} className="w-[80%] outline-none p-2 bg-gray-900 border border-green-600 rounded-md mb-5" placeholder="Enter email subject here" type="text"></input>
        <textarea onChange={handleMsg} value={msg} className="h-32 w-[80%] outline-none p-2 border bg-gray-900 border-green-600 rounded-md" placeholder="Enter email body here"></textarea>
        <input onChange={handleFile} type="file" className="border-green-900 border-4 text-white border-dashed p-4 mt-5 mb-5"></input>
        <p>Total number of emails:{emailList.length}</p>
        <button onClick={send} className="bg-green-700 p-2 w-fit text-black font-medium rounded-md ">{status ? "sending..." : "Send"}</button>
      </div>
      <div className="text-white text-center p-8">
        <button onClick={fetchHistory} className="bg-green-700 p-2 w-fit text-black font-medium rounded-md ">View Email History</button>
        {showHistory && (
          <div className="p-4 w-[80%] mt-4 mx-auto rounded-md shadow-md bg-white text-black">
            <h2 className="text-xl font-bold mb-3">Email History</h2>

            {history.length === 0 ? (
              <p>No emails sent yet</p>
            ) : (
              history.map((item, index) => (
                <div key={index} className="border p-3 rounded-md mb-2">
                  <p><b>Subject:</b> {item.subject}</p>
                  <p><b>Body:</b> {item.body}</p>
                  <p><b>Recipients:</b> {item.recipients.join(", ")}</p>
                  <p><b>Status:</b> {item.status}</p>
                  <p><b>Date:</b> {new Date(item.date).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>


      <div className="bg-gray-950 text-white text-center p-8">

      </div>
    </div>
  )
}

export default App
