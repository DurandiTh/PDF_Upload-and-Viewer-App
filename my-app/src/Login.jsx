import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Login() {
   
       
        const [email, setEmail] = useState()
        const [password, setPassword] = useState()
        const navigate = useNavigate()
        const [errorMessage, setErrorMessage] = useState(null);
    
        // axios.defaults.withCredentials = true;
        //start14
        // const handleSubmit = (e) => {
        //     e.preventDefault()
        //     axios.post('http://localhost:5000/login',{email,password})
        //     // axios.get('http://localhost:5000/register',{email,password})
        //     .then(result => {
        //         console.log(result)
        //         if(result.data === "Success"){
        //             navigate('/')
        //         }
        //     })
        //     .catch(err=> console.log(err))
       
        // }
        //end14
        const handleSubmit = (e) => {
            e.preventDefault();
            setErrorMessage(null); // Clear any previous error message
        
            axios.post('http://localhost:5000/login', { email, password },{ withCredentials: true})
            
              .then(result => {
                const response = result.data;
                if (response === "Success") {
                  navigate('/view'); // Navigate to home page on success
                } else {
                  setErrorMessage(response); // Set error message for display
                }
              })
              .catch(err => console.log(err));
          };
        

    
        return (  
            <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
                <div className="bg-white p-3 rounded w-25">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        
                          <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input
                             type="email"
                             placeholder="Enter Email"
                             autoComplete="off"
                             name="email"
                             required
                             className="form-control rounded-0"
                             onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                        </div>
    
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Password</strong>
                            </label>
                            <input
                             type="password"
                             placeholder="Enter password"
                             required
                             autoComplete="off"
                             name="password"
                             className="form-control rounded-0"
                             onChange={(e) => setPassword(e.target.value)}
                            >
                            </input>
                        </div>
    
                        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                        <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                        {/* <button type="submit" className="btn btn-success w-100 rounded-0">Login</button> */}
                        {/* <Link to="/view" className="btn btn-success w-100 rounded-0">Login</Link> */}
                        </form>
                        <p>Already Have an Account</p>
                        <Link to="/" className="btn btn-success w-100 rounded-0">Sign UP</Link>
                    
                </div>
            </div>
     );
}

export default Login;