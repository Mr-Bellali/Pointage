
const AttendancePopup = ({ employee, onClose }) => {
  if (!employee) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
  };

  const weeks = Math.ceil(employee.attendances.length / 5); 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-[80%] h-[80%] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-200 p-2 rounded">Close</button>
        <h2 className="text-2xl font-bold mb-4">{employee.name}'s Attendances</h2>
        {[...Array(weeks)].map((_, rowIndex) => (
          <div key={rowIndex} className="mb-4">
            <h3 className="text-lg font-bold mb-2">Week {rowIndex + 1}</h3>
            <div className="grid grid-cols-5 gap-4">
              {employee.attendances.slice(rowIndex * 5, (rowIndex + 1) * 5).map((attendance) => (
                <div
                  key={attendance.id}
                  className={`p-4 border rounded-md bg-gray-100 ${attendance.is_present ? 'border-green-500' : 'border-red-500'}`}
                >
                  <p>Arrival Time: {formatDate(attendance.arrival_time)}</p>
                  <p>Departure Time: {attendance.departure_time ? formatDate(attendance.departure_time) : 'N/A'}</p>
                  <p>Working Hours: {attendance.working_hours || 'N/A'}</p>
                  <p>Is Present: {attendance.is_present ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendancePopup;
