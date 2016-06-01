var dreams = [
    {
        title: "You are having a croak dream. There is a chair an umbrella and some berries. The dream makes no sense",
        background: "dream1.jpg",
        item: "question.png",
        chance: 0.005,
        options: [
            {
                title: "Sit on the chair",
                chance: function (stats) {
                    return stats.esteem;
                },
                action: function (success, stats) {
                    if (success) {
                        stats.esteem += 0.1;
                        stats.luck += 0.05;
                        stats.health += 0.1;
                        stats.location = stats.currentLocation;
                        return "You wake up from the dream. More healthier, luckier and you feel confident."
                    } else {
                        stats.luck -= 0.02;
                        stats.happyness -= 0.01;
                        stats.location = stats.currentLocation;
                        return "You wake up from the dream. It made no sense, you feel unhappy."
                    }
                }
            },
            {
                title: "Eat the berries",
                chance: function (stats) {
                    return stats.luck;
                },
                action: function (success, stats) {
                    if (success) {
                        stats.health += 0.15;
                        stats.happyness += 0.01;
                        stats.location = stats.currentLocation;
                        return "You wake up from the dream. Healthier and more happy.";
                    } else {
                        stats.health -= 0.1;
                        stats.location = stats.currentLocation;
                        return "You wake up from the dream. You feel bad - probably you will die by poison."
                    }
                }
            },
            {
                title: "Try to wake up",
                chance: function (stats) {
                    return stats.knowledge;
                },
                action: function (success, stats) {
                    if (success) {
                        stats.location = stats.currentLocation;
                        return "You wake up from the dream. Nothing changed - what does this mean? Are you going to die?";
                    } else {
                        stats.health -= 0.05;
                        stats.location = stats.currentLocation;
                        return "You wake up from the dream. You feel sick - the croak dream meant something! What? Why?."
                    }
                }
            }
        ]
    }
];