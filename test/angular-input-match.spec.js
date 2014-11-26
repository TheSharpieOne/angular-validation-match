describe('Directives: validation - match', function() {

  var $scope,
    $compile,
    compiled;

  beforeEach(module('validation.match'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  describe('Directive level validation', function() {

    var validTemplate = '<div ng-model="confirmation" match="original"></div>';

    describe('configuration:', function() {

      it('does not throw when no ngModel controller is found', function() {
        var naTemplate = '<div match="original"></div>';
        compiled = $compile(naTemplate)($scope);
        $scope.$apply();
      });


      it('is limited to attribute invocation', function() {
        var spy = sinon.spy($scope, '$watch'),
          naTemplates = [
            '<div class="match"></div>',
            '<match></match>'
          ];

        for (var i = 0; i < naTemplates.length; i++) {
          compiled = $compile(naTemplates[i])($scope);
          $scope.$apply();
          expect(spy).to.have.been.not.called;
        }
      });

    });


    describe('behavior:', function() {

      it('returns true if the form is pristine and no model value has been defined', function() {
        compiled = $compile(validTemplate)($scope);
        expect($scope.confirmation).to.be.undefined();
        $scope.$apply();
        expect(compiled.hasClass('ng-valid')).to.be.true();
      });


      it('returns true if $modelValue defined and the match expression is equal to the $modelValue', function() {
        $scope.confirmation = false;
        compiled = $compile(validTemplate)($scope);
        $scope.$apply();
        expect(compiled.hasClass('ng-invalid')).to.be.true();

        $scope.original = false;
        $scope.$apply();
        expect(compiled.hasClass('ng-valid')).to.be.true();
      });


      it('returns false if $modelValue defined and the match expression is not equal to the $modelValue', function() {
        $scope.confirmation = false;
        $scope.original = undefined;
        compiled = $compile(validTemplate)($scope);
        $scope.$apply();
        expect(compiled.hasClass('ng-valid')).to.be.false();
      });

    });

  });

  describe('Form level validation', function() {

    var form,
      element,
      inputValue = 'testValue';

      beforeEach(function() {
        element = angular.element(
          '<form name="form">' +
          '<input type="text" ng-model="test" name="test"></input>' +
          '<input type="text" match="test" ng-model="testConfirm" name="testConfirm"></input>' +
          '</form>'
        );
        $scope.test = inputValue;
        $compile(element)($scope);
        $scope.$digest();
        form = $scope.form;
      });

    it('should check if variables are identical', function() {
      form.testConfirm.$setViewValue(inputValue);
      $scope.$digest();

      expect(form.testConfirm.$error.match).to.be.undefined();
    });

    it('should check if variables are not identical', function() {
      form.testConfirm.$setViewValue(inputValue + 'falseValue');
      $scope.$digest();

      expect(form.testConfirm.$error.match).to.be.true();
    });

  });
});
