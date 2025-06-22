import {useEffect, useState} from 'react'
import '../App.css'
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

function PagerDuty() {
    const [users, setUsers] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 25,
    });

    function getUsers() {
        let url = `https://api.pagerduty.com/users`;
        return axios.get(url, {
            headers: {
            'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token token=y_NbAkKc66ryYTWUXYEu`
            },
            params: {
                limit: paginationModel.pageSize,
                total: true,
                offset: paginationModel.page * paginationModel.pageSize,
            }
        })
            .then(response => {
                console.log(response.data.total);
                setUsers(response.data.users);
                setTotalRows(response.data.total);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getUsers();
    }, [paginationModel])

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
    ];

    return (
        <Paper>
            <DataGrid
                rows={users}
                rowCount={totalRows}
                columns={columns}
                pagination
                paginationModel={paginationModel}
                paginationMode="server"
                pageSizeOptions={[5, 10, 25]}
                sx={{ border: 0 }}
                onPaginationModelChange={setPaginationModel}
            />
        </Paper>
    )
}

export default PagerDuty