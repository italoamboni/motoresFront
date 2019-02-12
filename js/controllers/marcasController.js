angular.module("app").controller("marcasController", function ($scope, marcasAPI) {
    
    $scope.tituloApp = "Lista de Marcas de Motores";
    $scope.marcas = [];
    var carregarMarcas = function () {
        marcasAPI.getMarcas()
            .then(function (response) {
                $scope.marcas = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.adicionarMarca = function (marca) {
        var novaMarca = angular.copy(marca);
        marcasAPI.salvarMarca(novaMarca)
            .then(function (response) {
                delete $scope.marca;
                $scope.marcaForm.$setPristine();
                carregarMarcas();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.removerMarca = function (marcaParaRemover) {
        if (!confirm('Deseja realmente excluir?')) {
            return;
        };
        marcasAPI.removerMarca(marcaParaRemover)
            .then(function (response) {
                carregarMarcas();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.editarMarca = function (marcaParaEditar) {
        $scope.marca = angular.copy(marcaParaEditar);
    };

    $scope.temMarcaSelecionado = function (marcas) {
        return marcas.some(function (item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function (nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarMarcas();

});