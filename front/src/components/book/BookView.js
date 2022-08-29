import { Form, Button, Table, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
function BookView()
{
    const { idx } = useParams();
    return(                
        <div className='book-view'>
            test
        </div>
    );

}
export default BookView;