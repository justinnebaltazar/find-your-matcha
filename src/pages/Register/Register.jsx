import { useState } from "react"
import supabase from "../../helper/supabaseClient";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUserName] = useState(''); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        const {data, error} = await supabase.auth.signUp({
            email: email, 
            password: password, 
            displayName: username
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (data) {
            setMessage("User account created!")
        }
        
        setEmail("");
        setPassword("");
        setUserName("");
    };
      
    return (
        <div>
            <h2>Register</h2>
            <br></br>
            {message && <>{message}</>}
            <form onSubmit={handleSubmit}>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email" placeholder="Email" required/>

                <input
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                type="username" placeholder="Username" required
                />

                <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password" placeholder="Password" required/>
            

                <button type="submit">Create Account</button>
            </form>
            <p>Already have an account? <Link to='/login'>Login.</Link></p>
        </div>
    )
}