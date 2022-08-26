import { Outlet, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import hb from "../../assets/icons/hamburger-button.png";
import close from "../../assets/icons/close.png";
import profielPic from "../../assets/icons/Vector.png";
import { getTheStorage } from "../../scripts/localStorageFunctions";
import "./layout.scss"
import { useState } from "react";


export const Layout = ()=>{
    let location = useLocation()

    const [isOpen, setIsOpen] = useState(false)

    const userFromStorage = JSON.parse(getTheStorage('deskUser'))

   
    
    const {isAdmin: admin} = userFromStorage



    window.onload = ()=>{
        const adminOptions = document.getElementById('admin-options')
        const theAdminLinkOptions = document.querySelectorAll('.adminLinkOption')

        const aAdminIsOnline = ()=>{
            adminOptions.style.display = 'block'
            theAdminLinkOptions.forEach( adminLink => adminLink.value === location.pathname && (adminLink.selected = true) )   
        }

        const aUserIsOnline = ()=>{
            adminOptions.style.display = "none"
        }
        
        
        admin
        ? aAdminIsOnline()
        : aUserIsOnline()   
    }
   
    const handleClickOnAdminLink = (event)=>{
        window.open(`${event.target.value}`, '_self')   
    }

    const handliClickOnAdminLinkFromUserPath = ()=>{
        location.pathname === '/user' 
        || location.pathname === '/user/reservations' 
        || location.pathname ==='/user/favourites' 
        || location.pathname ==='/user/booking' 
        || location.pathname ==='/user/profile'
        ? window.open(`/admin`, '_self') 
        : console.log('')
  
    }
    //styles for NavLink

    const activeStyle = {
        all: "initial",
        // padding: "0.5rem",
        padding: "0.7rem",
        cursor: "pointer",
        borderBottom: "1px solid #fff",
        borderTop: "1px solid #fff",
        borderRadius: "5px",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif ",
        fontWeight: "bold",
        fontSize: "120%"
    }

    const passivStyle = {

        all: "initial",
        borderBottom: "1px solid transparent",
        padding: "0.5rem",
        cursor: "pointer",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "bold",
        fontSize: "105%"
    }

    const handle = ()=>{  
        setIsOpen(!isOpen)
    }


    const activeImgLink = {
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
        cursor: "pointer"
    }

    return(
        <>
        <nav className="user-navigation">
            <h2 className="hidden">App Navigation</h2>
            <a href="./">
                <img src={logo} alt="Logo"  />
            </a>
            <select 
            name="admin-links" 
            className="admin-navigation"
            onChange={handleClickOnAdminLink}
            onClick={handliClickOnAdminLinkFromUserPath}
            id="admin-options"
            >
                <option value="/admin" className="adminLinkOption">-- Admin Area --</option>
                <option value="/admin" className="adminLinkOption">Hot Zone</option>
                <option value="/admin/comments" className="adminLinkOption">Kommentare</option>
                <option value="/admin/requests" className="adminLinkOption">Fix Desk Anfragen</option>
                <option value="/admin/users" className="adminLinkOption">Userliste</option>
                
            </select> 

            <ul className="user-navigation_link-list">

                <li>
                    <NavLink
                    to="/user/reservations" 
                    style= {
                        ({isActive}) =>
                        isActive ? activeStyle : passivStyle
                    }>
                        Reservierungen
                    </NavLink>
                </li>

                <li>
                    <NavLink
                    to="/user/favourites"
                    style= {
                        ({isActive}) =>
                        isActive ? activeStyle : passivStyle
                    }>
                        Favoriten
                    </NavLink>
                </li>

                <li>
                    <NavLink
                    to="/user/booking" 
                    style= {
                        ({isActive}) =>
                        isActive ? activeStyle : passivStyle
                    }>
                        Tisch buchen
                    </NavLink>
                </li>

                <li>
                    <NavLink
                    to="/user/profile" 
                    style= {
                        ({isActive}) =>
                        isActive ? activeImgLink : undefined
                    }>
                        <img src={profielPic} alt="Profil Logo" className="profile-img" />
                    </NavLink> 
                </li>
            </ul>
            <img className={isOpen ? "hamburgerBtnOpen": "hamburgerBtn"} src={isOpen ? close : hb} alt="Logo"  onClick={handle}/>
            <ul className={isOpen ? `hamburger_nav_open` : 'hamburger_nav_close'} >
                     <li>
                            <NavLink
                            to="/user/profile" 
                            onClick={handle}
                            style= {
                                ({isActive}) =>
                                isActive ? activeImgLink : undefined
                            }>
                                <img src={profielPic} alt="Profil Logo" className="profile-img" />
                            </NavLink> 
                    </li>
                    <li>
                        <NavLink
                        to="/user/reservations" 
                        onClick={handle}
                        style= {
                            ({isActive}) =>
                            isActive ? activeStyle : passivStyle
                        }>
                            Reservierungen
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                        to="/user/favourites"
                        onClick={handle}
                        style= {
                            ({isActive}) =>
                            isActive ? activeStyle : passivStyle
                        }>
                            Favoriten
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                        to="/user/booking" 
                        onClick={handle}
                        style= {
                            ({isActive}) =>
                            isActive ? activeStyle : passivStyle
                        }>
                            Tisch buchen
                        </NavLink>
                    </li>

           
            </ul>
        </nav>

                    
        <Outlet />      
        </>
       
    )
}