import React from 'react'
import NavBarCSS from './NavBar_styles.module.css'
import { FaHouseUser } from 'react-icons/fa'
import { TfiLoop } from 'react-icons/all'
import { FaBriefcase } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/all'
import { Link, useNavigate } from "react-router-dom"

const optionsMenu = [
    {
        href: "/Home",
        icon: <FaHouseUser />,
        content: "Home"
    },{
        href: "/ReCredit",
        icon: <TfiLoop />,
        content: "Re-Credit"
    },{
        href: "/Charts",
        icon: <FaBriefcase />,
        content: "Work Charts"
    }
]

function NavBar() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // You can add logout logic here, e.g., clearing session or local storage
    // After that, navigate to the /logout route
    navigate("/logout");
  };

  return (
    <div className={NavBarCSS.father}>
        <div className={NavBarCSS.navbar_container}>
            <div className={NavBarCSS.menu_container}>
                
                <div className={NavBarCSS.navbar_options}>
                    <label className={NavBarCSS.container_option}>
                        {optionsMenu.map((option, i) => {
                            return (
                                <Link to={option.href} className={NavBarCSS.option} key={i}>
                                    <span className={NavBarCSS.option_content}>
                                        {option.icon}
                                        {screen.width <= 1200 ? " " : <p style={{ marginLeft: "12px" }}>{option.content}</p>}
                                    </span>
                                </Link>
                            )
                        })}
                    </label>
                </div>
            </div>
            
            {/* Log out section */}
            <div className={NavBarCSS.log_out_container}>
                {/* Icon */}
                <div className={`${NavBarCSS.log_out} ${NavBarCSS.log_out_icon}`} onClick={handleLogout}>
                    <FiLogOut />
                </div>
                {/* Button */}
                {/* <button className={NavBarCSS.logout_button} onClick={handleLogout}>Logout</button> */}
            </div>
        </div>
    </div>
  )
}

export default NavBar
