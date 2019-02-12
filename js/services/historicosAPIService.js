angular.module("app").factory("historicosAPI", function ($http, configAPI) {
    var _getHistoricos = function () {
        return $http.get(configAPI.resourceHistoricos);
    };

    var _salvarHistorico = function (historico) {
        if (!!historico.idHistorico) {
            return $http.put(configAPI.resourceHistoricos, historico)
        }
        return $http.post(configAPI.resourceHistoricos, historico);
    };

    var _removerHistorico = function (historicoParaRemover) {
        var url = configAPI.resourceHistoricos + "/" + historicoParaRemover.idHistorico;
        return $http.delete(url);
    }

    return {
        getHistoricos: _getHistoricos,
        salvarHistorico: _salvarHistorico,
        removerHistorico: _removerHistorico
    }
});