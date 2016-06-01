var items = [
    {
        title: "You stumble upon a journal",
        background: "road.jpg",
        item: "journal_3.jpeg",
        chance: function (stats) {
            if (stats.items.indexOf(JOURNAL3) === -1) {
                return 0.005 * stats.luck;
            } else {
                return 0;
            }
        },
        options: [
            {
                title: "Absorb journal knowledge.",
                chance: 1,
                action: function (success, stats) {
                    stats.knowledge += 0.2;
                    stats.happyness -= 0.01;
                    stats.items.push(JOURNAL3);
                    return "You absorbed the journal knowledge but you feel sad because you find out about the mysteries of the world";
                }
            },
            {
                title: "Ignore the journal. It might do you more bad than good",
                chance: 1,
                action: function (success, stats) {
                    stats.happyness -= 0.01;
                    return "You feel a little bad living the book behind";
                }
            }
        ]
    },
    {
        title: "You stumble upon a journal",
        background: "road.jpg",
        item: "journal_2.png",
        chance: function (stats) {
            if (stats.items.indexOf(JOURNAL2) === -1) {
                return 0.005 * stats.luck;
            } else {
                return 0;
            }
        },
        options: [
            {
                title: "Absorb journal knowledge.",
                chance: 1,
                action: function (success, stats) {
                    stats.knowledge += 0.25;
                    stats.happyness -= 0.02;
                    stats.items.push(JOURNAL2);
                    return "You absorbed the journal knowledge but you feel sad because you find out about the mysteries of the world";
                }
            },
            {
                title: "Ignore the journal. It might do you more bad than good",
                chance: 1,
                action: function (success, stats) {
                    stats.happyness -= 0.01;
                    return "You feel a little bad living the book behind";
                }
            }
        ]
    },
    {
        title: "You stumble upon a journal",
        background: "road.jpg",
        item: "journal_1.png",
        chance: function (stats) {
            if (stats.items.indexOf(JOURNAL1) === -1) {
                return 0.005 * stats.luck;
            } else {
                return 0;
            }
        },
        options: [
            {
                title: "Absorb journal knowledge.",
                chance: 1,
                action: function (success, stats) {
                    stats.knowledge += 0.2;
                    stats.happyness -= 0.05;
                    stats.items.push(JOURNAL1);
                    return "You absorbed the journal knowledge but you feel sad because you find out about the mysteries of the world";
                }
            },
            {
                title: "Ignore the journal. It might do you more bad than good",
                chance: 1,
                action: function (success, stats) {
                    stats.happyness -= 0.01;
                    return "You feel a little bad living the book behind";
                }
            }
        ]
    }
];