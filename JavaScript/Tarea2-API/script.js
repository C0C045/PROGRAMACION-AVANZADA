function mostrarDatos(datos){
  let name = datos.name;
  let id = datos.id;
  let ab = "";
  document.getElementById("pname").innerText = name;
  document.getElementById("pid").innerText = id;
  datos.abilities.forEach((item, i) => {
    if (i == datos.abilities.length-1) {
      ab = ab+item.ability.name;
    }else {
      ab = ab+item.ability.name+" - ";
    }
  });
  document.getElementById("pab").innerText = ab;

  document.getElementById('ia').style.backgroundImage = 'url('+datos.sprites.front_default.toString()+')';

}

function buscarPokemon(nm){
  const url = "https://pokeapi.co/api/v2/pokemon/"+nm;
  fetch(url)
  .then(res => res.json())
  .then(res => mostrarDatos(res))
  .catch((error) => {
      alert("El pokemon ingresado no existe");
    });
}

document.getElementById("form").addEventListener('submit', (e) => {
        buscarPokemon(document.getElementById("pokemon").value);
        e.preventDefault();
});
