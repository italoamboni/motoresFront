angular.module("app").controller("manutencoesController", function ($scope, manutencoesAPI, funcionariosAPI, motoresAPI) {
    $scope.tituloApp = "Lista de Manutenções";
    
    $scope.manutencoes = [];
    var carregarManutencoes = function () {
        manutencoesAPI.getManutencoes()
            .then(function (response) {
                $scope.manutencoes = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = mensagem;
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
    
    $scope.adicionarManutencao = function (manutencao) {
        var novaManutencao = angular.copy(manutencao);
        manutencoesAPI.salvarManutencao(novaManutencao)
            .then(function (response) {
                delete $scope.manutencao;
                $scope.manutencaoForm.$setPristine();
                carregarManutencoes();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.removerManutencao = function (manutencaoParaRemover) {
        if (!confirm('Deseja realmente excluir?')) {
            return;
        };
        manutencoesAPI.removerManutencao(manutencaoParaRemover)
            .then(function (response) {
                carregarManutencoes();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };
    
    $scope.editarManutencao = function (manutencaoParaEditar) {
        $scope.manutencao = angular.copy(manutencaoParaEditar);
    };
    
    $scope.temManutencaoSelecionada = function (manutencoes) {
        return manutencoes.some(function (item) {
            return item.selecionado;
        });
    };
    $scope.editarManutencao = function(manutencaoParaEditar) {
        $scope.manutencao = angular.copy(manutencaoParaEditar);
        $scope.manutencao.dataEntrada = convertData(manutencaoParaEditar.dataEntrada);
        $scope.manutencao.dataRetorno = convertData(manutencaoParaEditar.dataRetorno);
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

    carregarManutencoes();
    carregarFuncionarios();
    carregarMotores();
});