import Pointage from "../components/Pointage"

const Attendance = () => {
  return (
    <section className="w-full h-screen bg-black flex flex-col">
        <div className="w-full h-[100px] bg-red-600">
            <Pointage />
        </div>
        <div className="w-full h-full bg-yellow-400">

        </div>
    </section>
  )
}

export default Attendance
