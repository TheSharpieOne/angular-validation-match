/*!
 * angular-validation-match
 * Checks if one input matches another
 * @version v1.5.1
 * @link https://github.com/TheSharpieOne/angular-validation-match
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */!function(a,b,c){"use strict";function d(a){return{require:"?ngModel",restrict:"A",link:function(c,d,e,f){function g(){var a=h(c);return b.isObject(a)&&a.hasOwnProperty("$viewValue")&&(a=a.$viewValue),a}if(!f)return void(console&&console.warn&&console.warn("Match validation requires ngModel to be on the element"));var h=a(e.match),i=a(e.matchCaseless);c.$watch(g,function(){f.$$parseAndValidate()}),f.$validators.match=function(){var a=g();return i(c)&&b.isString(a)&&b.isString(f.$viewValue)?f.$viewValue.toLowerCase()===a.toLowerCase():f.$viewValue===a}}}}b.module("validation.match",[]),b.module("validation.match").directive("match",d),d.$inject=["$parse"]}(window,window.angular);
