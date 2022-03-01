import React from 'react'
import {Link} from "react-router-dom";
function Home() {
    return (
        <div className="container-one">
            home
            <Link to="/signup">signup</Link>
            <Link to="/signin">signin</Link>
        </div>
    )
}

export default Home
