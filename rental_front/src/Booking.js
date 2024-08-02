import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Booking = () => {

    const redirect = useNavigate()
    const [car, setCar] = useState([])
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const location = useLocation()

    const [details, setDetails] = useState({
        rented_PickUp: 0,
        rented_Return: 0,
        vehicle_ID: location.state,
        renter_Email: "",
        renter_Mobile: 0,
        renter_Name: "",
        renter_ID: 0,
        rented_Cost: 0
    })

    useEffect(() => {

        var id = location.state;

        axios.get(`https://carrental-service-l4ls.onrender.com/vehicle/car/${id}`)
            .then(res => setCar(res.data))

    }, [location.state])


    //Sending information to api
    const BookVehicle = (event) => {
        event.preventDefault()



        //Used to get the days
        var pickup = new Date(details.rented_PickUp)
        var dropoff = new Date(details.rented_Return)

        //get the days between dates
        var days = (dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)
        details.rented_Cost = days * car[0].vehicle_cost

        let response = ""

        if (details.renter_ID.length === 13 && details.renter_Mobile.length === 10) {

            axios.post("https://carrental-service-l4ls.onrender.com/rental", details)
                .then(res => {
                    response = res.data
                    if (response === "Success") {
                        setMessage("Success. You'll receive an email with details of your order, Redirect in 3 seconds")
                        response = ""
                        setTimeout(() => {
                            redirect('/allvehicles');

                        }, 3000)

                    } else {
                        setErrorMessage("Error Making the booking. Please reload the page and try again ")
                        response = ""
                    }
                })

        } else {
            setMessage("ID and/or Mobile is incorrect")
        }



    }


    return (
        <>
            {/**Topbar Start */}
            <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
                <div className="row">
                    <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center">
                            <p className="text-body pr-3"><i className="mr-2"><FontAwesomeIcon icon="fa fa-phone-alt" /></i>0842793374</p>
                            <span className="text-body">     </span>
                            <p className="text-body px-3"><i className="mr-2"><FontAwesomeIcon icon="fa fa-envelope" /></i>gwalamhlaba@icloud.com</p>
                        </div>
                    </div>

                </div>
            </div>
            {/**Topbar End */}


            {/**Navbar Start */}
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
                                <a href="/allvehicles" className="nav-item nav-link">Cars</a>
                                <a href="/contact" className="nav-item nav-link">Contact</a>
                                <a href="/login" className='nav-link '>Login</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/**Navbar End */}

            {/**Header Start */}
            <div className="container-fluid page-header">
                <h1 className="display-3 text-uppercase text-white mb-3">Booking</h1>
                <div className="d-inline-flex text-white">
                    <h6 className="text-uppercase m-0"><a className="text-white" href="/">Home</a></h6>
                    <h6 className="text-body m-0 px-3">/</h6>
                    <h6 className="text-uppercase text-body m-0">Booking</h6>
                </div>
            </div>
            {/**Header End */}

            {/**Detail Start */}
            {car.map((car, index) => {
                return (
                    <div className="container-fluid pt-5" key={index}>
                        <div className="container pt-5 pb-3">
                            <h1 className="display-4 text-uppercase mb-5">{car.vehicle_name}</h1>
                            <div className="row align-items-center pb-2">
                                <div className="col-lg-6 mb-4">
                                    <img className="img-fluid" src={`https://carrental-service-l4ls.onrender.com/vehicle/image/${car.vehicle_id}`} alt={car.vehicle_name} />
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <h4 className="mb-2">R{car.vehicle_cost}/Day</h4>
                                    <p>{car.vehicle_info}</p>
                                </div>
                            </div>
                            <div className="row mt-n3 mt-lg-0 pb-4">
                                <div className="col-md-3 col-6 mb-2">
                                    <i className="fa fa-car text-primary mr-2"></i>
                                    <span><strong>Model:</strong> {car.vehicle_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {/**Detail End*/}


            {/**Car Booking Start*/}
            <div className="container-fluid pb-5">
                <div className="container">
                    <form name="bookingform" className="row" onSubmit={BookVehicle}>
                        <div className="col-lg-8">
                            <h2 className="mb-4">Personal Details</h2>

                            <div className="mb-5">
                                <div className="row">

                                    <div className="col-6 form-group">
                                        <input type="text" className="form-control p-4" placeholder="John Smith" required="required" onChange={e => setDetails({ ...details, renter_Name: e.target.value })} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <input type="email" className="form-control p-4" placeholder="Your Email" required="required" onChange={e => setDetails({ ...details, renter_Email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <input type="number" minLength={10} maxLength={10} className="form-control p-4" placeholder="Mobile Number" required="required" onChange={e => setDetails({ ...details, renter_Mobile: e.target.value })} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <input type="number" minLength={13} maxLength={13} className="form-control p-4" placeholder="ID Number" required="required" onChange={e => setDetails({ ...details, renter_ID: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <h2 className="mb-4">Booking Detail</h2>
                            <div className="mb-5">
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <div className="date" id="date2" data-target-input="nearest">
                                            <label htmlFor="previous">Collection Date:</label>
                                            <input type="date" id="previous" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                                data-target="#date2" data-toggle="datetimepicker" onChange={e => setDetails({ ...details, rented_PickUp: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-6 form-group">
                                        <div className="time" id="time2" data-target-input="nearest">
                                            <label htmlFor="next">Return Date:</label>
                                            <input type="date" id="next" className="form-control p-4 datetimepicker-input" placeholder="Pickup Time"
                                                data-target="#time2" data-toggle="datetimepicker" onChange={e => setDetails({ ...details, rented_Return: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="bg-secondary p-5 mb-5">
                                <h2 className="text-primary mb-4">Payment</h2>
                                <p className="text-white"><strong>NOTE:</strong>  payment feature will be disabled as in uses sensitive information. Once booking is made it is assumed payment is automatic to align with scenario</p>

                                <button className="btn btn-block btn-primary py-3">Book Car</button>

                            </div>
                        </div>
                    </form>
                    <p style={{ color: "green" }}>{message && message}</p>
                    <p style={{ color: "red" }}>{errorMessage && errorMessage}</p>
                </div>
            </div>
            {/**Car Booking End*/}

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

export default Booking;