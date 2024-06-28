import CountUpTimer from "../components/CountUpTimer ";
import Pointage from "../components/Pointage"
import WeeklyAttendance from "../components/Weeklyattendance"

const Attendance = () => {
  const startDate  = '2024-06-28T00:16:00'; // Set your target date here
  return (
    <section className="w-full h-screen bg-[#F2F1EB]">
        <div className="w-full h-[100px]">
            <Pointage />
        </div>
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-[70%]">
           <CountUpTimer startDate={startDate} />
          </div>
          <div className="w-[70%]">
            <WeeklyAttendance />
          </div>
        </div>
    </section>
  )
}

export default Attendance
