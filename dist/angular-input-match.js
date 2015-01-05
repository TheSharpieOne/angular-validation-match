/*!
 * angular-input-match
 * Checks if one input matches another
 * @version v1.3.0
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
            var modelSetter = $parse(attrs.ngModel).assign;

            scope.$watch(getMatchValue, function(){
                modelSetter(scope, parser(ctrl.$viewValue));
            });

            ctrl.$parsers.unshift(parser);
            ctrl.$formatters.unshift(formatter);

            function parser(viewValue){
                if(viewValue === getMatchValue()){
                    ctrl.$setValidity('match', true);
                    return viewValue;
                }else{
                    ctrl.$setValidity('match', false);
                    return undefined;
                }
            }

            function formatter(modelValue){
                return modelValue === undefined? ctrl.$isEmpty(ctrl.$viewValue)? undefined : ctrl.$viewValue : modelValue;
            }

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