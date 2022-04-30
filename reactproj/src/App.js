import './App.css';
import Header from './Components/Header';
import Card from './Components/Card';
import React, { useState, useEffect} from 'react';
import { List, TextField } from '@mui/material';

function App() {
  let [items, setItems] = useState([])
  const [query, setQuery] = useState("");

  useEffect (() => {
    getItems()
  }, [])

  let getItems = async () => {
    let resp = await fetch('http://127.0.0.1:8000/api/item/all')
    let data = await resp.json()
    setItems(data)
  }

  return (
    <div className="App">
      <Header callBack={getItems}/>
      <br />
      <div>
      <TextField 
        id="standard-basic" label="Filter" variant="standard" 
        fullWidth
        onChange={(e) => setQuery(e.target.value.toLowerCase())} 
        />
      </div>
      <ul>
        { items.filter((obj) => obj.item.toLowerCase().includes(query)).map((item) => (
          <List key={item.id} ><Card prod={item} callBack={getItems}/></List>
        ))}
      </ul>
    </div>
  );
}

export default App;
