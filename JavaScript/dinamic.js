function changeColor(){
  number = parseInt(document.getElementById("display").value)

  if (number == 1){
    document.getElementById("element").style.backgroundColor = "yellow";
  }
  else if(number == 2){
    document.getElementById("element").style.backgroundColor = "blue";
  }
  else if(number == 3){
    document.getElementById("element").style.backgroundColor = "black";
  }
  else if(number == 4){
    document.getElementById("element").style.backgroundColor = "cyan";
  }
  else if(number == 5){
    document.getElementById("element").style.backgroundColor = "gray";
  }
  else if(number == 6){
    document.getElementById("element").style.backgroundColor = "orange";
  }
  else if(number == 7){
    document.getElementById("element").style.backgroundColor = "green";
  }
  else{
    document.getElementById("element").style.backgroundColor = "white";
  }
}
