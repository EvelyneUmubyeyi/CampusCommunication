"use client"



import Image from 'next/image'
import jwt from 'jsonwebtoken';
import {useState, useEffect} from 'react';
import getToken from '@/utile/getToken';

export default function Home() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
    }
  }, []);

  console.log("tokekkkk", token)

  if (token) {
    try {
      const decodedToken = jwt.decode(token);
      console.log("tokennndsfd", decodedToken)
      // const userId = decodedToken.id; // Assuming the ID is stored as 'id' in the token payload.
    } catch (error) {
      // Handle token decoding errors here.
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>testttt</h1>
    </main>
  )
}
