import React from 'react';
import { shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TriviaGame from './TriviaGame';
import questionData from './testdata.json'
configure({ adapter: new Adapter()});


let component;

beforeEach(() => {
    component = shallow(<TriviaGame questionData={questionData}/>)
});

it("gets 10 questions for a game of trivia", () => {
    expect(component.instance().state.setOfTenQuestions.length).toBe(10);
});

it("gets different questions everytime", () => {
    const firstResult = component.instance().state.setOfTenQuestions;
    component.instance().getRandom10Questions();
    const secondResult = component.instance().state.setOfTenQuestions;

    expect(firstResult).not.toBe(secondResult);
});