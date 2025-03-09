import styles from "./Dashboard.module.css";
import supabase from "../../helper/supabaseClient";
import { Navigate, useNavigate } from "react-router";

export const Dashboard = () => {
    const navigate = useNavigate();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/login");
    }

    return (
        <div>
            <h2>Hello, you are logged in.</h2>
            <button onClick={signOut}>Sign out</button>
        </div>
    )
}