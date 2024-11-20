// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DomainProvider } from './context/DomainContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import DomainForm from './components/DomainForm';
import DomainList from './pages/DomainList';
import Login from './pages/Login';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <DomainProvider>
                                    <div className="min-h-screen flex">
                                        <Sidebar />
                                        <main className="flex-1 pl-64 bg-gray-50"> {/* Added pl-64 for sidebar width */}
                                            <Routes>
                                                <Route path="/domains" element={<DomainList />} />
                                                <Route path="/add-domain" element={<DomainForm />} />
                                                <Route path="/edit-domain/:id" element={<DomainForm />} />
                                                <Route path="/" element={<Navigate to="/domains" replace />} />
                                            </Routes>
                                        </main>
                                    </div>
                                </DomainProvider>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;