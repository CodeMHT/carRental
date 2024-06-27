import React, { useEffect, useState } from "react";
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Dashboard = () => {

    const [revenue, setRevenue] = useState("") //Store revenue for the month
    const [rentals, setRentals] = useState([])  //Store todays Rentals
    const [customers, setCustomers] = useState([])  //Get Names of customers for the current year
    const [topRentals, setTopRentals] = useState([]) //Store vehicles with most bookings
    const [month, setMonth] = useState("")  //Store the amount of rentals this month

    const [open, setOpen] = useState(false)  //Controls the modal

    const Close = () => setOpen(false)
    const Open = () => setOpen(true)

    useEffect(() => {
        //Get revenue for the month
        axios.get(`https://carrental-service-l4ls.onrender.com/finance/revenue`)
            .then(res => setRevenue(res.data))

        //Get Todays Rentals
        axios.get("https://carrental-service-l4ls.onrender.com/finance")
            .then(res => setRentals(res.data))

        //getIDs of top Rentals
        axios.get("https://carrental-service-l4ls.onrender.com/finance/top/rented")
            .then(res => GetRental(res.data))

        //Get The Names of customers
        axios.get("https://carrental-service-l4ls.onrender.com/rental/customers")
            .then(res => setCustomers(res.data))

        axios.get("https://carrental-service-l4ls.onrender.com/rental/rented/monthly")
            .then(res => setMonth(res.data))

    }, [])

    var GetRental = (array) => {  //used to get top Rented vehicles using the id obtained 

        axios.post("https://carrental-service-l4ls.onrender.com/finance/top/vehicles", array)
            .then(res => setTopRentals(res.data))
    }

    return (
        <body>
            <Modal show={open} onHide={Close} scrollable style={{ maxHeight: 650 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Names</Modal.Title>
                </Modal.Header>
                <Modal.Body >{customers.map((user, index) => {
                    return (<ul>
                        <li key={index}>{user.renter_name}</li>
                    </ul>

                    )
                })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={Close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*} <!-- ======= Header ======= -->*/}
            <header id="header" class="header fixed-top d-flex align-items-center">

                <div class="d-flex align-items-center justify-content-between">
                    <p class="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <a href="/dash"><span class="d-none d-lg-block">XDrive Rentals</span></a>
                    </p>
                    <i class="bi bi-list toggle-sidebar-btn"></i>
                </div>{/*<!-- End Logo -->*/}


                <nav class="header-nav ms-auto">

                </nav>{/*<!-- End Icons Navigation -->*/}

            </header>

            {/*} <!-- ======= Sidebar ======= -->*/}
            <aside id="sidebar" class="sidebar">

                <ul class="sidebar-nav" id="sidebar-nav">

                    <li class="nav-item">
                        <a class="nav-link " href="/dash">
                            <i class="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>{/*<!-- End Dashboard Nav -->*/}

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="/addvehicle">
                            <i class="bi bi-menu-button-wide"></i><span>Add Vehicle</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Add Vehicle Nav -->*/}

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="/vehicles">
                            <i class="bi bi-journal-text"></i><span>Vehicles</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>

                    </li>{/*<!-- End Vehicles Nav -->*/}

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="/rented">
                            <i class="bi bi-layout-text-window-reverse"></i><span>Booked Vehicles</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Booked Vheicles Nav -->*/}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="/reports">
                            <i className="bi bi-gem"></i><span>Reports</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Report Nav -->*/}

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="/">
                            <i class="bi bi-gem"></i><span>Log Out</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Log Out Nav -->*/}

                </ul>
            </aside>{/*<!-- End Sidebar-->*/}

            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>{/*<!-- End Page Title -->*/}

                <section class="section dashboard">
                    <div class="row">

                        {/*<!-- Left side columns -->*/}
                        <div class="col-lg-8">
                            <div class="row">

                                {/*<!-- Sales Card -->*/}
                                <div class="col-xxl-4 col-md-6">
                                    <div class="card info-card sales-card">

                                        <div class="filter">
                                            <a class="icon" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item">Today</a></li>
                                                <li><a class="dropdown-item" >This Month</a></li>
                                                <li><a class="dropdown-item" >This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Rentals <span>| This month</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-cart"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6> {month}</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>{/*<!-- End Sales Card -->*/}

                                {/*<!-- Revenue Card -->*/}
                                <div class="col-xxl-4 col-md-6">
                                    <div class="card info-card revenue-card">

                                        <div class="filter">
                                            <a class="icon" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" >Today</a></li>
                                                <li><a class="dropdown-item" >This Month</a></li>
                                                <li><a class="dropdown-item" >This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Revenue <span>| This Month</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-currency-dollar"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>R{revenue}</h6>
                                                    <span class="text-success small pt-1 fw-bold"></span> <span class="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>{/*<!-- End Revenue Card -->*/}

                                {/*<!-- Customers Card -->*/}
                                <div class="col-xxl-4 col-xl-12">

                                    <div class="card info-card customers-card">

                                        <div class="card-body">
                                            <h5 class="card-title">Customers <span>| This Year</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-people"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>{customers.length}</h6>
                                                    <button onClick={Open} style={{ border: 0, fontSize: 15, color: "blue" }}>View Names</button>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>{/*<!-- End Customers Card -->*/}

                                {/*<!-- Reports -->*/}
                                <div class="col-12">
                                    <div class="card">

                                        <div class="filter">
                                            <a class="icon" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" >Today</a></li>
                                                <li><a class="dropdown-item" >This Month</a></li>
                                                <li><a class="dropdown-item" >This Year</a></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>{/*<!-- End Reports -->*/}

                                {/*<!-- Recent Sales -->*/}
                                <div class="col-12">
                                    <div class="card recent-sales overflow-auto">

                                        <div class="filter">
                                            <a class="icon" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" >Today</a></li>
                                                <li><a class="dropdown-item" >This Month</a></li>
                                                <li><a class="dropdown-item" >This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Recent Rentals <span>| Today</span></h5>

                                            <table class="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Customer</th>
                                                        <th scope="col">Vehicle</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Mobile</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rentals.map((rental, index) => {

                                                        return (<tr key={index}>
                                                            <th scope="row">{rental.rented_id}</th>
                                                            <td>{rental.renter_name}</td>
                                                            <td class="text-primary">{rental.vehicle_name}</td>
                                                            <td>{rental.vehicle_date}</td>
                                                            <td><span class="row">{rental.renter_mobile}</span></td>
                                                        </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>{/*<!-- End Recent Sales -->*/}

                                {/*<!-- Top Selling -->*/}
                                <div class="col-12">
                                    <div class="card top-selling overflow-auto">

                                        <div class="filter">
                                            <a class="icon" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" >Today</a></li>
                                                <li><a class="dropdown-item" >This Month</a></li>
                                                <li><a class="dropdown-item" >This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body pb-0">
                                            <h5 class="card-title">Top rented</h5>

                                            <table class="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Preview</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Year</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {topRentals.map((rent, index) => (
                                                        <tr key={index}>
                                                            {rent.map((car, index1) => (
                                                                <React.Fragment key={index1}>
                                                                    <th scope="row" ><img src={"https://carrental-service-l4ls.onrender.com/" + car.vehicle_image} alt={car.vehicle_name} /></th>
                                                                    <td style={{ color: "blue" }}>{car.vehicle_name}</td>
                                                                    <td>R{car.vehicle_cost}</td>
                                                                    <td class="fw-bold">{car.vehicle_date}</td>
                                                                </React.Fragment>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>{/*<!-- End Top Selling -->*/}

                            </div>
                        </div>{/*<!-- End Left side columns -->*/}
                    </div>

                </section>

            </main>
            {/**End #main */}

            {/**Footer*/}
            <footer id="footer" class="footer">
                <div class="copyright">
                    &copy; Copyright <strong><span>XDrive Rentals</span></strong>. All Rights Reserved
                </div>
                <div class="credits">
                    {/**<!-- All the links in the footer should remain intact. -->
            <!-- You can delete the links only if you purchased the pro version. -->
            <!-- Licensing information: https://bootstrapmade.com/license/ -->
                    <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->*/}
                    CSS Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </footer>
            {/**End Footer*/}
        </body>
    )
}

export default Dashboard;