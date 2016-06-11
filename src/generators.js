function round(val) {
    return Math.round(val * 100) / 100;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4();
}

function pickFrom(arr) {
    return arr[Math.round(Math.random() * (arr.length-1))];
}


function prepareSeed(reset) {
    var seed;
    if (reset) {
        seed = guid();
        window.localStorage.setItem('seed', seed);
    } else {
        seed = window.localStorage.getItem('seed');
        if (!seed) {
            prepareSeed(true);
        }
    }
    Math.seedrandom(seed);
}
prepareSeed();


function generateOrbChances() {

    var minAmount = 0.05;
    var maxAmount = 0.15;

    function resetChance() {
        var item = {};
        var increase = pickFrom(skills);
        var decrease;
        while (decrease == undefined) {
            var pick2 = pickFrom(skills);
            if (pick2 !== undefined && pick2 !== increase) {
                decrease = pick2;
            }
        }

        var increaseAmount = round(minAmount + (Math.random() * (maxAmount - minAmount)));
        var decreaseAmount = round(minAmount + (Math.random() * (maxAmount - minAmount)));

        item.title = "+" + increaseAmount + " " + increase + "; -" + decreaseAmount + " " + decrease;
        item.chance = 1;
        item.action = function (success, stats) {
            console.log('action', stats[decrease], decreaseAmount);
            if (stats[decrease] >= decreaseAmount) {
                stats[increase] += increaseAmount;
                stats[decrease] -= decreaseAmount;
                var newOne = resetChance();
                this.title = newOne.title;
                this.action = newOne.action;
                return "Sometimes you have to do compromises";
            } else {
                stats.health -= 0.1;
                return "You cannot afford the Orb decreases a 0.1 health points";
            }
        };

        return item;
    }

    var arr = [resetChance(), resetChance(), resetChance()];
    return arr;
}

function generateStore(location, numOpts) {

    var _numOpts = numOpts || 2;

    function generateItem(minCost, randomCost, plusProd, strPre, who) {
        var itemCost = Math.round(minCost + (randomCost * Math.random()) * ((location + 1) * 0.01));
        var itemPlus = round(plusProd * itemCost);
        return {
            title: strPre + ": +" + itemPlus + " " + who + "; -" + itemCost + " coins;",
            chance: 1,
            action: function (success, stats) {
                if (stats.money >= itemCost) {
                    stats.money -= itemCost;
                    stats[who] += itemPlus;


                    resetObj(this);

                    return "You feel protected";
                } else {
                    return "You cannot afford";
                }
            }
        }

    }


    function resetObj(storeItem) {
        var option;
        var idx = 0;
        while (option == undefined) {
            if (Math.random() < 1 / possibilities.length) {
                option = possibilities[idx];
            }
            idx++;
            if (idx > possibilities.length - 1) {
                idx = 0;
            }
        }

        storeItem.action = option.action;
        storeItem.title = option.title;
    }


    var opt1 = generateItem(10, 5, 0.01, "Armor", "defence");
    var opt2 = generateItem(10, 10, 0.01, "Melee", "attack");


    var opt3 = generateItem(5, 5, 0.02, "Light Shield", "defence");
    var opt4 = generateItem(15, 15, 0.02, "Heavy Shield", "defence");

    var opt5 = generateItem(5, 5, 0.02, "Light Sword", "attack");
    var opt6 = generateItem(15, 15, 0.02, "Long Sword", "attack");

    var opt7 = generateItem(10, 10, 0.02, "Health", "health");
    var opt8 = generateItem(2, 2, 0.01, "Apple", "health");


    var possibilities = [opt1, opt2, opt3, opt4, opt5, opt6, opt7, opt8];
    var options = [];
    var idx = 0;
    while (options.length < _numOpts) {
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