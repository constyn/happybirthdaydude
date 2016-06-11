var generic = [
    {
        title: "The Good Wich",
        background: "general/unknown_grounds_2.png",
        item: "general/bad-wich.gif",
        chance: 0.004,
        options: [
            {
                title: "Mingle all my stats",
                chance: 1,
                action: function (success, stats) {
                    var locale = _.clone(stats);
                    var mingled = pickFromNum(skills, skills.length);

                    _.each(skills, function (key, index) {
                        console.log(key, stats[key], " -- ", mingled[index], locale[mingled[index]]);
                        stats[key] = locale[mingled[index]];
                    });


                    return "You might need to check your stats";
                }
            },
            {
                title: "Take -1 of one of my random stats",
                chance: 1,
                action: function (success, stats) {
                    var stat = pickFrom(skills);
                    stats[stat] -= 0.1;
                    return "-" + stat;
                }
            }]
    },
    {
        title: "The Good Wich",
        background: "general/unknown_grounds.png",
        item: "general/good-wich.gif",
        chance: function (stats) {
            return stats.location < 2 ? 0.005 : 0.001;
        },
        options: [
            {
                title: "+2 for 1 random stats; -2 for another",
                chance: 1,
                action: function (success, stats) {
                    var skls = pickFromNum(skills, 2);
                    stats[skls[0]] += 0.2;
                    stats[skls[1]] -= 0.2;
                    return "+" + skls[0] + "; -" + skls[1];
                }
            },
            {
                title: "+1 for 2 random stats; -1 for another",
                chance: 1,
                action: function (success, stats) {
                    var skls = pickFromNum(skills, 3);
                    stats[skls[0]] += 0.1;
                    stats[skls[1]] += 0.1;
                    stats[skls[2]] -= 0.1;

                    return "+[" + skls[0] + "," + skls[1] + "] -[" + skls[2] + "]";
                }
            },
            {
                title: "I do not deal with the witches",
                chance: 1,
                action: "Be careful next time!"
            }
        ]
    },
    {
        title: "Do you feel lucky? Double your bet!",
        background: "general/tavernd.png",
        item: "general/dice.gif",
        chance: 0.09,
        options: [
            {
                title: "I bet 1 coin",
                chance: function (stats) {
                    return stats.luck;
                },
                action: function (success, stats) {
                    if (stats.money < 1) {
                        return "You cannot afford!"
                    } else if (success) {
                        stats.money += 2;
                        return "You won 2 coins - you lucky bastard";
                    } else {
                        stats.money -= 1;
                        return "You lost!"
                    }
                }
            },
            {
                title: "I bet 2 coins",
                chance: function (stats) {
                    return stats.luck;
                },
                action: function (success, stats) {
                    if (stats.money < 2) {
                        return "You cannot afford!"
                    } else if (success) {
                        stats.money += 4;
                        return "You won 4 coins - you lucky bastard";
                    } else {
                        stats.money -= 2;
                        return "You lost!"
                    }
                }
            },
            {
                title: "I bet 4 coins",
                chance: function (stats) {
                    return stats.luck;
                },
                action: function (success, stats) {
                    if (stats.money < 4) {
                        return "You cannot afford!"
                    } else if (success) {
                        stats.money += 8;
                        return "You won 8 coins - you lucky bastard";
                    } else {
                        stats.money -= 4;
                        return "You lost!"
                    }
                }
            },
            {
                title: "I have no money to bet",
                chance: 1,
                action: "Probably for the best"
            }]
    },
    {
        title: "You found a bicycle - you can reach the end faster",
        background: "general/road.jpg",
        item: "general/bike.png",
        chance: function (stats) {
            return stats.progress < 0.5 ? 0.03 : 0;
        },
        options: [
            {
                title: "Ride it",
                chance: 0.8,
                action: function (success, stats) {
                    if (success) {
                        stats.progress += 0.3;
                        return "You reached to a point where you cannot use your bike. Back to walking - it was fun";
                    } else {
                        stats.progress += 0.1;
                        stats.health -= 0.02;
                        return "You fell with the bike. but at least you ride it a little bit"
                    }
                }
            },
            {
                title: "Skip! It is too dangerous",
                chance: 1,
                action: "Well, probably for the best"
            }
        ]
    },

    {
        title: "You found a cave",
        background: "general/cave2.png",
        item: "general/bats.gif",
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
        item: "general/zzz.gif",
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
                        stats.progress += 0.13; //0.1 = 24h
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
    },
    {
        title: "The Gambler",
        background: "general/mountain_trees.png",
        item: "general/gambler.png",
        chance: function (stats) {
            return stats.progress < 0.4 ? 0.06 : 0.002;
        },
        options: [
            {
                title: "Pay 1 coin for a 10% random loot chance",
                chance: 1,
                action: function (success, stats) {
                    if (stats.money > 0) {
                        stats.money--;
                        if (Math.random() > 0.1) {
                            return randomLoot(stats, true);
                        } else {
                            return "LOOSER!"
                        }
                    } else {
                        return "You cannot afford";
                    }
                }
            }, {
                title: "Pay 3 coins for a 50% chance of +1 increase of random skill.",
                chance: 1,
                action: function (success, stats) {
                    if (stats.money >= 3) {
                        stats.money -= 1;
                        if (Math.random() > 0.5) {
                            return randomIncrease(0.1);
                        } else {
                            return "LOOSER!"
                        }
                    } else {
                        return "You cannot afford";
                    }
                }
            },
            {
                title: "I do not gamble!",
                chance: 1,
                action: function (success, stats) {
                    return "Gambling is for amateurs";
                }
            }]
    }
];
