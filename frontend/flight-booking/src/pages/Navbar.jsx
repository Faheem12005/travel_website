import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default Navbar;
