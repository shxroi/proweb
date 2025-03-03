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
 
    useEffect(() => {
        axios.get('http://localhost:3001/produk')
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
                console.error('Error fetching products:', error);
                setError(errorMessage);
            });
    }, []);
 
    return (
        <div>
            <h2>Daftar Produk (From Database)</h2>
            {error && (
                <div style={{ color: 'red', margin: '10px 0' }}>
                    Error: {error}
                </div>
            )}
            <ul>
                {produk.map((item) => (
                    <li key={item.id}>
                        {item.nama} - Rp{item.harga}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default ProdukList;