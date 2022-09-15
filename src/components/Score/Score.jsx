import React from 'react';
import classes from './Score.css';

const score = (props) => {
    
    return(
        <div className={classes.Score}>
           <p><span>{ props.score }</span> out of ten correct answers</p>.
        </div>
    );
}

export default score;