import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
const Logout = () =>{
    const navigate=useNavigate()
    useEffect(()=>{
        localStorage.clear()
        navigate('/')
        },[])

    return (
        <section>
 
        </section>
    )
}
export default  Logout