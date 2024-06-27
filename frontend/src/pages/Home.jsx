import  { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("http://localhost:8080/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

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
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
