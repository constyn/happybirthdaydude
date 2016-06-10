var foods = [

    {
        title: "You have found a container full of \"Antinevralgic\"",
        background: "general/hospital.gif",
        item: "general/pills.png",
        chance: 0.08,
        options: [
            {
                title: "Pick and swallow",
                chance: 1,
                action: function (success, stats) {
                    stats.health += 0.1;
                    return "You feel AWESOME! You love Antinevralgic!";
                }
            },
            {
                title: "Leave it there. You will never know when you come back",
                chance: 1,
                action: function () {
                    return "You feel terrible for missing the opportunity"
                }
            }
        ]
    },
    {
        title: "You have found an apple",
        background: "forest/forest_6.jpg",
        item: "general/apple.png",
        chance: 0.1,
        options: [
            {
                title: "Pick it up. Hopefully is good",
                chance: 0.95,
                action: function (success, stats) {
                    if (success) {
                        stats.health += 0.02;
                        return "The apple was good. You feel better";
                    } else {
                        stats.happyness -= 0.01;
                        return "The apple was bad. You had great expectations - now you feel sad";
                    }
                }
            },
            {
                title: "Leave it on the ground",
                chance: 1,
                action: function () {
                    return "With this attitude you are going to starve";
                }
            }
        ]
    }

];