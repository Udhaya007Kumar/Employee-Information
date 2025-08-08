import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from "./Components/Layout";
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';
import EmployeeList from './Pages/EmployeeList'
import AddEmployee from './Pages/AddEmployee'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*  All routes inside the layout */}
        <Route index element={<Dashboard />} />
        {/* Future nested routes */}
         <Route path="employees" element={<EmployeeList />} />
         <Route path="/add-employee" element={<AddEmployee />} />
        {/* <Route path="edit-employee/:id" element={<EditEmployee />} />  */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
