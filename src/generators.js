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

function generateStore(location, numOpts) {

    var _numOpts = numOpts || 2;

    function generateItem(minCost, randomCost, plusProd, strPre, who) {
        var itemCost = Math.round(minCost + (randomCost * Math.random()) * ((location+1)*0.01));
        var itemPlus = round(plusProd * itemCost);
        return {
            title: strPre + ": +" + itemPlus + " " + who + "; -" + itemCost + " coins;",
            chance: 1,
            action: function (success, stats) {
                if (stats.money >= itemCost) {
                    stats.money -= itemCost;
                    stats[who] += itemPlus;
                    return "You feel protected";
                } else {
                    return "You cannot afford";
                }
            }
        }

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