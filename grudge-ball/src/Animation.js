import React, { useRef, useEffect, useState } from 'react';

function Animation({ballShot, time}) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [ball_x, setball_x] = useState(170);
  const [ball_y, setball_y] = useState(350);
  const [gameOver, setGameOver] = useState(false)
  let gravity = 1.1;
  let gravitySpeed = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;

    drawBall();
  }, [])

  useEffect(()=>{
    update();
    drawBall();
  })

  useEffect(()=>{
    if(gameOver){
        contextRef.current.fillRect(0,0, window.innerWidth * 2,   
            window.innerHeight * 2); 
            contextRef.current.fillText("You Win!", 10, 40);
    }
  }, [gameOver])

  const drawInitialScene = () => {

    contextRef.current.beginPath()
    contextRef.current.arc(100, 300, 50, 0, 2 * Math.PI);
    contextRef.current.stroke();
    contextRef.current.moveTo(100, 350);
    contextRef.current.lineTo(100, 500);
    contextRef.current.stroke();
    contextRef.current.lineTo(150, 600);
    contextRef.current.stroke();
    contextRef.current.moveTo(100, 500);
    contextRef.current.lineTo(50, 600);
    contextRef.current.stroke();
    contextRef.current.moveTo(100, 450);
    contextRef.current.lineTo(150, 350);
    contextRef.current.stroke();

    var imageObj  = new Image();
    imageObj.src = "/recycle.png"
    contextRef.current.drawImage(imageObj,800,500)
    


  }

  const drawBall = () => {
    contextRef.current.fillStyle = 'white'

    contextRef.current.fillRect(0,0, window.innerWidth * 2,   
        window.innerHeight * 2); 
    drawInitialScene()
    
    contextRef.current.beginPath()
    contextRef.current.arc(ball_x, ball_y, 20, 0, 2 * Math.PI);
    contextRef.current.stroke();
  }

  function update(){
      if(!ballShot){
          return;
      }
        gravitySpeed += gravity;
        let normTime = Math.min(time / 1000, 5);
        let new_power = (normTime/5);
        let new_x  = ball_x + new_power*2
        let new_y = (ball_y - new_power) + Math.pow(1.01, gravitySpeed)
        setball_x(new_x)
        setball_y(Math.max(Math.min((new_y), window.innerHeight), 0))
  }

  return (
    <canvas
      ref={canvasRef}
    />
  );
}

export default Animation;