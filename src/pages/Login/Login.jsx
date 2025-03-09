import supabase from "../../helper/supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email, 
            password: password,
        });

        if (error) {
            setMessage(error.message);
            setEmail("");
            setPassword("");
            return;
        }

        if (data) {
            navigate("/dashboard");
            return null;
        }
        
    };
    
    return (
        <div>
            <h2>Login</h2>
            <br></br>
            {message && <>{message}</>}
            <form onSubmit={handleSubmit}>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email" placeholder="Email" required/>

                <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password" placeholder="Password" required/>
            

                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to='/register'>Register.</Link></p>
        </div>
    )
}