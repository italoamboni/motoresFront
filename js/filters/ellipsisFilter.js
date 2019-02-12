angular.module("app").filter("ellipsis", function() {
    return function(textoDeEntrada, tamanho) {
        if (textoDeEntrada.length <= (tamanho || 40)) return textoDeEntrada;
        return textoDeEntrada.substring(0, tamanho || 40) + '...';
    };
});