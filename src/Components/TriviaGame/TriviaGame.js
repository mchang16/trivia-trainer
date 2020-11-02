import React from 'react';
import {Button, Form, Message, Radio, Card, Icon} from 'semantic-ui-react';
import '../../styling/triviagame.css';

class TriviaGame extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            score: 0,
            currentQuestion: this.props.questionData[0],
            questionNumber: 1,
            setOfTenQuestions: [],
            currentChoice: null,
            hasSubmittedChoice: false,
            isCorrSubmission: null,
            disableSubmission: null,
            showMessage: false,
        }
    }

    componentDidMount(){
        this.getRandom10Questions();
    }

    /*
    
    Saves an array of 10 random questions to state for one game of trivia.
    A Set() is used to guarentee no repeat questions are given in a game.
    this.state.currentQuestion is updated for rendering purposes, as there 
    is an error thrown when setting new state with no current question defined.
    
    */

    getRandom10Questions = () => {
        const uniqueTenQuestions = new Set();
        while(uniqueTenQuestions.size < 10){
            const index = Math.floor(Math.random() * this.props.questionData.length);
            uniqueTenQuestions.add(this.props.questionData[index]);
         }
 
        const tenQuestionsArray = Array.from(uniqueTenQuestions);
        
        this.setState({
            currentQuestion: tenQuestionsArray[0],
            setOfTenQuestions: tenQuestionsArray,
        });
    }

    onChoiceChange = (e) =>{
        this.setState({
            currentChoice:e.target.textContent,
        });
    }

    /*
    
    Updates state for rendering next question in this.state.setOfTenQuestions.
    All updates to show error message if no choice is submitted on next question
    button click.
    
    */

    onNextQuestion = () => { 
        if(!this.state.hasSubmittedChoice){
            this.setState({
                disableSubmission: false,
                showMessage: true,
            });
        }
        else{
            this.setState((prevState) => ({
                questionNumber: prevState.questionNumber + 1,
                currentQuestion: this.state.setOfTenQuestions[prevState.questionNumber],
                isCorrSubmission: null,
                hasSubmittedChoice: false,
                disableSubmission: false,
                showMessage: false,
                currentChoice: null,
            }));
        }   
       
    }

    onSubmit = () => {
        if(this.state.currentChoice === null){
            this.setState({
                disableSubmission: false,
                showMessage: true,
            });
        }
        else if(this.state.currentChoice === this.state.currentQuestion.correct){
            this.setState((prevState) => ({
                hasSubmittedChoice: true,
                isCorrSubmission: true,
                disableSubmission: true,
                showMessage: true,
                score: prevState.score + 1
            }));
        }
        else{
            this.setState({
                hasSubmittedChoice: true,
                isCorrSubmission: false,
                disableSubmission: true,
                showMessage: true,
            });
        }
    }

     /*
    
    Resets the state to inital state to play another games of trivia
    
    */

    handlePlayAgain = () => {
        this.setState({
            score: 0,
            currentQuestion: this.props.questionData[0],
            questionNumber: 1,
            setOfTenQuestions: [],
            currentChoice: null,
            hasSubmittedChoice: false,
            isCorrSubmission: false,
            disableSubmission: false,
            showMessage: false,
        });

        this.getRandom10Questions();
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
                disabled={this.state.disableSubmission}
                checked={this.state.currentChoice === choice}
                />
            );
        });

        return fields;
    }

    /*
    
    Updates what to render throughout the game: 
        1. Answering the 10 questions
        2. Displaying the score screen
    
    */

    getGameState = () => {
        const message = this.getMessageState();

        if(this.state.questionNumber <= 10){
            const formFields = this.getFormFields();
            return (
                <React.Fragment>
                    <h1>Question {this.state.questionNumber}</h1>
                    <Card className="card">
                        <h2 className="question">{this.state.currentQuestion.question}</h2>
                        
                        <div className="form">
                            <Form >
                                <div className="fields">
                                    <Form.Group grouped>
                                        {formFields}
                                    </Form.Group>
                                </div>
                                
                                <Button className="submit-button" onClick={this.onSubmit} disabled={this.state.disableSubmission}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                        {message}

                    </Card>
                    <Button className="next-question-button" onClick={this.onNextQuestion}>Next Question</Button>
                </React.Fragment>  
            )
        }
        
        if(this.state.questionNumber > 10){
            if(this.state.score < 5){
                return(
                    <React.Fragment>
                        <h1 className="score-title">Score: {this.state.score}</h1>
                        <h1><Icon name="meh outline"/>Uhh...maybe play again?</h1>
                        <div>
                            <Button className="play-again-button" onClick={this.handlePlayAgain}>Play Again</Button>
                            <Button className="main-menu-button" onClick={this.props.handleMainMenu}>Main Menu</Button>
                        </div>
                    </React.Fragment>
                );
            }

            else if(this.state.score >= 5){
                return(
                    <React.Fragment>
                        <h1 className="score-title">Score: {this.state.score}</h1>
                        <h1><Icon name="smile outline"/>Great job smarty pants!</h1>
                        <div>
                            <Button className="play-again-button" onClick={this.handlePlayAgain}>Play Again</Button>
                            <Button className="main-menu-button" onClick={this.props.handleMainMenu}>Main Menu</Button>
                        </div>
                    </React.Fragment>
                );
            } 
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

export default TriviaGame;