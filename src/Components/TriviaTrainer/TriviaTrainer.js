import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import TriviaGame from '../TriviaGame/TriviaGame';
import Practice from '../Practice/Practice';
import '../../styling/triviatrainer.css';

import QuestionBank from '../../Apprentice_TandemFor400_Data.json';

class TriviaTrainer extends React.Component{
    constructor(props){
        super(props);
        this.questionData = QuestionBank;
        this.state = {
            startGame: false,
            startPractice: false,
            showStartScreen: true,
        }
    }

    componentDidMount(){
        this.editData();
    }

    /* 
    
    Edits the given data from the JSON file by adding an additonal 
    property called 'allChoices', which contains both the incorrect
    and correct answer data. This is for more convenient rendering of
    data for each question.
    
    */
    
    editData(){
        for(let question of this.questionData){
            question.allChoices = this.createChoices(question);
        }
    }

    /*

    Returns an array containing the correct answer and incorrect
    answers data in random order. This makes the answer choices
    appear in a different order everytime for better playing experience.

    */

    createChoices = (question) => {
        let allAnswers = question.incorrect.slice();
        let index = Math.floor(Math.random() * 4);
        allAnswers.splice(index, 0, question.correct);
        return allAnswers;
    }

    handlePractice = () => {
        this.setState({
            startPractice: true,
            showStartScreen: false,
        });
    }

    handleTriviaGame = () => {
        this.setState({
            startGame: true,
            showStartScreen: false,
        });
    }

    handleMainMenu = () => {
        this.setState({
            showStartScreen: true,
        });
    }

    showGameState = () => {
        if(this.state.showStartScreen){
            return(
                <div className="container">
                    <h1 className="title" >Tandem Trivia</h1>
                    <div className="button-flex">
                        <div className="trivia-container">
                            <Button className="trivia-button" onClick={this.handleTriviaGame} size="massive">
                                <Icon name="trophy" className="trophy-icon" size="large"/>
                                <p>Play Trivia Game</p>
                            </Button>
                        </div>
                        
                        <div className="practice-container">
                            <Button className="practice-button" size="massive" onClick={this.handlePractice}>
                                <Icon className="book-icon" name="book" size="large"/>
                                <p>Practice</p>
                            </Button>
                        </div>
                    </div>
                </div>
            );          
        }

        if(this.state.startGame){
            return(<TriviaGame questionData={this.questionData} handleMainMenu={this.handleMainMenu}/>);
        }
        
        if(this.state.startPractice){
            return (<Practice questionData={this.questionData} handleMainMenu={this.handleMainMenu}/>);
        }
    }

    render(){
        const gameState = this.showGameState();

        return(
            <React.Fragment>
                {gameState}
            </React.Fragment>
                   
        );
    }
}

export default TriviaTrainer;