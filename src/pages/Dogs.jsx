import {useEffect, useState} from 'react'
import '../App.css'
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Dogs() {
    const [apiResp, setApiResp] = useState([]);
    const [page, setPage] = useState(1);

    function getPreviousPage() {
        let newPage = page - 1;
        setPage(newPage);
        getApiRequest(newPage);
    }

    function getNextPage() {
        let newPage = page + 1;
        setPage(newPage);
        getApiRequest(newPage);
    }

    function getApiRequest(pageNumber) {
        let url = `https://dogapi.dog/api/v2/breeds?page[number]=${pageNumber}`;
        console.log("CALLING: ", url)
        return axios.get(url)
            .then(response => {
                setApiResp(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getApiRequest(1);
    }, [])

    return (
        <div className="card">
            PAGE: {page}
            <button disabled={page===1} onClick={() => getPreviousPage()}>
                previous page
            </button>
            <button onClick={() => getNextPage()}>
                nextPage
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