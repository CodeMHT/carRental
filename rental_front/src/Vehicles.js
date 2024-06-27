import React, { useEffect, useState } from "react";
import axios from "axios"

const Vehicles = () => {

    const [cars, setCars] = useState([])

    //Load cars
    useEffect(() => {
        axios.get("https://carrental-service-l4ls.onrender.com/vehicle")
            .then(res => setCars(res.data))
    }, [])


    return (
        <>
            {/*} <!-- ======= Header ======= -->*/}
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <p className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <a href="/dash"><span className="d-none d-lg-block">XDrive Rentals</span></a>
                    </p>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>{/*<!-- End Logo -->*/}


                <nav className="header-nav ms-auto">

                </nav>{/*<!-- End Icons Navigation -->*/}

            </header>

            {/*} <!-- ======= Sidebar ======= -->*/}
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">
                    <li class="nav-item">
                        <a class="nav-link " href="/dash">
                            <i class="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>{/*<!-- End Dashboard Nav -->*/}
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="/addvehicle">
                            <i className="bi bi-menu-button-wide"></i><span>Add Vehicle</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Add Vehicle Nav -->*/}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="/vehicles">
                            <i className="bi bi-journal-text"></i><span>Vehicles</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>

                    </li>{/*<!-- End Vehicles Nav -->*/}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="/rented">
                            <i className="bi bi-layout-text-window-reverse"></i><span>Booked Vehicles</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Booked Vheicles Nav -->*/}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="/reports">
                            <i className="bi bi-gem"></i><span>Reports</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Report Nav -->*/}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="/">
                            <i className="bi bi-gem"></i><span>Log Out</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Log Out Nav -->*/}

                </ul>
            </aside>{/*<!-- End Sidebar-->*/}

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Vehicles</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dash">Dashboard</a></li>
                            <li className="breadcrumb-item active">Vehicles</li>
                        </ol>
                    </nav>
                </div>{/*<!-- End Page Title -->*/}

                {/**Cars */}
                <div className="container-fluid py-5">
                    <div className="container pt-5 pb-3">
                        <h1 className="display-4 text-uppercase text-center mb-5">Vehicles We Own</h1>
                        <div className="row">
                            {/**Start of Car*/}
                            {cars.map((car, index) => {

                                return <div className="col-lg-4 col-md-6 mb-2" key={index}>
                                    <div className="rent-item mb-4">
                                        <img className="img-fluid mb-4" src={"https://carrental-service-l4ls.onrender.com/" + car.vehicle_image} alt={car.vehicle_name} />
                                        <h4 className="text-uppercase mb-4">{car.vehicle_name}</h4>
                                        <div className="d-flex justify-content-center mb-4">
                                            <div className="px-2">
                                                <i className="fa fa-car text-primary mr-1"></i>
                                                <span>{car.vehicle_date}</span>
                                            </div>
                                            <div className="px-2 border-left border-right">
                                                <i className="fa fa-cogs text-primary mr-1"></i>
                                                <span>{car.vehicle_trans}</span>
                                            </div>
                                            <div className="px-2">
                                                <i className="fa fa-road text-primary mr-1"></i>
                                                <span>{car.vehicle_availability}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Vehicles;