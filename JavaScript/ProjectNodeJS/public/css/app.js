const subirImagen = (data1, data2) => {
  const data = new FormData();

  data.append('archivo1', data1[0]);
  data.append('archivo2', data2[0]);

  fetch('/subir-archivo', {
    method: 'POST',
    body: data
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('resultado').innerHTML = 'Archivos subidos correctamente.';
  })
  .catch(error => {
    console.error(error);
  });
}

document.querySelector('#subir_archivo').addEventListener("click",() => {
  const data1 = document.getElementById('data1').files
  const data2 = document.getElementById('data2').files
  subirImagen(data1,data2);
});