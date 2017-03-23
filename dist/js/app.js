var ms = angular.module ('ms',["ui.router"])
    ms.config(function($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'app/views/home.html',
            abstract: true,
            views: {       
                    "header": {
                        templateUrl: "app/views/header.html"
                    },     
                    "content": {
                        template: "<div ui-view></div>"
                    },     
                    "footer": {
                        templateUrl: "app/views/footer.html"
                    }
                },
        })
        .state('home.content', {
            url: '/home',
            templateUrl: 'app/views/content.html',

        })
        .state('home.about', {
            url: '/about',
            templateUrl: 'app/views/about.html',

        })
        .state('home.price', {
            url: '/price',
            templateUrl: 'app/views/price.html',

        })
});
ms.controller('aboutController', function ($scope) {
    $scope.about = "Lorem ipsum...";
})
