"use client"
import React, { useState, useEffect } from "react";
import getToken from '@/utile/getToken';
import jwt from "jsonwebtoken";

export default function Facilitator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [request, setRequest] = useState([]);
  const [token, setToken] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null); 
const [reply, setReply] = useState("")
  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const decodedToken = jwt.decode(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:7001/api/v1/users/request/single", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRequest(data);
      } catch (error) {
        console.error('Error fetching requests: ', error);
      }
    };

    fetchData();
  }, []);

  const handleReply = async (requestId) => {
    console.log("i am selected", requestId)




    fetch(`http://localhost:7001/api/v1/users/request/${requestId}/feedback`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 

      },
    })
      .then((response) => {
        console.log("heyyy", response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
  
        setReply(data)
        
        openModal();
      })
      .catch((error) => {
        console.error('Error sending reply:', error);
      });
    console.log("Request replied");
  };

  const openModal = (requestId) => {
    console.log("heyyy", requestId)
    setSelectedRequestId(requestId); // Store the selected request's ID

    setIsModalOpen(true);
  };

  console.log("testttttt Id", selectedRequestId)
console.log("relplyysssssssssss", reply)


  const closeModal = () => {
    setSelectedRequestId(null); // Clear the selected request's ID
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Facilitator</h1>
      <p>Welcome {decodedToken?.firstName}</p>
      <p>Below are all requests assigned to you!</p>

      <div className="grid grid-cols-4 px-44 py-20 gap-5">
        {request && Array.isArray(request.data) && request.data.map((req) => (
          <div key={req.requestId} className="bg-[#35C082]/10 p-5 rounded shadow-xl">
            <p>{req?.detail}</p>
            <button onClick={() => handleReply(req.requestId)}>View  reply</button> 
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#35C082] shadow-2xl p-5 w-[20rem] h-[20rem] rounded mt-10 text-white  relative">

          {
  reply && Array.isArray(reply.data)
    ? reply.data.map((rep, index) => {
        console.log("reppppppp", rep);
        return (
          <div key={index} className="">
            <p className="text-lg">{rep.detail}</p>
          </div>
        );
      })
    : null
}

      

            <button onClick={closeModal} className="bg-red-500 shadow-xl px-5 py-2 text-white font-semibold rounded absolute bottom-5 w-4/5">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
