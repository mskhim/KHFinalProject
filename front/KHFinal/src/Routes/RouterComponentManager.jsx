import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import { ManagerLayout } from '../page/layout';
import { ManagerMain, ManagerEventInsert, ManagerStats } from '../page/manager';
import NotFound from '../page/common/NotFound';
import ErrorBoundary from '../components/ErrorBoundary';

const RouterComponentManager = () => {
  return (
    <ProtectedRoute requiredRole={1} endpoint="jwtManager">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<ManagerLayout />}>
            <Route path="managerEventInsert" element={<ManagerEventInsert />} />
            <Route path="managerStats" element={<ManagerStats />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </ProtectedRoute>
  );
};

export default RouterComponentManager;
