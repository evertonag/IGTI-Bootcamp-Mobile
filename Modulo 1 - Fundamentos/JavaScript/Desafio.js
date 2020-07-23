//Obter contas através do endpoint /api/accounts (Método GET) da nossa API
getAccountsAPI().then(data=>{
    //1)- Soma total de todos os depósitos
    sumBalances('1)- ', data)

    //2)- O número total de contas com mais de 100 reais de saldo é:
    balances('2)- ', data, 100)

    //3)- O número de contas com mais de 100 reais de saldo na agência 33 é:
    totalAccounts('3)- ', data, 100, 33)

    //4)- A agência com maior saldo é a:
    biggestBalance('4)- ', data)

    //5)- A agência com o menor saldo é a
    lowerBalance('5)- ', data)

    //6)- Considere o cliente com o maior saldo em cada agência (caso haja mais de um
    //    cliente com o maior saldo, escolha apenas um). O valor total desses saldos é:
    sumBiggestBalanceByAgency('6)- ', data)

    //7)- O nome do(a) cliente com o maior saldo na agência 10 é:
    getCustomerBiggestBalance('7)- ', data, 10)

    //8)- O nome do(a) cliente com o menor saldo na agência 47 é:
    getCustomerLowerBalance('8)- ', data, 47, 1)
    
    //9)- Você deve mostrar os nomes dos três clientes com menor saldo da agência 47,
    //    separados por vírgula e em ordem crescente (do menor para o maior)
    getCustomerLowerBalance('9)- ', data, 47, 3)
    
    //10)- Quantos clientes estão na agência 47?
    getTotalCustomers('10)- ', data, 47)

    //11)- Quantos clientes que tem Maria no nome estão na agencia 47?
    getCustomerByName('11)- ', data, 'Maria', 47)

    //12)- Considerando que o id deve ser único e é sequencial, qual o próximo id possível para conta?
    getNextAccountId('12)- ', data)

})


//Estrutura do arquivo: 
//{"id":número,"agencia":número,"conta": número ,"name":string,"balance":número

class Account{
  id
  agencia
  conta
  name
  balance
}


async function getAccountsAPI() {
    const url = 'http://localhost:3090/api/accounts'

    const response = await fetch(url)

    return response.json()
}


function sumBalances(exercicio, accounts){
  let total = 0

  for(acct of accounts){
    total = total + acct.balance
    }

  console.log(exercicio + 'Soma total de todos os depósitos: ' + total)
}

    //2)- O número total de contas com mais de 100 reais de saldo é:
function balances(exercicio, accounts, greatherThan){
  let result = Object.values(accounts.filter(item=>item.balance > greatherThan)).length
  console.log(exercicio + 'O número total de contas com mais de ' + greatherThan + 
                          ' reais de saldo é: ' + result )
}

    //3)- O número de contas com mais de 100 reais de saldo na agência 33 é:
function totalAccounts(exercicio, accounts, greatherThan, agencyNum){
  let result = Object.values(accounts.filter(item=>item.agencia == agencyNum & item.balance > greatherThan))
                                     .length
  console.log(exercicio + 'O número de contas com mais de ' + greatherThan + 
                          ' reais de saldo na agência '+ agencyNum + ' é: ' + result )
}

    //4)- A agência com maior saldo é a:
function biggestBalance(exercicio, accounts){
  let mapAccounts = new Array()

  //obtem um mapa de agencias com o valor total de seus depósitos
  mapAccounts = getSumAgency(accounts)

  //--------------- ORDENAÇÃO DESCRESCENTE (DESC) -------------------
  //O método sort() possui uma função callback, que recebe dois parâmetros (A e B)
  //Nesta função, verificamos se o balance (coluna 1) de A é MAIOR que o balance (coluna 1) de B.
  //Quando maior (verdadeiro), retornamos um número negativo (neste caso, -1), que indica para 
  //a função que o objeto B (menor) deve vir DEPOIS do objeto A. Caso contrário, a função retorna
  //um número positivo (1) e informa que B (maior) deve vir ANTES do objeto A
  let result = Array.from(mapAccounts.entries())
                         .sort((a,b)=>(a[1] > b[1]) ? -1 : 1)[0]
  console.log(exercicio + 'A agência com MAIOR saldo é a: ' + result[0])

}


    //5)- A agência com o menor saldo é a
function lowerBalance(exercicio, accounts){
  //obtem um mapa de agencias com o valor total de seus depósitos
  let mapAccounts = getSumAgency(accounts)

  //------------------- ORDENAÇÃO CRESCENTE (ASC) -------------------
  //O método sort() possui uma função callback, que recebe dois parâmetros (A e B)
  //Nesta função, verificamos se o balance (coluna 1) de A é MENOR que o balance (coluna 1) de B.
  //Quando MENOR (verdadeiro), retornamos um número negativo (neste caso, -1), que indica para 
  //a função que o objeto B (maior) deve vir DEPOIS do objeto A. Caso contrário, a função retorna
  //um número positivo (1) e informa que B (menor) deve vir ANTES do objeto A
  let result = Array.from(mapAccounts.entries())
                         .sort((a,b)=>(a[1] < b[1]) ? -1 : 1)[0]
  console.log(exercicio + 'A agência com MENOR saldo é a: ' + result[0])
}

    //6)- Considere o cliente com o maior saldo em cada agência (caso haja mais de um
    //    cliente com o maior saldo, escolha apenas um). O valor total desses saldos é:
function sumBiggestBalanceByAgency(exercicio, accounts){
  let lastAgency
  let total = 0

  //Ordena por Agencia e Balance
  let sortedByAgency = accounts
                          .sort((a, b) => a.agencia - b.agencia || b.balance - a.balance)

  for(acct of sortedByAgency){
    if(lastAgency != acct.agencia){
      total = total + acct.balance
      lastAgency = acct.agencia
    }

  }

  console.log( exercicio + 
              'Considere o cliente com o maior saldo em cada agência ' + 
              '(caso haja mais de um cliente com o maior saldo, escolha '+
              'apenas um). O valor total desses saldos é: ' + 
              total)
}

    //7)- O nome do(a) cliente com o maior saldo na agência 10 é:
function getCustomerBiggestBalance(exercicio, accounts, agency){
  acct = new Account()

  //Filtra para obter os registros da agencia solicitada e ordena
  //para deixar na primeira posição o que possui MAIOR saldo (balance)
  acct = accounts.filter((item) => item.agencia == agency)
                 .sort((a, b) => b.balance - a.balance)[0]

  console.log( exercicio + 
              'O nome do(a) cliente com o MAIOR saldo na agência ' + 
              agency + 
              ' é: ' + 
              acct.name)
  
}

    //8)- O nome do(a) cliente com o menor saldo na agência 47 é:
function getCustomerLowerBalance(exercicio, accounts, agency, maxCust){
  let names = ''
  let msg = 'O nome do(a) cliente com o MENOR saldo na agência '

  acct = accounts.filter((item) => item.agencia == agency)
                 .sort((a,b) => a.balance - b.balance)

  for(i = 0; i<maxCust; i++){
    if(names != ''){
      names = names + ', '
      msg = maxCust + ' clientes com o MENOR saldo na agência '
    }
    names = names + acct[i].name
  }

  console.log( exercicio + 
               msg + 
               agency + 
              ': ' + 
              names)
}
  
    
    //10)- Quantos clientes estão na agência 47?
function getTotalCustomers(exercicio, accounts, agency){
  let total = accounts.filter((item) => item.agencia == agency).length

  console.log(exercicio + 'Total de clientes na agência ' + agency + ': ' + total)
  
}

    //11)- Quantos clientes que tem Maria no nome estão na agencia 47?
function getCustomerByName(exercicio, accounts, custName, agency){
  //Busca nomes que tenham a palavra Maria (se quisesse um nome começando com 
  //a palavra Maria, teríamos que utilizar o item.name.startsWith)
  let total = accounts.filter((item) => item.agencia == agency && item.name.includes('Maria')).length

  console.log( exercicio + 'Há ' + total + 
              ' cliente(s) com o nome Maria na agência ' + agency)
}

    //12)- Considerando que o id deve ser único e é sequencial, qual o próximo id possível para conta?
function getNextAccountId(exercicio, accounts){
  let next
  //Calcula o próximo número de conta
  next = accounts.sort((a, b) => b.id - a.id)[0].id + 1

  console.log( exercicio + 
              'Considerando que o id deve ser único e é sequencial, ' + 
              'o próximo id possível para conta seria ' + 
              next)
}



function getSumAgency(accounts){
  let lastAgency
  let sumBalance  = 0
  let mapAccounts = new Map()

  let sortedByAgency = accounts.sort((previous, next)=>previous.agencia - next.agencia )

  for(acct of sortedByAgency){
    if (lastAgency == undefined) {
      lastAgency = acct.agencia
    }else if(lastAgency != acct.agencia){
      mapAccounts.set(lastAgency, sumBalance)
      lastAgency = acct.agencia
      sumBalance = 0
    }

    sumBalance = sumBalance + acct.balance
  }

  if (lastAgency != undefined){
      mapAccounts.set(lastAgency, sumBalance)
  }

  return mapAccounts
}