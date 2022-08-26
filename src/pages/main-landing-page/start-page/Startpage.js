import './start-page.scss';
import { useEffect, useState } from "react";
import SignUp from "../sign-up/sign-up";
import Login from "../login/login";
import logo from '../../../assets/icons/logo.png'
import { getTheStorage } from '../../../scripts/localStorageFunctions';
import { openLoggedInPath, openPath } from '../../../scripts/pathFunctions';
import { Oval } from 'react-loader-spinner';

export const StartPage = () => {

  const
    [start, setStart] = useState(0),
    [page, setPage] = useState('login')

  useEffect(() => {
    const checkToken = JSON.parse(getTheStorage('userInfo'))

    // console.log(checkToken.userId)

    checkToken === null
      ? console.log('no token')
      : openLoggedInPath('/user', '/admin')
  }, [])


    useEffect( ()=>{
      setTimeout(()=>{
        setStart((prevState) => prevState+1)
      }, 2000)
    }, [])


  if (start === 0) {
    return <Oval />
  }
  else {
    return (
      <>
        <section className="start-section">
          
          <div className="start-left-col">
            <div className="header">
              <h1>
                {/* <span class="h1-block">Hallo</span> */}
                <span class="h1-block">Willkommen in deinem</span>
                <span class="h1-block">Booking Desk System</span>
              </h1>
            </div>
            <img src={logo} alt="Booking Desk Logo" />
          </div>

          <div className="start-right-col">

            <div className="Login-signUp-container">
              <div className="switch-btns-container">
                <button className={page === "login" ? "loginOn" : "loginOff"} onClick={() => setPage('login')}>
                  Login
                </button>
                <button className={page === "sign up" ? "signUpOn" : "signUpOff"} onClick={() => setPage('sign up')}>
                  Sign Up
                </button>
              </div>
            </div>
            {
              page === 'login' ? <Login /> : <SignUp />
            }
          </div>

        </section>
      </>
    );
  }
}

