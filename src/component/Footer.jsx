import React from 'react';
import { FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";
const Footer = () => {
    return (
        <div>
            <footer className="footer footer-horizontal footer-center p-4 bg-black text-white">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                        <RiTwitterXFill />
                        </a>
                        <a>
                        <FaYoutube />
                        </a>
                        <a>
                        <FaFacebookF />
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;