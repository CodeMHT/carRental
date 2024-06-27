import React, { useState } from "react";
import axios from "axios";

const AddVehicle = () => {

    const [car, setCar] = useState({
        car_Name: "",
        car_Info: "",
        car_Date: 0,
        car_Image: {},
        car_Type: "",
        car_Trans: ""
    })

    const [message, setMessage] = useState("")

    const Add = (event) => {
        event.preventDefault()
        const data = new FormData();

        data.append("car_Name", car.car_Name)
        data.append("car_Info", car.car_Info)
        data.append("car_Date", car.car_Date)
        data.append("car_Image", car.car_Image)
        data.append("car_Type", car.car_Type)
        data.append("car_Trans", car.car_Trans)

        axios.post("https://carrental-service-l4ls.onrender.com/vehicle", data)
            .then(res => {

                if (res.data === "Success") {
                    alert(car.car_Name + " has been added successfully")
                    window.location.reload()
                } else {
                    setMessage("Failed to add " + car.car_Name)
                }
            })
    }

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
                    </li>{/*<!-- End Booked Vehicles Nav -->*/}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="/reports">
                            <i className="bi bi-gem"></i><span>Reports</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Report Nav -->*/}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="/">
                            <i className="bi bi-gem"></i><span>Log Out</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Log OutNav -->*/}

                </ul>
            </aside>{/*<!-- End Sidebar-->*/}

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Add Vehicle</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dash">Dashboard</a></li>
                            <li className="breadcrumb-item active">Add Vehicle</li>
                        </ol>
                    </nav>
                </div>{/*<!-- End Page Title -->*/}

                <form className="row g-3">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <label htmlFor="model">Car Model</label>
                            <input type="text" className="form-control" id="model" placeholder="BMW 3 series" required onChange={e => setCar({ ...car, car_Name: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <label htmlFor="carDate">Model Year</label>
                            <input type="number" min="2000" max="2099" maxLength="4" placeholder="2015" className="form-control" id="carDate" required onChange={e => setCar({ ...car, car_Date: e.target.value })} />
                        </div>
                    </div>
                    <br />
                    <div className="col-md-6">
                        <div className="form-floating">
                            <label htmlFor="details">Car Information(optional)</label>
                            <textarea className="form-control" placeholder="This car was released..." id="details" style={{ height: 100, width: 572 }} onChange={e => setCar({ ...car, car_Info: e.target.value })}></textarea>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <p className="col-sm-2 col-form-label" >Transmission</p>
                        <input className="form-check-input" name="trans" type="radio" id="auto" value="Auto" onChange={e => setCar({ ...car, car_Trans: e.target.value })} />
                        <label htmlFor="auto" style={{ paddingRight: 25 }}>Automatic</label>
                        <input className="form-check-input" name="trans" type="radio" id="manual" value="Manual" onChange={e => setCar({ ...car, car_Trans: e.target.value })} />
                        <label htmlFor="manual" style={{ paddingRight: 25 }}>Manual</label>
                    </div>

                    <div className="col-12">
                        <label htmlFor="image" className="col-sm-2 col-form-label" >Car Image</label>
                        <input className="form-control" type="file" id="image" onChange={e => setCar({ ...car, car_Image: e.target.files[0] })} />
                    </div>
                    <div className="col-12">
                        <p className="col-sm-2 col-form-label" >Car Type</p>
                        <input className="form-check-input" name="cartype" type="radio" id="series" value="S" onChange={e => setCar({ ...car, car_Type: e.target.value })} />
                        <label htmlFor="series" style={{ paddingRight: 25 }}>Series Package</label>
                        <input className="form-check-input" name="cartype" type="radio" id="M" value="M" onChange={e => setCar({ ...car, car_Type: e.target.value })} />
                        <label htmlFor="M Package" style={{ paddingRight: 25 }}>M Package</label>
                        <input className="form-check-input" name="cartype" type="radio" id="X" value="X" onChange={e => setCar({ ...car, car_Type: e.target.value })} />
                        <label htmlFor="X" style={{ paddingRight: 25 }}>X Package</label>
                        <input className="form-check-input" name="cartype" type="radio" id="electric" value="E" onChange={e => setCar({ ...car, car_Type: e.target.value })} />
                        <label htmlFor="E" style={{ paddingRight: 25 }}>Electric Package</label>
                        <input className="form-check-input" name="cartype" type="radio" id="electric" value="C" onChange={e => setCar({ ...car, car_Type: e.target.value })} />
                        <label htmlFor="C" >Classics</label>
                    </div>

                    <div className="text-center" style={{ paddingTop: 20, paddingLeft: 12.5 }}>
                        <button type="submit" className="btn btn-primary" onClick={Add}>Submit</button>
                    </div>
                    {message && message}
                </form>
            </main>
        </>
    )
}

export default AddVehicle;