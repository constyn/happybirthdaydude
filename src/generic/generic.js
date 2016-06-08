var generic = [
    {
        title: "You found a cave",
        background: "cave2.png",
        item: "rand/bats.gif",
        chance: 0.04,
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
    }
];
