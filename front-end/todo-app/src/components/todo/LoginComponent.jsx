import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "./security/AuthContext";

export default function LoginComponent(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    async function handleSubmit(){
        if(await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        }
        else {
            setShowErrorMessage(true);
        }
    }

    return(
        <div className="Login">
            <h1>Login</h1>

            {showErrorMessage && <div className="errorMessage">Authentication Failed.</div>}

            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}