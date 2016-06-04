var ooo = [
    {
        title: "You found a scroll!",
        background: "at/treehouse.jpg",
        item: "at/prismgram.png",
        chance: 0.2,
        options: [
            {
                title: "Read It!",
                chance: 1,
                action: function () {
                    var quotes = [
                        "You just kissed a boom boom baby, so don't expect any more sugar from me, sweetheart, until we wash your dirty, dirty face.",
                        "Ugh, what a weirdo! You are one sick man, mister.",
                        "Many, if not all, people in power are actually shape-shifting reptilian aliens.",
                        "And I'm not supposed to bring a guest!",
                        "Unable to return Mr. Biscuits, Finn and Jake try to cheer Monkey Wizard up by giving him bunny stickers, but it fails.",
                        "Gotcha!",
                        "All your fault",
                        "Too Old",
                        "One Last Job",
                        "Shh!",
                        "Be More",
                        "A hero of renown!",
                        "She offered him her hair?",
                        "Sing cause yo mama, yo mama, yo mama said",
                        "Yeah, Yeah, Yeah! So turn up the music and we'll never leave!",
                        "Romance or action, does not matter.",
                        "Spread those colors on my belly!",
                        "We'll make you cry!",
                        "Never in your freaking life!"
                    ];

                    if (Math.random < 0.01) {
                        stats.health -= 0.04;
                        return "It seems that it can really hurt once the letter (in the form of a laser) is shot at the forehead.";
                    } else {
                        return pickFrom(quotes);
                    }

                }
            }, {
                title: "Ignore!",
                chance: 1,
                action: "Probably it was a waste of time"
            }
        ]
    },

    {
        title: "You have found a wishing orb!",
        background: "at/treehouse.jpg",
        item: "at/wishorb.png",
        chance: 0.05,
        options: [
            {
                title: "-0.4 knowledge, +0.1 health",
                chance: 1,
                action: function (success, stats) {
                    stats.knowledge -= 0.4;
                    stats.health += 0.1;
                    return "Sometimes you have to do compromises";
                }
            },
            {
                title: "-0.1 attack, -0.1 defence, +0.1 luck",
                chance: 1,
                action: function (success, stats) {
                    stats.attack -= 0.1;
                    stats.defence -= 0.1;
                    stats.luck += 0.1;
                    return "Sometimes you have to do compromises";
                }
            },
            {
                title: "-0.3 happyness, +0.1 defence, +0.1 offence",
                chance: 1,
                action: function (success, stats) {
                    stats.happyness -= 0.3;
                    stats.defence += 0.1;
                    stats.attack += 0.1;
                    return "Sometimes you have to do compromises";
                }
            }
        ]
    },
    {
        title: "You found The Bag of Holding. A magical object that can hold everything inside of it. It pulls in everything around it.",
        background: "at/treasury.jpg",
        item: "at/bagofholdings.png",
        chance: function (stats) {
            return 0.2 * stats.luck;
        },
        options: [
            {
                title: "Check what is inside of it",
                chance: function (stats) {
                    return 0.2 + stats.luck;
                },
                action: function (success, stats) {
                    if (success) {
                        var result = "You have found: ";
                        var money = 1;
                        if (Math.random() > stats.luck) {
                            money = Math.round(Math.random() * 10);
                        }

                        result += money + " coins;";
                        stats.money += money;

                        if (Math.random() > stats.luck) {
                            stats.keys += 1;
                            result += " 1 key;";
                        }

                        return result;
                    } else {
                        if (Math.random() < 0.005) { //The lich
                            var turns = fight(stats, {health: 1, defence: 0.6, attack: 0.8});
                            if (stats.health > 0) {
                                stats.attack += 0.4;
                                stats.defence += 0.3;

                                return "The bag freed The Lich but you managed to fight it. After " + turns + " turns - you are victorious. You lost " + num(health - stats.health) + " health - Tiffany is running away";
                            } else {
                                return "The bag freed The Lich and this is the end of our hero! You are no Finn";
                            }
                        } else {
                            if (Math.random() < stats.luck) {
                                return "The bag contained a strange gas. " + randomDamage(0.04);
                            } else {
                                return "There is nothing inside it";
                            }
                        }
                    }
                }
            },
            {
                title: "Leave it alone",
                chance: 1,
                action: "Probably better; Once, the Snail freed The Lich from the bag"
            }
        ]
    },


    //Enemies
    {
        title: "You have meet The Lich",
        background: "cave2",
        item: "at/lich.png",
        chance: function (stats) {
            return stats.progress > 0.8 ? stats.progress : 0.002;
        },
        options: [
            {
                title: "Fight!",
                chance: 1,
                action: function (success, stats) {
                    var message;
                    if (hasItem(THE_GAUNTLET)) {
                        fight(stats, {health: 0.2, defence: 0.2, attack: 0.2});
                        if (stats.health <= 0) {
                            message = "The Lich desired the end of our hero and the existence of life.";
                        } else {
                            message = "Wealding the Gauntled you defeated the Lich";
                        }
                    } else {
                        fight(stats, {health: 0.8, defence: 0.6, attack: 0.8});
                        if (stats.health <= 0) {
                            message = "Withtout the Gauntled you had no chance!";
                        } else {
                            message = "You managed to defeat the Lich without the Gauntlet! You are a true hero";
                        }
                    }

                    return message;

                }
            },
            {
                title: "Try to run even though you will cross paths again",
                chance: 1,
                action: function () {
                    if (hasItem(THE_GAUNTLET)) {
                        return "You should attack - You posses the Gauntlet.";
                    } else {
                        return "Probably it is wiser - you are still missing the Gauntlet.";
                    }
                }
            }
        ]
    },
    {
        title: "Tiffany is trying to Ambush you. JAKE is my friend!!! She shouts filled with geaulosy",
        background: "at/treehouse.jpg",
        item: "at/tiffany.png",
        chance: function (stats) {
            return 0.08;
        },
        options: [
            {
                title: "Dodge and Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.2, defence: 0.2, attack: 0.2});
                    if (stats.health > 0) {
                        stats.attack += 0.03;
                        stats.defence += 0.01;

                        return "After " + turns + " turns - you are victorious. You lost " + num(health - stats.health) + " health - Tiffany is running away";
                    }
                }
            },
            {
                title: "Dodge and run!!",
                chance: 1,
                action: function (success, stats) {
                    return "Run Coward! (Tiffany shouts). Jake will be my friend"
                }
            }
        ]
    },
    {
        title: "You have crossed path with Xergiok",
        background: "at/generic1.jpeg",
        item: "at/xergiok.png",
        chance: function (stats) {
            return 0.07;
        },
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.4, defence: 0.2, attack: 0.05});
                    if (stats.health > 0) {
                        stats.attack += 0.04;
                        stats.defence += 0.02;


                        return "After " + turns + " turns - you are victorious. You lost " + num(health - stats.health) + " health";
                    }
                }
            },
            {
                title: "Run!",
                chance: 1,
                action: function (success, stats) {
                    return "You managed to escape safe and sound"
                }
            }
        ]
    },
    {
        title: "You have crossed path with a rabid squirrel",
        background: "at/treehouse.jpg",
        item: "at/squirrel.gif",
        chance: function (stats) {
            return 0.08;
        },
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.2, defence: 0.01, attack: 0.2});
                    if (stats.health > 0) {
                        stats.attack += 0.04;
                        stats.defence += 0.02;


                        return "After " + turns + " turns - you are victorious. You lost " + num(health - stats.health) + " health";
                    }
                }
            },
            {
                title: "Run!",
                chance: 1,
                action: function (success, stats) {
                    return "You managed to escape safe and sound"
                }
            }
        ]
    },

    {
        title: "You have crossed path with a toxic creature",
        background: "at/desert.png",
        item: "at/toxiccr.png",
        chance: function (stats) {
            return 0.05;
        },
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.5, defence: 0.01, attack: 0.6});
                    if (stats.health > 0) {

                        stats.attack += 0.1;
                        stats.defence += 0.1;


                        return "After " + turns + " turns - you are victorious. You lost " + num(health - stats.health) + " health";
                    }
                }
            },
            {
                title: "Run!",
                chance: 1,
                action: function (success, stats) {
                    return "You managed to escape safe and sound"
                }
            }
        ]
    }

];