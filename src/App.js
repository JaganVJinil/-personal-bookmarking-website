// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import BookmarkForm from './components/Bookmarks/BookmarkForm';
import BookmarkList from './components/Bookmarks/BookmarkList';
import Header from './components/Layout/Header';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Home from './components/Home'; // Make sure this matches your file name

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <BookmarkList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <BookmarkForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <BookmarkForm editMode={true} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
