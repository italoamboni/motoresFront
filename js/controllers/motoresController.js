angular.module("app").controller("motoresController", function ($scope, motoresAPI, marcasAPI, modelosAPI) {
    $scope.tituloApp = "Lista de Motores Elétricos";
    
    $scope.motores = [];
    
    var carregarMotores = function () {
        motoresAPI.getMotores()
            .then(function (response) {
                $scope.motores = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
           
    };

    $scope.marcas = [];
    var carregarMarcas = function () {
        marcasAPI.getMarcas()
            .then(function (response) {
                $scope.marcas = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = mensagem;
            });
    };

    $scope.modelos = [];
    var carregarModelos = function () {
        modelosAPI.getModelos()
            .then(function (response) {
                $scope.modelos = response.data;
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = mensagem;
            });
    };
    
    $scope.adicionarMotor = function (motor) {
        var novoMotor = angular.copy(motor);
        motoresAPI.salvarMotor(novoMotor)
            .then(function (response) {
                delete $scope.motor;
                $scope.motorForm.$setPristine();
                carregarMotores();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };


    $scope.removerMotor = function (motor) {
        if (!confirm('Deseja realmente excluir?')) {
            return;
        };
        motoresAPI.removerMotor(motor)
            .then(function (response) {
                carregarMotores();
            })
            .catch(function (response) {
                var mensagem = "Ocorreu um erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.editarMotor = function (motorParaEditar) {
        $scope.motor = angular.copy(motorParaEditar);
    };
    $scope.temMotorSelecionado = function (motores) {
        return motores.some(function (item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function (nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarMarcas();
    carregarModelos();
    carregarMotores();

});