angular.module("app").factory("funcionariosAPI", function ($http, configAPI) {
    var _getfuncionarios = function () {
        return $http.get(configAPI.resourceFuncionarios);
    };

    var _salvarFuncionario = function (funcionario) {
        if (!!funcionario.idFuncionario) {
            return $http.put(configAPI.resourceFuncionarios, funcionario)
        }
        return $http.post(configAPI.resourceFuncionarios, funcionario);
    };

    return {
        getFuncionarios: _getfuncionarios,
        salvarFuncionario: _salvarFuncionario
    }
});