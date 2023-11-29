import axios from "axios";
import { useState, useEffect } from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Box, Divider, Modal, TextField, Button } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import CheckIcon from '@mui/icons-material/Check';

import './pieChartBox.scss'

interface Chart {
    id: number;
    userName: string;
    mistake: number;
    color: string;
}

interface alertState extends SnackbarOrigin {
    openAlert: boolean;
}

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '1px solid #384256',
    border: 'none',
    borderRadius: 5,
    p: 4,
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ value, cx, cy, midAngle, innerRadius, outerRadius }:
    {
        value: number, cx: any, cy: any, midAngle: any, innerRadius: any, outerRadius: any
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${value}`}
        </text>
    );
};

export const PieChartBox = ({ title }: { title: string }) => {
    const [userData, setUserData] = useState<Chart[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const [stateAlert, setStateAlert] = useState<alertState>({
        openAlert: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openAlert } = stateAlert;

    useEffect(() => {
        fetch(`http://localhost:4000/mistake`)
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    const handleClick = async (e: any, userId: number, newState: SnackbarOrigin) => {
        e.preventDefault();
        setStateAlert({ ...newState, openAlert: true });

        try {
            await axios.put(`http://localhost:4000/mistake`, userData.find(user => user.id === userId));
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e: any, index: number) => {
        const { value } = e.target;

        setUserData((prev) => {
            const updatedUserData = [...prev];
            updatedUserData[index].mistake = Number(value);
            return updatedUserData;
        });
    };

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

    return (
        <div className="starkedBarChart" onMouseDown={handleMouseDownModal}>
            <h4>{title}</h4>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                className='userInfoModal'
            >
                <Box sx={styleModal}>
                    <h2 className="userInfoModal__title">Update amount of mistake</h2>
                    <Divider />
                    <div className="userInfoModal__context">
                        {
                            userData.map((user, key) => {
                                return (
                                    <div className="userInfoModal__user" key={user.id}>
                                        <div className="user-info">
                                            <div className="user-color" style={{ backgroundColor: user.color }}></div>
                                            <h3 className="user-title">{user.userName}</h3>
                                        </div>

                                        <div className="user-inputBlock">
                                            <TextField
                                                id="outlined-number"
                                                label="Mistake"
                                                type="number"
                                                variant="outlined"
                                                className='user-input'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                defaultValue={user.mistake}
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
                <ResponsiveContainer width="99%" height="99%">
                    <PieChart>
                        <Pie
                            data={userData}
                            dataKey="mistake"
                            cx={150}
                            cy={110}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={40}
                            outerRadius={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            paddingAngle={5}
                        >
                            {userData.map((item) => (
                                <Cell key={item.userName} stroke={item.color} fill={item.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
