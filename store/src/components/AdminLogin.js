import React, {useState} from "react"
import axios from "axios"

function AdminLogin(){
    const [registerUsername, setRegisterUsername] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [data, setData] = useState(null)

    const register = () => {
        fetch("http://localhost:4000/admin/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: registerUsername,
            password: registerPassword,
          }),
        })
          .then((response) => response)
          .then((data) => {
            console.log("Registration successful", data);
            // Handle success or show a success message
          })
          .catch((error) => {
            console.log("Registration failed", error);
            // Handle error or show an error message
          });
      };
      
      

    const login = () => {
        fetch("http://localhost:4000/admin/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: loginUsername,
              password: loginPassword,
            }),
          })
            .then((response) => response)
            .then((data) => {
              console.log("Login successful", data);
              // Handle success or redirect to authenticated page
            })
            .catch((error) => {
              console.log("Login failed", error);
              // Handle error or show an error message
            });
    }

    const getUser = () => {
        fetch("http://localhost:4000/admin/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => setData(response.json()))
            .then((response) => {
              console.log("User data", response);
              // Handle retrieved user data
            })
            .catch((error) => {
              console.log("Failed to get user", error);
              // Handle error or show an error message
            });
    }

    return (
        <>
        <div>
            <h1>Register</h1>
            <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
            <input placeholder='password'onChange={e => setRegisterPassword(e.target.value)}/>
            <button onClick={register}>Submit</button>
        </div>
        <div>
            <h1>Login</h1>
            <input placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
            <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}/>
            <button onClick={login}>Submit</button>
        </div>
        <div>
            <h1>Get User</h1>
            <button onClick={getUser}>Submit</button>
            {
                data ? <h1>Welcome Back {data.username}</h1> : null
            }
        </div>
        </>
    )
}

export default AdminLogin