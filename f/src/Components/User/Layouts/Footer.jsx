import {Link} from "react-router-dom"
const Footer = () => {
    return (
        <section>
            <section className="info_section layout_padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>
                Our Motivation
              </h5>
              <ul>
                <li className="h5">
                  Provide Fast Service
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>
                Find In Fast
              </h5>
              <ul>
                <li>
                  <Link to="/" >Home</Link>
                </li>
                <li>
                <Link to="/product" >Product</Link>
                </li>
                <li>
                <Link to="/contact" >Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="social_container">
                <h5>
                  Follow Us
                </h5>
                <div className="social-box">
                  <a href="">
                    <img src="/images/facebook.png" alt="" />
                  </a>
                  <a href="">
                    <img src="/images/twitter.png" alt="" />
                  </a>
                  <a href="">
                    <img src="/images/linkedin.png" alt="" />
                  </a>
                  <a href="">
                    <img src="/images/instagram.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="subscribe_container">
                <h5>
               Contact Us
                </h5>
               <div>
                Emaill:nuruzzaman35-361@diu.edu.bd
               </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </section>
    )
}
export default Footer