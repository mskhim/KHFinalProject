import React from 'react';
import { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
export const Context = createContext();
export const Provider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // 다크모드 클래스 사용법
  //import { Context } from '../../../Context';
  // 호버클래스를 적용하려면 getDarkModeHover()를 사용
  // 일반다크모드 적용은 getDarkMode()를 사용
  // const { getDarkMode, getDarkModeHover } = useContext(Context); 로 호출
  // className={`${getDarkModeHover()}`} 와 같이 사용
  // 이외에 다른 css를 적용하려면 !important를 사용해서 적용

  // 다크모드에 맞는 클래스를 반환하는 함수

  const getDarkMode = (baseClass = '') => {
    return `${baseClass} ${
      darkMode ? 'dark-mode darkModeClass' : 'light-mode darkModeClass'
    }`.trim();
  };
  const getDarkModeHover = (baseClass = '') => {
    return `${baseClass} ${
      darkMode
        ? 'dark-mode-hover darkModeClass'
        : 'light-mode-hover darkModeClass'
    }`.trim();
  };
  return (
    <Context.Provider
      value={{ darkMode, setDarkMode, getDarkMode, getDarkModeHover }}
    >
      {children}
    </Context.Provider>
  );
};
