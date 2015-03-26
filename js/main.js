
/**
 * AngularJS module to process a form.
 */
angular.module('landing', [])
    .controller('contact', function ($scope, $http, $log, $timeout) {

        // Inititate the promise tracker to track form submissions.

        // Form submit handler.
        $scope.submit = function (form) {
            // Trigger validation flag.
            $scope.submitted = true;

            // If form is invalid, return and let AngularJS show validation errors.
            if (form.$invalid) {
                return;
            }

            // Default values for the request.
            var config = {
                params: {
                    'callback': 'JSON_CALLBACK',
                    'name': $scope.name,
                    'email': $scope.email,
                    'company': $scope.company,
                    'comments': $scope.comments
                },
            };

            // Perform JSONP request.
            var send = $http.jsonp('response.json', config)
                .success(function (data, status, headers, config) {
                    if (data.status == 'OK') {
                        console.log(config);
                        $scope.name = null;
                        $scope.email = null;
                        $scope.company = null;
                        $scope.comments = null;
                        $scope.messages = 'Your form has been sent!';
                        $scope.submitted = false;
                    } else {
                        $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                        $log.error(data);
                    }
                })
                .error(function (data, status, headers, config) {
                    $scope.messages = 'There was a network error. Try again later.';
                    $log.error(data);
                })
                .finally(function () {
                    // Hide status messages after three seconds.
                    $timeout(function () {
                        $scope.messages = null;
                    }, 3000);
                });
        };
    });