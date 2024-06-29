import React from 'react';
import useSWR from 'swr';

const WeeklyAttendance = () => {
  const userID = "2b46ca50-0369-4037-9c42-213ee2815e26";

  const fetcher = async () => {
    const response = await fetch(`http://localhost:8080/weeklyattendance/${userID}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log("data:", data)
    // console.log("is present", data[26][0].is_present)

    data.forEach((attendance, index) => {
      console.log(`Index ${index}:`);
      Object.entries(attendance).forEach(([key, value]) => {
        console.log(`${key}:`, value);
      });
    });
    
    // Assuming you want to transform your API response to fit the existing frontend structure
    const transformedData = {
      week: 1, // Assuming this is week 1 based on your existing structure
      attendances: [
        {
          status: data.is_present ? 'Present' : 'Absent',
          hours: data.working_hours,
        }
      ]
    };

    return [transformedData]; // Return as an array
  };

  const { data: weeklyAttendances, error } = useSWR(`/weeklyattendance/${userID}`, fetcher);

  // console.log("weekly attendances: ", weeklyAttendances);

  if (error) return <div>Error loading attendances</div>;
  if (!weeklyAttendances) return <div>Loading...</div>;

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
