// src/components/List.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function List() {
  const [items, setItems] = useState([
    { id: uuidv4(), name: 'Item 1' },
    { id: uuidv4(), name: 'Item 2' },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');

  const addItem = () => {
    if (newItemName) {
      setItems([...items, { id: uuidv4(), name: newItemName }]);
      setNewItemName('');
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (item) => {
    setEditItemId(item.id);
    setEditItemName(item.name);
  };

  const saveEdit = () => {
    setItems(items.map((item) =>
      item.id === editItemId ? { ...item, name: editItemName } : item
    ));
    setEditItemId(null);
    setEditItemName('');
  };

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editItemId === item.id ? (
              <div>
                <input
                  type="text"
                  value={editItemName}
                  onChange={(e) => setEditItemName(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </div>
            ) : (
              <div>
                {item.name}
                <button onClick={() => startEdit(item)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
}

export default List;