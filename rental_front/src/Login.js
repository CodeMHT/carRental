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
        axios.get(`https://carrental-service-l4ls.onrender.com/user/${user.email}/${user.password}`)
            .then(res => {
                console.log(res.data)
                if (res.data === "Success") {
                    redirect("/dash")
                } else {
                    setMessage("Incorrect Email or Password")
                }
            })

    }


    return (
        <>
            <div>
                {/**Topbar Start */}
                <div class="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
                    <div class="row">
                        <div class="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                            <div className="d-inline-flex align-items-center">
                                <a className="text-body pr-3" ><i className="mr-2"><FontAwesomeIcon icon="fa fa-phone-alt" /></i>0842793374</a>
                                <span className="text-body">|</span>
                                <a className="text-body px-3" ><i className="mr-2"><FontAwesomeIcon icon="fa fa-envelope" /></i>gwalamhlaba@icloud.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid position-relative nav-bar p-0">
                    <div class="position-relative px-lg-5" style={{ zIndex: 9 }}>
                        <nav class="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
                            <a class="navbar-brand">
                                <h1 class="text-uppercase text-primary mb-1">XDrive Rentals</h1>
                            </a>
                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
                                <div class="navbar-nav ml-auto py-0">
                                    <a href="/" class="nav-item nav-link active">Home</a>
                                    <a href="/allcars" class="nav-item nav-link" >Cars</a>
                                    <a href="/contact" class="nav-item nav-link">Contact</a>
                                    <a href="/login" class='nav-link '>Login</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="login">
                <form onSubmit={Submit}>
                    <div class="container-fluid py-5">
                        <h1 style={{ textAlign: "center" }}>Login</h1>
                        <div class="container pt-5 pb-3">
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" className="form-control p-4" placeholder="Your Email" required="required" onChange={e => setUser({ ...user, email: e.target.value })} />
                            </div>
                        </div>
                        <div className=" form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" className="form-control p-4" required="required" onChange={e => setUser({ ...user, password: e.target.value })} />
                        </div>
                        <div>
                            <button className="btn btn-primary py-3 px-5" type="submit">Log In</button>
                        </div>
                        <p style={{ color: "red" }}><strong>{message && message}</strong></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;