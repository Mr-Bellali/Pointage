import AddEmployee from "../components/AddEmployee";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";

const Employees = () => {
  return (
    <section className="w-full h-screen bg-[#F2F1EB] flex">
      <Sidebar />
      <div className="w-full h-full p-4 flex flex-col">
        <div className="flex justify-end mb-4">
          <AddEmployee />
        </div>
        <div className="flex-grow">
          <Table title="Employees" />
        </div>
      </div>
    </section>
  );
};

export default Employees;
