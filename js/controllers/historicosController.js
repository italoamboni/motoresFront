angular.module("app").controller("historicosController", function ($scope, historicosAPI, funcionariosAPI, motoresAPI) {
    
    $scope.tituloApp = "Lista de Históricos";
    
    $scope.historicos = [];
    var carregarHistoricos = function () {
        historicosAPI.getHistoricos()
            .then(function (response) {
                $scope.historicos = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.funcionarios = [];
    var carregarFuncionarios = function () {
        funcionariosAPI.getFuncionarios()
            .then(function (response) {
                $scope.funcionarios = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = mensagem;
            });
    };
    $scope.motores = [];
    var carregarMotores = function () {
        motoresAPI.getMotores()
            .then(function (response) {
                $scope.motores = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = mensagem;
            });
    };

    $scope.adicionarHistorico = function (historico) {
        var novoHistorico = angular.copy(historico);
        historicosAPI.salvarHistorico(novoHistorico)
            .then(function (response) {
                delete $scope.historico;
                $scope.historicoForm.$setPristine();
                carregarHistoricos();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };
    $scope.removerHistorico = function (historicoParaRemover) {
        if (!confirm('Deseja realmente excluir?')) {
            return;
        };
        historicosAPI.removerHistorico(historicoParaRemover)
            .then(function (response) {
                carregarHistoricos();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };
    $scope.editarHistorico = function (historicoParaEditar) {
        $scope.historico = angular.copy(historicoParaEditar);
    };
    $scope.temHistoricoSelecionado = function (historicos) {
        return historico.some(function (item) {
            return item.selecionado;
        });
    };
    
    $scope.editarHistorico = function (historicoParaEditar) {
        $scope.historico = angular.copy(historicoParaEditar);
    };
    
    $scope.editarHistorico = function(historicoParaEditar) {
        $scope.historico = angular.copy(historicoParaEditar);
        $scope.historico.dataFato = convertData(historicoParaEditar.dataFato);
    };

    var convertData = function(dataLong) {
        if (!dataLong) {
            return;
        }
        return new Date(dataLong);
    } 

    $scope.ordenarPor = function (nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarHistoricos();
    carregarFuncionarios();
    carregarMotores();
});

