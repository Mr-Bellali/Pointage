import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
const Modify = ({ employee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    function: '',
    macadress: '',
    employed: '',
  });

  const [open, setOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');

  const { data: employees } = useSWR('employees');

  useEffect(() => {
    if (employee && open) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        avatar: '',
        function: employee.function || '',
        employed: employee.employed ? new Date(employee.employed).toISOString().slice(0, 16) : '',
      });
      setAvatarPreview(employee.avatar || '');
    }
  }, [employee, open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAvatarPreview('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file,
      });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('avatar', formData.avatar);
    formDataToSend.append('function', formData.function);


    const employedDate = new Date(formData.employed);
    formDataToSend.append('employed', employedDate.toISOString());

    try {
      const response = await fetch(`http://localhost:8080/employees/${employee.id}`, {
        method: 'PUT',
        headers : {
          'Authorization': `Bearer ${localStorage.getItem("token")}` 
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newData = await response.json();
      mutate('/employees', [...(employees ? employees.filter(emp => emp.id !== employee.id) : []), newData], false);
      handleClose(); 
      window.location.reload(); 
    } catch (error) {
      console.error('There was a problem with the submission:', error);
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="edit" color="primary">
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-xl shadow-lg p-4">
          <h1 className=' text-xl pb-3'> Update {employee.name}</h1>
          <form onSubmit={handleSubmit} method="PUT" encType="multipart/form-data">
            <div className="mb-2">
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="avatar" className="block mb-1">Avatar</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2"
              />
              {avatarPreview && (
                <img src={avatarPreview} alt="Avatar Preview" className="mt-2 w-24 h-24 object-cover rounded-full" />
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="function" className="block mb-1">Function</label>
              <input
                type="text"
                name="function"
                value={formData.function}
                onChange={handleChange}
                placeholder="Function"
                className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2"
              />
            </div>
           
            <div className="mb-2">
              <label htmlFor="employed" className="block mb-1">Employed Date</label>
              <input
                type="datetime-local"
                name="employed"
                value={formData.employed}
                onChange={handleChange}
                placeholder="Employed Date"
                className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2"
              />
            </div>
            <button
            type="submit"
            className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2 bg-blue-500 text-white flex justify-center items-center">
                Modify
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Modify;