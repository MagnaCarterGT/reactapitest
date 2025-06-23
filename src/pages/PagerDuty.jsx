import {useCallback, useEffect, useMemo, useState} from 'react'
import '../App.css'
import axios from 'axios';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

function PagerDuty() {
    const [users, setUsers] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 25,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});

    const headers = {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token token=y_NbAkKc66ryYTWUXYEu`
    }

    function getUser(user) {
        let url = `https://api.pagerduty.com/users/${user.id}`;
        return axios.get(url, {
            headers
        }).then(response => {
            setUser(response.data.user);
        })
        .catch(error => {
            console.error(error);
            setIsLoading(false);
        });
    }

    function getUsers() {
        let url = `https://api.pagerduty.com/users`;
        return axios.get(url, {
            headers,
            params: {
                limit: paginationModel.pageSize,
                total: true,
                offset: paginationModel.page * paginationModel.pageSize,
            }
        })
        .then(response => {
            setUsers(response.data.users);
            setTotalRows(response.data.total);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
            setIsLoading(false);
        });
    }

    const deleteUser = useCallback(
        (id) => () => {
            let url = `https://api.pagerduty.com/users/${id}`;
            return axios.delete(url, {
                headers
            }).then(response => {
                getUsers();
            })
                .catch(error => {
                    console.error(error);
                    setIsLoading(false);
                });
        },
        [],
    );

    useEffect(() => {
        setIsLoading(true);
        getUsers();
    }, [paginationModel])

    const columns = useMemo(
        () => [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={deleteUser(params.id)}
                />,
                // <GridActionsCellItem
                //     icon={<SecurityIcon />}
                //     label="Toggle Admin"
                //     onClick={toggleAdmin(params.id)}
                //     showInMenu
                // />,
                // <GridActionsCellItem
                //     icon={<FileCopyIcon />}
                //     label="Duplicate User"
                //     onClick={duplicateUser(params.id)}
                //     showInMenu
                // />,
            ]
        },
        // {
        //     field: "",
        //     headerName: "Delete",
        //     sortable: false,
        //     renderCell: (params) => {
        //         const onClick = (e) => {
        //             e.stopPropagation(); // don't select this row after clicking
        //
        //             const api = params.api;
        //             const thisRow = {};
        //
        //             api
        //                 .getAllColumns()
        //                 .filter((c) => c.field !== "__check__" && !!c)
        //                 .forEach(
        //                     (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
        //                 );
        //
        //             return alert(JSON.stringify(thisRow, null, 4));
        //         };
        //
        //         return <Button onClick={onClick}>Click</Button>;
        //     }
        // },
    ], [deleteUser]
    );

    return (
        <>
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
                    onRowClick={getUser}
                    onPaginationModelChange={setPaginationModel}
                    loading={isLoading}
                    slotProps={{
                        loadingOverlay: {
                            variant: 'skeleton',
                            noRowsVariant: 'skeleton',
                        },
                    }}
                />
            </Paper>
            <Paper elevation={0}>
                Current user {JSON.stringify(user)}
            </Paper>
        </>
    )
}

export default PagerDuty