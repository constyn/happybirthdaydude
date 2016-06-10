var generic = [
    {
        title: "You found a cave",
        background: "cave2.png",
        item: "rand/bats.gif",
        chance: 0.07,
        options: [
            {
                title: "Search inside",
                chance: function (stats) {
                    return stats.luck;
                },
                action: function (success, stats) {
                    if (success) {
                        return randomLoot(stats);
                    } else {
                        fight(stats, {health: 0.1, defence: 0.02, attack: 0.1});
                        return "The bats inside the cave attacked you! You had to fight!"
                    }
                }
            },
            {
                title: "Leave it alone",
                chance: 1,
                action: "It might have hold great treasures."
            }]
    },
    {
        title: "The night is coming - you should rest",
        background: "mountains/mtn5.png",
        item: "zzz.gif",
        chance: function (stats) {
            return stats.progress * 10 % 1 > 0.8 ? 1 : 0;
        },
        options: [
            {
                title: "Go to sleep",
                chance: 1,
                action: function (success, stats) {
                    if (stats.progress > 0.8 && Math.random() < 0.1) {
                        fight(stats, {health: 0.3, defence: 0.1, attack: 0.1});
                        return "You had been attacked while you were sleeping. You had to fight!";
                    } else {
                        stats.health += 0.01;
                        stats.happyness += 0.02;
                        return "You feel healthier and happier";
                    }
                }
            }, {
                title: "Continue - you never know what is lurking around",
                chance: 1,
                action: function (success, stats) {
                    stats.happyness -= 0.01;
                    stats.health -= 0.01;
                    return "You feel tired, unhappy and slightly sick";
                }
            }
        ]
    }
];
