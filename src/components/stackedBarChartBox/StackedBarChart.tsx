import { useState, useEffect } from 'react';
import axios from "axios";

import { ComposedChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { Box, Divider, Modal, TextField, Button } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import CheckIcon from '@mui/icons-material/Check';

import './stackedBarChart.scss';

interface Chart {
    id: number;
    userName: string;
    oneOnone: number;
    weekly: number;
    training: number;
    [key: string]: any;
}

interface alertState extends SnackbarOrigin {
    openAlert: boolean;
}

const meetingTotals = {
    'oneOnone': 0,
    'weekly': 0,
    'training': 0,
};

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '1px solid #384256',
    border: 'none',
    borderRadius: 5,
    p: 4,
};

const colors = ['#f55658', '#8884d8', '#82ca9d', '#ffc658'];

export const StackedBarChart = ({ title }: { title: string }) => {
    const [userData, setUserData] = useState<Chart[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const [stateAlert, setStateAlert] = useState<alertState>({
        openAlert: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openAlert } = stateAlert;

    useEffect(() => {
        fetch('http://localhost:4000/meeting')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    const handleClick = async (e: any, userId: number, newState: SnackbarOrigin) => {
        e.preventDefault();
        setStateAlert({ ...newState, openAlert: true });

        try {
            await axios.put(`http://localhost:4000/meeting`, userData.find(user => user.id === userId));
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e: any, index: number) => {
        const { name, value } = e.target;

        setUserData((prev) => {
            const updatedUserData = [...prev];
            updatedUserData[index] = {
                ...updatedUserData[index],
                [name]: Number(value),
            };
            return updatedUserData;
        });
    };

    userData.reduce(
        (totals, user) => {
            totals.oneOnone += user.oneOnone;
            totals.weekly += user.weekly;
            totals.training += user.training;
            return totals;
        },
        { oneOnone: 0, weekly: 0, training: 0 }
    );

    const stackedBarData = Object.keys(meetingTotals).map(meeting => ({
        nameMeeting: meeting,
        ...Object.fromEntries(
            userData.map(user => [user.userName, user[meeting]])
        ),
    }));

    const keys = Object.keys(stackedBarData[0]).filter(key => key !== 'nameMeeting');

    const handleMouseDownModal = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.altKey) {
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseAlert = () => {
        setStateAlert({ ...stateAlert, openAlert: false });
    };

    // Ensure that userData is not empty before using it
    if (userData.length === 0) {
        return <p>Loading...</p>;
    }

    console.log(userData)
    return (
        <div className="starkedBarChart" onMouseDown={handleMouseDownModal}>
            <h4>{title}</h4>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                className='userInfoModal'
            >
                <Box sx={styleModal}>
                    <h2 className="userInfoModal__title">Update amount of meeting</h2>
                    <Divider />
                    <div className="userInfoModal__context">
                        {
                            userData.map((user, key) => {
                                return (
                                    <div className="userInfoModal__user" key={user.id}>
                                        <div className="user-info">
                                            <div className="user-color" style={{ backgroundColor: colors[key % colors.length] }}></div>
                                            <h3 className="user-title">{user.userName}</h3>
                                        </div>

                                        <div className="user-inputBlock">
                                            <TextField
                                                id={`outlined-number-${user.id}-oneOnone`}
                                                name="oneOnone"
                                                label="oneOnone"
                                                type="number"
                                                variant="outlined"
                                                className='user-input'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                defaultValue={user.oneOnone}
                                                onChange={(e) => handleChange(e, key)}
                                            />
                                            <TextField
                                                id={`outlined-number-${user.id}-weekly`}
                                                name="weekly"
                                                label="Weekly"
                                                type="number"
                                                variant="outlined"
                                                className='user-input'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                defaultValue={user.weekly}
                                                onChange={(e) => handleChange(e, key)}
                                            />
                                            <TextField
                                                id={`outlined-number-${user.id}-training`}
                                                name="training"
                                                label="Training"
                                                type="number"
                                                variant="outlined"
                                                className='user-input'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                defaultValue={user.training}
                                                onChange={(e) => handleChange(e, key)}
                                            />

                                            <Button
                                                disabled={false}
                                                size="medium"
                                                variant="contained"
                                                className='user-btn'
                                                onClick={(e) => handleClick(e, user.id, { vertical: 'top', horizontal: 'center' })}
                                                startIcon={<CheckIcon />}
                                            >
                                                Update
                                            </Button>

                                            <Snackbar
                                                anchorOrigin={{ vertical, horizontal }}
                                                open={openAlert}
                                                onClose={handleCloseAlert}
                                                message="Updated"
                                                key={vertical + horizontal}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </Box>
            </Modal>

            <div className="chart">
                <ResponsiveContainer width="99%" height="100%">
                    <ComposedChart
                        layout="vertical"
                        data={stackedBarData}
                        margin={{ top: 5, right: 0, bottom: 0, left: 20 }}
                    >
                        <XAxis type="number" />
                        <YAxis dataKey="nameMeeting" type="category" />
                        <Tooltip />

                        {keys.map((key, index) => (
                            <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
