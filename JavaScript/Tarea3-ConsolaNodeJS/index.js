const mod1 = require("./operaciones")
const inq = require('inquirer');

const question = [
  {
    type: 'list',
    name: 'option',
    message: 'Digite su opcion: ',
    choices: [
      {
        value: '1',
        name: "1. Sumar"
      },
      {
        value: '2',
        name: "2. Restar"
      },
      {
        value: '3',
        name: "3. Multiplicar"
      },
      {
        value: '4',
        name: "4. Dividir"
      },
      {
        value: '5',
        name: "5. Obtener Factorial"
      },
      {
        value: '6',
        name: "6. Determinar si son primos relativos"
      },
      {
        value: '0',
        name: "0. Salir"
      }
    ]
  }
]

const menu = async ()=>{
  console.clear()
  console.log("------------- MENU -------------")

  const {option} = await inq.prompt(question)

  return option;
}

const pause = async ()=>{
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: 'Presione ENTER para continuar'
    }
  ]
  console.log("\n");
  await inq.prompt(question)
}

const main = async ()=>{
  let op = ''

  do {
    let n1,n2
    op = await menu()
    switch (op) {
      case '1':
        await inq.prompt({
          type: 'input',
          name: 'N1',
          message: 'Digite su primer numero: '
        })
          .then(answers =>{
            n1 = answers.N1
          })

        await inq.prompt({
          type: 'input',
          name: 'N2',
          message: 'Digite su segundo numero: '
        })
          .then(answers =>{
            n2 = answers.N2
          })

        mod1.suma(parseInt(n1,10),parseInt(n2,10))
        await pause()
        break;
      case '2':
        await inq.prompt({
          type: 'input',
          name: 'N1',
          message: 'Digite su primer numero: '
        })
          .then(answers =>{
            n1 = answers.N1
          })

        await inq.prompt({
          type: 'input',
          name: 'N2',
          message: 'Digite su segundo numero: '
        })
          .then(answers =>{
            n2 = answers.N2
          })

        mod1.resta(parseInt(n1,10),parseInt(n2,10))
        await pause()
        break;
      case '3':
        await inq.prompt({
          type: 'input',
          name: 'N1',
          message: 'Digite su primer numero: '
        })
          .then(answers =>{
            n1 = answers.N1
          })

        await inq.prompt({
          type: 'input',
          name: 'N2',
          message: 'Digite su segundo numero: '
        })
          .then(answers =>{
            n2 = answers.N2
          })

        mod1.multi(parseInt(n1,10),parseInt(n2,10))
        await pause()
        break;
      case '4':
        await inq.prompt({
          type: 'input',
          name: 'N1',
          message: 'Digite su primer numero: '
        })
          .then(answers =>{
            n1 = answers.N1
          })

        await inq.prompt({
          type: 'input',
          name: 'N2',
          message: 'Digite su segundo numero: '
        })
          .then(answers =>{
            n2 = answers.N2
          })

        mod1.divi(parseInt(n1,10),parseInt(n2,10))
        await pause()
        break;
      case '5':
        await inq.prompt({
          type: 'input',
          name: 'N1',
          message: 'Digite su numero: '
        })
          .then(answers =>{
            n1 = answers.N1
          })

        mod1.fact(parseInt(n1,10))
        await pause()
        break;
      case '6':
        await inq.prompt({
          type: 'input',
          name: 'N1',
          message: 'Digite su primer numero: '
        })
          .then(answers =>{
            n1 = answers.N1
          })

        await inq.prompt({
          type: 'input',
          name: 'N2',
          message: 'Digite su segundo numero: '
        })
          .then(answers =>{
            n2 = answers.N2
          })

        mod1.prim(parseInt(n1,10),parseInt(n2,10))
        await pause()
        break;
    }
  } while (op !== '0');
}

main()
