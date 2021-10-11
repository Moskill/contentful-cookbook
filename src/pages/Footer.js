import React from 'react';
import '../App.css';
import { FaFacebook, FaPinterest, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <div className="recipe-detail-footer">
        <div className="footer-element">
          <div className="footer-element-label">vegan recipes </div>
          <p>cake recipes</p>
          <p>noodle recipes</p>
          <p>spicy food</p>
          <p>cooking with tofu</p>
        </div>
        <div className="footer-element">
          <div className="footer-element-label">Credits</div>
          <p>github repo</p>
          <p>react packages</p>
          <p>image directory</p>
          <p>web hoster</p>
        </div>
        <div className="footer-element">
          <div className="footer-element-label">social media</div>
          <div className="social-icons">
            <FaFacebook className="social-icon icon-facebook" />
            <FaTwitter className="social-icon icon-twitter"  />
            <FaPinterest className="social-icon icon-pinterest"  />
            <FaLinkedin className="social-icon icon-linkedin"  />
            <FaYoutube className="social-icon icon-youtube"  />
            <FaTiktok className="social-icon icon-tiktok"  />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
