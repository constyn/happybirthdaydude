function hasItem(stats, item) {
    return stats.items.indexOf(item) !== -1;
}




function correctStats(stats) {
    if (stats.happyness < 0) {
        stats.health -= 0.02;
    } else if (stats.happyness > 0.5) {
        stats.health += 0.01;
    }

    stats.happyness = stats.happyness > 1 ? 1 : stats.happyness;
    stats.health = stats.health > 2 ? 2 : stats.health;

    _.each(['luck', 'defence', 'attack'], function (key) {
        stats[key] = stats[key] > 1 ? 1 : stats[key];
        stats[key] = stats[key] < 0 ? 0 : stats[key];
    });

}

var devMode = true;
var events = {
    "0": [].concat(woods).concat(items).concat(foods).concat(generic),
    "1": [].concat(mountains).concat(items).concat(foods).concat(generic),
    "2": [].concat(river).concat(items).concat(foods).concat(generic)
};




function randomLoot(stats, gambling) {

    var money = 0;
    var keys = 0;
    var result = gambling ? "You won nothing!" : "You search the corpse for loot. You find nothing";

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

    if (!gambling && Math.random() < stats.luck) {
        result += " - You feel a stronger";
        stats.attack += 0.01;
        stats.defence += 0.01;
    }


    return result;


}


function randomIncrease(amount) {
    var val = pickFrom(skills);
    var result = "Nothing happened";
    if (stats[val] !== undefined) {
        stats[val] += amount;
        result = "Your " + val + " received an increase of " + amount;
    }

    return result;
}


//Functions
function randomDamage(amount) {
    var val = pickFrom(skills);
    var result = "Nothing happened";
    if (stats[val] !== undefined) {
        stats[val] -= amount;
        result = "Your " + val + " received a decrease of " + amount;
    }

    return result;
}
