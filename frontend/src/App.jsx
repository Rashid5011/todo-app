import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
// import './bootstrap.min.css';
import "./bootstrap.min.css"
import Footer from './component/Footer';
import Header from './component/Header';
import LandingPage from './screen/landingPage/LandingPage';
import MyNotes from './screen/myNotes/MyNotes';
import Login from './screen/loginPage/Login';
import Signup from './screen/SignupPage/Signup';
import ImageUpload from './ImageUpload';
import CreateNote from './screen/myNotes/CreateNote';
import UpdateNote from './screen/myNotes/UpdateNote';

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (you can replace this with your actual loading logic)
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, [Loader]);

  if (loading) {
    // Render a loading indicator
    return (
      <div className="loader-container">
        <div className="loader">Loading</div>
      </div>
    );
  }

  return null;
}

function App() {
  const [search, setSearch] = useState("");
  console.log(search)
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Loader />
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/mynotes/*" element={<MyNotes search={search} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<  CreateNote />} />
        <Route path="/note/:id" element={< UpdateNote />} />
        {/* <Route path="/imageupload*" element={<ImageUpload />} /> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function NotFound() {
  return <h1>404 - Not Found</h1>;
}

export default App;
