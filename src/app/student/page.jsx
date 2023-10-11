"use client";
import React, { useState, useEffect } from "react";
import getToken from "@/utile/getToken";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

export default function Facilitator() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [request, setRequest] = useState([]);
  const [token, setToken] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [reply, setReply] = useState("");
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
        const response = await fetch(
          "http://localhost:7001/api/v1/users/request/single",
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
        setRequest(data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching requests: ", error);
      }
    };

    fetchData();
  }, []);

  const handleReply = async (requestId) => {
    fetch(`http://localhost:7001/api/v1/users/request/${requestId}/feedback`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("heyyy", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReply(data);

        openModal();
      })
      .catch((error) => {
        console.error("Error sending reply:", error);
      });
    console.log("Request replied");
  };

  const openModal = (requestId) => {
    console.log("heyyy", requestId);
    setSelectedRequestId(requestId); // Store the selected request's ID

    setIsModalOpen(true);
  };

  console.log("testttttt Id", selectedRequestId);
  console.log("relplyysssssssssss", reply);

  const closeModal = () => {
    setSelectedRequestId(null); // Clear the selected request's ID
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-2xl py-5 w-[20rem] h-[20rem] rounded mt-10 text-white relative flex flex-col items-center">
            {reply && Array.isArray(reply.data) && reply.data.length > 0 ? (
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
            </button>
          </div>
        </div>
      )}
      <div className={`${isModalOpen ? "h-screen bg-black bg-opacity-50" : ""}`}>
        <div className="p-12 py-8 z-10">
          <div className="flex w-full justify-between pb-4">
            <p className="font-bold text-lg">
              Welcome {decodedToken?.firstName}
            </p>
            <button
              className="bg-[#35C082] text-white px-3 py-1 rounded-md"
              onClick={() => router.push("/request")}
            >
              New request
            </button>
          </div>
          <p>Below are all requests submitted by you!</p>

          <div className="grid grid-cols-4 my-16 gap-5">
            {request &&
              Array.isArray(request.data) &&
              request.data.map((req) => (
                <div
                  key={req.requestId}
                  className="bg-[#35C082]/10 p-5 rounded shadow-xl"
                >
                  <p className="font-bold text-sm pb-2">{req?.assignee.firstName} {req?.assignee.lastName}</p>
                  <p className="italic pb-2">{`"${req?.detail}"`}</p>
                  <button
                    className="font-semibold text-sm"
                    onClick={() => handleReply(req.requestId)}
                  >
                    View reply
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
