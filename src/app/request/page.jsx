"use client"


import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import getToken from '@/utile/getToken';
export default function Request() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
    }
  }, []);
  const [facilitators, setFacilitators] = useState([]);
  const [selectedFacilitator, setSelectedFacilitator] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const token = localStorage.getItem("token");
  console.log("tokenenee", token)

        const response = await fetch("http://localhost:7001/api/v1/users/all-faculty", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setFacilitators(data);
      } catch (error) {
        console.error('Error fetching facilitators: ', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleFacilitatorChange = (selectedOption) => {
    setSelectedFacilitator(selectedOption);
  };




  const facilitatorOptions = facilitators && Array.isArray(facilitators.data)
  ? facilitators.data.map((facilitator) => ({
      value: facilitator.userId,
      label: facilitator.firstName,
    }))
  : [];


  const [formData, setFormData] = useState({
    requestCategory: "",
    assigneeId: "",
    detail: "",
    title:""
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { requestCategory, detail, title } = formData;

    if (requestCategory === "" || detail === "") {
      toast.error("Please add request type and body");
    }

    const facilitatorId = selectedFacilitator ? selectedFacilitator.value : null;

    if (requestCategory === "Academic" && !facilitatorId) {
      toast.error("Please specify the facilitator!");
      return;
    }

    const requestData = {
      requestCategory: formData.requestCategory,
      assigneeId: facilitatorId,
      detail: formData.detail,
      title: formData.title,
    };

    try {
      const response = await fetch("http://localhost:7001/api/v1/users/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("response csuccc", response)
      } else {
        // Handle errors or failed requests
      }
    } catch (error) {
      console.error("Error sending the request:", error);
    }
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-[90%] m-auto mt-4 lg:mt-16 mb-10 ml:w-[80%] md:w-[70%] lg:w-[60%] ll:w-[50%] md:mt-10 lg:mb-20"
      >
        <div className="flex md:justify-center mb:mb-12 lg:mb-8">
          <p className="font-semibold text-lg md:text-2xl lg:text-3xl md:font-bold">
            Send Request
          </p>
        </div>
        <label className="text-black flex flex-col mt-3 text-sm lg:text-base">
          <span>Request title</span>
          <textarea
            className="bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md w-full h-24"
            name="title"
            placeholder="Add Request Body"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="text-black flex flex-col mt-3 text-sm lg:text-base">
          <span>Request type</span>
          <select
            className="appearance-none bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
            name="requestCategory"
            value={formData.requestCategory}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Request Type
            </option>
            <option value="Academic">Academic</option>
            <option value="Administrative">Administrative</option>
          </select>
        </label>
        {formData.requestCategory === "Academic" && (
          <label className="text-black flex flex-col mt-3 text-sm lg:text-base">
            <span>Facilitator</span>
            <Select
              options={facilitatorOptions}
              value={selectedFacilitator}
              onChange={handleFacilitatorChange}
              placeholder="Select a facilitator"
            />
          </label>
        )}
        <label className="text-black flex flex-col mt-3 text-sm lg:text-base">
          <span>Request body</span>
          <textarea
            className="bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md w-full h-24"
            name="detail"
            placeholder="Add Request Body"
            value={formData.detail}
            onChange={handleChange}
          />
        </label>
        <button
          className={`w-full bg-[#35C082] text-white font-semibold py-2 rounded-md mt-6 lg:mt-10`}
        >
          Send
        </button>
      </form>
    </>
  );
}
