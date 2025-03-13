// src/App.jsx
// import React from 'react';
import TambahProduk from './components/TambahProduk';
import ProdukList from './components/ProdukList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Selamat Datang di Aplikasi E-Commerce Sederhana</h1>
      <TambahProduk />
      <ProdukList />
    </div>
  );
}

export default App;