import React from 'react'

function Testing() {
    function fetchData() {
        fetch("http://localhost:4000/testing", {
            credentials: 'include'
        })
          .then((response) => {
            if (!response.redirected) {
              throw new Error("redirected is false");
            }
            console.log(response.url)
            window.location.href = response.url
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      
      
      
  return (
    <>
        <div>Testing</div>
        <button onClick={fetchData}>Submit</button>
    </>

  )
}

export default Testing