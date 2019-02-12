angular.module("app").controller("funcionariosController", function ($scope, funcionariosAPI) {
    
    $scope.tituloApp = "Lista dos Funcionários";
    $scope.funcionarios = [];
    var carregarFuncionarios = function () {
        funcionariosAPI.getFuncionarios()
            .then(function (response) {
                $scope.funcionarios = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };
    $scope.adicionarFuncionario = function (funcionario) {
        var novoFuncionario = angular.copy(funcionario);
        funcionariosAPI.salvarFuncionario(novoFuncionario)
            .then(function (response) {
                delete $scope.funcionario;
                $scope.funcionarioForm.$setPristine();
                carregarFuncionarios();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.editarFuncionario = function (funcionarioParaEditar) {
        $scope.funcionario = angular.copy(funcionarioParaEditar);
    };
    $scope.temFuncionarioSelecionado = function (funcionarios) {
        return funcionarios.some(function (item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function (nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarFuncionarios();

});