import React from 'react';
import '../Styles/Card.css';
export default function Card({handleDelete, id, show, setShow}) {
    // console.log(data);
  return (
    <>
        <div className='card-container'>
            <div className='card' >
            <p>Are you sure want to delete ?</p>
            <div>
                <button onClick={()=>setShow(!show)}>no</button>
                <button onClick={()=>handleDelete(id)}>yes</button>
            </div>
            </div>
        </div>
    </>
  )
}
