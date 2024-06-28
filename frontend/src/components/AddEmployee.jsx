import { useState } from "react";
import { Fab, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useSWR, { mutate } from "swr";

const AddEmployee = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    function: "",
    password: "",
    employed: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { data: employees } = useSWR("/employees");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("function", formData.function);
    formDataToSend.append("password", formData.password);

    const employedDate = new Date(formData.employed);
    formDataToSend.append("employed", employedDate.toISOString());

    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    try {
      const response = await fetch("http://localhost:8080/employees", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(`Failed to create employee: ${errorText.error}`);
      }

      const newData = await response.json();
      if (employees) {
        mutate("/employees", [...employees, newData], false);
      }
      setResponseMessage("Employee created successfully!");
      handleClose();
      // Show confirmation dialog
      if (window.confirm("Employee created successfully!")) {
        window.location.reload();
      }
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <div>
      <Fab
        sx={{
          backgroundColor: "#EEEDEB",
          "&:hover": { backgroundColor: "#f3f4f6" },
        }}
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-xl shadow-lg p-4">
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <div className="mb-2">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
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
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
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
              <label htmlFor="function" className="block mb-1">
                Function
              </label>
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
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="employed" className="block mb-1">
                Employed Date
              </label>
              <input
                type="datetime-local"
                name="employed"
                value={formData.employed}
                onChange={handleChange}
                placeholder="Employed Date"
                className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="avatar" className="block mb-1">
                Avatar
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2"
              />
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
            </div>
            <input
              type="submit"
              className="w-[350px] h-[40px] border-2 border-gray-300 rounded-xl p-2 bg-blue-500 text-white"
            />
          </form>
          {responseMessage && (
            <div className="mt-2 text-center text-red-600">
              {responseMessage}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddEmployee;
