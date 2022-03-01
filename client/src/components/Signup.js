import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast("invalid email")
        }
        else if(!strongRegex.test(password)){
            toast("password must include capital ,numerical , special letter..")
        }
        else{
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
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
        })
    }
}

    return (
        <div className="container-one">
             <ToastContainer />
           <h2>Sign up</h2>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
            <Link to="/signin" className="to-signin-link">Already have an account ?</Link>

        </div>
    )
}

export default Signup
