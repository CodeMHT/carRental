import React from "react";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Import Pages
import Home from './Home';
import Login from "./Login";
import Dashboard from "./Dashboard";
import AddVehicle from "./AddVehicle";
import Contact from "./Contact";
import Vehicles from "./Vehicles";
import Cars from "./Cars";
import Booking from "./Booking";
import RentedCars from "./RentedCars";
import Reports from "./Reports";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/addvehicle" element={< AddVehicle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vehicles" element={< Vehicles />} />
        <Route path="/allcars" element={<Cars />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/rented" element={<RentedCars />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>


    </BrowserRouter>
  )
}

export default App;
library.add(fab, fas, far)