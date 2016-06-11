var coll_items = {
    gauntlet: 55,
    tomi: 23,
    girl: 42,
    job: 43,
    zld: 57
};


var collectables = [
    {
        title: "IT'S DANGEROUS TO GO ALONE! TAKE THIS!",
        background: "general/cave.gif",
        item: "general/goalone.png",
        chance: function (stats) {
            return hasItem(stats, coll_items.zld) ? 0 : 0.001
        },
        options: [
            {
                title: "Take it!",
                chance: 1,
                action: function (success, stats) {
                    stats.attack += 0.2;
                    stats.items.push(coll_items.zld);
                    triggerItem('general/goalone.png');
                    return "You are stronger!"
                }
            }]
    },
    {
        title: "You have found \"A Job\"",
        background: "general/zen_garden.png",
        item: "collectables/sclogo.png",
        chance: function (stats) {
            if (hasItem(stats, coll_items.job)) {
                if (Math.random() < 0.02) {
                    triggerItem('collectables/sclogo.png');
                    stats.money += 2;
                }
                return 0;
            } else {
                return 0.001;
            }
        },
        options: [
            {
                title: "Accept the job",
                chance: 1,
                action: function (success, stats) {
                    stats.items.push(coll_items.job);
                    return "A Job will bring you money";
                }
            }]
    },
    {
        title: "You have found \"The Girl\"",
        background: "general/zen_garden.png",
        item: "collectables/girl.png",
        chance: function (stats) {
            if (hasItem(stats, coll_items.girl)) {
                if (Math.random() < 0.08) {
                    stats.health += 0.05;
                    triggerItem('collectables/girl.png');
                }
                return 0;
            } else {
                return 0.008;
            }
        },
        options: [
            {
                title: "Fall in love",
                chance: 1,
                action: function (success, stats) {
                    stats.items.push(coll_items.girl);
                    return "\"The Girl\" will be close to you at any time";
                }
            }]
    },
    {
        title: "You have found Tomi",
        background: "general/zen_garden.png",
        item: "collectables/tomi.gif",
        chance: function (stats) {
            // return hasItem(stats, coll_items.tomi) ? 0 : 0.006;
            if (hasItem(stats, coll_items.tomi)) {
                if (Math.random() < 0.1) {
                    stats.happyness += 0.1;
                    triggerItem('collectables/tomi.gif');
                    return 0;
                }
            } else {
                return 0.006;
            }
        },
        options: [
            {
                title: "Take it in your journey",
                chance: 1,
                action: function (success, stats) {
                    stats.items.push(coll_items.tomi);
                    return "Tomi will bring you happyness";
                }
            }]
    },
    {
        title: "You have found the gauntlet",
        background: "general/road.jpg",
        item: "collectables/the_gauntlet.png",
        chance: function (stats) {
            return hasItem(stats, coll_items.gauntlet) ? 0 : 0.005;
        },
        options: [
            {
                title: "Pick It up",
                chance: 1,
                action: function (success, stats) {
                    stats.items.push(coll_items.gauntlet);
                    if (stats.attack > 0.2) {
                        stats.attack -= 0.2;
                        stats.defence += 0.2;
                        return "The gauntlet will protect you from attacks."
                    } else {
                        return "You are not worthy for the gauntlet."
                    }
                }
            },
            {
                title: "Ignore",
                chance: 1,
                action: function (success, stats) {
                    stats.items.push(coll_items.gauntlet);
                    return "You leave the gauntlet behind - wondering how it would have been."
                }
            }]
    }
];