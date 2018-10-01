import React from 'react';

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '0',
            counter: 0,
            decimalCounter: true,
            formula: '',
            action: []
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubtract = this.handleSubtract.bind(this);
        this.handleDivide = this.handleDivide.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleMultiply = this.handleMultiply.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
    }

    handleInput(e) {
        let input = e.target.value;

        if(this.state.counter === 0 && input == 0) {
            return
        } else {
            this.setState((prevState) => {
                if(prevState.counter === 0) {
                    return {
                        input: `${input}`,
                        counter: prevState.counter + 1,
                        formula: `${input}`,
                    }
                } else {
                    if(prevState.input === '+' || prevState.input === '-' || prevState.input === '*' || prevState.input === '/') {
                        return {
                            input: `${input}`,
                            formula: `${prevState.formula}${input}`
                        }
                    } else {
                        return {
                            input: `${prevState.input}${input}`,
                            formula: `${prevState.formula}${input}`
                        }
                    }
                }
            });
        }
    }

    handleDecimal() {
        if(this.state.decimalCounter) {
            this.setState((prevState) => {
                if(prevState.input === '+' || prevState.input === '-' || prevState.input === '*' || prevState.input === '/') {
                    return {
                        input : `.`,
                        counter: prevState.counter + 1,
                        formula: `${prevState.formula}.`,
                        action: [...prevState.action],
                        decimalCounter: false
                    }
                } else {
                    return {
                        input : `${prevState.input}.`,
                        counter: prevState.counter + 1,
                        formula: `${prevState.formula}.`,
                        action: [...prevState.action],
                        decimalCounter: false
                    }
                }
            })
        } else {
            return
        }
    }

    handleClear() {
        this.setState(() => {
            return {
                input : '0',
                counter: 0,
                formula: '',
                action: [],
                decimalCounter: true
            }
        })
    }

    handleAdd() {
        if(this.state.counter === 0) {
            return
        } else {
            this.setState((prevState) => {
                return {
                    input: '+',
                    formula: `${prevState.formula}+`,
                    action: [...prevState.action, '+'],
                    decimalCounter: true
                }
            })
        }
    }

    handleSubtract() {
        if(this.state.counter === 0) {
            return
        } else {
            this.setState((prevState) => {
                return {
                    input: '-',
                    formula: `${prevState.formula}-`,
                    action: [...prevState.action, '-'],
                    decimalCounter: true
                }
            })
        }
    }

    handleDivide() {
        if(this.state.counter === 0) {
            return
        } else {
            this.setState((prevState) => {
                return {
                    input: '/',
                    formula: `${prevState.formula}/`,
                    action: [...prevState.action, '/'],
                    decimalCounter: true
                }
            })
        }
    }

    handleMultiply() {
        if(this.state.counter === 0) {
            return
        } else {
            this.setState((prevState) => {
                return {
                    input: '*',
                    formula: `${prevState.formula}*`,
                    action: [...prevState.action, '*'],
                    decimalCounter: true
                }
            })
        }
    }

    handleEqual() {
        let actions = this.state.action;
        let formula = this.state.formula;
        let result = 0;

        if(actions.length === 0) {
            return
        } else {
            function sum(fn) {
                return new Function('return ' + fn)();
            }
            result = Math.round(1000000000000 * sum(formula)) / 1000000000000;
            this.setState((prevState) => {
                return {
                    input : `${result}`,
                    counter: 0,
                    formula: `${prevState.formula}=${result}`,
                    action: [],
                    decimalCounter: true
                }
            });
        }
    }

    render() {
        return (
            <div className="wrapper" >
                <div className="calculator" >
                    <div>

                        <div className="formulaScreen">
                            {this.state.formula}
                        </div>

                        <div id="display" className="outputScreen">
                            {
                                this.state.input
                            }
                        </div>

                        <button className="jumbo" id="clear" onClick={this.handleClear} >AC</button>

                        <button id="divide" onClick={this.handleDivide}>/</button>

                        <button id="multiply" onClick={this.handleMultiply}>*</button>

                        <button id="seven" onClick={this.handleInput} value="7" >7</button>
                        <button id="eight" onClick={this.handleInput} value="8" >8</button>
                        <button id="nine" onClick={this.handleInput} value="9" >9</button>

                        <button id="subtract" onClick={this.handleSubtract} >-</button>

                        <button id="four" onClick={this.handleInput} value="4" >4</button>
                        <button id="five" onClick={this.handleInput} value="5" >5</button>
                        <button id="six" onClick={this.handleInput} value="6" >6</button>

                        <button id="add" onClick={this.handleAdd}>+</button>

                        <button id="one" onClick={this.handleInput} value="1" >1</button>
                        <button id="two" onClick={this.handleInput} value="2" >2</button>
                        <button id="three" onClick={this.handleInput} value="3" >3</button>

                        <button id="equals" onClick={this.handleEqual} >=</button>

                        <button className="jumbo" id="zero" onClick={this.handleInput} value="0" >0</button>
                        <button id="decimal" onClick={this.handleDecimal} value=".">.</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;