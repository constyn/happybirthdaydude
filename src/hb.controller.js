angular.module('hb').controller("MainController", MainController);

MainController.$inject = ['$scope', '$timeout'];

function num(val) {
    return Math.round(val * 100) / 100;
}

var stats = _.clone(initialStats);
var fadeIn = 200;
var fadeOut = 100;
var isResult = false;


//window.localStorage.clear();

var localStats = window.localStorage.getItem('stats');
if (localStats) {
    stats = _.extend(stats, JSON.parse(localStats));
}


function MainController($scope, $timeout) {

    var event;

    $(".days").hide();
    $(".detail").hide();

    function checkIfPassed(chance) {
        var result;
        if (typeof chance === "function") {
            result = chance(stats);
        } else {
            result = chance;
        }
        return Math.random() < result;
    }

    //Because of the seed we need to "restore" the randomness progress
    for (var i = 0; i < stats.progress * 500; i++) {
        Math.random();
    }
    var isIntro = false;

    function tick() {
        if (stats.progress == 0) {
            $scope.result = pickFrom(messages);
            $('#result').modal('show');
            isIntro = true;
        }
        console.log("----------[ Tick ]-----------");
        window.localStorage.setItem('stats', JSON.stringify(stats));
        event = undefined;

        var days = 0;
        while (event === undefined) {
            try {
                var eventPool = events[stats.location];
                var random = eventPool[Math.round(Math.random() * eventPool.length)];

                if (random && checkIfPassed(random.chance)) {
                    event = random;
                }
            } catch (e) {
                if (days > 5000) {
                    stats.location = 0;
                }
            }

            days++;
        }

        $scope.event = event;
        $scope.days = days;
        stats.age += days;
        stats.progress += days / 500;

        $('.detail').fadeIn(fadeIn);

    }

    $scope.getItem = function () {
        return " background-image: url('assets/items/" + event.item + "')";
    };

    $scope.getOptionClass = function () {
        if ($scope.event) {
            return 'col-xs-12 col-sm-' + (12 / $scope.event.options.length);
        }
    };

    $scope.getTitle = function (option) {
        if (option && option.title) {
            return option.title.split(';');
        } else {
            return "";
        }
    };

    $scope.select = function (option) {
        $scope.result = undefined;
        if (typeof option.action === 'function') {
            $scope.result = option.action(checkIfPassed(option.chance), stats);
        } else {
            $scope.result = option.action;
        }
        isResult = true;
        if (stats.health > 0) {
            $('#result').modal('show');
            $('.detail').fadeOut(200);
        } else {
            if ($scope.result !== undefined) {
                $scope.killMessage = $scope.result;
            } else {
                $scope.killMessage = "This is the end of our hero!";
            }
            $("#killed").modal('show');
            restartLogic();
        }


        correctStats(stats);
    };

    window.onkeyup = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        var val = key - 48;
        if (isResult) {
            $('#result').modal('hide');
        } else if (val - 2 < $scope.event.options.length && $scope.event.options[val - 1]) {
            $timeout(function () {
                $scope.select($scope.event.options[val - 1]);
            });
        } else if (val === 35) {
            $scope.showStats();
        } else if (val === -21) {
            if ($('#status').css('display') !== 'none') {
                $('#status').modal('hide');
            }
        } else if (val == 30) {
            $timeout(function () {
                tick();
            });
        } else {
            console.log("Typed: ", val);
        }
    };


    $scope.getBackground = function () {
        if (event) {
            return "background: url('assets/backgrounds/" + event.background + "') no-repeat center center fixed;" +
                "  -webkit-background-size: cover;" +
                "-moz-background-size: cover;" +
                "-o-background-size: cover;" +
                "background-size: cover;" +
                "margin-top: 5px;";

        }
    };

    $scope.showStats = function () {
        $('#status').modal('show');
    };

    $scope.restart = function (bool) {
        if (bool === undefined) {
            $('#restart').modal('show');
        } else {
            restartLogic();
        }
    };

    function restartLogic() {
        window.localStorage.clear();
        prepareSeed(true);
        stats = _.clone(initialStats);
    }

    $scope.getStatKeys = function () {
        return _.keys(stats).filter(function (item) {
            return (["currentLocation", "location", "items", "age", "money", "boss", "keys"].indexOf(item) === -1);
        });
    };

    $scope.getStat = function (item) {
        return num(stats[item]);
    };

    $scope.rawStat = function (item) {
        return stats[item];
    };

    $scope.getProgress = function () {
        var val = Math.round(stats.progress * 100);
        if (val > 100) val = 100;
        if (val < 0) val = 0;
        return val;
    };


    tick();

    $(document).on('hidden.bs.modal', function (evt) {

        $timeout(function () {
            isResult = false;
            if ($(evt.target).attr('id') !== "status") {
                tick();
            }
        }, 10);
    });


}