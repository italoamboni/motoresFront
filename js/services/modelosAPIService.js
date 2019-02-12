angular.module("app").factory("modelosAPI", function($http, configAPI){
    var _getModelos = function(){
        return $http.get(configAPI.resourceModelos);
    };
    var _salvarModelo = function(modelo) {
        if (!!modelo.idModelo) {
            return $http.put(configAPI.resourceModelos,modelo)
        }
        return $http.post(configAPI.resourceModelos,modelo);
    };

    var _removerModelo = function(modeloParaRemover) {
        var url = configAPI.resourceModelos + "/" + modeloParaRemover.idModelo;
        return $http.delete(url);
    }
    return {
        getModelos: _getModelos,
        salvarModelo: _salvarModelo,
        removerModelo: _removerModelo
    };
});