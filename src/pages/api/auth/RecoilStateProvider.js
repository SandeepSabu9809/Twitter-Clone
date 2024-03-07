'use client';
import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilStateProvider = ({ children }) => {
  return React.createElement(RecoilRoot, null, children);
};

export { RecoilStateProvider };
