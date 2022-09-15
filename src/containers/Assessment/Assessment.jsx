import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import classes from './Assessment.css';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import Button from '../../components/Button/Button';
import Score from '../../components/Score/Score';


const assessment = [
    {
        question: "What country is the city Damascus in ??",
        options: ["Russia", "USA", "China", "Syria"],
        answer: "Syria"
    },
    {
        question: "Which of the following countries is landlocked?",
        options: ["Spain", "Italy", "Switzerland", "France"],
        answer: "Switzerland"
    },
    {
        question: "What is the smallest country?",
        options: ["Russia", "Italia", "Spain", "Vatican"],
        answer: "Vatican"
    },
    {
        question: "which country has the largest number of lakes.",
        options: ["Russia", "USA", "China", "Canada"],
        answer: "Canada"
    },
    {
        question: "What is the highest mountain in the world  .",
        options: ["Everest", "Lenin peak", "Peak of victory", "kilimanjaro"],
        answer: "Everest"
    },
    {
        question: "What is the longest river?.",
        options: ["Nile", "Amazon", "Volga", "Mississippi"],
        answer: "Amazon"
    },
    {
        question: "What is the deepest lake?",
        options: ["Baikal", "Issyk Kul", "Tanganyika", "Toba"],
        answer: "Baikal"
    },
    {
        question: "What is the biggest country?",
        options: ["Russia", "Kyrgyzstan", "China", "France"],
        answer: "Russia"
    },
    {
        question: "What is the longest mountain system?",
        options: ["Mountain Altai", "Alps", "Cordillera", "Himalayat"],
        answer: "Cordillera"
    },
    {
        question: "What is the biggest desert in the world?",
        options: ["Antarctic", "Arctic", "Sahara", "Arabian"],
        answer: "Antarctic"
    }
];


class Assessment extends Component{
    state = {
        isSubmit: false
    }

    componentDidMount(){
        this.props.onNextQuestion();
    }

    onPrevButtonHandler = () => {
        this.props.onPrevQuestion();
    }

    onNextButtonHandler = () => {
        this.props.onNextQuestion();
    }

    onSubmitQuizHandler = () => {
        this.setState({isSubmit: true});
    }

    getScore = () => {
        let score = 0;
        assessment.forEach( (questionObj, index) => {
            if(questionObj.answer === this.props.answersInfo[index]){
                score++;
            }
        });
        return score;
    }

    render(){
        let nextButton = <Button clicked={this.onNextButtonHandler}>NEXT</Button>
        if(this.props.currentIndex === 9){
            nextButton = <Button clicked={this.onSubmitQuizHandler}>SUBMIT</Button>            
        }

        let assessmentObj = (
            <div className={classes.Assessment}>
                <QuestionContainer 
                    assessment = {assessment}
                    answersInfo = {this.props.answersInfo}
                    setResultAnswer={this.props.setResultAnswer}
                    questionIndex={this.props.currentIndex}
                /> 
                <div className={classes['buttonBar']}>
                    <div className={classes.Prevbtn}>
                        { this.props.currentIndex > 0 ? <Button clicked={this.onPrevButtonHandler}>PREV</Button> : null }
                    </div>
                    <div className={classes.Nextbtn}>
                        { nextButton }
                    </div>  
                </div>
            </div>
        );

        if(this.state.isSubmit){
            const score = this.getScore();
            assessmentObj = <Score score={score}/>
        }

        return(
            <div>
                {assessmentObj}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        currentIndex: state.questions.selectedQuestion,
        answersInfo: state.answers.answersInfo
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onNextQuestion: () => dispatch(actionCreators.nextQuestion()),
        onPrevQuestion: () => dispatch(actionCreators.prevQuestion()),
        setResultAnswer: (data) => dispatch(actionCreators.setAnswer(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assessment);