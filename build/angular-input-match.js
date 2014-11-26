/*!
 * angular-input-match
 * Checks if one input matches another
 * @version v1.0.0
 * @link https://github.com/TheSharpieOne/angular-input-match
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, angular, undefined){'use strict';

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
})(window, window.angular);