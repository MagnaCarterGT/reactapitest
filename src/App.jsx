import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function App() {
    const [count, setCount] = useState(0)
    const [apiResp, setApiResp] = useState([]);

     function getApiRequest() {
        return axios.get('https://dogapi.dog/api/v2/breeds')
            .then(response => {
                console.log(response.data.data);
                setApiResp(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={() => getApiRequest()}>
            this will hit an API
        </button>
          <Grid container spacing={3} sx={{ marginTop: 0, paddingTop: 4 }}>
          {apiResp?.map(entry => (
              <Grid size={3} key={entry.id}>
                  <Paper>{entry.attributes.name}</Paper>
                  <Paper>{entry.attributes.description}</Paper>
              </Grid>
          ))}
            </Grid>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMRR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
    )
}

export default App
