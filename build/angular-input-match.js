/*!
 * angular-input-match
 * Checks if one input matches another
 * @version v1.2.0
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

            scope.$watch(attrs.match, function(){
                modelSetter(scope, parser(ctrl.$viewValue));
            });

            ctrl.$parsers.unshift(parser);
            ctrl.$formatters.unshift(formatter);

            function parser(viewValue){
                if((ctrl.$pristine && ctrl.$isEmpty(viewValue)) || viewValue === matchGetter(scope)){
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
        }
    };
}
match.$inject = ["$parse"];
})(window, window.angular);