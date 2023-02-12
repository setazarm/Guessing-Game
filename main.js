
const rs = require('readline-sync');
class Shrugman {
    constructor() {
        this.movies = ["Rosemary's baby", "chinatown", "Bitter moon", "pianist",
            "Citizen Kane", "God father", "Talk to her", "Pulp fiction", "The dark knight", "The green mile",
            "Forrest Gump", "Terminal"];
        this.books = ["war and peace", "Harry potter and the prisoner of Azkaban", "The Unbearable Lightness of Being",
            "Kafka on the beach", "Jane Eyre", "My brilliant friend", "The Hobbit"
        ]
        this.emoji = "¯\\_(:/)_/¯";
        this.shrugMan = "";
        this.game = {};
        this.gamesList = [];
        this.secret = this.createSecret();
        this.secretArr = this.secret.split("");
        this.mask = this.creatingMask(this.secret);
        this.maskArr = this.mask.split("");
        this.guessArr = [];
        this.attempt = 0;
    }


    //creating the secret word based on the selected category by player
    createSecret() {
        let playedGames = this.gamesList.map(i => i[0])//to avoid repeated secret words  
        // console.log(playedGames);
        let options = this.selectCategory()
        console.log(options);
        if (options === "2") {
            let movie = this.movies[Math.floor(Math.random() * this.movies.length)];
            while (playedGames.includes(movie)) {
                movie = this.movies[Math.floor(Math.random() * this.movies.length)];
            }
            return movie;
        } else if (options === "1") {
            let book = this.books[Math.floor(Math.random() * this.books.length)];
            while (playedGames.includes(book)) {
                book = this.books[Math.floor(Math.random() * this.books.length)];
            }
            return book;
        }

    }
    //creating the mask based on the secret
    creatingMask(name) {
        let mask = ""
        for (let i of name) {
            if (i !== " ") {
                mask += "-";
            } else {
                mask += " ";
            }
        }
        return mask
    }
    //list of all games played, and whether they were a win or a loss
    listOfTheGames() {

        this.game.name = this.secret;
        this.game.status = this.isWon()
        console.log("List of the games  you already played: \n")
        this.gamesList.push(Object.values(this.game));
        for (let i of this.gamesList) {
            console.log(i[0] + "-" + i[1]);
        }
    }
    //check if the game is won or loss
    isWon() {
        for (let i of this.secret) {
            if (this.secret.toLowerCase() === this.maskArr.join("").toLowerCase()) {

                return "win"
            }
        }
        return "loss"
    }
    //check the correction of the guess
    isGuessCorrect(letter) {

        if (this.secret.toLowerCase().includes(letter.toLowerCase()) && letter.length === 1) {

            this.guessArr.push(letter.toLowerCase());
            return true;

        } else {
            this.guessArr.push(letter.toLowerCase());
            return false;
        }
    }

    // updating mask and shrugman based on players input
    updateMask(letter) {

        if (this.guessArr.includes(letter)) {
            console.log("you already try this letter. now try another one.")
            return;
        }
        if (this.isGuessCorrect(letter)) {
            for (let i = 0; i < this.secret.length; i++) {
                if (letter.toLowerCase() === this.secret[i].toLowerCase()) {
                    this.maskArr[i] = letter.toLowerCase();

                }
            }
        }

        if (!this.isGuessCorrect(letter)) {
            this.shrugMan += this.emoji[this.attempt];
            this.attempt++;
        }

        console.clear()
        console.log(this.maskArr.join(""))
        console.log(this.shrugMan);
    }
    //this func checks whether the game is finished or not and if it is finished it prints appropriate message.
    isRunning() {
        if (this.shrugMan === this.emoji) {
            console.log("you lost the game");
            return false;
        } else if (this.secret.toLowerCase() === this.maskArr.join("").toLowerCase()) {
            console.log("Congrats, you won the game");
            return false;
        } else {
            return true;
        }
    }
    // we need only this func to be called outside of the class
    playTheGame() {
        // console.log(this.secret);

        console.log(this.mask);
        while (this.isRunning()) {
            let guess = rs.question("guess a letter\n");
            this.updateMask(guess);
        }
        console.log();
        this.listOfTheGames();
        this.playAgain();

    }
    // for playing another round
    playAgain() {

        let anotherRound = rs.question("would you like to play again?Y/N");
        if (anotherRound.toUpperCase() === "Y") {
            this.reset();
            this.playTheGame();
            return;
        } else if (anotherRound.toUpperCase() === "N") {
            console.log("Thanks for playing.")
            return;
        } else {
            console.log("please press Y for yes and N for No.")
            this.playAgain();
            return;
        }
    }
    // this func reset all the necessary variables for new game.
    reset() {
           
        this.shrugMan = "";
        this.secret = this.createSecret();
        this.secretArr = this.secret.split("");
        this.mask = this.creatingMask(this.secret);
        this.maskArr = this.mask.split("");
        this.guessArr = [];
        this.attempt = 0;
    }
    // players can choose if they want to play in books category or movie category
    selectCategory() {
        let category = rs.question("which category would you like to select for playing?\n Books > 1\n Movies > 2\n")
        if (category === "1" || category === "2") {
            return category;
        } else {
            console.log("press 1 to select Books or 2 to select Movies");
            return this.selectCategory();
        }
    }
}



// declaring instance of the class

const myGame = new Shrugman();

//calling the method 
myGame.playTheGame();



