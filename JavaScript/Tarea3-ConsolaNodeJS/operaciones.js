let operaciones={
  suma: function(num1,num2){
    console.log(num1+" + "+num2+" = "+(num1+num2));
  },
  resta: function(num1,num2){
    console.log(num1+" - "+num2+" = "+(num1-num2));
  },
  multi: function(num1,num2){
    console.log(num1+" • "+num2+" = "+(num1*num2));
  },
  divi: function(num,den){
    console.log(num+" / "+den+" = "+(num/den));
  },
  fact: function(num){
    let con = 1;
    for (var i = 1; i < num+1; i++) {
      con = con*i;
    }
    console.log(num+"! = "+con);
  },
  prim: function(num1,num2){
    let temp;
    let a = num1;
    let b = num2;
    //Calculo el M.C.D
    while (b !== 0) {
        temp = b;
        b = a % b;
        a = temp;
    }
    if (a === 1) {
      console.log(num1+" y "+num2+" son primos relativos");
    }else {
      console.log(num1+" y "+num2+" no son primos relativos");
    }
  }
}

module.exports = operaciones;
