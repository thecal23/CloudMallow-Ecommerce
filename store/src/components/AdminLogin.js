import React, {useState} from "react"


function AdminLogin(){
    const [registerUsername, setRegisterUsername] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [data, setData] = useState(null)

    
      
    const register = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/register", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: registerUsername,
            password: registerPassword,
          }),
        });
    
        if (!response.ok) {
          throw new Error("Registration failed");
        }
    
        const data = await response.json();
        console.log("Registration successful", data);
        // Handle success or show a success message
      } catch (error) {
        console.log("Registration failed", error);
        // Handle error or show an error message
      }
    };  

    

    const login = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginUsername,
            password: loginPassword,
          }),
        });
    
        if (!response.ok) {
          throw new Error("Login failed");
        }
    
        const data = await response.json();
        console.log("Login successful", data);
        // Handle success or redirect to another page
      } catch (error) {
        console.log("Login failed", error);
        // Handle error or show an error message
      }
    };

    
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/user", {
          method: "GET",
          credentials: "include", // Use "include" to send credentials (cookies) with the request
        });
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const data = await response.json();
        setData(data);
        console.log("got a response")
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
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