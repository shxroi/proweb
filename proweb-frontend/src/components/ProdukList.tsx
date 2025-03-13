// src/components/ProdukList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Produk {
    id: number;
    nama: string;
    harga: number;
}

function ProdukList() {
    const [produk, setProduk] = useState<Produk[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
 
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3001/produk')
            .then((response) => {
                setProduk(response.data);
                setLoading(false);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
                console.error('Error fetching products:', error);
                setError(errorMessage);
                setLoading(false);
            });
    }, []);
 
    return (
        <div className="product-container">
            <h2 className="product-title">Daftar Produk</h2>
            
            {loading && (
                <div className="loading-indicator">
                    <p>Loading...</p>
                </div>
            )}
            
            {error && (
                <div className="error-message">
                    Error: {error}
                </div>
            )}
            
            {!loading && !error && produk.length === 0 && (
                <div className="empty-state">
                    <p>Belum ada produk tersedia. Silakan tambahkan produk baru.</p>
                </div>
            )}
            
            {!loading && produk.length > 0 && (
                <ul className="product-items">
                    {produk.map((item) => (
                        <li key={item.id} className="product-item">
                            <span className="product-name">{item.nama}</span>
                            <span className="product-price">Rp {item.harga.toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProdukList;