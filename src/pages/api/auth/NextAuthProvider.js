"use client";
import React from 'react';


import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children }) => {
  return React.createElement(SessionProvider, null, children);
};

export { NextAuthProvider };
