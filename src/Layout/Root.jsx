import React from 'react';
import Navber from '../component/Navber';
import Footer from '../component/Footer';
import { Outlet } from 'react-router';
const Root = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navber></Navber>
            <main className="flex-1">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Root;