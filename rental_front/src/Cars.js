import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from "react";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cars = () => {

    const [cars, setCars] = useState([]) //Store Vehicles
    const redirect = useNavigate();

    useEffect(() => {
        axios.get("https://carrental-service-l4ls.onrender.com/vehicle/available/car")
            .then(res => setCars(res.data))

    }, [])

    const GetModel = (model) => {
        if (model === "A") {
            axios.get("https://carrental-service-l4ls.onrender.com/vehicle/available/car")
                .then(res => setCars(res.data))
        } else {


            axios.get(`https://carrental-service-l4ls.onrender.com/vehicle/${model}`)
                .then(res => {

                    setCars(res.data)
                })
        }
    }

    //Avoiding using URL parameters as the cause issues upon deployment
    const SendID = (ID) => {
        redirect("/booking", { state: ID })
    }

    return (
        <>

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
            {/**Topbar End */}


            {/**Navbar Start */}
            <div className="container-fluid position-relative nav-bar p-0">
                <div className="position-relative px-lg-5" style={{ zIndex: 9 }}>
                    <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5" >
                        <a href="/" className="navbar-brand">
                            <h1 className="text-uppercase text-primary mb-1">XDrive Rentals</h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
                            <div className="navbar-nav ml-auto py-0">
                                <a href="/" className="nav-item nav-link active">Home</a>
                                <a href="/allcars" className="nav-item nav-link">Cars</a>
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
                        <Dropdown.Item onClick={() => GetModel("S")}>Series</Dropdown.Item>
                        <Dropdown.Item onClick={() => GetModel("E")}>Electric</Dropdown.Item>
                        <DropdownItem onClick={() => GetModel("C")}>Classics</DropdownItem>
                    </DropdownButton>
                    <div className="row">
                        {/**Showing Of Cars */}
                        {cars.map((car, index) => {

                            return (<div className="col-lg-4 col-md-6 mb-2" key={index}>
                                <div className="rent-item mb-4">
                                    <img className="img-fluid mb-4" src={"https://carrental-service-l4ls.onrender.com/" + car.vehicle_image} alt={car.vehicle_name} />
                                    <h4 className="text-uppercase mb-4">{car.vehicle_name}</h4>
                                    <div className="d-flex justify-content-center mb-4">
                                        <div className="px-2">
                                            <i className="fa fa-car text-primary mr-1"></i>
                                            <span>{car.vehicle_date}</span>
                                        </div>
                                        <div className="px-2 border-left">
                                            <i className="fa fa-cogs text-primary mr-1"></i>
                                            <span>{car.vehicle_trans}</span>
                                        </div>

                                    </div>

                                    <button onClick={() => SendID(car.vehicle_id)} className="btn btn-primary px-3" >R{car.vehicle_cost} /Day</button>
                                </div>
                            </div>
                            )
                        })}

                    </div>
                </div>
            </div>
            {/**Car End */}

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
export default Cars;
