import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';

const Logoutbutton = () => {
    const navigate = useNavigate();


    const handleLogoutClick = () => {
        localStorage.removeItem("token")
        navigate('/');
    }

  return (
    <div>
      <button
      onClick={handleLogoutClick}
      className="w-[120px] h-[50px] bg-red-500 text-white rounded-md flex flex-row items-center justify-evenly"
      >
        Logout <LogoutRoundedIcon />
      </button>
    </div>
  )
}

export default Logoutbutton
