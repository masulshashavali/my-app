import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  const addItem = async () => {
    await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const res = await fetch(`${API_URL}/items`);
    setItems(await res.json());
  };

  return (
    <div>
      <h1>Frontend App</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((i, idx) => <li key={idx}>{i.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
