"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import getToken from "@/utile/getToken";
import { useRouter } from "next/navigation";

type Request = {
  type: string;
  facilitator: string;
  title: string;
  body: string;
};

export default function Request() {
  const router = useRouter();
  const [facilitators, setFacilitators] = useState([]);
  const [formData, setFormData] = useState<Request>({
    type: "",
    facilitator: "",
    title: "",
    body: "",
  });
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

  const facilitatorOptions =
    facilitators && Array.isArray(facilitators.data)
      ? facilitators.data.map((facilitator: any) => ({
          value: facilitator.userId,
          label: facilitator.firstName,
        }))
      : [];

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { title, type, facilitator, body } = formData;

    if (title === "" && type === "" && body === "") {
      toast.error("Please add request type, title and body");
    }

    if (facilitator === "" && type === "Academic") {
      toast.error("Please specify the facilitator!");
    }

    const requestData = {
      requestCategory: type,
      detail: body,
      title: title,
    };
    console.log('facilitator', facilitator)

    if (facilitator !== "") {
      requestData.assigneeId = facilitator;
    }

    console.log('requestData', requestData)

    try {
      const response = await fetch(
        "http://localhost:7001/api/v1/users/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        toast.success("Request created successfully!");
        router.push("/student");
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
          <span>Request type</span>
          <select
            className="appearance-none bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Request Type
            </option>
            <option value="academic">Academic</option>
            <option value="administrative">Administrative</option>
          </select>
        </label>
        {formData.type === "academic" && (
          <label className="text-black flex flex-col mt-3 text-sm lg:text-base">
            <span>Facilitator</span>
            <select
              className="appearance-none bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
              name="facilitator"
              value={formData.facilitator}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Facilitator
              </option>
              {facilitatorOptions.map((facilitator: any) => (
                <option key={facilitator.value} value={facilitator.value}>
                  {facilitator.label}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="text-black flex flex-col mt-3 text-sm lg:text-base">
          <span>Request Title</span>
          <input
            className="bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
            name="title"
            placeholder="Add Request Title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="text-black flex flex-col mt-3 text-sm lg:text-base">
          <span>Request body</span>
          <textarea
            className="bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md w-full h-24"
            name="body"
            placeholder="Add Request Body"
            value={formData.body}
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
