var listaDeEjemplos = [];
var listaDeAtributos = [];

var openEjemplo = function (event) {
  listaDeEjemplos = []
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function () {
    var lines = this.result.split('\n');

    for (var line = 0; line < lines.length; line++) {
      if (lines[line].trim() != "") {
        var auxArray = lines[line].split(',');
        var item = {
          TiempoExterior: auxArray[0],
          Temperatura: auxArray[1],
          Humedad: auxArray[2],
          Viento: auxArray[3],
          Jugar: auxArray[4]
        }
        listaDeEjemplos.push(item);
      }
    }
    console.log("--- Lista de Ejemplos cargada ---");
    console.log(listaDeEjemplos);
  };
  reader.readAsText(input.files[0]);
};


var openAtributos = function (event) {
  listaDeAtributos = [];
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function () {
    var line = this.result.trim();
    var auxArray = line.split(',');
    for(var i = 0; i < auxArray.length; i++){
      listaDeAtributos.push(auxArray[i]);
    }
    
    console.log("--- Lista de Atributos cargada ---");
    console.log(listaDeAtributos);
  };
  reader.readAsText(input.files[0]);
};



var aplicationStart = function (event) {
  console.log('--- Comienzo de la ejecucion del programa ---');
  console.log(listaDeEjemplos);
  console.log(listaDeAtributos);
}