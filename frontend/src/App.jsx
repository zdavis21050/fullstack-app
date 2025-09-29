import { useState, useEffect } from "react";

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [scores, setScores] = useState({ game1: 0, game2: 0, game3: 0 });

  // Fetch players on load
  useEffect(() => {
    fetch("https://fullstack-app-rdkt.onrender.com/players")
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

  async function addPlayer() {
    if (!name.trim()) return;
    const res = await fetch("https://fullstack-app-rdkt.onrender.com/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, ...scores })
    });
    const newPlayer = await res.json();
    setPlayers([...players, newPlayer]);
    setName("");
    setScores({ game1: 0, game2: 0, game3: 0 });
  }

  async function updatePlayer(id, game1, game2, game3) {
    const res = await fetch(`https://fullstack-app-rdkt.onrender.com/players/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game1, game2, game3 })
    });
    const updated = await res.json();
    setPlayers(players.map(p => (p._id === id ? updated : p)));
  }

  async function deletePlayer(id) {
    await fetch(`https://fullstack-app-rdkt.onrender.com/players/${id}`, { method: "DELETE" });
    setPlayers(players.filter(p => p._id !== id));
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Player Scores</h1>

      {/* Add player form */}
      <div className="mb-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter player name"
          className="border px-3 py-2 rounded mr-2"
        />
        <input
          type="number"
          value={scores.game1}
          onChange={e => setScores({ ...scores, game1: Number(e.target.value) })}
          placeholder="Game 1"
          className="w-20 border px-2 py-2 mr-2"
        />
        <input
          type="number"
          value={scores.game2}
          onChange={e => setScores({ ...scores, game2: Number(e.target.value) })}
          placeholder="Game 2"
          className="w-20 border px-2 py-2 mr-2"
        />
        <input
          type="number"
          value={scores.game3}
          onChange={e => setScores({ ...scores, game3: Number(e.target.value) })}
          placeholder="Game 3"
          className="w-20 border px-2 py-2 mr-2"
        />
        <button onClick={addPlayer} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      {/* Player list */}
      <ul className="space-y-3">
        {players.map(player => (
          <li key={player._id} className="flex items-center justify-between bg-white p-3 rounded shadow">
            <span>{player.name} - G1:{player.game1} G2:{player.game2} G3:{player.game3}</span>
            <button onClick={() => deletePlayer(player._id)} className="text-red-500">🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
