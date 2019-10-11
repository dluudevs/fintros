import React from 'react';
import gbFlag from '../assets/gb-flag.png';
import usFlag from '../assets/us-flag.png';
import caFlag from '../assets/ca-flag.png';

const Footer = () => (
    <footer>
        <div className="footer_section">
            <div className="about_us wrapper_small">
                <div className="about_us__item">
                    <h4>About us</h4>
                    <a href="">Who we are</a>
                </div>
                <div className="about_us__item">
                    <h4>Learn more</h4>
                    <ul>
                        <li>
                            <a href="#">The Details</a>
                        </li>
                        <li>
                            <a href="#">Investing 101</a>
                        </li>
                        <li>
                            <a href="#">Responsible investing</a>
                        </li>
                        <li>
                            <a href="#">Halal investing</a>
                        </li>
                        <li>
                            <a href="#">Wealthsimple Black</a>
                        </li>
                        <li>
                            <a href="#">Magazine</a>
                        </li>
                    </ul>
                </div>
                <div className="about_us__item">
                    <h4>Legal</h4>
                    <ul>
                        <li>
                            <a href="#">Terms of use</a>
                        </li>
                        <li>
                            <a href="#">Privacy policy</a>
                        </li>
                        <li>
                            <a href="#">Full disclosure</a>
                        </li>
                        <li>
                            <a href="#">File a complaint</a>
                        </li>
                    </ul>
                </div>
                <div className="about_us__item">
                    <h4>Download the app</h4>
                    <ul className="footer_icons__container">
                        <li>
                            <a href="#">
                                <span className="sr-only">Link to Apple Store</span>
                                <i className="fab fa-apple"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="sr-only">Link to Google Play Store</span>
                                <i className="fab fa-android"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
           
        <div className="footer_section">
            <div className="questions wrapper_small">
                <div className="questions__item">
                    <h4>Questions?</h4>
                    <a href="#">Support Center</a>
                </div>
                <div className="questions__item">
                    <h4>Language</h4>
                    <ul>
                        <li>
                            <a href="#">English</a>
                        </li>
                        <li>
                            <a href="#">Francais</a>
                        </li>
                    </ul>
                </div>
                <div className="questions__item">
                    <h4>Country</h4>
                    <ul className="country_container">
                        <li>
                            <a className="country-link" href="#">
                                <div className="country country-gb">
                                    <span className="sr-only">Change Country to Great Britain</span>
                                    <img src={gbFlag} alt="Change Country to Great Britain"/>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="country-link" href="#">
                                <div className="country country-us">
                                    <span className="sr-only">Change Country to USA</span>
                                    <img src={usFlag} alt="Change Country to USA" />
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="country-link country--active" href="#">
                                <div className="country country-ca">
                                    <span className="sr-only">Change Country to Canada</span>
                                    <img src={caFlag} alt="Change Country to Canada" />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="questions__item">
                    <h4>Social</h4>
                    <ul className="sm_container">
                        <li>
                            <a href="#">
                                <span className="sr-only">Link to Facebook</span>
                                <i className="sm-icon fab fa-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="sr-only">Link to Twitter</span>
                                <i className="sm-icon fab fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="sr-only"></span>
                                <i className="sm-icon fab fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="footer_section footer_bottom">
            <div className="wrapper_small">
                <a href="#" className="bottom_link">Wealthsimple for Advisors</a>
                <span className="dot">&#8226;</span>
                <a href="#" className="bottom_link">Wealthsimple for Work</a>
            </div>
            <div className="wrapper copyright">
                    <p>Wealthsimple Inc. is a registered Portfolio Manager in Canada. Securities in your account are protected up to $1,000,000 CDN through the brokages we are, which are Virtual Brokers, Division of BBS Services Inc. and Canadian ShareOwner Invesments Inc. See www.cipf.ca for more details. By using this website, you accept our Terms of Use and Privacy Policy. Copyright 2016 WealthSimple Inc.</p>
                    <p>Past performance is no guarantee of future results. Any historical return, expected returns, or probability projections may not reflect actual future performance. All securities involve risk and may result in loss. Read our full disclosure for details.</p>
                </div>
        </div>
    </footer>
)

export default Footer