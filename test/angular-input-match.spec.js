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

        var validTemplate = '<input ng-model="confirmation" match="original"></input>';

        describe('configuration:', function() {

            it('does not throw when no ngModel controller is found', function() {
                var naTemplate = '<div match="original"></div>';
                compiled = $compile(naTemplate)($scope);
                $scope.$digest();
            });


            it('is limited to attribute invocation', function() {
                var spy = sinon.spy($scope, '$watch'),
                naTemplates = [
                '<div class="match"></div>',
                '<match></match>'
                ];

                for (var i = 0; i < naTemplates.length; i++) {
                    compiled = $compile(naTemplates[i])($scope);
                    $scope.$digest();
                    expect(spy).to.have.been.not.called;
                }
            });

        });


        describe('behavior:', function() {

            it('returns true if no model value has been defined', function() {
                compiled = $compile(validTemplate)($scope);
                expect($scope.confirmation).to.be.undefined();
                $scope.$digest();
                expect(compiled.hasClass('ng-valid')).to.be.true();
            });


            it('returns true if $modelValue are identical', function() {
                $scope.confirmation = "value";
                compiled = $compile(validTemplate)($scope);
                $scope.original = "value";
                $scope.$digest();
                expect(compiled.hasClass('ng-valid')).to.be.true();
            });

            it('returns false if $modelValue are not identical', function() {
                $scope.confirmation = false;
                $scope.original = undefined;
                compiled = $compile(validTemplate)($scope);
                $scope.$digest();
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
                '<input type="text" match="form.test" ng-model="testConfirm" name="testConfirm"></input>' +
                '</form>'
            );
            $scope.test = inputValue;
            $compile(element)($scope);
            $scope.$digest();
            form = $scope.form;
        });

        it('should check if $viewValues are identical', function() {
            form.testConfirm.$setViewValue(inputValue);
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.undefined();
        });

        it('should check if $viewValues are not identical', function() {
            form.testConfirm.$setViewValue(inputValue + 'falseValue');
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.true();
        });

        it('should set $modelValue undefined if $viewValues are not identical', function() {
            form.testConfirm.$setViewValue(inputValue + 'falseValue');
            $scope.$digest();
            expect(form.testConfirm.$modelValue).to.be.undefined();
        });

    });

    describe('caseless validation', function() {

      describe('behavior:', function() {
        var validTemplate = '<input ng-model="confirmation" match="original" match-caseless="true"></input>';

          it('returns true if no model value has been defined', function() {
              compiled = $compile(validTemplate)($scope);
              expect($scope.confirmation).to.be.undefined();
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.true();
          });


          it('returns true if $modelValue are identical', function() {
              $scope.confirmation = "value";
              compiled = $compile(validTemplate)($scope);
              $scope.original = "value";
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.true();
          });

          it('returns true if $modelValue are not identical but match caselessly', function() {
              $scope.confirmation = "VALUE";
              compiled = $compile(validTemplate)($scope);
              $scope.original = "value";
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.true();
          });

          it('returns false if $modelValue are not identical', function() {
              $scope.confirmation = false;
              $scope.original = undefined;
              compiled = $compile(validTemplate)($scope);
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.false();
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
                '<input type="text" match="form.test" match-caseless="true" ng-model="testConfirm" name="testConfirm"></input>' +
                '</form>'
            );
            $scope.test = inputValue;
            $compile(element)($scope);
            $scope.$digest();
            form = $scope.form;
        });

        it('should check if $viewValues are identical', function() {
            form.testConfirm.$setViewValue(inputValue);
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.undefined();
        });

        it('should check if $viewValues are not identical but match caselessly', function() {
            form.testConfirm.$setViewValue(inputValue.toUpperCase());
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.undefined();
        });

        it('should check if $viewValues are not identical', function() {
            form.testConfirm.$setViewValue(inputValue+'extra');
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.true();
        });

      });

    });

    describe('not-match validation', function() {

      describe('behavior:', function() {
        var validTemplate = '<input ng-model="confirmation" match="original" not-match="true"></input>';

          it('returns true if no model value has been defined', function() {
              compiled = $compile(validTemplate)($scope);
              expect($scope.confirmation).to.be.undefined();
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.false();
          });


          it('returns true if $modelValue are identical', function() {
              $scope.confirmation = "value";
              compiled = $compile(validTemplate)($scope);
              $scope.original = "value";
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.false();
          });

          it('returns true if $modelValue are not identical but match caselessly', function() {
              $scope.confirmation = "VALUE";
              compiled = $compile(validTemplate)($scope);
              $scope.original = "value";
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.true();
          });

          it('returns false if $modelValue are not identical', function() {
              $scope.confirmation = false;
              $scope.original = undefined;
              compiled = $compile(validTemplate)($scope);
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.true();
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
                '<input type="text" match="form.test" not-match="true" ng-model="testConfirm" name="testConfirm"></input>' +
                '</form>'
            );
            $scope.test = inputValue;
            $compile(element)($scope);
            $scope.$digest();
            form = $scope.form;
        });

        it('should check if $viewValues are identical', function() {
            form.testConfirm.$setViewValue(inputValue);
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.true();
        });

        it('should check if $viewValues are not identical', function() {
            form.testConfirm.$setViewValue(inputValue.toUpperCase());
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.undefined();
        });

        it('should check if $viewValues are not identical', function() {
            form.testConfirm.$setViewValue(inputValue+'extra');
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.undefined();
        });

      });

    });

    describe('not-match with caseless validation', function() {

      describe('behavior:', function() {
        var validTemplate = '<input ng-model="confirmation" match="original" match-caseless="true" not-match="true"></input>';

          it('returns true if no model value has been defined', function() {
              compiled = $compile(validTemplate)($scope);
              expect($scope.confirmation).to.be.undefined();
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.false();
          });


          it('returns true if $modelValue are identical', function() {
              $scope.confirmation = "value";
              compiled = $compile(validTemplate)($scope);
              $scope.original = "value";
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.false();
          });

          it('returns true if $modelValue are not identical but match caselessly', function() {
              $scope.confirmation = "VALUE";
              compiled = $compile(validTemplate)($scope);
              $scope.original = "value";
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.false();
          });

          it('returns false if $modelValue are not identical', function() {
              $scope.confirmation = false;
              $scope.original = undefined;
              compiled = $compile(validTemplate)($scope);
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.true();
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
                '<input type="text" match="form.test" match-caseless="true" not-match="true" ng-model="testConfirm" name="testConfirm"></input>' +
                '</form>'
            );
            $scope.test = inputValue;
            $compile(element)($scope);
            $scope.$digest();
            form = $scope.form;
        });

        it('should check if $viewValues are identical', function() {
            form.testConfirm.$setViewValue(inputValue);
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.true();
        });

        it('should check if $viewValues are not identical but match caselessly', function() {
            form.testConfirm.$setViewValue(inputValue.toUpperCase());
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.true();
        });

        it('should check if $viewValues are not identical', function() {
            form.testConfirm.$setViewValue(inputValue+'extra');
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.undefined();
        });

      });

    });

    describe('non-text validation', function() {

      describe('behavior:', function() {
        var validTemplate = '<input ng-model="confirmation" type="number" match="original"></input>';

          it('returns true if no model value has been defined', function() {
              compiled = $compile(validTemplate)($scope);
              expect($scope.confirmation).to.be.undefined();
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.true();
          });


          it('returns true if $modelValue are identical', function() {
              $scope.confirmation = 1;
              compiled = $compile(validTemplate)($scope);
              $scope.original = 1;
              $scope.$digest();
              expect(compiled.hasClass('ng-valid')).to.be.true();
          });

          it('returns false if $modelValue are a different type', function() {
              $scope.confirmation = 1;
              $scope.original = "1";
              compiled = $compile(validTemplate)($scope);
              $scope.$digest();
              expect(compiled.hasClass('ng-invalid')).to.be.true();
          });

      });


      describe('Form level validation', function() {
        var form,
        element,
        inputValue = -102;

        beforeEach(function() {
            element = angular.element(
                '<form name="form">' +
                '<input type="number" ng-model="test" name="test"></input>' +
                '<input type="number" match="test" ng-model="testConfirm" name="testConfirm"></input>' +
                '</form>'
            );
            $scope.test = inputValue;
            $compile(element)($scope);
            $scope.$digest();
            form = $scope.form;
        });

        it('should check if values are identical', function() {
            form.testConfirm.$setViewValue(inputValue);
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.undefined();
        });

        it('should check if values are not identical', function() {
            form.testConfirm.$setViewValue(inputValue+1);
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.true();
        });

        it('should check if values are not identical because of different types', function() {
            form.test.$setViewValue(inputValue+"string");
            form.testConfirm.$setViewValue(inputValue);
            $scope.$digest();
            expect(form.testConfirm.$error.match).to.be.true();
        });

      });

    });
});
