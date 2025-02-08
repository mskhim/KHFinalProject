import React, { createContext, useContext, useState, useEffect } from 'react';

// EventContext를 생성
const EventContext = createContext();

// EventProvider 컴포넌트
export const EventProvider = ({ children }) => {
  

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

// `useEventContext` 커스텀 훅
export const useEventContext = () => {
  return useContext(EventContext);
};
