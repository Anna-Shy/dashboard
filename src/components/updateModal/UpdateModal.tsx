import React from 'react';

import { userColors } from '../../source/data/MainData';
import { UpdateSnackbarAlert } from '../updateSnackbarAlert/UpdateSnackbarAlert';

import { Modal, Box, Divider, TextField, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import './updateModal.scss';

interface User {
  id: number;
  userName: string;
  projectTitle?: string | null;
  projectStatus?: boolean;
  mistake?: number;
  oneOnone?: number;
  weekly?: number;
  training?: number;
  [key: string]: any;
}

interface UpdateModal {
  open: boolean;
  onClose: () => void;
  userData: User[];
  handleChange: (e: any, index: number) => void;
  handleClick: (e: any, userId: number) => void;
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 5,
  p: 4,
};

const renderTextField = (user: User, key: number, type: string, field: string, handleChange: (e: any, index: number) => void) => (
  user[field] && (
    <TextField
      id={`outlined-number-${user.id}-${field}`}
      label={field}
      name={field}
      type={type}
      variant="outlined"
      className={`user-input${(field === 'mistake' || field === 'projectTitle') ? '-large' : ''}`}
      InputLabelProps={{
        shrink: true,
      }}
      defaultValue={user[field]}
      onChange={(e) => handleChange(e, key)}
    />
  )
);


export const UpdateModal: React.FC<UpdateModal> = ({
  open,
  onClose,
  userData,
  handleChange,
  handleClick,
  openAlert,
  setOpenAlert,
}) => {
  return (
    <Modal open={open} onClose={onClose} className="userInfoModal">
      <Box sx={styleModal}>
        <h2 className="userInfoModal__title">Update amount of mistake</h2>
        <Divider />
        <div className="userInfoModal__context">
          {userData.map((user, key) => (
            <div className="userInfoModal__user" key={user.id}>
              <div className="user-info">
                <div className="user-color" style={{ backgroundColor: userColors[key % userColors.length] }}></div>
                <h3 className="user-title">{user.userName}</h3>
              </div>
              <div className="user-inputBlock">
                {renderTextField(user, key, 'text', 'projectTitle', handleChange)}
                {renderTextField(user, key, 'number', 'projectStatus', handleChange)}

                {renderTextField(user, key, 'number', 'mistake', handleChange)}

                {renderTextField(user, key, 'number', 'oneOnone', handleChange)}
                {renderTextField(user, key, 'number', 'weekly', handleChange)}
                {renderTextField(user, key, 'number', 'training', handleChange)}

                <Button
                  disabled={false}
                  size="medium"
                  variant="contained"
                  className="user-btn"
                  onClick={(e) => handleClick(e, user.id)}
                  startIcon={<CheckIcon />}
                >
                  Update
                </Button>
                <UpdateSnackbarAlert openAlert={openAlert} onClose={() => setOpenAlert(false)} />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
};
