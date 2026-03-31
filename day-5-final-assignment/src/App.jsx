import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import TransactionReports from './pages/TransactionReports';
import QRDetails from './pages/QRDetails';
import LanguageUpdate from './pages/LanguageUpdate';
import HelpSupport from './pages/HelpSupport';
import LoginFlow from './pages/LoginFlow';
import AuthCallback from './pages/AuthCallback';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginFlow />} />
          <Route path="/redirected" element={<AuthCallback />} />
          
          {/* Protected Routes wrapped in Layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transactions" element={<TransactionReports />} />
              <Route path="qr-details" element={<QRDetails />} />
              <Route path="language" element={<LanguageUpdate />} />
              <Route path="help" element={<HelpSupport />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
