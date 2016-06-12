'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                $scope.tab = 1;
                $scope.filtText = '';
                $scope.showDetails = false;



                $scope.showMenu = false;
                $scope.message = "Loading ...";

//                $scope.dishes = menuFactory.getDishes().query();
                menuFactory.getDishes().query(
                        function (response) {
                            $scope.dishes = response;
                            $scope.showMenu = true;
                        },
                        function (response) {
                            $scope.message = "Error: " + response.status + " " + response.statusText;
                        });


                $scope.select = function (setTab) {
                    $scope.tab = setTab;

                    if (setTab === 2) {
                        $scope.filtText = "appetizer";
                    } else if (setTab === 3) {
                        $scope.filtText = "mains";
                    } else if (setTab === 4) {
                        $scope.filtText = "dessert";
                    } else {
                        $scope.filtText = "";
                    }
                };

                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.toggleDetails = function () {
                    $scope.showDetails = !$scope.showDetails;
                };
            }])

        .controller('ContactController', ['$scope', function ($scope) {

                $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

                var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

                $scope.channels = channels;
                $scope.invalidChannelSelection = false;

            }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory',function ($scope,feedbackFactory) {

                $scope.sendFeedback = function () {

                    console.log($scope.feedback);

                    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                            console.log('incorrect');
                    } else { //Correct

                    feedbackFactory.saveFeedback().save($scope.feedback);

                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                    $scope.feedback.mychannel = "";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                    }
                }
                ;
            }])

                .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
                        $scope.showDish = false;
                        $scope.message = "Loading ...";
                        $scope.dish = {};

//                $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
                        $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
                                .$promise.then(
                                        function (response) {
                                            $scope.dish = response;
                                            $scope.showDish = true;
                                        },
                                        function (response) {
                                            $scope.message = "Error: " + response.status + " " + response.statusText;
                                        }
                                );

                    }])

                .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                        $scope.feedback = {star: 5, comments: "", name: "", date: ""};

                        $scope.submitComment = function () {

                            $scope.feedback.date = new Date().toISOString();

                            $scope.dish.comments.push({rating: $scope.feedback.star, comment: $scope.feedback.comments, author: $scope.feedback.name, date: $scope.feedback.date});
                            //Update in the server
                            menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);//Update(id,data)

                            $scope.commentForm.$setPristine();

                            $scope.feedback = {rating: 5, comment: "", author: "", date: ""};
                        }
                    }])

                // implement the IndexController and About Controller here
                .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

//                DISH
                        $scope.showDish = false;
                        $scope.message = "Loading ...";
                        $scope.dish = {};

                        $scope.dish = menuFactory.getDishes().get({id: 0})
                                .$promise.then(
                                        function (response) {
                                            $scope.dish = response;
                                            $scope.showDish = true;
                                        },
                                        function (response) {
                                            $scope.message = "Error: " + response.status + " " + response.statusText;
                                        }
                                );

//                PROMOTION
                        $scope.showPromotion = false;
                        $scope.message2 = "Loading ...";
                        $scope.promotion = menuFactory.getPromotions().get({id: 0})
                                .$promise.then(
                                        function (response) {
                                            $scope.promotion = response;
                                            $scope.showPromotion = true;
                                        },
                                        function (response) {
                                            $scope.message2 = "Error: " + response.status + " " + response.statusText;
                                        }
                                );

//                LEADER
                        $scope.showLeader = false;
                        $scope.message3 = "Loading ...";
                        $scope.leader = corporateFactory.getLeaders().get({id: 3})
                                .$promise.then(
                                        function (response) {
                                            $scope.leader = response;
                                            $scope.showLeader = true;
                                        },
                                        function (response) {
                                            $scope.message3 = "Error: " + response.status + " " + response.statusText;
                                        }
                                );

                    }])

                .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

//                        $scope.corpfac = corporateFactory.getLeaders();

                        $scope.showLeaders = false;
                        $scope.message = "Loading ...";
                        $scope.corpfac = corporateFactory.getLeaders().query()
                                .$promise.then(
                                        function (response) {
                                            $scope.corpfac = response;
                                            $scope.showLeaders = true;
                                        },
                                        function (response) {
                                            $scope.message = "Error: " + response.status + " " + response.statusText;
                                        }
                                );
                    }])
                ;


