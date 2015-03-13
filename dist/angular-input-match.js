/*!
 * angular-input-match
 * Checks if one input matches another
 * @version v1.4.1
 * @link https://github.com/TheSharpieOne/angular-input-match
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, angular, undefined){'use strict';

angular.module('validation.match', []);

angular.module('validation.match').directive('match', match);

function match ($parse) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            if(!ctrl) {
                if(console && console.warn){
                    console.warn('Match validation requires ngModel to be on the element');
                }
                return;
            }

            var matchGetter = $parse(attrs.match);

            scope.$watch(getMatchValue, function(){
                ctrl.$$parseAndValidate();
            });

            ctrl.$validators.match = function(){
                return ctrl.$viewValue === getMatchValue();
            };

            function getMatchValue(){
                var match = matchGetter(scope);
                if(angular.isObject(match) && match.hasOwnProperty('$viewValue')){
                    match = match.$viewValue;
                }
                return match;
            }
        }
    };
}
match.$inject = ["$parse"];
})(window, window.angular);