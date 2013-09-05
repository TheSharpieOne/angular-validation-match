    var app = angular.module('myApp', []);
    app.directive('match',['$parse', function ($parse) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    return (!angular.isDefined(ctrl.$modelValue)) || $parse(attrs.match)(scope) === ctrl.$modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('mismatch', currentValue);
                });
            }
        };
    }]);
