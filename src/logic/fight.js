function fight(entity1, entity2) {
    var attacker = entity1;
    var defender = entity2;
    var turns = 0;
    while (attacker.health > 0 && defender.health > 0) {
        turn(attacker, defender);
        var buffer = attacker;
        attacker = defender;
        defender = buffer;
        turns++;
    }

    return turns;
}

function turn(attacker, defender) {

    if (Math.random() > defender.defence) {
        var attack = Math.round(Math.random() * attacker.attack * 100) / 100;
        defender.health -= attack;
    } else {
        //miss
    }
}

