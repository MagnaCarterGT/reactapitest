import { useState } from 'react'
import '../App.css'
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Dogs() {
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
        <div className="card">
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
    )
}

export default Dogs