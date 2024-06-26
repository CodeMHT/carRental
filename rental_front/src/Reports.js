import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from 'react-bootstrap/Dropdown';


ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale);


const Reports = () => {

    const [names, setNames] = useState([]) //Store the names
    const [data, setData] = useState([]) //Store the data



    const [error, setError] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:5100/reports/${"A"}`)
            .then(res => {
                if (res.data === "Failure Doughnut") {
                    setError("Error fetching Data")
                } else {

                    GetVehicleName(res.data)
                }

            }
            )
    }, [])

    const GetMonthAndDate = (month) => {
        axios.get(`http://localhost:5100/reports/${month}`)
            .then(res => {
                GetVehicleName(res.data)
            }
            )
    }

    const GetVehicleName = (cars) => {
        let names = []
        let times = []
        for (var i = 0; i < cars.length; i++) {
            times.push(cars[i].times)
            axios.get(`http://localhost:5100/reports/vehicles/id/${cars[i].vehicle_id}`)
                .then(res => {

                    let temp = res.data
                    names.push(temp[0].vehicle_name)

                })
        }
        setNames(names)
        setData(times)

    }

    const tempdata = {
        labels: names,
        datasets: [{
            label: 'Car Rentals',
            data: data,
            backgroundColor: [
                'rgba(82, 78, 183)',

            ],
            borderColor: [
                'rgb(82, 78, 183)',

            ],
            borderWidth: 1
        }]
    }

    const options = {
        maintainAspectRatio: false,
        legend: {
            labels: {
                fontSize: 30
            }
        },
        scales: {
            x: {
                grid: {
                    offset: true
                }
            }
        }
    };

    return (
        <>
            {/*<!-- ======= Header ======= -->*/}
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
                    <li className="nav-item">
                        <a className="nav-link " href="/dash">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>{/*<!-- End Dashboard Nav -->*/}
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="/addvehicle">
                            <i className="bi bi-menu-button-wide"></i><span>Add Vehicle</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>{/*<!-- End Add Vehicles Nav -->*/}

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
                    </li>{/*<!-- End Log Out Nav -->*/}

                </ul>
            </aside>{/*<!-- End Sidebar-->*/}

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Reports</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dash">Dashboard</a></li>
                            <li className="breadcrumb-item active">Reports</li>
                        </ol>
                    </nav>
                </div>{/*<!-- End Page Title -->*/}

                <section className="section" >
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <h5 className="card-title">Months Top Sellers <span><DropdownButton bsPrefix="btn btn-light rounded-pill" title="Month" style={{ paddingBottom: 10 }}>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(1)}>January</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(2)}>February</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(3)}>March</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(4)}>April</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(5)}>May</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(6)}>June</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(7)}>July</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(8)}>August</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(9)}>September</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(10)}>October</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(11)}>November</Dropdown.Item>
                                    <Dropdown.Item onClick={() => GetMonthAndDate(12)}>December</Dropdown.Item>
                                </DropdownButton></span></h5>
                                <div className="card-body" style={{ width: 1000 }}>
                                    <div>
                                        {/**Bar Chart*/}
                                        <Bar data={tempdata} height={300} options={options} width={30} />
                                    </div>
                                    <p style={{ color: "red" }}><strong>{error && error}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Reports;