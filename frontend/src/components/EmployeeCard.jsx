const EmployeeCard = ({ name, functionTitle, workHours, avatar, onClick, isPresentToday }) => {
  return (
    <div 
      className="w-[250px] h-[300px] bg-white rounded-lg flex flex-col hover:cursor-pointer overflow-hidden" 
      onClick={onClick}
    >
      <div className="w-full h-[40%] bg-red-400 flex items-center justify-center">
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-[60%] pl-2">
        <div className="w-full h-fit flex flex-row items-center">
          <div className={`w-[10px] h-[10px] rounded-full mr-4 ${isPresentToday ? 'bg-green-600' : 'bg-red-600'}`}></div>
          <h2 className="font-bold">{name}</h2>
        </div>
        <h3>{functionTitle}</h3>
        <h3>{workHours} work hours today</h3>
      </div>
    </div>
  );
};

export default EmployeeCard;
