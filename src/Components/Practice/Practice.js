import React from 'react';
import {Button, Form, Message, Radio, Card} from 'semantic-ui-react';
import '../../styling/practice.css';

class Practice extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            score: 0,
            currentQuestion: this.props.questionData[0],
            questionNumber: 1,
            setOfQuestions: this.props.questionData,
            currentChoice: null,
            hasSubmittedChoice: false,
            isCorrSubmission: null,
            showMessage: false,
            showCorrectAnswer: false,
        }
    }

    onChoiceChange = (e) => {
        this.setState({
            currentChoice:e.target.textContent,
        });
    }

    onNextQuestion = () => { 
        this.setState((prevState) => ({
            questionNumber: prevState.questionNumber + 1,
            currentQuestion: this.state.setOfQuestions[prevState.questionNumber],
            isCorrSubmission: null,
            hasSubmittedChoice: false,
            showMessage: false,
            currentChoice: null,
            showCorrectAnswer: false,
        }));
    }

    onPreviousQuestion = () => {
        this.setState((prevState) => ({
            questionNumber: prevState.questionNumber - 1,
            currentQuestion: this.state.setOfQuestions[prevState.questionNumber - 2],
            isCorrSubmission: null,
            hasSubmittedChoice: false,
            showMessage: false,
            currentChoice: null,
            showCorrectAnswer: false,
        }));
    }

    /*
    
    Handles submit for 3 cases: if no choice is selected,
    if the correct answer is selected, and if a incorrect
    answer is selected. Updates state accordingly to show
    error/correct/incorrect message and score.
    
    */
   
    onSubmit = () => {
        if(this.state.currentChoice === null){
            this.setState({
                showMessage: true,
            });
        }
        else if(this.state.currentChoice === this.state.currentQuestion.correct){
            this.setState((prevState) => ({
                hasSubmittedChoice: true,
                isCorrSubmission: true,
                showMessage: true,
                score: prevState.score + 1
            }));
        }
        else{
            this.setState({
                hasSubmittedChoice: true,
                isCorrSubmission: false,
                showMessage: true,
            });
        }
    }

    onShowAnswer = () => {
        this.setState({
            showCorrectAnswer: true,
        });
    }

    /*
    
    Resets the state to inital state to play another games of trivia
    
    */

    handlePlayAgain = () => {
        this.setState({
            score: 0,
            currentQuestion: this.props.questionData[0],
            questionNumber: 1,
            setOfQuestions: this.props.questionData,
            currentChoice: null,
            isCorrSubmission: false,
            showMessage: false,
            showCorrectAnswer: false,
        });
    }

    handleMainMenu = () => {
        this.setState({
            mainMenu: true,
        });
    }

    getMessageState = () => {
        if(this.state.showMessage){
            if(this.state.isCorrSubmission === null){
                return(
                    <Message negative>
                        <Message.Header>Please submit an answer</Message.Header>
                    </Message>
                ); 
            }
            else if(this.state.isCorrSubmission === true){
                return(
                    <Message positive>
                        <Message.Header>Correct!</Message.Header>
                    </Message>
                );  
            }
            else if(this.state.isCorrSubmission === false){
                return(
                    <Message negative>
                        <Message.Header>Incorrect</Message.Header>
                    </Message>
                );        
            }
        }
    }

    getFormFields = () => {
        const fields = this.state.currentQuestion.allChoices.map((choice, index) => {
            return (
                <Form.Field
                key={index}
                onChange={this.onChoiceChange}
                label={choice}
                control={Radio}
                value={choice}
                checked={this.state.currentChoice === choice}
                />
            );
        });

        return fields;
    }

    getCorrectAnswer = () => {
        if(this.state.showCorrectAnswer){
            return (
                <Message><b>Correct Answer: {this.state.currentQuestion.correct}</b></Message>
            );
        }
        else{
            return null;
        }
    }

    /*
    
    Updates what to render throughout the game: 
        1. Answering all questions
        2. Displaying the score screen
    
    */

    getGameState = () => {
        const message = this.getMessageState();
        const correctAnswer = this.getCorrectAnswer();

        if(this.state.questionNumber <= this.state.setOfQuestions.length){
            const formFields = this.getFormFields();
            return (
                <React.Fragment>
                    <h1>Question {this.state.questionNumber}</h1>
                    <Card className="card">
                        {correctAnswer}
                        <h2 className="question">{this.state.currentQuestion.question}</h2>
                        
                        <div className="form">
                            <Form >
                                <div className="fields">
                                    <Form.Group grouped>
                                        {formFields}
                                    </Form.Group>
                                </div>
                                <div className="ans-buttons-container">
                                        <Button className="submit-button"  onClick={this.onSubmit}>Submit</Button>
                                        <Button className="show-ans-button" onClick={this.onShowAnswer}>Show Answer</Button>
                                </div>
                            </Form>
                        </div>
                        {message}
                    </Card>
                    <div className="nav-button-container">
                        <div>
                            <Button className="prev-question-button" onClick={this.onPreviousQuestion} disabled={this.state.questionNumber === 1} size="large">Previous Question</Button>
                        </div>
                        <div>
                            <Button className="next-question-button" onClick={this.onNextQuestion} size="large">Next Question</Button>
                        </div>
                    </div>
                </React.Fragment>  
            )
        }
        
        if(this.state.questionNumber > this.state.setOfQuestions.length){
            return(
                <React.Fragment>
                    <h1 className="score-title">Score: {this.state.score}</h1>
                    <div>
                        <Button className="play-again-button" onClick={this.handlePlayAgain}>Play Again</Button>
                        <Button className="main-menu-button" onClick={this.props.handleMainMenu}>Main Menu</Button>
                    </div>
                </React.Fragment>
            )  
        }
    }

    render(){
        const game = this.getGameState();

        return(
            <div className="flex-container">
                {game}
            </div>          
        );
    };
}

export default Practice;