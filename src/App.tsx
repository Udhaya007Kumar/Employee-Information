import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

// Layout always load fast, so no lazy
import Layout from "./Components/Layout";

// Lazy loaded pages
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const EmployeeList = lazy(() => import('./Pages/EmployeeList'));
const AddEmployee = lazy(() => import('./Pages/AddEmployee'));
// const EditEmployee = lazy(() => import('./Pages/EditEmployee'));

function App() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default dashboard route */}
          <Route index element={<Dashboard />} />

          {/* Employee pages */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          {/* <Route path="edit-employee/:id" element={<EditEmployee />} /> */}

          {/* Not Found page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
