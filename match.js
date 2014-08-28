    var app = angular.module('myApp', []);
    app.directive('match', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                match: '='
            },
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch('match', function(pass){
                    ctrl.$validate();
                });
                ctrl.$validators.match = function(modelValue){
                    return (ctrl.$pristine && (angular.isUndefined(modelValue) || modelValue === "")) || modelValue === scope.match;
                };
            }
        };
    });
