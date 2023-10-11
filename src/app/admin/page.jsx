

"use client";
import React, { useState, useEffect } from "react";
import getToken from "@/utile/getToken";
import Students from "@/components/Students";
import Facilitators from "@/components/Facilitators";
import Requests from '@/components/Requests'
export default function Admin() {
  const [activeComponent, setActiveComponent] = useState('Facilitators');


  const renderComponent = () => {
    switch (activeComponent) {
      case 'Facilitators':
        return <Facilitators />;
      case 'Students':
        return <Students />;
      case 'Requests':
        return <Requests />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-screen h-screen flex">
      <div className="bg-[#35C082] w-[15rem] shadow-5xl px-5 py-5">
        <h1 className="text-white text-xl font-bold">Welcome: </h1>
        <div className="flex flex-col gap-2.5 mt-10">
          <button
            className={`bg-white/10 px-5 py-3 text-lg font-semibold rounded ${
              activeComponent === 'Facilitators' ? 'text-white' : 'text-gray-500'
            }`}
            onClick={() => setActiveComponent('Facilitators')}
          >
            Facilitators
          </button>
          <button
            className={`bg-white/10 px-5 py-3 text-lg font-semibold rounded ${
              activeComponent === 'Students' ? 'text-white' : 'text-gray-500'
            }`}
            onClick={() => setActiveComponent('Students')}
          >
            Students
          </button>
          <button
            className={`bg-white/10 px-5 py-3 text-lg font-semibold rounded ${
              activeComponent === 'Requests' ? 'text-white' : 'text-gray-500'
            }`}
            onClick={() => setActiveComponent('Requests')}
          >
            Requests
          </button>
        </div>
      </div>

      <div className="px-20 py-10 w-5/6">
        {renderComponent()}
      </div>
    </div>
  );
}

