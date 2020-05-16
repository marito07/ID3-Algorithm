var listaDeEjemplos = [];
var ListaDeAtributos = [];

var openAtributos = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
            console.log(lines[line]);
        }
    };
    reader.readAsText(input.files[0]);

  };

  


  var aplicationStart = function(event) {
    console.log('--- Comienzo de la ejecucion del programa ---');

  }