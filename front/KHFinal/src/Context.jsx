// 다크모드 클래스 사용법
//import { Context } from '../../../Context';
// 호버클래스를 적용하려면 getDarkModeHover()를 사용
// 일반다크모드 적용은 getDarkMode()를 사용
// const { getDarkMode, getDarkModeHover } = useContext(Context); 로 호출
// className={`${getDarkModeHover()}`} 와 같이 사용
// 이외에 다른 css를 적용하려면 !important를 사용해서 적용

// 다크모드에 맞는 클래스를 반환하는 함수

import React, { createContext, useState, useMemo, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleLogout } from './page/user/userApi';
import { useNavigate } from 'react-router-dom';

export const Context = createContext();

export const Provider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    sessionStorage.getItem('darkMode') === 'true'
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );

  const [userNickname, setUserNickname] = useState(
    sessionStorage.getItem('userNickname') || ''
  );

  // ✅ 로그인 시간 (Unix Timestamp)
  const [loginTime, setLoginTime] = useState(() => {
    return sessionStorage.getItem('loginTime')
      ? Number(sessionStorage.getItem('loginTime'))
      : null;
  });
  const [userRole, setUserRole] = useState(
    sessionStorage.getItem('userRole') || ''
  );
  // ✅ 로그인 함수
  const login = (nickname, role) => {
    const currentTime = Math.floor(Date.now() / 1000);
    setIsAuthenticated(true);
    setUserNickname(nickname);
    setLoginTime(currentTime);
    setUserRole(role);
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userNickname', nickname);
    sessionStorage.setItem('loginTime', currentTime.toString());
  };
  const navigate = useNavigate;
  // ✅ 로그아웃 함수
  const logout = () => {
    handleLogout();
    setIsAuthenticated(false);
    setUserNickname('');
    setLoginTime(null);
    setUserRole('');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userNickname');
    sessionStorage.removeItem('loginTime');
  };

  // ✅ 다크모드 적용 함수
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

  // ✅ useMemo를 사용하여 value 변경 시 불필요한 리렌더링 방지
  const providerValue = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      getDarkMode,
      getDarkModeHover,
      login,
      isAuthenticated,
      userNickname,
      setUserNickname,
      setIsAuthenticated,
      logout,
      loginTime,
      setLoginTime,
      userRole,
      setUserRole,
    }),
    [darkMode, isAuthenticated, userNickname, loginTime]
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
