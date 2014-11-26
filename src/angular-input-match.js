'use strict';

angular.module('validation.match', []);

angular.module('validation.match').directive('match', match);

function match () {
    return {
        require: '?ngModel',
        restrict: 'A',
        scope: {
            match: '='
        },
        link: function(scope, elem, attrs, ctrl) {
            if(!ctrl) {
                console && console.warn('Match validation requires ngModel to be on the element');
                return;
            }

            scope.$watch(function() {
                var modelValue = angular.isUndefined(ctrl.$modelValue)? ctrl.$$invalidModelValue : ctrl.$modelValue;
                return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.match === modelValue;
            }, function(currentValue) {
                ctrl.$setValidity('match', currentValue);
            });
        }
    };
}
