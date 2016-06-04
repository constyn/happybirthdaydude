var generic = [];

function teleporterChance(chance) {
    return function (stats) {
        return stats.progress > 0.9 ? stats.progress : chance;
    }
}

var teleporters = [
    {
        title: "You have found The T.A.R.D.I.S",
        background: "road.jpg",
        item: "tardis.png",
        chance: teleporterChance(0.005),
        options: [
            {
                title: "Go inside and see whatever lies beyond",
                chance: 1,
                action: function (success, stats) {
                    stats.progress = 0;
                    stats.location = Math.round(Math.random() * _.keys(events).length);
                    return "You have reached " + locationNames[stats.location];
                }
            },
            {
                title: "Avoid it - you will never know what creatures might wait to devour you",
                chance: 1,
                action: function (success, stats) {
                    return "You are not worthy to play this game"
                }
            }
        ]
    }
];


var all = [
    {
        title: "You are sick, hungry and in search of food. You found an odd mushroom",
        background: "forest_down_up.png",
        item: "mushroomie.gif",
        chance: function (stats) {
            return (1 - stats.health) * 0.6
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
                    return "You are still hungry. Probably the shroom was good."
                }
            }
        ]

    },
    {
        title: "You feel tired.",
        background: "zen_garden.png",
        item: "sleep.gif",
        chance: function (stats) {
            return (1 - stats.health) * 0.5;
        },
        options: [
            {
                title: "Take a nap",
                chance: 0.1, //chance to have a croak dream
                action: function (success, stats) {
                    if (success) {
                        stats.location = 1; //dreamland
                        return "You fell into a deep sleep and you start dreaming";
                    } else {
                        stats.health += 0.03;
                        return "You had a good sleep - you feel better";
                    }
                }
            },
            {
                title: "Try to stay awake",
                chance: function (stats) {
                    return 1.2 * stats.health;
                },
                action: function (success, stats) {
                    if (success) {
                        return "You skip this one - you have the necessary energy to continue.";
                    } else {
                        stats.health -= 0.02;
                        return "You are feeling exhaustes. Probably you have had taken a nap.";
                    }
                }
            }
        ]
    },

    {
        title: "You stumbled over a random book. It is covered in mysterious (evil) writings",
        background: "cave2.png",
        item: "book_anim.gif",
        chance: 0.02,
        options: [
            {
                title: "Open the book",
                chance: function (stats) {
                    return stats.evil;
                },
                action: function (success, stats) {
                    if (success) {
                        stats.evil += 0.09;
                        return "The power of evil is overwhelming!"
                    } else {
                        stats.happyness -= 0.1;
                        return "The evil in the book affected your happyness."
                    }
                }
            },
            {
                title: "Ignore",
                chance: 1,
                action: function (success, stats) {
                    return "You are still wondering what evil lied in the content of the book";
                }
            }
        ]

    },
    {
        title: "You stumbled upon a library. There is a huge amount of books - you decide to have a look",
        background: "library.jpg",
        item: "book_anim.gif",
        chance: function (stats) {
            return stats.knowledge * 0.2;
        },
        options: [
            {
                title: "Science for beginners",
                chance: 0.8,
                action: function (success, stats) {
                    if (success) {
                        stats.knowledge += 0.07;
                        return "The more you know";
                    } else {
                        stats.happyness -= 0.01;
                        stats.esteem -= 0.02;
                        return "You were not able to understand a thing."
                    }
                }
            },
            {
                title: "History",
                chance: 1,
                action: function (success, stats) {
                    stats.knowledge += 0.01;
                    return "Now you know more about your acenstors"
                }
            },
            {
                title: "Black Magic",
                chance: 1,
                action: function (success, stats) {
                    stats.evil += 0.02;
                    return "You feel the rage growing";
                }
            }
        ]
    },

    {
        title: "You are walking through the woods. Suddenly you have found a wallet with 10 coins",
        background: "road.jpg",
        item: "wallet.png",
        chance: function (stats) {
            return 0.01 * stats.luck;
        },
        options: [
            {
                title: "Keep the money but you loose a little bit of self esteem",
                chance: 1,
                action: function (success, stats) {
                    stats.esteem -= 0.05;
                    stats.money += 10;
                    return "You lost your self esteem but at least you are richer."
                }
            },
            {
                title: "Try to find the owner and give back the money",
                chance: function (stats) {
                    return 0.5 * stats.luck;
                },
                action: function (success, stats) {
                    if (success) {
                        var repay = Math.round(Math.random() * 3);
                        stats.money += repay;
                        return "The owner is happy and it repaid you with " + repay + " money";
                    } else {
                        stats.money += 10;
                        return "You were not able to find the owner so you keep the money and self esteem";
                    }
                }
            }
        ]
    },
    {
        title: "You caught the flu.",
        background: "hospital.gif",
        item: "virus.png",
        chance: function (stats) {
            return 0.1 * (1 - stats.health);
        },
        options: [
            {
                title: "Pay 3 coins for the medicine",
                chance: 1,
                action: function (success, stats) {
                    if (stats.money > 3) {
                        stats.money--;
                        if (Math.random() < 0.95) {
                            return "You are healed with no side effects";
                        } else {
                            stats.health -= 0.05;
                            return "The medicine were no good. You are still feeling bad";
                        }
                    } else {
                        if (Math.random() < stats.luck) {
                            return "You cannot afford it but luckily it was just a simple cold";
                        } else {
                            stats.health -= 0.05;
                            return "You cannot afford it and the flu left a scar on your body";
                        }
                    }
                }
            },
            {
                title: "Let the immune system fight for it",
                chance: 1,
                action: function (success, stats) {
                    if (Math.random() < stats.health) {
                        return "Your immune system manage to kill the virus";
                    } else {
                        stats.health -= 0.05;
                        return "Your health is not good";
                    }
                }

            }
        ]
    }

];