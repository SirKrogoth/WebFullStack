var modulo = require('./modulos');
var fs = require('fs')

var resultado = modulo.somar(1,2);
var resultado2 = modulo.somar(10,5);

//Callback.
//O console.log irá executar, somente quando o writeFile for finalizado
fs.writeFile('teste.txt', `${resultado}`, function(){
    //Inicio de um callback hell
    fs.writeFile('teste2.txt', `${resultado2}`, function(){
        console.log(resultado2);
    })
    console.log(resultado);
})

//Promisses
resultado = modulo.somar(30,20);
resultado2 = modulo.somar(10,10);

fs.writeFile('teste3.txt', `${resultado}`)
    .then(() => {
        return fs.writeFile('teste4.txt', `${resultado2}`)
    })
    .then(() => {

    })
    .catch((err) => {
        console.error(err);
    })

//Async Await
async function funcaoAssinc(){
    try{
        const teste = await fs.writeFile('teste5.txt', 'Teste assinc');
        await fs.writeFile('teste6.txt', 'Krogoth');
    }
    catch(err){
        console.error(err);
    }    
}