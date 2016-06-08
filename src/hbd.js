function hasItem(item) {
    return stats.items.indexOf(item) !== -1;
}

var initialStats = {
    age: 365 * 15,
    health: 0.9,
    money: 10,
    luck: 0.3,
    knowledge: 0.1,
    currentLocation: 0,
    location: 0,
    happyness: 0.6,
    evil: 0,
    keys: 1,
    defence: 0.1,
    attack: 0.1,
    progress: 0,
    boss: 0,
    items: []
};

function correctStats(stats) {
    if (stats.happyness < 0) {
        stats.health -= 0.02;
    } else if (stats.happyness > 0.5) {
        stats.health += 0.01;
    }

    stats.happyness = stats.happyness > 1 ? 1 : stats.happyness;
    stats.health = stats.health > 2 ? 2 : stats.health;

    _.each(['luck', 'defence', 'attack'], function(key){
        stats[key] = stats[key] > 1 ? 1 : stats[key];
        stats[key] = stats[key] < 0 ? 0 : stats[key];
    });

}

var devMode = true;
var events = {
    "0": [].concat(woods).concat(items).concat(foods).concat(generic),
    "1": [].concat(mountains).concat(items).concat(foods).concat(generic)
};
var locationNames = {
    "0": "Woods",
    "1": "Mountains"
};

function pickFrom(arr) {
    return arr[Math.round(Math.random() * arr.length)];
}


function randomLoot(stats) {

    var money = 0;
    var keys = 0;
    var result = "You search the corpse for loot. You find nothing";

    if (Math.random() < stats.luck) {

        if (Math.random() < stats.luck) {
            money += Math.round(Math.random() * 6);
        }

        if (Math.random() < stats.luck) {
            keys += Math.round(Math.random() * 6);
        }
    }


    if (money > 0 || keys > 0) {
        result = "You found "
            + (money > 0 ? money + " coin(s)" : "")
            + (keys > 0 ? keys + " key(s)" : "");
    }

    if (Math.random() < stats.luck) {
        result += " - You feel a stronger";
        stats.attack += 0.01;
        stats.defence += 0.01;
    }


    return result;


}


function randomIncrease(amount) {
    var possible = ['health', 'luck', 'knowledge', 'happyness', 'defence', 'attack'];
    var val = pickFrom(possible);
    var result = "Nothing happened";
    if (stats[val] !== undefined) {
        stats[val] += amount;
        result = "Your " + val + " received a decrease of " + amount;
    }

    return result;
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
