/* Practica realizada por Mario Torres */
$(function () {
  var listaDeEjemplos = [];
  var listaDeAtributos = [];

  $('#ficheroEjemplos').prop('disabled', true); // Desactiva el boton de carga de fichero de Ejemplos
  $('#aplicationStart').prop('disabled', true); // Desactiva el boton de inicio de la aplicación

  $('#ficheroAtributos').change(function () { // Carga la lista de atributos del input
    listaDeAtributos = [];
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
      var line = this.result.trim();
      var auxArray = line.split(',');
      for (var i = 0; i < auxArray.length; i++) {
        listaDeAtributos.push(auxArray[i]);
      }

      console.log("--- Lista de Atributos cargada ---");
      console.log(listaDeAtributos);
      $('#ficheroEjemplos').prop('disabled', false); // Activa el boton de carga de fichero de Ejemplos
      $('#ficheroAtributos').prop('disabled', true); // Desactiva el botón de carga del fichero de Atributos
    };
    reader.readAsText(input.files[0]);
  });

  $('#ficheroEjemplos').change(function () { // Carga la lista de Ejemplos del input

    listaDeEjemplos = []
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
      var lines = this.result.split('\n');

      for (var line = 0; line < lines.length; line++) {
        if (lines[line].trim() != "") {
          var auxArray = lines[line].split(',');
          var item = {};
          for (var atrib = 0; atrib < auxArray.length; atrib++) {
            item[listaDeAtributos[atrib]] = auxArray[atrib];
          }
          listaDeEjemplos.push(item);
        }
      }
      console.log("--- Lista de Ejemplos cargada ---");
      console.log(listaDeEjemplos);
      $('#ficheroEjemplos').prop('disabled', true); // Desactiva el botón de carga del fichero de Ejemplos
      $('#aplicationStart').prop('disabled', false); // Desactiva el boton de inicio de la aplicación

    };
    reader.readAsText(input.files[0]);
  });


  $('#aplicationStart').click(function (event) {
    console.log('--- Comienzo de la ejecucion del programa ---');

    /* Muestra la tabla inicial de ejemplos en la ventana -----------------------------*/
    let htmlTxt = '<thead><tr>';
    for (let i = 0; i < listaDeAtributos.length; i++) {
      htmlTxt +='<th>' + listaDeAtributos[i] + '</th>';
    }
    htmlTxt += '</tr></thead><tbody>';
    for(let i = 0; i < listaDeEjemplos.length; i++){
      htmlTxt += '<tr>';
      for(let j = 0; j < listaDeAtributos.length; j++){
        htmlTxt += '<td>' + listaDeEjemplos[i][listaDeAtributos[j]] + '</td>';
      }
      htmlTxt += '</tr>';
    }
    htmlTxt += '</tbody>';
    $('h3').text('Tabla de Ejemplos Cargada:');
    $('#exampleTable').append(htmlTxt);
    // ---------------------------------------------------------------------------------------

    $('#aplicationStart').prop('disabled', true); // Desactiva el boton de inicio de la aplicación
    var atributoResultado = listaDeAtributos[listaDeAtributos.length - 1]; // Atributo que indica "si" o "no"
    console.log('El atributo resultado es: ');
    console.log(atributoResultado);


    // Carga los valores de "si" y "no" cada atributo ---------------------------------------------------------
    var salida = {};
    for (var aux = 0; aux < listaDeAtributos.length - 1; aux++) {
      salida[listaDeAtributos[aux]] = {};
    }
    for (var cont = 0; cont < listaDeEjemplos.length; cont++) { // Carga los valores de "si" y "no" cada atributo
      var stringEje = "" + listaDeEjemplos[cont][atributoResultado];
      if (stringEje.trim() == "si") {
        for (var cont2 = 0; cont2 < listaDeAtributos.length - 1; cont2++) {
          var helpString = "" + listaDeEjemplos[cont][listaDeAtributos[cont2]];
          if (!salida[listaDeAtributos[cont2]].hasOwnProperty(helpString)) {
            salida[listaDeAtributos[cont2]][helpString] = {};
            salida[listaDeAtributos[cont2]][helpString].pData = 1;
            salida[listaDeAtributos[cont2]][helpString].nData = 0;
            salida[listaDeAtributos[cont2]][helpString].atrib = listaDeAtributos[cont2];
          }
          else if (salida[listaDeAtributos[cont2]][helpString].pData == undefined) {
            salida[listaDeAtributos[cont2]][helpString].pData = 1;
          }
          else {
            salida[listaDeAtributos[cont2]][helpString].pData++;
          }
        }
      }
      else {
        for (var cont2 = 0; cont2 < listaDeAtributos.length - 1; cont2++) {
          var helpString = "" + listaDeEjemplos[cont][listaDeAtributos[cont2]];
          if (!salida[listaDeAtributos[cont2]].hasOwnProperty(helpString)) {
            salida[listaDeAtributos[cont2]][helpString] = {};
            salida[listaDeAtributos[cont2]][helpString].nData = 1;
            salida[listaDeAtributos[cont2]][helpString].pData = 0;
            salida[listaDeAtributos[cont2]][helpString].atrib = listaDeAtributos[cont2];
          }
          else if (salida[listaDeAtributos[cont2]][helpString].nData == undefined) {
            salida[listaDeAtributos[cont2]][helpString].nData = 1;
          }
          else {
            salida[listaDeAtributos[cont2]][helpString].nData++;
          }
        }
      }
    }
    // ---------------------------------------------------------------------------------------
    // --------- Carga los valores de p y n para cada valor de los atributos -----------------
    var keys = Object.keys(salida);
    for (let i = 0; i < keys.length; i++) {
      var keys2 = Object.keys(salida[keys[i]]);
      for (let j = 0; j < keys2.length; j++) {
        salida[keys[i]][keys2[j]].p = salida[keys[i]][keys2[j]].pData / (salida[keys[i]][keys2[j]].pData + salida[keys[i]][keys2[j]].nData);
        salida[keys[i]][keys2[j]].n = salida[keys[i]][keys2[j]].nData / (salida[keys[i]][keys2[j]].pData + salida[keys[i]][keys2[j]].nData);
      }
    }
    // ---------------------------------------------------------------------------------------
    console.log('--- Valores de los atributos p y n ----')
    console.log(salida); 

  });


  function id3() {

  }

  function valorDeN() {

  }

  function valorDeR() {

  }

  function valorDeP() {

  }

  // Funciones a usar en el algoritmo

  function logBase2(num) { // Logaritmo en Base 2
    return Math.log(num) / Math.log(2);
  }

  function infor(p, n) { // Entropía
    if (p === 0) {
      p = 1;
    }
    if (n === 0) {
      n = 1;
    }
    return (-p) * logBase2(p) - n * logBase2(n);
  }
});
