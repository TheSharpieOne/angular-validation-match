/*!
 * angular-validation-match
 * Checks if one input matches another
 * @version v1.6.0
 * @link https://github.com/TheSharpieOne/angular-validation-match
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
            var caselessGetter = $parse(attrs.matchCaseless);
            var noMatchGetter = $parse(attrs.notMatch);

            scope.$watch(getMatchValue, function(){
                ctrl.$$parseAndValidate();
            });

            ctrl.$validators.match = function(){
              var match = getMatchValue();
              var notMatch = noMatchGetter(scope);
              var value;

              if(caselessGetter(scope)){
                value = angular.lowercase(ctrl.$viewValue) === angular.lowercase(match);
              }else{
                value = ctrl.$viewValue === match;
              }
              value ^= notMatch;
              return !!value;
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