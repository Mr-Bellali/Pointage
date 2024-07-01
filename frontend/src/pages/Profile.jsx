import Sidebar from "../components/Sidebar"
import Logoutbutton from "../components/auth/Logoutbutton"
const Profile = () => {
  return (
    <section className="w-full h-screen bg-[#F2F1EB] flex">
    <Sidebar />
    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
      <Logoutbutton />
    </div>
  </section>
  )
}

export default Profile
