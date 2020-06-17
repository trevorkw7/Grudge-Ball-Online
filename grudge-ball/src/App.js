import React, { useEffect } from 'react';
import './App.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ChargeBar from './ChangeBar.jsx'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Animation from './Animation'



function App() {
  let startTime = null;
  let endTime = null
  const [timeElapsed, setTimeElasped] = React.useState(0);
  const [powerPercent, setPowerPercent] = React.useState(0);
  const [ballShot, setBallShot] = React.useState(false);

  let angle = 45;
  let limiter = 0;
  let xInitial = 1020;
  let yInitial = 390;

  function downHandler({ key }) {
    if (key === ' ' || key === 'Spacebar') {
      if (limiter === 0) {
        setTimeElasped(0)
        setPowerPercent(0);
        startTime = Date.now()
        limiter++;
      }
      else {
        //always null even after startTime is rendered
        setTimeElasped(Date.now() - startTime)
        let normTime = Math.min(timeElapsed / 1000, 5);
        let percentage = (normTime / 5) * 100;
        setPowerPercent()
      }
    }
  }

  function upHandler({ key }) {
    if (key === ' ' || key === 'Spacebar') {
      let stopTime = Date.now()
      endTime = stopTime
      calculateFinalPosition()
      limiter = 0;
    }
  }

  function calculatePosition() {
    //given initial x, initial y, initial velocity, 
    const initialVelocity = timeElapsed * 20;
    let vX = initialVelocity * Math.cos(Math.PI * angle)
    let vY = initialVelocity * Math.sin(Math.PI * angle)
    this.x += vX;
    this.y -= (vY - (9.81 * time));

  }


  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  function getPercentage() {
    let normTime = Math.min(timeElapsed / 1000, 5);
    let percentage = (normTime / 5) * 100;
    console.log(percentage)
    return percentage
  }

  function renderBall() {
    return <img src='./ball.png' style={{ height: "40px", width: "40px", position: "absolute", top: "390px", right: "1020px" }} />
  }

  return (
    <div className="App">
      <br />
      <br />
      <Grid container>
        <Grid item xs>
          <ChargeBar variant="determinate" progress={getPercentage()} />
          <Typography>
            Power
          </Typography>
        </Grid>
        <Grid item xs>
          <Animation/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
