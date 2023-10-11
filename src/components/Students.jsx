import React, { useState, useEffect } from "react";

export default function Students() {
  const [students, setStudents] = useState({ data: [] });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("tokenenee", token);

        const response = await fetch("http://localhost:7001/api/v1/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setStudents({ data });
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };

    fetchStudents();
  }, []);

  console.log("testtttt", typeof students);

  return (
    <div className=" w-full">
      <h1>Students</h1>

      <table className="table-auto w-4/5 mx-auto">
  <thead>
    <tr>
      <th className="py-2 px-4 bg-gray-200 text-gray-600 uppercase font-normal text-start">First Name</th>
      <th className="py-2 px-4 bg-gray-200 text-gray-600 uppercase font-normal  text-start">Last Name</th>
      <th className="py-2 px-4 bg-gray-200 text-gray-600 uppercase font-normal  text-start">Email</th>
    </tr>
  </thead>
  <tbody>
    {Object.values(students.data).map((student, index) => (
      <tr key={index} className="bg-gray-100 border-b border-gray-200">
        <td className="py-2 px-4">{student.firstName}</td>
        <td className="py-2 px-4">{student.lastName}</td>
        <td className="py-2 px-4">{student.email}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
