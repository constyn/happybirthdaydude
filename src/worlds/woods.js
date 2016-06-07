var woods = [
    {
        title: "The forest Guardian!",
        background: "forest/forest_5.png",
        item: "woods/boss.gif",
        chance: function (stats) {
            return stats.boss;
        },
        options: [
            {
                title: "Fight",
                chance: 1,
                action: function (success, stats) {
                    fight(stats, {health: 0.5, defence: 0.1, attack: 0.2});
                    if (stats.health > 0) {
                        stats.attack += 0.15;
                        stats.defence += 0.1;
                        stats.boss = 0;
                        stats.progress = 0;
                        randomLoot(stats);
                        return "You defeated the Forest Guardian!";
                    } else {
                        return "You are defeated"
                    }
                }
            }]
    },
    {
        title: "What would you like to buy?",
        background: "intavern.gif",
        item: "clerk.gif",
        chance: 0.2,
        options: generateStore(1)
    },
    {
        title: "You encounter an orc",
        background: "forest/forest_7.png",
        item: "woods/orcanim.gif",
        chance: function (stats) {
            return 0.5 * stats.progress;
        },
        options: [
            {
                title: "Attack",
                chance: 1,
                action: function (success, stats) {
                    fight(stats, {health: 0.2, defence: 0.04, attack: 0.1});
                    if (stats.health > 0) {
                        return "You defeated the orc. " + randomLoot(stats);
                    }
                }
            },
            {
                title: "Dodge",
                chance: 1,
                action: "Your experience will never grow if you miss all the fights!"
            }]
    },
    {
        title: "You found a pack of 4 goblins",
        background: "forest/forest_4.jpeg",
        item: "goblin.png",
        chance: 0.12,
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.4, defence: 0.05, attack: 0.1});
                    if (stats.health > 0) {
                        if (Math.random() < stats.luck) {
                            stats.attack += 0.01;
                            stats.defence += 0.02;
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
                        return "You managed to escape unobserved. ";
                    } else {
                        var health = stats.health;
                        var turns = fight(stats, {health: 0.4, defence: 0.05, attack: 0.1});
                        if (stats.health > 0) {
                            if (Math.random() < stats.luck) {
                                stats.attack += 0.01;
                                stats.defence += 0.02;
                            }

                            return "After " + turns + " turns - you survived the attack victoriously. You lost " + num(health - stats.health) + " health";
                        }
                    }
                }
            }
        ]
    },
    {
        title: "You found a goblin",
        background: "forest/forest_4.jpeg",
        item: "goblin.png",
        chance: 0.2,
        options: [
            {
                title: "Attack!",
                chance: 1,
                action: function (success, stats) {
                    var health = stats.health;
                    var turns = fight(stats, {health: 0.1, defence: 0.05, attack: 0.1});
                    if (stats.health > 0) {
                        if (Math.random() < stats.luck) {
                            stats.attack += 0.005;
                            stats.defence += 0.002;
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
                        var turns = fight(stats, {health: 0.1, defence: 0.05, attack: 0.1});
                        if (stats.health > 0) {
                            if (Math.random() < stats.luck) {
                                stats.attack += 0.005;
                                stats.defence += 0.002;
                            }

                            return "After " + turns + " turns - you survived the attack victoriously. You lost " + num(health - stats.health) + " health";
                        }
                    }
                }
            }
        ]
    },
    {
        title: "You stumble upon a strange mushroom",
        background: "forest/forest_1.png",
        item: "mushroomie.gif",
        chance: function (stats) {
            return 0.06;
        },
        options: [
            {
                title: "Try too use your knowledge to cook it",
                chance: function (stats) {
                    return stats.knowledge;
                },
                action: function (success, stats) {
                    if (success) {
                        stats.health += 0.1;
                        return "You feel better and less hungry.";
                    } else if (Math.random() < stats.luck) {
                        stats.health += 0.05;
                        return "The shroom tasted bad but at least you are no longer hungry";
                    } else {
                        stats.health -= 0.02;
                        return "The shroom was poisonous. You feel even worse!"
                    }
                }
            },
            {
                title: "Eat it as it is",
                chance: function (stats) {
                    return stats.luck;
                },
                action: function (success, stats) {
                    if (Math.random() < stats.luck) {
                        stats.health += 0.05;
                        return "The shroom tasted bad but at least you are no longer hungry";
                    } else if (Math.random() < 0.1) {
                        stats.currentLocation = location;
                        stats.currentLocation = 1; //Dreamland
                        return "You feel sleepy. You faint and have a dream";
                    } else {
                        stats.health -= 0.02;
                        return "The shroom was poisonous. You feel even worse!"
                    }
                }
            },
            {
                title: "Leave the shroom alone!",
                chance: 1,
                action: function (success, stats) {
                    return "You are still hungry."
                }
            }
        ]
    },
    {
        title: "You stumble upon an opened chest",
        background: "forest/forest_1.png",
        item: "chest.png",
        chance: function (stats) {
            return 0.05 * stats.luck;
        },
        options: [
            {
                title: "Seek inside the chest",
                chance: function (stats) {
                    return 1;//stats.luck;
                },
                action: function (success, stats) {
                    if (success) {
                        if (Math.random() > stats.luck) {
                            var money = Math.round(Math.random() * 3);
                            stats.money += money;
                            return "You have found " + money + " coins";
                        } else if (Math.random() > stats.luck) {
                            stats.keys += 1;
                            return "You have found 1 key";
                        } else {
                            return "The chest is empty";
                        }
                    } else {
                        return "The chest is empty."
                    }
                }
            },
            {
                title: "Ignore the chest not knowing what is holding",
                chance: 1,
                action: function (success, stats) {
                    return "You leave the chest behind";
                }
            }
        ]
    },

    {
        title: "You stumble upon a chest. The chest is locked with a key",
        background: "forest/forest_1.png",
        item: "chest.png",
        chance: function (stats) {
            return 0.1 * stats.luck;
        },
        options: [
            {
                title: "Unlock the chest",
                chance: function (stats) {
                    return stats.keys > 0;
                },
                action: function (success, stats) {
                    if (success) {
                        stats.keys--;

                        if (Math.random() < 0.8) {

                            if (Math.random() < 0.8 * stats.luck) {
                                var money = Math.round(Math.random() * 5);
                                stats.money += money;
                                return "You have found " + money + " coins";
                            } else if (Math.random() < 0.6 * status.luck) {
                                var keys = Math.round(Math.random() * 2);
                                stats.keys += keys;
                                return "You have found " + keys + " keys";
                            } else {
                                stats.knowledge += 0.03;
                                return "The chest contained knowledge scroll. You are wiser.";
                            }

                        } else {
                            if (Math.random() > stats.luck) {
                                stats.health -= 0.03;
                                return "The chest released poisonous gas. You feel sick";
                            } else {
                                stats.money += 1;
                                return "You have found a single coin."
                            }
                        }

                    } else {
                        return "You do not have a key to unlock the chest"
                    }
                }
            },
            {
                title: "Ignore the chest not knowing what is holding",
                chance: 1,
                action: function (success, stats) {
                    return "You leave the chest behind";
                }
            }
        ]
    }

];