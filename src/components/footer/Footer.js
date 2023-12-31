import "./Footer.css";
import { MdOutlineEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { FaAddressBook, FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { RiInstagramFill } from "react-icons/ri";
import FooterCategories from "./categoriesInFooter/FooterCategories";

const Footer = () => {
  return (
    <footer>
      <div className="footerWrapper container">
        <div className="footerNews">
          <h3>Suscribe to our news</h3>
          <div className="subscribe">
            <input type="email" placeholder="Enter your email" />
            <button className="suscribeButton">Subscribe</button>
          </div>
        </div>
        <div className="footerSections">
          <div className="footer-section">
            <h3>Product Categories</h3>
           <FooterCategories/>
          </div>
          <div className="footer-section">
            <h3>Direct Contact</h3>
            <ul>
              <li>
                <MdOutlineEmail className="footerIcon" /> info@example.com
              </li>
              <li>
                <CiPhone className="footerIcon" /> +1234567890
              </li>
              <li>
                <FaAddressBook className="footerIcon" /> 123 Main Street, City,
                Country
              </li>
            </ul>
          </div>
          <div className="footer-section quickLinksSection">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/allproducts">Products</Link>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="socialMedia">
         
          <ul className="social-media-links">
            <li>
              <FaFacebook className="socialMediaIcon"/>
            </li>
            <li>
              <AiFillTwitterCircle className="socialMediaIcon" />
            </li>
            <li>
              <TiSocialYoutubeCircular className="socialMediaIcon"/>
            </li>
            <li>
              <RiInstagramFill className="socialMediaIcon" />
            </li>
          </ul>
        </div>
        <hr></hr>
        <div className="copyright">
          <p>&copy; 2023 ecommerce KTM. All rights reserved. Developed by Binayaraj Soti</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
