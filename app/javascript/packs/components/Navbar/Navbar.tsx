import React, {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from 'react-router-dom';
import useAPI from "../../utils/callAPI";
import useSession from "../../utils/session";

interface User {
  email: string,
  password: string,
}

const defaultUser = {
  email: '',
  password: '',
}

const Navbar = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<User>(defaultUser)

  const {callAPI} = useAPI({
    path: '/auth/sign_in', method: 'post', body: user,
  })

  const {callAPI: callLogout} = useAPI({
    path: '/auth/sign_out', method: 'delete',
  })

  const {deleteSessionInfo, userInfo} = useSession()

  const doSubmit = (e) => {
    e.preventDefault()

    callAPI()
    setUser({...user, password: ''})
  }

  const doLogout = () => {
    callLogout()
    deleteSessionInfo()
    navigate("/")
  }

  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">

          <h1 className="logo me-auto">
            <Link to="/">AnySES</Link>
          </h1>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <NavLink
                  to="home"
                  className={({ isActive }) =>
                    isActive ? 'nav-link scrollto active' : 'nav-link scrollto'
                  }
                >Home</NavLink>
              </li>
              <li>
                <NavLink
                  to="chart"
                  className={({ isActive }) =>
                    isActive ? 'nav-link scrollto active' : 'nav-link scrollto'
                  }
                >Chart</NavLink>
              </li>
              <li className="dropdown">
                <a href="#"><span>More</span> <i className="bi bi-chevron-down"></i></a>
                <ul>
                  <li>
                    <NavLink
                      to="contacts"
                      className={({ isActive }) => (isActive ? 'active' : '') }
                    >Contacts</NavLink>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                {
                  userInfo() === null
                    ? <a className="getstarted scrollto" href="#">Sign In</a>
                    : <a className="getstarted scrollto" href="#" onClick={doLogout}>Sign Out</a>
                }
                {userInfo() === null && <div
                  className="dropdown-content shadow-lg bg-body rounded pb-3 px-3 pt-1"
                  style={{width: "300px"}}
                >
                  <p
                    className="text-center"
                    style={{color: "#37517e", fontSize: "17px", fontWeight: "600", fontFamily: '"Jost", sans-serif'}}
                  >Account</p>
                  <div className="row justify-content-center">
                    <div className="col-11">
                      <form role="form" className="php-email-form" onSubmit={doSubmit}>
                        <div className="row">
                          <div className="form-group col-md-12 mb-2">
                            <input
                              className="form-control" placeholder="Your Email" autoComplete="off"
                              value={user.email}
                              onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                          </div>
                          <div className="form-group col-md-12 mb-3">
                            <input
                              type="password" className="form-control" placeholder="Your Password" autoComplete="off"
                              value={user.password}
                              onChange={(e) => setUser({...user, password: e.target.value})}
                            />
                          </div>
                          <div className="text-center">
                            <button type="submit">Go</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>}
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
      <div style={{marginBottom: "5rem"}}></div>
    </>
  )
}

export default Navbar
