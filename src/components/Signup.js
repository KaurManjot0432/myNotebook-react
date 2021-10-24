import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setcredentials] = useState({name:"", email:"", password:""});

    const history = useHistory();

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleClick = async (e) => {
        e.preventDefault();
        let url = `http://localhost:3001/api/users/create`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
        });
        const res = await response.json();
        console.log(res);
        if(res.success){
            localStorage.setItem('token',res.authtoken);
            history.push("/");
            props.showAlert("Loged in successfully!","success");
        } else {
            props.showAlert("Invalid Credentials!","danger");
        }
    }

    return (
        <>
        <h1 className="my-2">Signup to myNotebook</h1>
        <div className="container">
            <form onSubmit={handleClick}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" value={credentials.name} aria-describedby="emailHelp" required placeholder="Enter name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" value={credentials.email} aria-describedby="emailHelp" required placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" value={credentials.password} minLength={5} required placeholder="Password" />
                </div>
                <button type="submit my-3" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Signup
