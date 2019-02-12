angular.module("app").factory("manutencoesAPI", function ($http, configAPI) {
    var _getManutencoes = function () {
        return $http.get(configAPI.resourceManutencoes);
    };

    var _salvarManutencao = function (manutencao) {
        if (!!manutencao.idManutencao) {
            return $http.put(configAPI.resourceManutencoes, manutencao)
        }
        return $http.post(configAPI.resourceManutencoes, manutencao);
    };

    var _removerManutencao = function (manutencaoParaRemover) {
        var url = configAPI.resourceManutencoes + "/" + manutencaoParaRemover.idManutencao;
        return $http.delete(url);
    }

    return {
        getManutencoes: _getManutencoes,
        salvarManutencao: _salvarManutencao,
        removerManutencao: _removerManutencao
    };

});