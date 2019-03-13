// React Imports
import React from 'react';
import { Link } from 'react-router-dom';
// Style Imports
import Style from './header.module.scss';
import profile from '../../../_images/default_profile.png';
import logo from '../../../_images/beverage.svg';


const Header = (props) => (
    <div className={Style.header}>
        
        <img className={Style.logo} src={logo} />

        <div className={Style.headerMenu}>
            <img className={Style.profilePicture} src={profile} />
            <Link to="/account/id" className={Style.headerButton}><i className="fa fa-user-cog"></i></Link>

            <div className={Style.pageOptions}>
                <a className={Style.headerButton}><i className="fa fa-question"></i></a>
                <a className={Style.headerButton}><i className="fa fa-volume-up"></i></a>
            </div>
        </div>
    </div>
)

export default Header