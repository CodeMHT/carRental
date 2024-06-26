import axios from "axios";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from "react";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cars = () => {

    const [cars, setCars] = useState([]) //Store Vehicles

    useEffect(() => {
        axios.get("http://localhost:5100/vehicle/available/car")
            .then(res => setCars(res.data))
    }, [])

    const GetModel = (model) => {
        if (model === "A") {
            axios.get("http://localhost:5100/vehicle/available/car")
                .then(res => setCars(res.data))
        } else {


            axios.get(`http://localhost:5100/vehicle/${model}`)
                .then(res => setCars(res.data))
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
                    <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5" >
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
                <h1 className="display-3 text-uppercase text-white mb-3">Car Listing</h1>
                <div className="d-inline-flex text-white">
                    <h6 className="text-uppercase m-0"><a className="text-white" href="/">Home</a></h6>
                    <h6 className="text-body m-0 px-3">/</h6>
                    <h6 className="text-uppercase text-body m-0">Car Listing</h6>
                </div>
            </div>
            {/**Header End */}


            {/**Rent Start */}
            <div className="container-fluid py-5">
                <div className="container pt-5 pb-3">
                    <h1 className="display-4 text-uppercase text-center mb-5">Find Your Car</h1>
                    <DropdownButton id="dropdown-basic-button" title="Model" style={{ paddingBottom: 10 }}>
                        <DropdownItem onClick={() => GetModel("A")}>All</DropdownItem>
                        <Dropdown.Item onClick={() => GetModel("X")}>SUV</Dropdown.Item>
                        <Dropdown.Item onClick={() => GetModel("M")}>M Performance</Dropdown.Item>
                        <Dropdown.Item onClick={() => GetModel("S")}>Sedan</Dropdown.Item>
                        <Dropdown.Item onClick={() => GetModel("E")}>Electric</Dropdown.Item>
                        <DropdownItem onClick={() => GetModel("C")}>Classics</DropdownItem>
                    </DropdownButton>
                    <div className="row">
                        {/**Showing Of Cars */}
                        {cars.map((car, index) => {

                            return (<div className="col-lg-4 col-md-6 mb-2" key={index}>
                                <div className="rent-item mb-4">
                                    <img className="img-fluid mb-4" src={"http://localhost:5100/" + car.vehicle_image} alt={car.vehicle_name} />
                                    <h4 className="text-uppercase mb-4">{car.vehicle_name}</h4>
                                    <div className="d-flex justify-content-center mb-4">
                                        <div className="px-2">
                                            <i className="fa fa-car text-primary mr-1"></i>
                                            <span>{car.vehicle_Date}</span>
                                        </div>
                                        <div className="px-2 border-left">
                                            <i className="fa fa-cogs text-primary mr-1"></i>
                                            <span>{car.vehicle_Trans}</span>
                                        </div>

                                    </div>
                                    <a className="btn btn-primary px-3" href={"/booking/" + car.vehicle_id}>R{car.vehicle_cost} /Day</a>
                                </div>
                            </div>
                            )
                        })}

                    </div>
                </div>
            </div>
            {/**Car End */}

            {/**Footer Start */}
            <div class="container-fluid bg-secondary py-5 px-sm-3 px-md-5" style={{ marginTop: 90 }}>
                <div class="row pt-5">
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-uppercase text-light mb-4">Get In Touch</h4>
                        <p class="mb-2"><i class="fa fa-map-marker-alt text-white mr-3"></i>Gauteng</p>
                        <p class="mb-2"><i class="fa fa-phone-alt text-white mr-3"></i>084 279 3374</p>
                        <p><i class="fa fa-envelope text-white mr-3"></i>gwalamhlaba@icloud.com</p>
                        <h6 class="text-uppercase text-white py-2">My other platforms</h6>
                        <div class="d-flex justify-content-start">
                            <a class="btn btn-lg btn-dark btn-lg-square mr-2" href="https://www.linkedin.com/in/mhlabunzima-gwala-a56b30274/"><FontAwesomeIcon icon="fab fa-linkedin-in" /></a>
                            <a class="btn btn-lg btn-dark btn-lg-square" href="https://www.instagram.com/chillycheesecalii/"><FontAwesomeIcon icon="fab fa-instagram" /></a>
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
export default Cars;
