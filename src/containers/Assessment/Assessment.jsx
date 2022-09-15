import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import classes from './Assessment.css';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import Button from '../../components/Button/Button';
import Score from '../../components/Score/Score';


const assessment = [
    {
        question: "What song belongs to the Lana Del Rey?",
        options: ["The Perfect Girl", "Good Lookin", "Starfall", "Diet Mountain Dew"],
        answer: "Diet Mountain Dew"
    },
    {
        question: "Who took Grammy *The Best Artist* in 2020?",
        options: ["Post Malone", "Lil Peep", "Billie Eilish", "Mc Doncha"],
        answer: "Billie Eilish"
    },
    {
        question: "What was the reason of death Lil Peep?",
        options: ["Insult", "Heart Ache", "Coronavirus", "Overhight"],
        answer: "Overhight"
    },
    {
        question: "What is the most famous song of Juice WRLD?",
        options: ["All girls are the same", "Roberry", "Fine China", "Lucid Dreams"],
        answer: "Lucid Dreams"
    },
    {
        question: "What is the name of the lead singer of Nirvana?",
        options: ["Kurt Cobain", "Gene Simmons", "Paul Charles Caravello ", "Brian Johnson"],
        answer: "Kurt Cobain"
    },
    {
        question: "Who is the best Russian Rap Artist?",
        options: ["LSP", "All in this question", "Pharaoh", "Scriptonite"],
        answer: "All in this question"
    },
    {
        question: "what song is this excerpt from? (I can't help but think that our roads might take us down different phases)",
        options: ["Joji: Like u do", "Mirbek Atabekov", "The Beatles: Yesterday", "Kiss: I was made"],
        answer: "Joji: Like u do"
    },
    {
        question: "Who is not singer?",
        options: ["Megan Fox", "Adele", "Ariana Grande", "Lana Del Rey"],
        answer: "Megan Fox"
    },
    {
        question: "who invented jazz?",
        options: ["Marquise Jackson", "Bill Withers ", "Buddy Bolden", "50 cent"],
        answer: "Buddy Bolden"
    },
    {
        question: "What was soundtrack to cartoon *Shrek*?",
        options: ["Sunflower", "Like u do", "НА ТИТАНИКЕ", "All stars"],
        answer: "All stars"
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