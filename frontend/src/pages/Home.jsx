import { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import Sidebar from "../components/Sidebar";
import AttendancePopup from "../components/AttendancePopup ";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/employees")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched employees: ", data);
        setEmployees(data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleCardClick = (employee) => {
    console.log("Selected employee: ", employee);
    setSelectedEmployee(employee);
  };

  const handleClosePopup = () => {
    setSelectedEmployee(null);
  };

  const isPresentToday = (attendances) => {
    const today = new Date().toISOString().split('T')[0];
    return attendances.some(attendance => 
      attendance.is_present && attendance.arrival_time.startsWith(today)
    );
  };

  return (
    <section className="w-full h-screen bg-[#F2F1EB] flex">
      <Sidebar />
      <div className="w-full h-full p-4 grid grid-cols-4 gap-4">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            name={employee.name}
            functionTitle={employee.function}
            workHours={employee.workHours}
            avatar={`http://localhost:8080${employee.avatar}`.replace('public/', '')}
            onClick={() => handleCardClick(employee)}
            isPresentToday={isPresentToday(employee.attendances)}
          />
        ))}
      </div>
      {selectedEmployee && (
        <AttendancePopup employee={selectedEmployee} onClose={handleClosePopup} />
      )}
    </section>
  );
};

export default Home;
