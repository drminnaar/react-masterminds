import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DifficultyLevel, GuessEngine } from '../lib/GuessEngine';

const guessEngine = new GuessEngine();

class Game extends Component {

    constructor(props) {
        super();

        this.state = {
            guess: props.guess,
            difficulty: props.difficulty
        };

        this.guessNumber = this.guessNumber.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.startEasyGame = this.startEasyGame.bind(this);
        this.startMediumGame = this.startMediumGame.bind(this);
        this.startHardGame = this.startHardGame.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    componentDidMount() {
        guessEngine.startNewGame(this.state.difficulty);
    }

    guessNumber() {
        const guessOutcome = guessEngine.guess(this.state.guess);

        if (guessOutcome.accuracy === 0) {
            this.setState(() => ({ outcome: 'you win' }));
        } else {
            const outcome = `${guessOutcome.getIndicator()} : ${guessOutcome.getSuggestion()}`;
            const indicator = guessOutcome.getIndicator();
            this.setState(() => ({ outcome, indicator }));
        }
    }

    handleNumberChange(e) {
        const guess = e.target.value;

        if (!isNaN(guess)) {
            this.setState(() => ({ guess: parseInt(guess) }));
        }
    }

    outcomeClass() {
        const indicator = this.state.indicator;

        if (!indicator || indicator === '') {
            return '';
        }

        if (indicator === 'boiling') {
            return 'indicator--red fa fa-thermometer-0 fa-2x';
        }

        if (indicator === 'hot') {
            return 'indicator--orange fa fa-thermometer-0 fa-2x';
        }

        if (indicator === 'warm') {
            return 'indicator--yellow fa fa-thermometer-0 fa-2x';
        }

        if (indicator === 'cold') {
            return 'indicator--green fa fa-thermometer-0 fa-2x';
        }

        if (indicator === 'frosty') {
            return 'indicator--cyan fa fa-thermometer-0 fa-2x';
        }

        return 'indicator--blue fa fa-thermometer-0 fa-2x';
    }

    easyLinkClass() {
        return this.activeLinkClass(DifficultyLevel.EASY);
    }

    mediumLinkClass() {
        return this.activeLinkClass(DifficultyLevel.MEDIUM);
    }

    hardLinkClass() {
        return this.activeLinkClass(DifficultyLevel.HARD);
    }

    activeLinkClass(difficultyLevel) {
        return guessEngine.difficultyLevel === difficultyLevel ? 'active' : '';
    }

    startEasyGame() {
        this.startGame(DifficultyLevel.EASY);
    }

    startMediumGame() {
        this.startGame(DifficultyLevel.MEDIUM);
    }

    startHardGame() {
        this.startGame(DifficultyLevel.HARD);
    }

    startGame(difficulty) {
        guessEngine.startNewGame(difficulty);
        this.setState(() => ({ outcome: '', guess: 0 }));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        {
                            this.state.outcome !== 'you win' && <div>
                                <div className="form-group">
                                    <ul className="nav nav-pills nav-fill">
                                        <li className="nav-item">
                                            <a className={`nav-link ${this.easyLinkClass()}`}
                                                onClick={this.startEasyGame}>EASY</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${this.mediumLinkClass()}`}
                                                onClick={this.startMediumGame}>MEDIUM</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${this.hardLinkClass()}`}
                                                onClick={this.startHardGame}>HARD</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="form-group">
                                    <input type="number" className="form-control game-display"
                                        placeholder="enter number"
                                        onChange={this.handleNumberChange}
                                        value={this.state.guess} />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-lg btn-success btn-block"
                                        onClick={this.guessNumber}>GUESS</button>
                                </div>
                            </div>
                        }
                        {
                            this.state.outcome && this.state.outcome !== 'you win' &&
                            <div className="form-group">
                                <div className="game-outcome">
                                    <p>{this.state.outcome}</p>
                                    <i className={`${this.outcomeClass()}`} />
                                </div>
                            </div>
                        }
                        {
                            this.state.outcome === 'you win' && <div className="form-group">
                                <div className="game-outcome">
                                    <p>{this.state.outcome}</p>
                                    <button className="btn btn-lg btn-success btn-block"
                                        onClick={this.startGame}>PLAY AGAIN</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Game.defaultProps = {
    guess: 0,
    magicNumber: undefined,
    difficulty: DifficultyLevel.EASY
};

Game.propTypes = {
    guess: PropTypes.number,
    magicNumber: PropTypes.number,
    difficulty: PropTypes.any
};

export default Game;