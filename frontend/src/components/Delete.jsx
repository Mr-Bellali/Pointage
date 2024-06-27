import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import  { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Delete = ({ employeeId, onDelete }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    fetch(`http://localhost:8080/employees/${employeeId}`,{
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        onDelete();
        handleClose();
      }
    }).catch(error => console.log('Error deleting employees', error));
  };

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="delete" color="error">
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this employee?
          </Typography>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Delete;
