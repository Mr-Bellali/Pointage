import Pointage from "../components/Pointage"
import WeeklyAttendance from "../components/Weeklyattendance"

const Attendance = () => {
  return (
    <section className="w-full h-screen bg-[#F2F1EB]">
        <div className="w-full h-[100px]">
            <Pointage />
        </div>
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-[70%]">
            <WeeklyAttendance />
          </div>
        </div>
    </section>
  )
}

export default Attendance
