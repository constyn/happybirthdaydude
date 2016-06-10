var items = [
    {
        title: "You have found the gauntlet",
        background: "general/road.jpg",
        item: "collectables/the_gauntlet.png",
        chance: function (stats) {
            return hasItem(stats, 55) ? 0 : 0.005;
        },
        options: [
            {
                title: "Pick It up",
                chance: 1,
                action: function (success, stats) {
                    stats.items.push(55);
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
                    stats.items.push(55);
                    return "You leave the gauntlet behind - wondering how it would have been."
                }
            }]
    },
    {
        title: "My leader heard about your actions. He wants to speak with you",
        background: "general/zen_garden.png",
        item: "general/vase.gif",
        chance: function (stats) {
            return stats.progress > 0.95 && stats.boss === 0 ? 1 : 0;
        },
        options: [
            {
                title: "Show me the path to your leader!",
                chance: 1,
                action: function (success, stats) {
                    stats.boss = 1;
                    return "You are on your way to the leader!";
                }
            },
            {
                title: "I will wonder the area for a while",
                chance: 1,
                action: function (success, stats) {
                    return "The messenger follows you";
                }
            }]
    },
    {
        title: "The enchanted offers you a 50-50 choice",
        background: "general/pool_cave.png",
        item: "general/fogo.gif",
        chance: 0.02,
        options: [
            {
                title: "Accept the fire's offer",
                chance: 0.5,
                action: function (success, stats) {
                    if (success) {
                        return randomIncrease(0.08);
                    } else {
                        return randomDamage(0.05);
                    }
                }
            },
            {
                title: "Avoid the fire",
                chance: 1,
                action: "Probably for the best"
            }]
    },
    {
        title: "You have found a wishing orb!",
        background: "general/dungeon.png",
        item: "general/orb.png",
        chance: 0.05,
        options: generateOrbChances()
    },
    {
        title: "You found The Bag of Holding. A magical object that can hold everything inside of it. It pulls in everything around it.",
        background: "general/item_forest.png",
        item: "general/bagofholdings.png",
        chance: function (stats) {
            return 0.2 * stats.luck;
        },
        options: [
            {
                title: "Check what is inside of it",
                chance: function (stats) {
                    return 0.4 + stats.luck;
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
                        if (Math.random() < stats.luck) {
                            return "The bag contained a strange gas. " + randomDamage(0.04);
                        } else {
                            return "There is nothing inside it";
                        }

                    }
                }
            },
            {
                title: "Leave it alone",
                chance: 1,
                action: "Probably better! You never know what it might contain."
            }
        ]
    },
    {
        title: "You stumble upon an opened chest",
        background: "forest/forest_1.png",
        item: "general/chest.png",
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
        item: "general/chest.png",
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