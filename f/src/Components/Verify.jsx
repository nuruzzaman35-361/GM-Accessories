import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

const Verify = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    axios
      .post("/user/verify", {
        id: id,
      })
      .then(function (response) {
        
        console.log(response);
        

      })
      .catch(function (error) {
        console.log(error);
      });
 

  return (
    <div>
        <h2>Success fully verified</h2>
        <Link class="nav-link " to="/">
        <button >Go Home</button>
        </Link>
    </div>
  );
};

export default Verify;
