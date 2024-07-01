import Pointage from "../components/Pointage"
import WeeklyAttendance from "../components/Weeklyattendance"
import Logoutbutton from "../components/auth/Logoutbutton"

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
          <div className="right-[16%] top-[85%] absolute">
            <Logoutbutton />
          </div>
        </div>
    </section>
  )
}

export default Attendance
