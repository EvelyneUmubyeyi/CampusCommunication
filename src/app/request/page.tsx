"use client"

import { useState } from "react";
import { toast } from 'react-toastify';

type Request={
    type:string;
    facilitator:string;
    body:string;
}

export default function Request(){
    const [formData, setFormData] = useState<Request>({
        type:'',
        facilitator:'',
        body:''
    })

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        let { name, value } = event.target;
    
        setFormData((prevState:any) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const {type, facilitator, body} = formData;
        if(type === '' && body === ''){
            toast.error('Please add request type and body');
        }

        if(facilitator === '' && type === 'Academic'){
            toast.error('Please specify the facilitator!');
        }
    }

    return(
        <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-[90%] m-auto mt-4 lg:mt-16 mb-10 ml:w-[80%] md:w-[70%] lg:w-[60%] ll:w-[50%] md:mt-10 lg:mb-20"
      >
        <div className="flex md:justify-center mb:mb-12 lg:mb-8">
          <p className="font-semibold text-lg md:text-2xl lg:text-3xl md:font-bold">Send Request</p>
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
            <option value="Academic">Academic</option>
            <option value="Administrative">Administrative</option>
          </select>
        </label>
        {formData.type === 'Academic' && <label className="text-black flex flex-col mt-3 text-sm lg:text-base">
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
            <option value="">Mr. Isaac</option>
            <option value="">Mr. Simeon</option>
          </select>
        </label>}
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