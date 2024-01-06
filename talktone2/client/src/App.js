import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from './components/Front';
import Login from './components/Login';
import LoginOperator from './components/LoginOperator';
import AdminDashboard from "./components/AdminDashboard";
import OperatorDashboard from "./components/OperatorDashboard";
import AddOperator from "./components/AddOperator";
import ViewOperator from "./components/ViewOperator";
import Calls from "./components/Calls";
import Userprofile from "./components/Userprofile";
import OperatorProfile from "./components/OperatorProfile";
import Video from "./components/Video";
import Recorder from "./components/Recorder";
import Style from "./components/Style";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Front/>} />
          <Route path="AdminDashboard" element={< AdminDashboard />} />
          <Route path="OperatorDashboard" element={<OperatorDashboard/>} />
          <Route path="Addoperator" element={<AddOperator />} />
          <Route path="ViewOperator" element={<ViewOperator />} />
          <Route path="Login" element={<Login />} />
          <Route path="LoginOperator" element={<LoginOperator />} />
          <Route path="Calls" element={<Calls/>} />
          <Route path="Userprofile" element={< Userprofile/>} />
          <Route path="OperatorProfile/:id" element={< OperatorProfile/>} />
          <Route path="/room/:roomId" element={<Video/>}/>
          <Route path="Recorder" element={<Recorder/>}/>
          <Route path="Style" element={<Style/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;