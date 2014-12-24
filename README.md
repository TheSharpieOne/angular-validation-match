[![Build Status](https://travis-ci.org/TheSharpieOne/angular-input-match.svg?branch=master)](https://travis-ci.org/TheSharpieOne/angular-input-match)
[![Code Climate](https://codeclimate.com/github/TheSharpieOne/angular-input-match/badges/gpa.svg)](https://codeclimate.com/github/TheSharpieOne/angular-input-match) [![Test Coverage](https://codeclimate.com/github/TheSharpieOne/angular-input-match/badges/coverage.svg)](https://codeclimate.com/github/TheSharpieOne/angular-input-match)
[![Coverage Status](https://coveralls.io/repos/TheSharpieOne/angular-input-match/badge.png)](https://coveralls.io/r/TheSharpieOne/angular-input-match)
[![Dependency Status](https://david-dm.org/thesharpieone/angular-input-match.svg?style=flat)](https://david-dm.org/thesharpieone/angular-input-match)
[![devDependency Status](https://david-dm.org/thesharpieone/angular-input-match/dev-status.svg?style=flat)](https://david-dm.org/thesharpieone/angular-input-match#info=devDependencies)

angular-input-match
===================

Checks if one input matches another.  Useful for confirming passwords, emails, or anything.

The "data-match" attribute should be set equal to the ng-model value of the field to match.

**Demo:** http://jsfiddle.net/TheSharpieOne/pojkkokc/

Installation
------------

`bower install angular-validation-match`

Then add `validation.match` to your angular dependencies

Usage
-----

**Simple Property Example using "data" prefix:**
```html
Password: <input ng-model="password" type="password" />
Confirm: <input ng-model="passwordConfirm" type="password" data-match="password" />
```

**Simple Property Example without "data" prefix:**
```html
Password: <input ng-model="password" type="password" />
Confirm: <input ng-model="passwordConfirm" type="password" match="password" />
```

**Object Property Example usign "data" prefix**
```html
Password: <input ng-model="user.password" type="password" />
Confirm: <input ng-model="user.passwordConfirm" type="password" data-match="user.password" />
```

**Object Property Example without "data" prefix**
```html
Password: <input ng-model="user.password" type="password" />
Confirm: <input ng-model="user.passwordConfirm" type="password" match="user.password" />
```

**Display Custom Error**<br>
If your form and field both are named, you can access the validation result to show/hide messages
```html
<form name="myForm">
  Password: <input ng-model="user.password" type="password" name="password" />
  Confirm: <input ng-model="user.passwordConfirm" type="password" data-match="user.password" name="myConfirmField" />
  <div ng-show="myForm.myConfirmField.$error.match">Fields do not match!</div>
</form>
```
