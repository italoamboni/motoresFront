angular.module("app").factory("marcasAPI", function($http, configAPI){
    var _getMarcas = function(){
        return $http.get(configAPI.resourceMarcas);
    };
    var _salvarMarca = function(marca) {
        if (!!marca.idMarca) {
            return $http.put(configAPI.resourceMarcas,marca)
        }
        return $http.post(configAPI.resourceMarcas,marca);
    };

    var _removerMarca = function(marcaParaRemover) {
        var url = configAPI.resourceMarcas + "/" + marcaParaRemover.idMarca;
        return $http.delete(url);
    }
    return {
        getMarcas: _getMarcas,
        salvarMarca: _salvarMarca,
        removerMarca: _removerMarca
    };
});