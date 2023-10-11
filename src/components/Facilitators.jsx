"use client"

import { useState, useEffect } from "react";
import getToken from "@/utile/getToken";

export default function Facilitators(){
  const [facilitators, setFacilitators] = useState([]);
  const [token, setToken] = useState("");

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
          "http://localhost:7001/api/v1/users/all-faculty",
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
        setFacilitators(data);
      } catch (error) {
        console.error("Error fetching facilitators: ", error);
      }
    };

    fetchData();
  }, []);

  const handleVerify = async (facilitator) => {
    console.log("clicked faciitaro", facilitator);
    try {
      const response = await fetch(
        `http://localhost:7001/api/v1/users/verify-faculty/${facilitator.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("response csuccc", response);
      } else {
      }
    } catch (error) {
      console.error("Error sending the request:", error);
    }
  };
    return(

        <table className="table-auto w-4/5 mx-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 uppercase font-normal text-start">First Name</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 uppercase font-normal  text-start">Last Name</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 uppercase font-normal  text-start">Email</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 uppercase font-normal  text-start">Action</th>
          </tr>
        </thead>
        <tbody>
        {facilitators && Array.isArray(facilitators.data)
          ? facilitators.data.map((facilitator, index) => (
            <tr key={index} className="bg-gray-100 border-b border-gray-200">
              <td className="py-2 px-4">{facilitator.firstName}</td>
              <td className="py-2 px-4">{facilitator.lastName}</td>
              <td className="py-2 px-4">{facilitator.email}</td>
              <td><button  onClick={()=>handleVerify(facilitator)}>Verify</button></td>
            </tr>
          )) : null}
        </tbody>
      </table>

    )
}