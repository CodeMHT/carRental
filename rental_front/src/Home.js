import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emailjs from '@emailjs/browser';




const Home = () => {

    const [email, setEmail] = useState({
        name: " ",
        mail: " ",
        message: ""
    })

    const TempEmail = {
        from_name: email.name,
        from_email: email.mail,
        to_name: 'Web Wizard',
        message: email.message

    }

    const sendEmail = (event) => {
        event.preventDefault()

        emailjs
            .send('service_c49ah4q', 'template_2h74a5v', TempEmail, 'VunDcHdYxVzCgZmBy')
            .then(
                () => {
                    console.log('SUCCESS!');
                    setEmail({})
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    }

    return (
        <>
            <body>
                <div>
                    {/**Topbar Start */}
                    <div class="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
                        <div class="row">
                            <div class="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                                <div className="d-inline-flex align-items-center">
                                    <a className="text-body pr-3" ><i className="mr-2"><FontAwesomeIcon icon="fa fa-phone-alt" /></i>0842793374</a>
                                    <span className="text-body">|</span>
                                    <a className="text-body px-3"><i className="mr-2"><FontAwesomeIcon icon="fa fa-envelope" /></i>gwalamhlaba@icloud.com</a>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/**Topbar End */}


                    {/**Navbar Start */}
                    <div class="container-fluid position-relative nav-bar p-0">
                        <div class="position-relative px-lg-5" style={{ zIndex: 9 }}>
                            <nav class="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
                                <a href="" class="navbar-brand">
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
                    {/**Navbar End */}

                    {/**Carousel Start */}
                    <div class="container-fluid p-0" style={{ marginBottom: 90 }}>
                        <div id="header-carousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="w-100" src="https://images.pistonheads.com/nimg/44216/DSCF0329.jpg" alt="Image" />
                                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div class="p-3" style={{ maxWidth: 900 }}>
                                            <h4 class="text-white text-uppercase mb-md-3">Rent A Car</h4>
                                            <h1 class="display-1 text-white mb-md-4">Best Rental Cars In Your Location</h1>
                                            <a href="/cars" class="btn btn-primary py-md-3 px-md-5 mt-2">Reserve Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/** Carousel End*/}


                {/**About Start */}
                <div class="container-fluid py-5">
                    <div class="container pt-5 pb-3">
                        <h1 class="display-1 text-primary text-center">01</h1>
                        <h1 class="display-4 text-uppercase text-center mb-5">Welcome To <span class="text-primary">XDrive Rentals</span></h1>
                        <div class="row justify-content-center">
                            <div class="col-lg-10 text-center">
                                <img class="w-75 mb-4" src="https://larte-design.com/storage/app/media/kits/bmw/x6m/animation/bmw-x6m-competition-front-2023-gray-dannington.webp" alt="" />
                                <p>
                                    Welcome to XDrive Rentals, where luxury meets the open road. Our rental BMW fleet redefines the driving experience, offering a selection of premium vehicles that seamlessly blend sophistication with performance. Whether you're looking to make a statement at a special event or indulge in a weekend getaway, our meticulously maintained BMW lineup ensures that you'll command attention wherever your journey takes you. At XDrive Rentals, we prioritize customer satisfaction, offering seamless reservation processes and personalized service to ensure your rental experience is as exceptional as the vehicles we provide. Choose us for an unparalleled fusion of luxury, style, and the joy of the ultimate driving machine.</p>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-4 mb-2">
                                <div class="d-flex align-items-center bg-light p-4 mb-4" style={{ height: 150 }}>
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" style={{ width: 100, height: 100 }}>
                                        <i class="fa fa-2x fa-headset text-secondary"></i>
                                    </div>
                                    <h4 class="text-uppercase m-0">24/7 Car Rental Support</h4>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-2">
                                <div class="d-flex align-items-center bg-secondary p-4 mb-4" style={{ height: 150 }}>
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" style={{ width: 100, height: 100 }}>
                                        <i class="fa fa-2x fa-car text-secondary"></i>
                                    </div>
                                    <h4 class="text-light text-uppercase m-0">Car Reservation Anytime</h4>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-2">
                                <div class="d-flex align-items-center bg-light p-4 mb-4" style={{ height: 150 }}>
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" style={{ width: 100, height: 100 }}>
                                        <i class="fa fa-2x fa-map-marker-alt text-secondary"></i>
                                    </div>
                                    <h4 class="text-uppercase m-0">Lots Of Pickup Locations</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/** About End*/}

                {/**Contact*/}
                <div className="container-fluid py-5">
                    <div className="container pt-5 pb-3">
                        <h1 className="display-4 text-uppercase text-center mb-5">Contact Us</h1>
                        <div className="row">
                            <div className="col-lg-7 mb-2">
                                <div className="contact-form bg-light mb-4" style={{ padding: 30 }}>

                                    <form onSubmit={sendEmail}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <input type="text" className="form-control p-4" placeholder="Your Name" required="required" onChange={e => setEmail({ ...email, name: e.target.value })} />
                                            </div>
                                            <div className="col-6 form-group">
                                                <input type="email" className="form-control p-4" placeholder="Your Email" required="required" onChange={e => setEmail({ ...email, mail: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control py-3 px-4" rows="5" placeholder="Message" required="required" onChange={e => setEmail({ ...email, message: e.target.value })}></textarea>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary py-3 px-5" type="submit">Send Message</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="col-lg-5 mb-2">
                                <div className="bg-secondary d-flex flex-column justify-content-center px-5 mb-4" style={{ height: 435 }}>
                                    <div className="d-flex mb-3">
                                        <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3"></i>
                                        <div className="mt-n1">
                                            <h5 className="text-light">Head Office</h5>
                                            <p>Johannesburg</p>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3"></i>
                                        <div className="mt-n1">
                                            <h5 className="text-light">Branch Office</h5>
                                            <p>Johannesburg</p>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3"></i>
                                        <div className="mt-n1">
                                            <h5 className="text-light">Customer Service</h5>
                                            <p>Johannesburg</p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3"></i>
                                        <div className="mt-n1">
                                            <h5 className="text-light">Return & Refund</h5>
                                            <p className="m-0">Johannesburg</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/**End Contact */}

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
                            <h4 class="text-uppercase text-light mb-4">Useful Links</h4>
                            <div class="d-flex flex-column justify-content-start">
                                <a class="text-body mb-2" ><i class="fa fa-angle-right text-white mr-2"></i>Private Policy</a>
                                <a class="text-body mb-2" ><i class="fa fa-angle-right text-white mr-2"></i>Term & Conditions</a>
                                <a class="text-body mb-2" ><i class="fa fa-angle-right text-white mr-2"></i>New Member Registration</a>
                                <a class="text-body mb-2" ><i class="fa fa-angle-right text-white mr-2"></i>Affiliate Programme</a>
                                <a class="text-body mb-2" ><i class="fa fa-angle-right text-white mr-2"></i>Return & Refund</a>
                                <a class="text-body" ><i class="fa fa-angle-right text-white mr-2"></i>Help & FQAs</a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-5">
                            <h4 class="text-uppercase text-light mb-4">Car Gallery</h4>
                            <div class="row mx-n1">
                                <div class="col-4 px-1 mb-2">
                                    <a ><img class="w-100" src="https://img-ik.cars.co.za/news-site-za/images/2023/04/BMW-M2-2023-28.jpg?tr=w-1200,h-800" alt="" /></a>
                                </div>
                                <div class="col-4 px-1 mb-2">
                                    <a ><img class="w-100" src="https://carsite.co.za/wp-content/uploads/2012/12/BMW-M6-Gran-Coupe-Rear1.jpg" alt="" /></a>
                                </div>
                                <div class="col-4 px-1 mb-2">
                                    <a ><img class="w-100" src="https://media.evo.co.uk/image/private/s--NV8ZTho0--/v1556218410/evo/2017/10/super-test_033.jpg" alt="" /></a>
                                </div>
                                <div class="col-4 px-1 mb-2">
                                    <a ><img class="w-100" src="https://www.bmw.co.za/content/dam/bmw/common/all-models/m-series/x5m/2023/highlights/bmw-m-series-x5-m-gallery-image-impressionen-02_1920.jpg.asset.1673025861930.jpg" alt="" /></a>
                                </div>
                                <div class="col-4 px-1 mb-2">
                                    <a ><img class="w-100" src="https://www.bmwusa.com/content/dam/bmw/common/vehicles/2023/my24/m-models/x6-m/overview/mobile/BMW-MY24-X6M-Overview-Form-01-Mobile.jpg" alt="" /></a>
                                </div>
                                <div class="col-4 px-1 mb-2">
                                    <a ><img class="w-100" src="https://www.carmag.co.za/wp-content/uploads/2023/12/BMW-Z4-prototype-front-three-quarter-copy-jpg.webp" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid bg-dark py-4 px-sm-3 px-md-5">
                    <p class="mb-2 text-center text-body">&copy; <a >XDrive Rentals</a>. All Rights Reserved.</p>

                    {/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/}
                    <p class="m-0 text-center text-body">CSS Designed by <a href="https://htmlcodex.com">HTML Codex</a></p>
                </div>
                {/* Footer End */}
            </body>

        </>
    )
}

export default Home;