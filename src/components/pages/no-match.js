import React from 'react';
import { Link } from "react-router-dom";

export default function()  {
    return (
    <div>
        <h2>Sorry page couldn't be found</h2>
        <Link to="/">Return to homepage</Link>
    </div>
    );
}