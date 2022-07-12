let arr1 = [2,4,4,4,6,8,10]
let arr2 = [1,2,3,5,6]

function checkArr(arr){
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]>arr[i+1]) {
      return false
    }
  }
  return true
}

function deleteNum(num, arr){
  var auxarr = arr.slice()
  if (checkArr(auxarr)) {
    for (var i = 0; i < auxarr.length; i++) {
      if (auxarr[i] == num) {
        auxarr.splice(i,1)
        i--
      }
    }
  }
  return auxarr
}

function deletePos(pos, arr){
  var auxarr = arr.slice()
  if (checkArr(auxarr)) {
    auxarr.splice(pos, 1)
  }
  return auxarr
}

function addNum(num, arr){
  var auxarr = arr.slice()
  if (checkArr(auxarr)) {
    if(auxarr[0]>=num){
      auxarr.splice(0,0,num)
    }else if(auxarr[auxarr.length-1]<=num){
      auxarr.push(num)
    }else{
      for (var i = 0; i < auxarr.length; i++) {
        if (auxarr[i]>=num) {
          auxarr.splice(i,0,num)
          break
        }
      }
    }
  }
  return auxarr
}

function modPos(pos,num,arr){
  var auxarr = arr.slice()
  if (checkArr(auxarr)) {
    if(0 == pos && num<=auxarr[1]){
      auxarr.splice(0,1,num)
    }
    else if(auxarr.length-1 == pos && num>=auxarr[auxarr.length-1]){
      auxarr.splice(auxarr.length-1,1,num)
    }else{
      if (auxarr[pos-1]<=num && auxarr[pos+1]>=num) {
        auxarr.splice(pos,1,num)
      }
    }
  }
  return auxarr
}

console.log(arr1);
console.log(arr2);

console.log(deleteNum(4,arr1));
console.log(deletePos(2, arr2));
console.log(modPos(4,5, arr1));
console.log(modPos(4,9, arr1));
console.log(addNum(8, arr2));

console.log(arr1);
console.log(arr2);
