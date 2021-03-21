import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Book = () => {
    const {ticketType} = useParams();
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {ticketType} Ticket.</h1>
            <p>Want a <Link to="/home">different ticket?</Link> </p>
        </div>
    );
};
export default Book;