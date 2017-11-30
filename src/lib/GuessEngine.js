const DifficultyLevel = Object.freeze({
    EASY: Symbol('easy'),
    MEDIUM: Symbol('medium'),
    HARD: Symbol('hard')
});

class GuessOutcome {

    constructor(guess, magicNumberMax, magicNumber, accuracy) {
        this.guess = guess;
        this.magicNumber = magicNumber;
        this.magicNumberMax = magicNumberMax;
        this.accuracy = accuracy;
    }

    getSuggestion() {
        return this.guess > this.magicNumber ? 'smaller' : 'bigger';
    }

    getIndicator() {
        if (this.accuracy <= 0.1) {
            return 'boiling';
        }

        if (this.accuracy <= 0.2) {
            return 'hot';
        }

        if (this.accuracy <= 0.3) {
            return 'warm';
        }

        if (this.accuracy <= 0.4) {
            return 'cold';
        }

        if (this.accuracy <= 0.8) {
            return 'frosty';
        }

        return 'freezing';
    }
}

class GuessEngine {

    constructor() {
        this.startNewGame(DifficultyLevel.EASY);
    }

    startNewGame(difficultyLevel) {
        if (difficultyLevel !== DifficultyLevel.EASY
            && difficultyLevel !== DifficultyLevel.MEDIUM
            && difficultyLevel !== DifficultyLevel.HARD) {
            if (!this.difficultyLevel) {
                this.difficultyLevel = DifficultyLevel.EASY;
            }
        } else {
            this.difficultyLevel = difficultyLevel;
        }

        this.magicNumberMax = this.getMagicNumberMax();
        this.magicNumber = this.getMagicNumber();
    }

    getMagicNumber() {
        return Math.ceil(Math.random() * this.magicNumberMax);
    }

    getMagicNumberMax() {
        if (this.difficultyLevel === DifficultyLevel.EASY)
            return 10;

        if (this.difficultyLevel === DifficultyLevel.MEDIUM) {
            return 100;
        }

        if (this.difficultyLevel === DifficultyLevel.HARD) {
            return 1000;
        }

        throw Error(`The specified difficulty '${this.difficultyLevel}' is not supported.`);
    }

    guess(magicNumber) {
        const difference = Math.abs(this.magicNumber - magicNumber);

        let accuracy = 0;

        if (difference !== 0) {
            accuracy = difference / this.magicNumberMax;
        }

        return new GuessOutcome(magicNumber, this.magicNumberMax, this.magicNumber, accuracy);
    }
}

export {
    DifficultyLevel,
    GuessEngine,
    GuessOutcome
};