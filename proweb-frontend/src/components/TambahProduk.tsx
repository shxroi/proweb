// src/components/TambahProduk.jsx
import { useState } from 'react';
import axios from 'axios';

function TambahProduk() {
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validasi
        if (!nama || !harga) {
            setError('Nama dan Harga wajib diisi');
            setSuccess('');
            return;
        }
        setError('');
    
        axios.post('http://localhost:3001/produk', { nama, harga })
            .then((res) => {
                console.log('Produk berhasil ditambah:', res.data);
                setSuccess('Produk berhasil ditambahkan!');
                setNama('');
                setHarga('');
            })
            .catch((err) => {
                console.error('Error menambah produk:', err);
                setError('Gagal menambahkan produk. Silakan coba lagi.');
                setSuccess('');
            });
    };
    
    return (
        <div className="form-container">
            <h2 className="form-title">Tambah Produk</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label className="form-label">Nama Produk</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="form-input"
                        placeholder="Masukkan nama produk"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Harga (Rp)</label>
                    <input
                        type="number"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        className="form-input"
                        placeholder="Masukkan harga"
                    />
                </div>
                <button type="submit" className="submit-button">Simpan Produk</button>
            </form>
        </div>
    );
}

export default TambahProduk;