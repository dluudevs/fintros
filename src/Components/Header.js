import React from 'react';
import logo from '../assets/ws-logo.svg'

const Header = () => ((
    <header>
        <nav>
            <div className="nav_wrapper wrapper_small">
                <a href="#" className="header_logo">
                    <img src={logo} alt="wealthsimple logo"/>
                </a>
                <ul className="nav_bar">
                    <li className="hover">Magazine</li>
                    <li>
                        <a className="button_yellow" href="#">Start Investing</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="hero_container">
            <span className="logo_container">
                <img src={logo} alt="wealth simple logo" />
            </span>
            <h1 className="hero_title">Magazine</h1>
            <h3 className="hero_subtitle news font_grey">Stories and ideas from WealthSimple</h3>
        </div>
        <div className="wrapper hero_image">
            <img src="https://wealthsimple-grow.ghost.io/content/images/2019/10/van_final_color--1--1.jpg" alt="feature magazine post image"/>
            <div className="featured-post article__text_container">
                <h4 className="news font_grey">News</h4>
                <h3 className="title"><a href='#'>WealthSimple Trade is Here - Meet Canada's $0 Commission Stock Trading App</a></h3>
                <p className="description">You'll be able to trade stocks and ETFs with no commissions, on your phone, all with a beautifully intuitive app. Sign up now so you're first in line when we launch.</p>
            </div>
        </div>
    </header>
))

export default Header