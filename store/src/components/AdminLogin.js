import React, {useState} from "react"
import AdminNavbar from "./AdminNavbar"


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
          credentials: "include", // Include credentials (cookies)
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Login successful", data);
          // Handle success or redirect to another page
        } else {
          const errorData = await response.json(); // Parse error response data
          console.log("Login failed", errorData);
          // Handle error or show an error message
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle network or other errors here
      }
    };
    

    
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/user", {
          method: "GET",
          credentials: "include", // Use "include" to send credentials (cookies) with the request
        });
        console.log(response)
        const data = await response.json()
        if (data.url === "http://localhost:3000/admin/login"){
          window.location.href = data.url
        }  else if (!response.ok) {
            throw new Error("Network response was not ok"); 
        } else if (response.ok) {
          console.log(data)
          setData(data)
          console.log("got a response")
        }
        // else if (!response.redirected){
        //   throw new Error("Redirected false")
        // }
        // window.location.href = response.url
        
        // const data = await response.json();
        
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const logout = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/logout", {
          method: "GET",
          credentials: "include" 
        })

        if(!response.ok){
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        console.log(data.message)
        // console.log("User is logged out")

      } catch (error){
        console.error("Error logging out user : ", error)
      }
    }
    
    return (
        <>
          
            <div className="row">
              <container className="vh-100 col-2">
                  <AdminNavbar />
              </container>
              <container className="vh-100 col-5 overflow-auto m-3">
                  <div className="col">
                    <h1>Register</h1>
                    <input className="form-control mb-2" placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
                    <input className="form-control mb-2" placeholder='password'onChange={e => setRegisterPassword(e.target.value)}/>
                    <button className="btn btn-primary" onClick={register}>Submit</button>
                  </div>
                  <div className="col">
                    <h1>Login</h1>
                    <input className="form-control mb-2" placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
                    <input className="form-control mb-2" placeholder='password' onChange={e => setLoginPassword(e.target.value)}/>
                    <button className="btn btn-primary" onClick={login}>Submit</button>
                  </div>
                  {/* <div className="col">
                      <h1>Get User</h1>
                      <button className="btn btn-primary" onClick={getUser}>Submit</button>
                      {
                          data ? <h1>Welcome Back {data.username}</h1> : null
                      }
                  </div> */}
                  <div className="row mt-5">
                    <h1 className="text-center">Logout</h1>
                    <button className="btn btn-primary" onClick={logout}>Submit</button>
                  </div>
              </container>
              
            </div>
          
        </>
    )
}

export default AdminLogin