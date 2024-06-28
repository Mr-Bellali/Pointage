
const WeeklyAttendance = () => {

  

  const weeklyAttendances = [
    {
      week: 1,
      attendances: [
        { status: 'Present', hours: 8 },
        { status: 'Present', hours: 7.5 },
        { status: 'Present', hours: 8 },
        { status: 'Absent', hours: 0 },
        { status: 'Present', hours: 6 }
      ]
    },
    {
      week: 2,
      attendances: [
        { status: 'Present', hours: 7 },
        { status: 'Absent', hours: 0 },
        { status: 'Absent', hours: 0 },
        { status: 'Present', hours: 8 },
        { status: 'Present', hours: 7.5 }
      ]
    },
    {
      week: 3,
      attendances: [
        { status: 'Present', hours: 8 },
        { status: 'Present', hours: 8 },
        { status: 'Present', hours: 8 },
        { status: 'Present', hours: 8 },
        { status: 'Present', hours: 8 }
      ]
    },
    // Add more weeks as needed
  ];

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
            {weeklyAttendances.map((weekAttendance, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center font-medium text-gray-700">{`Week ${weekAttendance.week}`}</td>
                <td className="py-2 px-4 border-b">
                  {weekAttendance.attendances.map((attendance, idx) => (
                    <div
                      key={idx}
                      className={`inline-block px-16 py-1 mr-2 mb-2 rounded ${
                        attendance.status === 'Present' ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-800">
                        {attendance.status}
                      </div>
                      <div className="text-xs text-gray-600">
                        {attendance.hours} hrs
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
