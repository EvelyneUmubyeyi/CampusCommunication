"use client";
import { useState, useEffect } from "react";
import getToken from "@/utile/getToken";

export default function Requests() {
  const [selectedRequestId, setSelectedRequestId] = useState(null); // Store the selected request's ID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [token, setToken] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
    }
  }, []);

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

  const closeModal = () => {
    setSelectedRequestId(null); // Clear the selected request's ID
    setIsModalOpen(false);
  };
  console.log("requests", requests);

  const handleReply = async () => {
    if (selectedRequestId === null) {
      console.error("No request selected to reply to");
      return;
    }

    const requestData = {
      detail: textAreaValue,
    };

    fetch(
      `http://localhost:7001/api/v1/users/request/${selectedRequestId}/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle success response
        console.log("Reply sent successfully:", data);

        // Clear the text area and close the modal
        setTextAreaValue("");
        closeModal();
      })
      .catch((error) => {
        // Handle error
        console.error("Error sending reply:", error);
      });
    console.log("Request replied");
  };

  const openModal = (requestId) => {
    setSelectedRequestId(requestId); // Store the selected request's ID

    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-2xl py-5 w-[20rem] h-[20rem] rounded mt-10 text-white relative flex flex-col items-center">
            {/* {reply && Array.isArray(reply.data) && reply.data.length > 0 ? (
              reply.data.map((rep, index) => {
                return (
                  <div key={index} className="w-4/5">
                    <p className="text-lg text-black w-full">{rep.detail}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-lg text-black w-4/5">No reply</p>
            )}

            <button
              onClick={closeModal}
              className="bg-[#35C082] shadow-xl py-2 text-white font-semibold rounded absolute bottom-5 w-4/5"
            >
              Close
            </button> */}
            <div className="modal w-4/5">
              <textarea
                className="w-full h-32 p-2 border roundedv text-black"
                placeholder="Enter your reply"
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
              />
              <div className="w-[4/5] flex justify-start absolute bottom-5">
                <button
                  className="bg-[#35C082] shadow-xl py-2 px-8 mr-4 text-white font-semibold rounded w-[1/2]"
                  onClick={handleReply}
                >
                  Submit
                </button>
                <button
                  className="bg-[#35C082] shadow-xl py-2 px-8 text-white font-semibold rounded w-[1/2]"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
              
            </div>
          </div>
        </div>
      )}
      <div
        className={`${isModalOpen ? "h-screen bg-black bg-opacity-50" : ""}`}
      >
        <div className="grid grid-cols-4 gap-5">
          {requests && Array.isArray(requests.data)
            ? requests.data.map((request) => {
                console.log("request admin", request);
                return (
                  <div
                    key={request.requestId}
                    className="shadow-5xl p-5 rounded bg-[#35C082]/20"
                  >
                    <div className="flex gap-2">
                      <p>Category:</p>
                      {request.requestCategory}
                    </div>
                    <div className="flex gap-2">
                      <p>Title:</p>
                      {request.title}
                    </div>
                    <div className="flex gap-2">
                      <p>Details:</p>
                      {request.detail}
                    </div>
                    <p
                      className="font-bold"
                      onClick={() => {
                        console.log('i sayyyyy')
                        if (request.requestCategory === "academic") {
                          viewReply(request.requestId);
                        }else{
                          openModal(request.requestId);
                        }
                      }}
                    >
                      {request.requestCategory === "academic"
                        ? "View Reply"
                        : "Reply"}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
