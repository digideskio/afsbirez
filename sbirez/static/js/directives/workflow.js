'use strict';

angular.module('sbirezApp').directive('workflow', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      includeSidebar: '@',
      includeMetro: '@',
      proposalId: '@'
    },
    templateUrl: 'static/views/partials/workflow.html',
    controller: ['$scope', '$http', '$q', '$stateParams', '$location', 'ProposalService', 'ValidationService',
      function ($scope, $http, $q, $stateParams, $location, ProposalService, ValidationService) {

        //$scope.workflows = [];
        $scope.currentWorkflow = {};
        //$scope.parentWorkflow = null;
        $scope.startingWorkflow = null;
        $scope.backWorkflow = null;
        $scope.nextWorkflow = null;
        $scope.proposalData = {};
        $scope.validationData = {};

        $scope.jumpTo = function(workflow_id) {
          var data = ProposalService.getWorkflow(workflow_id);
          $scope.currentWorkflow = data.current;
          $scope.backWorkflow = data.previous;
          $scope.nextWorkflow = data.next;
          $location.search('current', workflow_id);
        };

        ProposalService.load(parseInt($scope.proposalId)).then(function() {
          $scope.jumpTo($stateParams.current !== null ? $stateParams.current : null);
        });

        $scope.showBackButton = function() {
          return $scope.backWorkflow !== null;
        };

        $scope.showNextButton = function() {
          return $scope.nextWorkflow !== null;
        };

        $scope.saveData = function() {
          ProposalService.saveData();
        };

        $scope.validate = function() {
        ProposalService.validate();
        //  $scope.validationData = {};
        //  var response = ValidationService.validate($scope.currentWorkflow, $scope.proposalData, $scope.validationData, false);
        };
      }
    ]
  };
});
