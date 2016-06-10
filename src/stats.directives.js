angular.module('hb').directive("roundStat", RoundStats);

RoundStats.$inject = [];

function RoundStats() {
    return {
        restrict: 'A',
        template: '<svg class="stat"><circle r="25" cx="50" cy="50" style="stroke-dasharray: {{getStat()}} 100; "/></svg>{{getStat()}}',
        scope: {
            stat: '='
        },
        link: function ($scope, elem, attrs) {

            $scope.getStat = function() {
                return round(stats[$scope.stat])*100;
            }

        }
    }
}