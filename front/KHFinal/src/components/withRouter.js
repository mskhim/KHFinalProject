import React from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ `withRouter`는 `Component`를 감싸서 `navigate`을 props로 전달함
const withRouter = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate(); // ✅ useNavigate() 사용
    return <Component {...props} navigate={navigate} />;
  };

  // ✅ React DevTools에서 보기 쉽게 컴포넌트 이름 설정
  WrappedComponent.displayName = `withRouter(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
};

export default withRouter;
