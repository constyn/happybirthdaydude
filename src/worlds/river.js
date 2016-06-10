var river = [
    {
        title: "a xamarin got out of the river and attacked you!",
        background: "river/rocky_mountains.png",
        item: "river/xam.gif",
        chance: 0.13,
        options: [
            {
                title: "Fight!",
                chance: 1,
                action: function (success, stats) {
                    fight(stats, {health: 0.4, defence: 0.3, attack: 0.4});
                    if (stats.health > 0) {
                        return randomLoot(stats, false);
                    }
                }
            }, {
                title: "Run!",
                chance: 0.8,
                action: function (success, stats) {
                    if (success) {
                        return "You managed to escape the xamarin";
                    } else {
                        fight(stats, {health: 0.4, defence: 0.3, attack: 0.4});
                    }
                }
            }]
    },

    {
        title: "You found a lizard",
        background: "river/rocky1.jpg",
        item: "mountains/lizzard1.gif",
        chance: function (stats) {
            return stats.progress < 0.2 ? 0.15 : 0;
        },
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    fight(stats, {health: 0.4, defence: 0.2, attack: 0.4});
                    if (stats.health > 0) {
                        return randomLoot(stats);
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

];