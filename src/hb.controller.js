angular.module('hb').controller("MainController", MainController);

MainController.$inject = ['$scope', '$timeout'];

function num(val) {
    return Math.round(val * 100) / 100;
}

var stats = _.clone(initialStats);
var fadeIn = 1400;
var fadeOut = 1000;
var isResult = false;

if (devMode) {
    fadeIn /= 100;
    fadeOut /= 100;
}

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
        var passed = Math.random() < result;
        if (passed) {
            console.log('passed with', result);
        }
        return passed;
    }

    function centerModals() {
        $timeout(function () {
            $('.modal').each(function (i) {
                var body = $(this).find('.modal-body');
                var top = Math.round(($(document.body).height() - body.height()) / 2);
                top = top > 0 ? top : 0;
                body.css("margin-top", top);
            });
        }, 10);
    }

    function tick() {
        console.log("----------[ Tick ]-----------");
        window.localStorage.setItem('stats', JSON.stringify(stats));
        var days = 0;
        while (event === undefined) {
            try {
                var eventPool = events[stats.location];
                var random = eventPool[Math.round(Math.random() * eventPool.length)];

                if (random && checkIfPassed(random.chance)) {
                    event = random;
                    console.log("Ticks:", days);
                    console.log("Event:", event);
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

        $(".days").fadeIn(fadeIn).fadeOut(fadeOut, function () {
            $('.detail').fadeIn(fadeIn / 7);
        });

    }

    $scope.getItem = function () {
        return " background-image: url('assets/items/" + event.item + "')";
    };

    $scope.getOptionClass = function () {
        if ($scope.event) {
            return 'col-xs-12 col-sm-' + (12 / $scope.event.options.length);
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
        }

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
            if ($('#stats').css('display') !== 'none') {
                $('#stats').modal('hide');
            }
        } else if (val == 30) {
            $timeout(function () {
                event = undefined;
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
                "margin-top: 30px;";

        }
    };

    $scope.showStats = function () {
        $('#stats').modal('show');
    };

    $scope.restart = function (bool) {
        if (bool === undefined) {
            $('#restart').modal('show');
        } else {
            window.localStorage.clear();
            stats = initialStats;
            event = undefined;
            tick();
        }
    };

    $scope.getStatKeys = function () {
        return _.keys(stats).filter(function (item) {
            return (item !== "currentLocation" && item !== "location" && item !== "items")
        });
    };

    $scope.getStat = function (item) {
        if (item === "age") {
            return Math.round(stats.age / 365);
        } else {
            return num(stats[item]);
        }
    };


    tick();
    $('#result').on('hidden.bs.modal', function () {
        event = undefined;
        $timeout(function () {
            isResult = false;
            tick();
        }, 10);
    });
    $(window).on('show.bs.modal', centerModals);


}