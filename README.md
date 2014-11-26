angular-input-match
===================

Checks if one input matches another.  Useful for confirming passwords, emails, or anything.

The "data-match" attribute should be set equal to the ng-model value of the field to match.

**Demo:** http://jsfiddle.net/TheSharpieOne/Wnv8u/

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
