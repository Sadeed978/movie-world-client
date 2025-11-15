import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../component/Navber';
import Footer from '../component/Footer';
const Root = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;