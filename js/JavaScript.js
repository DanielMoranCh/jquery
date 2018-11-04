$(document).ready(function(){
    var validator = $("#formRegistro").validate({
      errorPlacement: function(error, element){
        $(element).closest("form")
        .find("label[for='" + element.attr("id") + "']")
        .append(error);
      },
      errorElement: "span",
      messages:{
        codigo:{
          required: "Ingrese el Codigo del estudiante",
          min: "Debe tener como minimo valor 1",
          maxlength: "Debe tener como maximo valor 99999"
        },
        nombre:{
          required: "Ingrese el Nombre del estudiante",
          minlength: "Debe tener como minimo 5 caracteres",
          maxlength: "Debe tener como maximo 30 caracteres"
        },
        nota:{
          required: "Ingrese la Nota del estudiante",
          min: "El minimo valor es 1",
          maxlength: "El maximo valor es 99"
        }
      }
    });
    armarTabla();

    $("#btn_mayor").click(function(){
      var mayor = {
        codigo: "",
        nombre: "",
        nota: ""
      };
      var nota;
      for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        nota =$.parseJSON(localStorage.getItem(clave));
        if (mayor.nota < nota.nota) {
          mayor.nota = nota.nota;
          mayor.nombre = nota.nombre;
          mayor.codigo = nota.codigo;
        }
      }
      alert("La nota mas alta es de " + mayor.nombre + "(" + mayor.codigo + "), \n ya la nota es: " + mayor.nota);
    });

    $("#btn_menor").click(function(){
      var menor = {
        codigo: "",
        nombre: "",
        nota: 100
      };
      var nota;
      for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        nota =$.parseJSON(localStorage.getItem(clave));
        if (menor.nota > nota.nota) {
          menor.nota = nota.nota;
          menor.nombre = nota.nombre;
          menor.codigo = nota.codigo;
        }
      }
      alert("La nota mas baja es de " + menor.nombre + "(" + menor.codigo + "), \n ya la nota es: " + menor.nota);
    });

    $("#btn_promedio").click(function(){
      var prom = 0;
      var total = 0;
      var nota;
      for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        nota =$.parseJSON(localStorage.getItem(clave));
        total = total + parseInt(nota.nota);
        prom = total / localStorage.length;
      }
      alert("El promedio es: " + prom.toString().substr(0,4));
    });
});

$.validator.setDefaults({
  submitHandler: function(){
    var incodigo = $("#codigo").val();
    var innombre = $("#nombre").val();
    var innota = $("#nota").val();

    for (var i = 0; i < localStorage.length; i++) {
      var clave = localStorage.key(i);
      nota =$.parseJSON(localStorage.getItem(clave));
      if (incodigo == nota.codigo) {
        if (confirm("El codigo ya esta siendo utilizado. \n Se perderan los datos anteriores de este codigo, si desea conservar los viejos datos, clickee CANCELAR, de lo contrario ACEPTAR") == true) {
        }else {
          return;
        }
      }
    }

    var nota = {
      codigo: incodigo,
      nombre: innombre,
      nota: innota
    };

    localStorage.setItem(incodigo, JSON.stringify(nota));
    $("#codigo").val(incodigo);
    armarTabla();
    limpiarCampos();
  }
});
