import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
    }).then(res => res.json()).then(data => {
        if(data.message){
            toast(data.message)
        }
        if(data.error){
            toast.error(data.error)
        }
    });
}
    return (
        <div className="container-one">
             <ToastContainer />
           <h2>Login</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
            <Link to="/signup" className="to-signin-link">New to our website ?</Link>
        </div>
    )
}

export default Signin
