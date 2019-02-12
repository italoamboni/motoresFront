angular.module("app").value("configAPI", {  
    resourceMarcas: "http://localhost:8080/apimotores/marcas",
    resourceModelos: "http://localhost:8080/apimotores/modelos",
    resourceMotores: "http://localhost:8080/apimotores/motores",
    resourceFuncionarios: "http://localhost:8080/apimotores/funcionarios",
    resourceManutencoes: "http://localhost:8080/apimotores/manutencoes",
    resourceHistoricos: "http://localhost:8080/apimotores/historicos"

});