"use client"
import { useState, useEffect } from "react";
export default function Requests(){

    const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("tokenenee", token);

        const response = await fetch(
          "http://localhost:7001/api/v1/users/request/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching facilitators: ", error);
      }
    };

    fetchData();
  }, []);
    return(
             <div className="grid grid-cols-4 gap-5">
        {requests && Array.isArray(requests.data)
          ? requests.data.map((request) => {
            console.log("request admin", request)
            return(
                (
                    <div key={request.requestId} className="shadow-5xl p-5 rounded bg-[#35C082]/20">
                      <div className="flex gap-2">
                        <p>
                        Category:

                        </p>
                        {request.requestCategory} 
                      </div>
                      <div  className="flex gap-2">
                        <p>
                        Title:
                        </p>
                        {request.title} 
                      </div>
                      <div  className="flex gap-2">
                       <p>
                       Details:</p> 
                        {request.detail} 
                      </div>
      
      
                    </div>
                  )
            )
          })
          : null}
      </div>
    )
}