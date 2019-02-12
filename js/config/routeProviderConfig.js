angular.module("app").config(AppConfig);

AppConfig.$inject = ['$routeProvider'];
function AppConfig($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'homeController'
    })
    .when('/marcas', {
        templateUrl: 'views/marcas.html',
        controller: 'marcasController'
    })
    .when('/modelos', {
        templateUrl: 'views/modelos.html',
        controller: 'modelosController'
    })
    .when('/motores', {
        templateUrl: 'views/motores.html',
        controller: 'motoresController'
    })
    .when('/funcionarios', {
        templateUrl: 'views/funcionarios.html',
        controller: 'funcionariosController'
    })
    .when('/manutencoes', {
        templateUrl: 'views/manutencoes.html',
        controller: 'manutencoesController'
    })
    .when('/historicos', {
        templateUrl: 'views/historicos.html',
        controller: 'historicosController'
    })

    .otherwise({redirectTo: "/"});

}