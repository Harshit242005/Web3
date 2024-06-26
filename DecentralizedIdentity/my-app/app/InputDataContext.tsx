'use client';
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface InputDataContextProps {
  children: ReactNode;
}

interface InputDataContextValue {
  inputData: string;
  setInputData: Dispatch<SetStateAction<string>>;

  // writing some for the cid handling as well
  cidData: string;
  setCidData: Dispatch<SetStateAction<string>>;
}

const InputDataContext = createContext<InputDataContextValue | undefined>(undefined);

export const InputDataProvider: React.FC<InputDataContextProps> = ({ children }) => {
  const [inputData, setInputData] = useState<string>('');
  const [cidData, setCidData] = useState('');

  const value: InputDataContextValue = {
    inputData,
    setInputData,
    cidData,
    setCidData
  };

  return (
    <InputDataContext.Provider value={value}>
      {children}
    </InputDataContext.Provider>
  );
};

export const useInputData = (): InputDataContextValue => {
  const context = useContext(InputDataContext);

  if (!context) {
    throw new Error('useInputData must be used within an InputDataProvider');
  }

  return context;
};
