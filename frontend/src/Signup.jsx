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
        
            <div className="bg-black flex flex-col justify-center text-center min-h-screen items-center">
                <div >
                    <h1 className="text-3xl w-auto text-green-800 font-medium px-5 py-3 mt-5 mb-4">Sign Up</h1>

                </div>
                <div className=" flex flex-col items-center p-6 mt-3">

                    <input placeholder="username" value={user} className=" w-full text-black outline-none p-2 border border-green-500 rounded-md mb-5" onChange={(e) => setUser(e.target.value)}></input>
                    <input placeholder="password" value={pass} className=" w-full  text-black outline-none p-2 border border-green-500 rounded-md mb-5" onChange={(e) => setpass(e.target.value)}></input>
                    <button className="bg-green-700 p-2 w-fit mb-7 text-black font-medium rounded-md " onClick={signupUser}>SignUp</button>
                </div>


            </div>
        
    )
}
export default Signup