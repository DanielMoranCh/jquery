function armarTabla(){
  var tabla = "";

  tabla += '<table style="border:0px 0px 1px 0px;">';
  tabla += '<tr>';
  tabla += '<th>Codigo</th>';
  tabla += '<th>Nombre</th>';
  tabla += '<th>Nota</th>';
  tabla += '<th>Editar</th>';
  tabla += '<th>Eliminar</th>';
  tabla += '</tr>';
  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);
    var nota =$.parseJSON(localStorage.getItem(clave));

    tabla += '<tr>';
    tabla += '<td>' + nota.codigo + '</td>';
    tabla += '<td>' + nota.nombre + '</td>';
    tabla += '<td>' + nota.nota + '</td>';
    tabla += '<td><button onclick="editarColumna(' + nota.codigo +')">Editar</button></td>';
    tabla += '<td><button onclick="eliminarColumna(' + nota.codigo +')">Eliminar</button></td>';
    tabla += '</tr>';
  }
  tabla += "</table>";
  $("#tabla").html(tabla);
}

function eliminarColumna(codigo){
  localStorage.removeItem(codigo);
  armarTabla();
}

function editarColumna(codigo){
  var nota;
  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);
    if (clave == codigo) {
      nota =$.parseJSON(localStorage.getItem(clave));
      $("#codigo").val(nota.codigo);
      $("#nombre").val(nota.nombre);
      $("#nota").val(nota.nota);
      eliminarColumna(codigo);
    }
  }
}

function limpiarCampos(){
  $("#codigo").val(contador);
  $("#nombre").val("");
  $("#nota").val("");
}
