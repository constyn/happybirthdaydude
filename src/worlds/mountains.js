var mountains = [
    {
        title: "Welcome to my cavern tavern. How can I help you?",
        background: "intavern.gif",
        item: "clerk.gif",
        chance: 0.2,
        options: generateStore(2)
    },
    {
        title: "You found a lizard",
        background: "mountains/mtn2.gif",
        item: "mountains/lizzard1.gif",
        chance: 0.2,
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.4, defence: 0.2, attack: 0.4});
                    if (stats.health > 0) {
                        if (Math.random() < stats.luck) {
                            stats.attack += 0.005;
                            stats.defence += 0.002;
                        } else {
                            randomLoot(stats);
                        }

                        return "After " + turns + " turns - you are victorious. You lost " + num(health - stats.health) + " health";
                    }
                }
            }, {
                title: "Run!",
                chance: function (stats) {
                    return stats.luck + stats.defence;
                },
                action: function (success, stats) {
                    if (success) {
                        return "You managed to escape unobserved. (The shame)";
                    } else {
                        var health = stats.health;
                        var turns = fight(stats, {health: 0.2, defence: 0.1, attack: 0.3});
                        if (stats.health > 0) {
                            return "After " + turns + " turns - you survived the attack victoriously. You lost " + num(health - stats.health) + " health";
                        }
                    }
                }
            }
        ]
    },
    {
        title: "You found a pack of lizards",
        background: "mountains/mtn2.gif",
        item: "mountains/lizzard1.gif",
        chance: 0.1,
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.5, defence: 0.2, attack: 0.6});
                    if (stats.health > 0) {
                        return "After " + turns + " turns - you are victorious. You lost " + num(health - stats.health) + " health";
                    }
                }
            }, {
                title: "Run!",
                chance: function (stats) {
                    return stats.luck + stats.defence;
                },
                action: function (success, stats) {
                    if (success) {
                        return "You managed to escape unobserved. (The shame)";
                    } else {
                        var health = stats.health;
                        var turns = fight(stats, {health: 0.25, defence: 0.1, attack: 0.4});
                        if (stats.health > 0) {

                            return "After " + turns + " turns - you survived the attack victoriously. You lost " + num(health - stats.health) + " health";
                        }
                    }
                }
            }
        ]
    },
    {
        title: "You encountered Bigfoot",
        background: "mountains/mtn1.png",
        item: "mountains/bigfoot.gif",
        chance: function (stats) {
            return stats.progress > 0.6 ? 0.15 : 0.01;
        },
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.6, defence: 0.1, attack: 0.6});
                    if (stats.health > 0) {
                        return "After " + turns + " turns - you are victorious. You lost " + num(health - stats.health) + " health";
                    }
                }
            }, {
                title: "Run!",
                chance: function (stats) {
                    return stats.luck + stats.defence;
                },
                action: function (success, stats) {
                    if (success) {
                        return "You managed to escape unobserved. (The shame)";
                    } else {
                        var health = stats.health;
                        var turns = fight(stats, {health: 0.4, defence: 0.1, attack: 0.4});
                        if (stats.health > 0) {

                            return "After " + turns + " turns - you survived the attack victoriously. You lost " + num(health - stats.health) + " health";
                        }
                    }
                }
            }
        ]
    }
];