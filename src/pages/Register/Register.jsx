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
        <div className={styles.container}>


            <br></br>
            {message && <>{message}</>}

<div className={styles.right}>
   
            <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.box}>
            <h2 className={styles.title}>register</h2>

</div>
          
            <div className={styles.input}>
            <label>email</label>
                <input 
                className={styles.inputField}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email" placeholder="Email" required/>
                </div>

                <div className={styles.input}>
                <label>username</label>
                <input
                 className={styles.inputField}
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                type="username" placeholder="Username" required
                />
                </div>

                <div className={styles.input}>
                <label>password</label>
                <input 
                 className={styles.inputField}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password" placeholder="Password" required/>
                 </div>
            

             
                <button className={styles.button} type="submit">create account</button>
                <p>already have an account? <Link className={styles.links} to='/login'>login</Link></p>
               
                </form>
                </div>
            </div>
  
    )
}