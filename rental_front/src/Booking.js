import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Booking = () => {

    const params = useParams()
    const redirect = useNavigate()
    const [car, setCar] = useState([])
    const [message, setMessage] = useState("")

    const [details, setDetails] = useState({
        rented_PickUp: 0,
        rented_Return: 0,
        vehicle_ID: params.id,
        renter_Email: "",
        renter_Mobile: 0,
        renter_Name: "",
        renter_ID: 0,
        rented_Cost: 0
    })

    useEffect(() => {
        axios.get(`http://localhost:5100/vehicle/car/${params.id}`)
            .then(res => setCar(res.data))
    }, [])


    //Sending information to api
    const BookVehicle = () => {
        //Used to get the days
        var pickup = new Date(details.rented_PickUp)
        var dropoff = new Date(details.rented_Return)

        //get the days between dates
        var days = (dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)
        details.rented_Cost = days * car[0].vehicle_Cost

        if (details.renter_ID.length === 13 && details.renter_Mobile.length === 10) {

            axios.post("http://localhost:5100/rental", details)
                .then(res => {
                    if (res.data === "Success") {
                        alert("Success. You'll receive an email with details of your order")
                        redirect("/cars")
                    } else {
                        setMessage("Error Making the booking. Please reload the page and try again ")
                    }
                })

        } else {
            setMessage("ID and/or Mobile is incorrect")
        }

        if (message.length < 1) {
            redirect("/cars")
        }

    }


    return (
        <>
            {/**Topbar Start */}
            <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
                <div className="row">
                    <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center">
                            <a className="text-body pr-3" href=""><i className="mr-2"><FontAwesomeIcon icon="fa fa-phone-alt" /></i>0842793374</a>
                            <span className="text-body">|</span>
                            <a className="text-body px-3" href=""><i className="mr-2"><FontAwesomeIcon icon="fa fa-envelope" /></i>gwalamhlaba@icloud.com</a>
                        </div>
                    </div>
                    <div className="col-md-6 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">
                            <a className="text-body px-3" href="">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="text-body px-3" href="">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="text-body px-3" href="">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="text-body px-3" href="">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a className="text-body pl-3" href="">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/**Topbar End */}


            {/**Navbar Start */}
            <div className="container-fluid position-relative nav-bar p-0">
                <div className="position-relative px-lg-5" style={{ zIndex: 9 }}>
                    <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
                        <a href="" className="navbar-brand">
                            <h1 className="text-uppercase text-primary mb-1">XDrive Rentals</h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
                            <div className="navbar-nav ml-auto py-0">
                                <a href="/" className="nav-item nav-link active">Home</a>
                                <a href="/cars" className="nav-item nav-link">Cars</a>
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
                                    <img className="img-fluid" src={"http://localhost:5100/" + car.vehicle_image} alt={car.vehicle_name} />
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
                    <form className="row">
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
                                            <input type="date" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                                data-target="#date2" data-toggle="datetimepicker" onChange={e => setDetails({ ...details, rented_PickUp: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-6 form-group">
                                        <div className="time" id="time2" data-target-input="nearest">
                                            <input type="date" className="form-control p-4 datetimepicker-input" placeholder="Pickup Time"
                                                data-target="#time2" data-toggle="datetimepicker" onChange={e => setDetails({ ...details, rented_Return: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="bg-secondary p-5 mb-5">
                                <h2 className="text-primary mb-4">Payment</h2>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="paypal" />
                                        <label className="custom-control-label" for="paypal">Paypal</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="directcheck" />
                                        <label className="custom-control-label" for="directcheck">Direct Check</label>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="banktransfer" />
                                        <label className="custom-control-label" for="banktransfer">Bank Transfer</label>
                                    </div>
                                </div>
                                <button className="btn btn-block btn-primary py-3" onClick={(() => BookVehicle())}>Book Car</button>

                            </div>
                        </div>
                    </form>
                    {message && message}
                </div>
            </div>
            {/**Car Booking End*/}

            {/**Footer Start */}
            <div class="container-fluid bg-secondary py-5 px-sm-3 px-md-5" style={{ marginTop: 90 }}>
                <div class="row pt-5">
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-uppercase text-light mb-4">Get In Touch</h4>
                        <p class="mb-2"><i class="fa fa-map-marker-alt text-white mr-3"></i>123 Street, New York, USA</p>
                        <p class="mb-2"><i class="fa fa-phone-alt text-white mr-3"></i>+012 345 67890</p>
                        <p><i class="fa fa-envelope text-white mr-3"></i>info@example.com</p>
                        <h6 class="text-uppercase text-white py-2">Follow Us</h6>
                        <div class="d-flex justify-content-start">
                            <a class="btn btn-lg btn-dark btn-lg-square mr-2" href="#"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-lg btn-dark btn-lg-square mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-lg btn-dark btn-lg-square mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-lg btn-dark btn-lg-square" href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-uppercase text-light mb-4">Usefull Links</h4>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-body mb-2" href="#"><i class="fa fa-angle-right text-white mr-2"></i>Private Policy</a>
                            <a class="text-body mb-2" href="#"><i class="fa fa-angle-right text-white mr-2"></i>Term & Conditions</a>
                            <a class="text-body mb-2" href="#"><i class="fa fa-angle-right text-white mr-2"></i>New Member Registration</a>
                            <a class="text-body mb-2" href="#"><i class="fa fa-angle-right text-white mr-2"></i>Affiliate Programme</a>
                            <a class="text-body mb-2" href="#"><i class="fa fa-angle-right text-white mr-2"></i>Return & Refund</a>
                            <a class="text-body" href="#"><i class="fa fa-angle-right text-white mr-2"></i>Help & FQAs</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-uppercase text-light mb-4">Car Gallery</h4>
                        <div class="row mx-n1">
                            <div class="col-4 px-1 mb-2">
                                <a href=""><img class="w-100" src="https://img-ik.cars.co.za/news-site-za/images/2023/04/BMW-M2-2023-28.jpg?tr=w-1200,h-800" alt="" /></a>
                            </div>
                            <div class="col-4 px-1 mb-2">
                                <a href=""><img class="w-100" src="https://carsite.co.za/wp-content/uploads/2012/12/BMW-M6-Gran-Coupe-Rear1.jpg" alt="" /></a>
                            </div>
                            <div class="col-4 px-1 mb-2">
                                <a href=""><img class="w-100" src="https://media.evo.co.uk/image/private/s--NV8ZTho0--/v1556218410/evo/2017/10/super-test_033.jpg" alt="" /></a>
                            </div>
                            <div class="col-4 px-1 mb-2">
                                <a href=""><img class="w-100" src="https://www.bmw.co.za/content/dam/bmw/common/all-models/m-series/x5m/2023/highlights/bmw-m-series-x5-m-gallery-image-impressionen-02_1920.jpg.asset.1673025861930.jpg" alt="" /></a>
                            </div>
                            <div class="col-4 px-1 mb-2">
                                <a href=""><img class="w-100" src="https://www.bmwusa.com/content/dam/bmw/common/vehicles/2023/my24/m-models/x6-m/overview/mobile/BMW-MY24-X6M-Overview-Form-01-Mobile.jpg" alt="" /></a>
                            </div>
                            <div class="col-4 px-1 mb-2">
                                <a href=""><img class="w-100" src="https://www.carmag.co.za/wp-content/uploads/2023/12/BMW-Z4-prototype-front-three-quarter-copy-jpg.webp" alt="" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-uppercase text-light mb-4">Newsletter</h4>
                        <p class="mb-4">Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem lorem sit sed elitr sed kasd et</p>
                        <div class="w-100 mb-3">
                            <div class="input-group">
                                <input type="text" class="form-control bg-dark border-dark" style={{ padding: 25 }} placeholder="Your Email" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary text-uppercase px-3">Sign Up</button>
                                </div>
                            </div>
                        </div>
                        <i>Lorem sit sed elitr sed kasd et</i>
                    </div>
                </div>
            </div>
            <div class="container-fluid bg-dark py-4 px-sm-3 px-md-5">
                <p class="mb-2 text-center text-body">&copy; <a href="#">XDrive Rentals</a>. All Rights Reserved.</p>

                {/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/}
                <p class="m-0 text-center text-body">Designed by <a href="https://htmlcodex.com">HTML Codex</a></p>
            </div>
            {/* Footer End */}


            {/* Back to Top */}
            <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="fa fa-angle-double-up"></i></a>


        </>

    )
}

export default Booking;