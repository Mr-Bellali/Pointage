import { useState } from "react";
import { Box } from "@mui/material";
import Delete from "./Delete";
import Modify from "./Modify";
import useSWR, { mutate } from 'swr';

const Table = ({ title }) => {
  const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
  const fetcher = () => fetch("http://localhost:8080/employees", {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((r) => {
    if (!r.ok) {
      throw new Error('Network response was not ok');
    }
    return r.json();
  });

  const { data: employees, error } = useSWR('/employees', fetcher);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setIsLoading(false);
        mutate();
      } else {
        throw new Error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      setIsLoading(false);
    }
  }

  if (error) return <div>Error loading employees</div>;
  if (!employees) return <div>Loading...</div>;

  const nonAdminEmployees = employees.filter(employee => !employee.is_admin);

  return (
    <Box className="p-6 bg-white rounded-lg shadow-md ">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Function
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Employed
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {nonAdminEmployees.map((employee, index) => {
            const avatarUrl = `http://localhost:8080${employee.avatar.replace('public/', '')}`;
            return (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src={avatarUrl}
                        alt={employee.name.substring(0, 1)}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {employee.name}
                      </p>
                      <p className="text-gray-600 whitespace-no-wrap">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {employee.function}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {new Date(employee.employed).toLocaleDateString()}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex">
                  <Delete employeeId={employee.id} onDelete={() => handleDelete(employee.id)} />
                  <Modify employee={employee} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && <div>Loading...</div>}
    </Box>
  );
};

export default Table;
