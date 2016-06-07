function round(val) {
    return Math.round(val * 100) / 100;
}

function generateStore(location) {

    var armorCost = Math.round(10 + (5 * Math.random())) * location;
    var armorPlus = round(0.01 * armorCost);
    var opt1 = {
        title: "Armor; +" + armorPlus + " defence; -" + armorCost + " coins;",
        chance: 1,
        action: function (success, stats) {

            if (stats.money >= armorCost) {
                stats.money -= armorCost;
                stats.defence += armorPlus;
                return "You feel protected";
            } else {
                return "You cannot afford";
            }
        }
    };

    var ofenceCost = Math.round(10 + (10 * Math.random())) * location;
    var ofencePlus = round(0.01 * ofenceCost);
    var opt2 = {
        title: "Attack; +" + ofencePlus + " defence; -" + ofenceCost + " coins;",
        chance: 1,
        action: function (success, stats) {
            console.log(stats.money, ofenceCost);
            if (stats.money >= ofenceCost) {
                stats.money -= ofenceCost;
                stats.attack += ofencePlus;
                return "You feel stronger";
            } else {
                return "You cannot afford";
            }
        }
    };

    var healthCost = Math.round(10 + (10 * Math.random()));
    var healthPlus = round(0.01 * healthCost);
    var opt3 = {
        title: "Health; +" + healthPlus + " health; -" + healthCost + " coins;",
        chance: 1,
        action: function (success, stats) {
            console.log(stats.money, healthCost);
            if (stats.money >= healthCost) {
                stats.money -= healthCost;
                stats.health += healthPlus;
                return "You feel healed";
            } else {
                return "You cannot afford";
            }
        }
    };

    var possibilities = [opt1, opt2, opt3];
    var options = [];
    var idx = 0;
    while (options.length < 2) {
        if (Math.random() < 1 / possibilities.length) {
            options.push(possibilities[idx]);
        }

        idx++;
        if (idx > possibilities.length - 1) {
            idx = 0;
        }
    }

    options.push({
        title: "Leave",
        chance: 1,
        action: function (success, stats) {
            return "There was nothing of interest!";
        }
    });

    return options;

}