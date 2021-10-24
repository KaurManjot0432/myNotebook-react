import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });

    let history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        let url = `http://localhost:3001/api/users/signin`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const res = await response.json();
        console.log(res);

        if(res.success){
            localStorage.setItem('token',res.authtoken);
            history.push("/");
        } else {
            alert("invalid Credentials");
        }

    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1 className="head">Log in to myNotebook</h1>

            <form onSubmit={handleClick}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login
