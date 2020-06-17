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
  const [ballShot, setBallShot] = React.useState(false);
  const [percent, setPercent] = React.useState(0);


  let limiter = 0;

  function downHandler({ key }) {
    if (key === ' ' || key === 'Spacebar') {
      if (limiter === 0) {
        setTimeElasped(0)
        setPercent(0);
        startTime = Date.now()
        limiter++;
      }
      else { 
        //always null even after startTime is rendered
        setTimeElasped(Date.now() - startTime)
        let normTime = Math.min(timeElapsed / 1000, 5);
        let percentage = (normTime / 5) * 100;
        setPercent(percentage)
      }
    }
  }

  function upHandler({ key }) {
    if (key === ' ' || key === 'Spacebar') {
      let stopTime = Date.now()
      endTime = stopTime
      limiter = 0;
      setPercent(getPercentage())
      setBallShot(true);
    }
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
    return percentage
  }


  return (
    <div className="App">
      <br />
      <br />
      <Grid container>
        <Grid item xs={3}>
          <ChargeBar variant="determinate" progress={getPercentage()} />
          <Typography>
            Power
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Animation ballShot={ballShot} time={timeElapsed}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
