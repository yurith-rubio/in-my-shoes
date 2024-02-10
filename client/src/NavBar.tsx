import logo from '/logo_ims.svg'
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname != "/") {
    return (
      <div id="NavBar">
        <img src={logo} className="logo" alt="In my shoes logo" width="70px" onClick={() => navigate("/")} />
      </div>
    );
  }
  return null;
  
}

export default NavBar;