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
    const [editingProduct, setEditingProduct] = useState<Produk | null>(null);
    const [editForm, setEditForm] = useState<{ nama: string; harga: number }>({ nama: '', harga: 0 });
 
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

    const handleDelete = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            axios.delete(`http://localhost:3001/produk/${id}`)
                .then(() => {
                    setProduk(produk.filter((p) => p.id !== id));
                })
                .catch(err => console.error(err));
        }
    };

    const handleEdit = (product: Produk) => {
        setEditingProduct(product);
        setEditForm({ nama: product.nama, harga: product.harga });
    };

    const handleUpdate = () => {
        if (!editingProduct) return;
        
        axios.put(`http://localhost:3001/produk/${editingProduct.id}`, editForm)
            .then((response) => {
                setProduk(produk.map(p => 
                    p.id === editingProduct.id ? response.data : p
                ));
                setEditingProduct(null);
                setEditForm({ nama: '', harga: 0 });
            })
            .catch(err => console.error(err));
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setEditForm({ nama: '', harga: 0 });
    };
 
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
                            {editingProduct?.id === item.id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        value={editForm.nama}
                                        onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                                        placeholder="Nama Produk"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.harga}
                                        onChange={(e) => setEditForm({ ...editForm, harga: Number(e.target.value) })}
                                        placeholder="Harga"
                                    />
                                    <button onClick={handleUpdate} className="save-button">Save</button>
                                    <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <span className="product-name">{item.nama}</span>
                                    <span className="product-price">Rp {item.harga.toLocaleString()}</span>
                                    <button onClick={() => handleEdit(item)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProdukList;