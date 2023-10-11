"use client"
import React, { useState, useEffect } from "react";
import getToken from '@/utile/getToken';
import jwt from "jsonwebtoken";

export default function Facilitator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [request, setRequest] = useState([]);
  const [token, setToken] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null); // Store the selected request's ID

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

  const handleReply = async () => {
    if (selectedRequestId === null) {
      console.error('No request selected to reply to');
      return;
    }

    const requestData = {
      detail: textAreaValue,
    };

    fetch(`http://localhost:7001/api/v1/users/request/${selectedRequestId}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 

      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle success response
        console.log('Reply sent successfully:', data);

        // Clear the text area and close the modal
        setTextAreaValue('');
        closeModal();
      })
      .catch((error) => {
        // Handle error
        console.error('Error sending reply:', error);
      });
    console.log("Request replied");
  };

  const openModal = (requestId) => {
    setSelectedRequestId(requestId); // Store the selected request's ID

    setIsModalOpen(true);
  };

  console.log("testttttt Id", selectedRequestId)


  const closeModal = () => {
    setSelectedRequestId(null); // Clear the selected request's ID
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Facilitator</h1>
      <p>Welcome {decodedToken?.firstName}</p>
      <p>Below are all requests assigned to you!</p>

      <div>
        {request && Array.isArray(request.data) && request.data.map((req) => (
          <div key={req.requestId}>
            <p>{req?.detail}</p>
            <button onClick={() => openModal(req.requestId)}>Reply</button> {/* Pass the request's ID */}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal">
            <textarea
              className="w-full h-32 p-2 border rounded"
              placeholder="Enter your reply"
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
            />

            <button onClick={handleReply}>Submit</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
