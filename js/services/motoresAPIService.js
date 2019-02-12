angular.module("app").factory("motoresAPI", function ($http, configAPI) {
    var _getMotores = function () {
        return $http.get(configAPI.resourceMotores);
    };

    var _salvarMotor = function (motor) {
        if (!!motor.idMotor) {
            return $http.put(configAPI.resourceMotores, motor)
        }
        return $http.post(configAPI.resourceMotores, motor);
    };

    var _removerMotor = function (motor) {
        var url = configAPI.resourceMotores + "/" + motor.idMotor;
        return $http.delete(url);
    }

    return {
        getMotores: _getMotores,
        salvarMotor: _salvarMotor,
        removerMotor: _removerMotor
    }
});