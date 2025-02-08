import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import { ManagerLayout } from '../page/layout';
import { ManagerMain, ManagerEventInsert, ManagerStats } from '../page/manager';
import NotFound from '../page/common/NotFound';

const RouterComponentManager = () => {
  return (
    <ProtectedRoute requiredRole={1} endpoint="jwtManager">
      <Routes>
        <Route path="/" element={<ManagerLayout />}>
          <Route path="managerEventInsert" element={<ManagerEventInsert />} />
          <Route path="managerStats" element={<ManagerStats />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default RouterComponentManager;
