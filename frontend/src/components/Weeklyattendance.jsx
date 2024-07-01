import {jwtDecode} from 'jwt-decode';
import useSWR from 'swr';

const WeeklyAttendance = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userID = decoded["id"];

  const fetcher = async (url) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  };

  const { data: employee, error } = useSWR(`http://localhost:8080/employees/${userID}`, fetcher);

  if (error) return <div>Error loading attendances</div>;
  if (!employee) return <div>Loading...</div>;

  const attendances = employee.attendances || [];
  const weeks = Math.ceil(attendances.length / 5); // Calculate number of weeks

  const formatTime = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    if (hrs === 0) {
      return `${mins} min`;
    }
    return `${hrs} hr${hrs > 1 ? 's' : ''} ${mins} min`;
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gray-200 border-b">
          <h2 className="text-lg font-semibold">Weekly Attendance</h2>
        </div>
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Week</th>
              <th className="py-2 px-4 border-b text-left">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(weeks)].map((_, weekIndex) => (
              <tr key={weekIndex}>
                <td className="py-2 px-4 border-b text-center font-medium text-gray-700">{`Week ${weekIndex + 1}`}</td>
                <td className="py-2 px-4 border-b">
                  {attendances.slice(weekIndex * 5, (weekIndex + 1) * 5).map((attendance) => (
                    <div
                      key={attendance.id}
                      className={`inline-block px-16 py-1 mr-2 mb-2 rounded ${
                        attendance.is_present ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-800">
                        {attendance.is_present ? 'Present' : 'Absent'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {attendance.working_hours ? formatTime(attendance.working_hours) : 'N/A'}
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyAttendance;
