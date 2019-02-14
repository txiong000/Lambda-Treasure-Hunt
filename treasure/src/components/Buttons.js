import React from 'react';


const Buttons = (props) => {
    return <div>
            <button onClick={()=> props.automated()}>Start Traversal</button>
            <button onClick={()=>props.moveMent('n')}>N</button>
            <button onClick={()=>props.moveMent('s')}>S</button>
            <button onClick={()=>props.moveMent('w')}>W</button>
            <button onClick={()=>props.moveMent('e')}>E</button>
        </div>
}


export default Buttons