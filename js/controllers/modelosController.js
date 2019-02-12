angular.module("app").controller("modelosController", function ($scope, modelosAPI) {
    $scope.tituloApp = "Lista dos Modelos de Carcaças de Motores";
    $scope.modelos = [];
    var carregarModelos = function () {
        modelosAPI.getModelos()
            .then(function (response) {
                $scope.modelos = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.adicionarModelo = function (modelo) {
        var novoModelo = angular.copy(modelo);
        modelosAPI.salvarModelo(novoModelo)
            .then(function (response) {
                delete $scope.modelo;
                $scope.modeloForm.$setPristine();
                carregarModelos();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.removerModelo = function (modeloParaRemover) {
        if (!confirm('Deseja realmente excluir?')) {
            return;
        };
        modelosAPI.removerModelo(modeloParaRemover)
            .then(function (response) {
                carregarModelos();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.editarModelo = function (modeloParaEditar) {
        $scope.modelo = angular.copy(modeloParaEditar);
    };

    $scope.temModeloSelecionado = function (modelos) {
        return modelos.some(function (item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function (nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarModelos();

});