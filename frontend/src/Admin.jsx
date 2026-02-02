import Timer from './Timer';
import GetCategories from './Categories';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css'; 

const Admin = () => {
    
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState("");
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editPoints, setEditPoints] = useState(0);

    const API_URL = process.env.NODE_ENV === "production" 
        ? "https://my-backend.onrender.com"
        : "http://localhost:3001";

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/players`);
            setPlayers(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addPlayer = async (e) => {
        e.preventDefault();
        if (!newPlayer.trim()) return;
        
        try {
            const response = await axios.post(`${API_URL}/api/players`, {
                player: newPlayer,
                points: 0
            });
            setPlayers([...players, response.data]);
            setNewPlayer("");
            setShowAddForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    const startEdit = (player) => {
        setEditingId(player.id);
        setEditPoints(player.points);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditPoints(0);
    };

    const saveEdit = async (id) => {
        try {
            await axios.put(`${API_URL}/api/players/${id}`, {
                points: editPoints
            });
            setPlayers(players.map(player => 
                player.id === id ? { ...player, points: editPoints } : player
            ));
            setEditingId(null);
        } catch (error) {
            console.error(error);
        }
    };

    const incrementPoints = () => {
        setEditPoints(prev => prev + 1);
    };

    const decrementPoints = () => {
        setEditPoints(prev => prev - 1); // Prevent negative scores
    };

    const deletePlayer = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/players/${id}`);
            setPlayers(players.filter(player => player.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handlePointsChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setEditPoints(value); 
    };
    
    return (
        <div className="admin-container">
            
            <div className="players-section">
                <h2>Player Management</h2>
                
                {/* Add Player Button and Form */}
                <div className="add-player-container">
                    <button 
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="add-player-btn"
                    >
                        {showAddForm ? 'Cancel' : '+ Add Player'}
                    </button>
                    
                    {showAddForm && (
                        <form onSubmit={addPlayer} className="add-player-form">
                            <input
                                type="text"
                                value={newPlayer}
                                onChange={(e) => setNewPlayer(e.target.value)}
                                placeholder="Enter player name"
                                required
                                autoFocus
                                className="player-input"
                            />
                            <button type="submit" className="submit-btn">
                                Add Player
                            </button>
                        </form>
                    )}
                </div>

                {/* Players Table */}
                {loading ? (
                    <div className="loading">Loading players...</div>
                ) : players.length === 0 ? (
                    <div className="no-players">No players added yet.</div>
                ) : (
                    <table className="players-table">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Points</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map(player => (
                                <tr key={player.id}>
                                    <td>{player.player}</td>
                                    <td>
                                        {editingId === player.id ? (
                                            <div className="edit-points-form">
                                                <button 
                                                    type="button" 
                                                    onClick={decrementPoints}
                                                    className="points-btn decrement"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={editPoints}
                                                    onChange={handlePointsChange}
                                                    min="0"
                                                    className="points-input"
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={incrementPoints}
                                                    className="points-btn increment"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            player.points
                                        )}
                                    </td>
                                    <td className="actions-cell">
                                        {editingId === player.id ? (
                                            <>
                                                <button 
                                                    onClick={() => saveEdit(player.id)}
                                                    className="save-btn"
                                                >
                                                    Save
                                                </button>
                                                <button 
                                                    onClick={cancelEdit}
                                                    className="cancel-btn"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    onClick={() => startEdit(player)}
                                                    className="edit-btn"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => deletePlayer(player.id)}
                                                    className="delete-btn"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="timers-section">
                <Timer initialSeconds={30} />
                <Timer initialSeconds={60} />
                <Timer initialSeconds={90} />
                <Timer initialSeconds={180} />
                <GetCategories />
            </div>
        </div>
    );
};

export default Admin;