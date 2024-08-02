import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {

    const [user, setUser] = useState({ email: '', password: '' })
    const [message, setMessage] = useState("")
    const redirect = useNavigate()

    const Submit = (event) => {
        event.preventDefault()

        axios.post(`https://carrental-service-l4ls.onrender.com/user`, user)
            .then(res => {
                if (res.data === "Success") {
                    redirect("/dash")
                } else if (res.data === "User Not Found") {
                    setMessage("Incorrect Password or Email")
                } else {
                    setMessage("Something Went Wrong")
                }
            })

    }


    return (
        <>
            <div>
                {/**Topbar Start */}
                <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
                    <div className="row">
                        <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                            <div className="d-inline-flex align-items-center">
                                <p className="text-body pr-3" ><i className="mr-2"><FontAwesomeIcon icon="fa fa-phone-alt" /></i>0842793374</p>
                                <span className="text-body">|</span>
                                <p className="text-body px-3" ><i className="mr-2"><FontAwesomeIcon icon="fa fa-envelope" /></i>gwalamhlaba@icloud.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid position-relative nav-bar p-0">
                    <div className="position-relative px-lg-5" style={{ zIndex: 9 }}>
                        <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
                            <h1 className="navbar-brand text-uppercase text-primary mb-1">XDrive Rentals</h1>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
                                <div className="navbar-nav ml-auto py-0">
                                    <a href="/" className="nav-item nav-link active">Home</a>
                                    <a href="/allvehicles" className="nav-item nav-link" >Cars</a>
                                    <a href="/contact" className="nav-item nav-link">Contact</a>
                                    <a href="/login" className='nav-link '>Login</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="login">
                <form id="loginform" onSubmit={Submit}>
                    <div className="container-fluid py-5">
                        <h1 style={{ textAlign: "center" }}>Login</h1>
                        <div className="container pt-5 pb-3">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" className="form-control p-4" placeholder="Your Email" required="required" onChange={e => setUser({ ...user, email: e.target.value })} />
                            </div>
                        </div>
                        <div className=" form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="form-control p-4" required="required" onChange={e => setUser({ ...user, password: e.target.value })} />
                        </div>
                        <div>
                            <button className="btn btn-primary py-3 px-5" type="submit">Log In</button>
                        </div>
                        <p style={{ color: "red" }}><strong>{message && message}</strong></p>
                    </div>
                </form>
            </div>

            {/**Footer Start */}
            <div className="container-fluid bg-secondary py-5 px-sm-3 px-md-5" style={{ marginTop: 50, height: 350 }}>
                <div className="row pt-5 d-flex justify-content-center" style={{ marginTop: -60 }}>
                    <div className="col-lg-3 col-md-6 mb-5 ">
                        <h4 className="text-uppercase text-light mb-4 text-center">Get In Touch</h4>
                        <p className="mb-2 text-white text-center"><i className="text-white mr-3"></i>Gauteng</p>
                        <p className="mb-2 text-white text-center"><i className=" text-white mr-3"></i>084 279 3374</p>
                        <p className="mb-2 text-white text-center"><i className="text-white mr-3"></i>gwalamhlaba@icloud.com</p>
                        <h4 className="text-uppercase text-white py-2 text-center">My other platforms</h4>
                        <div className="d-flex justify-content-center">
                            <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="https://www.linkedin.com/in/mhlabunzima-gwala-a56b30274/"><FontAwesomeIcon icon="fab fa-linkedin-in" /></a>
                            <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="https://www.instagram.com/chillycheesecalii/"><FontAwesomeIcon icon="fab fa-instagram" /></a>
                            <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="https://github.com/CodeMHT/"><FontAwesomeIcon icon="fab fa-github" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark py-4 px-sm-3 px-md-5">
                <p className="mb-2 text-center text-body">&copy; <a href="/" >XDrive Rentals</a>. All Rights Reserved.</p>

                {/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/}
                <p className="m-0 text-center text-body">CSS Designed by <a href="https://htmlcodex.com">HTML Codex</a></p>
            </div>
            {/* Footer End */}
        </>
    )
}

export default Login;