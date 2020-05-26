/* Practica realizada por Mario Torres */
$(function () {
  var listaDeEjemplos = [];
  var listaDeAtributos = [];

  $('#ficheroEjemplos').prop('disabled', true); // Desactiva el boton de carga de fichero de Ejemplos
  $('#aplicationStart').prop('disabled', true); // Desactiva el boton de inicio de la aplicación

  $('#ficheroAtributos').change(function () { // Carga la lista de atributos del fichero "AtributosJuego.txt" pasado desde el Input
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

  $('#ficheroEjemplos').change(function () { // Carga la lista de Ejemplos del fichero "Juego.txt" pasado desde el Input

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
      htmlTxt += '<th>' + listaDeAtributos[i] + '</th>';
    }
    htmlTxt += '</tr></thead><tbody>';
    for (let i = 0; i < listaDeEjemplos.length; i++) {
      htmlTxt += '<tr>';
      for (let j = 0; j < listaDeAtributos.length; j++) {
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
    console.log('El atributo donde aparece el resultado es: ');
    console.log(atributoResultado);
    id3(listaDeEjemplos, listaDeAtributos, atributoResultado, ''); // Llama a la función id3() donde se encuentra la implementación del algoritmo
  });


  function id3(listEjem, listAtrib, atributoResultado, caracteres) { // Implementación del algoritmo recursivo
    // Carga los valores de "si" y "no" cada atributo ---------------------------------------------------------
    console.log('---- Inicio de la función ID3 ----');
    console.log('-------- Lista de Atributos: ');
    console.log(listAtrib);
    console.log('-------- Lista de Ejemplos: ');
    console.log(listEjem);
    if (listAtrib.length > 0) { // Caso base 1: Si el array tiene más de un elemento entra, si no no

      let sonIgualesEnSigno = true;
      let before = listEjem[0][atributoResultado];
      let i = 1;
      while (sonIgualesEnSigno && i < listEjem.length) {
        if (before !== listEjem[i][atributoResultado]) {
          sonIgualesEnSigno = false;
        }
        else {
          i++;
        }
      }
      if (sonIgualesEnSigno) { // Caso base 2
        let color = "green";
        if (before.trim() == "no") {
          color = "red";
        }
        $('#sol').append('<div style="color: ' + color + '">' + caracteres + "---> (" + before.trim() + ")</div>");
        console.log('---- Final de la Rama (con valor: ' + before.trim() + ')  ----');
      }
      else { // Caso recursivo
        var salida = {};
        for (var aux = 0; aux < listAtrib.length - 1; aux++) {
          salida[listAtrib[aux]] = {};
        }
        for (var cont = 0; cont < listEjem.length; cont++) { // Carga los valores de "si" y "no" cada atributo
          var stringEje = "" + listEjem[cont][atributoResultado];
          if (stringEje.trim() == "si") {
            for (var cont2 = 0; cont2 < listAtrib.length - 1; cont2++) {
              var helpString = "" + listEjem[cont][listAtrib[cont2]];
              if (!salida[listAtrib[cont2]].hasOwnProperty(helpString)) {
                salida[listAtrib[cont2]][helpString] = {};
                salida[listAtrib[cont2]][helpString].pData = 1;
                salida[listAtrib[cont2]][helpString].nData = 0;
              }
              else if (salida[listAtrib[cont2]][helpString].pData == undefined) {
                salida[listAtrib[cont2]][helpString].pData = 1;
              }
              else {
                salida[listAtrib[cont2]][helpString].pData++;
              }
            }
          }
          else {
            for (var cont2 = 0; cont2 < listAtrib.length - 1; cont2++) {
              var helpString = "" + listEjem[cont][listAtrib[cont2]];
              if (!salida[listAtrib[cont2]].hasOwnProperty(helpString)) {
                salida[listAtrib[cont2]][helpString] = {};
                salida[listAtrib[cont2]][helpString].nData = 1;
                salida[listAtrib[cont2]][helpString].pData = 0;
              }
              else if (salida[listAtrib[cont2]][helpString].nData == undefined) {
                salida[listAtrib[cont2]][helpString].nData = 1;
              }
              else {
                salida[listAtrib[cont2]][helpString].nData++;
              }
            }
          }
        }
        // ---------------------------------------------------------------------------------------
        // --------- Carga los valores de p,a,n y N para cada valor de los atributos -----------------
        var keys = Object.keys(salida); // Valores de los atributos
        for (let i = 0; i < keys.length; i++) {
          var keys2 = Object.keys(salida[keys[i]]);
          salida[keys[i]].N = 0;
          for (let j = 0; j < keys2.length; j++) {
            salida[keys[i]][keys2[j]].a = salida[keys[i]][keys2[j]].pData + salida[keys[i]][keys2[j]].nData;
            salida[keys[i]][keys2[j]].p = salida[keys[i]][keys2[j]].pData / (salida[keys[i]][keys2[j]].pData + salida[keys[i]][keys2[j]].nData);
            salida[keys[i]][keys2[j]].n = salida[keys[i]][keys2[j]].nData / (salida[keys[i]][keys2[j]].pData + salida[keys[i]][keys2[j]].nData);
            salida[keys[i]].N += salida[keys[i]][keys2[j]].pData + salida[keys[i]][keys2[j]].nData;
          }
          salida[keys[i]].merito = 0; // Se inicializa el merito del atributo a 0
          for (let j = 0; j < keys2.length; j++) {
            salida[keys[i]][keys2[j]].r = salida[keys[i]][keys2[j]].a / salida[keys[i]].N; // Calculo del valor de r
            salida[keys[i]][keys2[j]].infor = infor(salida[keys[i]][keys2[j]].p, salida[keys[i]][keys2[j]].n); // Calculo de la entropia de ese valor
            salida[keys[i]].merito += (salida[keys[i]][keys2[j]].r * salida[keys[i]][keys2[j]].infor); // Se suman los sucesivos resultados de los valores del atributo al merito total.
          }
        }
        // ---------------------------------------------------------------------------------------
        console.log('--- Valores de los atributos pi,ni,ai, y N Incluye el merito de cada atributo ----')
        console.log(salida);

        // Seleccionar al atributo con el merito mas bajo ----------------------------------------
        let AtributoSeleccionado = keys[0];
        let valormenor = salida[keys[0]].merito;
        for (let i = 1; i < keys.length; i++) {
          if (salida[keys[i]].merito < valormenor) {
            valormenor = salida[keys[i]].merito;
            AtributoSeleccionado = keys[i];
          }
        }
        console.log("El atributo seleccionado es: " + AtributoSeleccionado);
        $('#sol').append('<div style="color: blue;">' + caracteres + " Nodo: " + AtributoSeleccionado + '</div>');
        var ramas = Object.keys(salida[AtributoSeleccionado]); // Las ramas del atributo seleccionado
        for (let i = 0; i < ramas.length; i++) { // Se recorre recursivamente cada rama
          if (ramas[i] !== 'N' && ramas[i] !== 'merito') {
            $('#sol').append('<div style="color: purple;">' + caracteres + " = Rama: " + ramas[i] + '</div>');
            let nuevaListaEje = []; // Nueva lista de Ejemplos
            let nuevaListaAtrib = []; // Nueva lista de Atributos

            for (let q = 0; q < listEjem.length; q++) {
              if (listEjem[q][AtributoSeleccionado] === ramas[i]) {
                nuevaListaEje.push(listEjem[q]);
              }
            }
            for (let q = 0; q < listAtrib.length; q++) {
              if (listAtrib[q] !== AtributoSeleccionado) {
                nuevaListaAtrib.push(listAtrib[q]);
              }
            }
            id3(nuevaListaEje, nuevaListaAtrib, atributoResultado, '-' + caracteres + '--'); // Se ejecuta la funcion ID3 por cada rama
          }
        }
      }


      // ---------------------------------------------------------------------------------------
      /*     let htmlTexto = '<h3>Tabla de méritos de los atributos</h3><table class ="table" style="border: 2px solid black;">';
          htmlTexto += '<thead><tr>';
          for(let i = 0; i < listAtrib.length - 1; i++) {
            htmlTexto += '<th>' + listAtrib[i] + '</th>';
          }
          htmlTexto += '</tr></thead>';
          htmlTexto += '<tbody><tr>';
          for(let i = 0; i < listAtrib.length - 1; i++) {
            htmlTexto += '<td>' + salida[keys[i]].merito + '</td>';
          }
      
          htmlTexto += '</tr></tbody></table>';
          $('#sol').append(htmlTexto); */
    }

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
