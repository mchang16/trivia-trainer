import React from 'react';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TriviaTrainer from './TriviaTrainer';
configure({ adapter: new Adapter()})

const data = [
    {
        "question": "What was Tandem previous name?",
        "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
        "correct": "Devmynd"
    },
    {
        "question": "In Shakespeare's play Julius Caesar, Caesar's last words were...",
        "incorrect": ["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana"],
        "correct": "Et tu, Brute?"
    },
];

let component;

beforeEach(() => {
    component = shallow(<TriviaTrainer/>);
});

it("adds correct property with a value of all choices in an array", () => {
    component.instance().questionData = data;
    
    const mockReturnValue = ["Tandem", "Burger Shack", "Devmynd", "Extraordinary Humans"];

    const expectedResult = 
        {
        "allChoices": ["Tandem", "Burger Shack", "Devmynd", "Extraordinary Humans"],
        "correct": "Devmynd",
        "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
        "question": "What was Tandem previous name?",
        }

    jest.spyOn(component.instance(), "createChoices").mockImplementation(() => mockReturnValue);
    component.instance().editData();
    expect(component.instance().questionData[0]).toEqual(expectedResult);
});

it("returns correct object with a value of all choices in an array", () => {
    const expectedResult = ["Tandem", "Burger Shack", "Devmynd", "Extraordinary Humans"];
   jest.spyOn(Math, "random").mockImplementation(() => 0.5);
   expect(component.instance().createChoices(data[0])).toEqual(expectedResult);
});