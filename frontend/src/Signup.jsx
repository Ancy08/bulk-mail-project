import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "./config"
import { useNavigate } from "react-router-dom"

function Signup() {

    const [user, setUser] = useState("")
    const [pass, setpass] = useState("")
    const Navigate = useNavigate()
    function signupUser() {
        createUserWithEmailAndPassword(auth, user, pass)
            .then(() => {
                console.log("user created successfully")
                Navigate("/login")
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="bg-violet-500 text-center items-center">
            <div >
                <h1 className="text-2xl text-white font-medium px-5 py-3 mb-4">Sign Up</h1>

            </div>
            <div className="bg-violet-400 flex flex-col items-center p-6 mt-3">

                <input placeholder="username" value={user} className="w-[80%] text-black outline-none p-2 border border-black rounded-md mb-5" onChange={(e) => setUser(e.target.value)}></input>
                <input placeholder="password" value={pass} className="w-[80%]  text-black outline-none p-2 border border-black rounded-md mb-5" onChange={(e) => setpass(e.target.value)}></input>
                <button type="" className="bg-blue-700 p-2 w-fit mb-7 text-white font-medium rounded-md " onClick={signupUser}>SignUp</button>
            </div>
            <div className="bg-violet-300 text-white text-center p-8">

            </div>
            <div className="bg-violet-400 text-white text-center p-8">

            </div>

        </div>
    )
}
export default Signup