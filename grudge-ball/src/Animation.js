import React from 'react'

const SCALE = 0.3;
const OFFSET = 80;

function drawBall(ctx, location){
    ctx.fillStyle = 'white';
    ctx.sha
}

function Animation(){
    const canvasRef = React.useRef(null);
    
    return(
        <canvas
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={e => {
                alert(e.clientX)
            }}
        />
    )
}

export default Animation;