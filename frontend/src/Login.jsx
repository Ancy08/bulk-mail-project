import { useState } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import auth from "./config"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


function Login() {
    const [user, setUser] = useState("")
    const [pass, setpass] = useState("")
    const Navigate = useNavigate()
    function loginUser() {
        signInWithEmailAndPassword(auth, user, pass).then(() => {
            console.log("User loggedin")
            Navigate("/home")

        }).catch(() => {
            console.log("User Failed to login")
            alert("Invalid email or password");
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, function (user) {
            if (user) {
                console.log("Logged In")

            }
            else {
                console.log('Logged out')
            }
        })
    }, [])

    return (
        <div className="bg-black flex flex-col justify-center min-h-screen text-center items-center">
            <h1 className="text-2xl  text-green-800 font-medium px-5 mt-3 py-3 mb-4">LogIn</h1>
            <div className="flex flex-col items-center p-6 mt-3">
                <input placeholder="username" value={user} className="w-full text-black outline-none p-2 border border-green-500 rounded-md mb-5" onChange={(e) => setUser(e.target.value)}></input>
                <input placeholder="password" value={pass} className="w-full text-black outline-none p-2 border border-green-500 rounded-md mb-5" onChange={(e) => setpass(e.target.value)}></input>
                <button className="bg-green-700 p-2 w-fit mb-7 text-black font-medium rounded-md " onClick={loginUser}>Login</button>
            </div>


        </div>
    )
}
export default Login