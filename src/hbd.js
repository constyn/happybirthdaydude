var JOURNAL1 = 0;
var JOURNAL2 = 1;
var JOURNAL3 = 2;

var initialStats = {
    age: 365 * 15,
    health: 0.9,
    money: 10,
    luck: 0.6,
    knowledge: 0.1,
    currentLocation: 0,
    location: 0,
    happyness: 0.6,
    evil: 0,
    keys: 1,
    defence: 0.1,
    attack: 0.1,
    items: []
};



var devMode = true;
var events = {
    "0": [].concat(woods).concat(items).concat(foods).concat(teleporters),
    "1": dreams,
    "2": [].concat(ooo).concat(teleporters)
};
var locationNames = {
    "0": "RPG Woods",
    "1": "Dreamland",
    "2": "OOO"
};

function pickFrom(arr) {
    return arr[Math.round(Math.random() * arr.length)];
}




//Functions
function randomDamage(amount) {
    var possible = ['health', 'luck', 'knowledge', 'happyness', 'defence', 'attack'];
    var val = pickFrom(possible);
    var result = "Nothing happened";
    if (stats[val] !== undefined) {
        stats[val] -= amount;
        result = "Your " + val + " received a decrease of " + amount;
    }

    return result;
}
