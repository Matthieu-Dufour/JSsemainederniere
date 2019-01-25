// Explication du fonctionnement de promise en JS

let addToEndOfDiv = (htmlString, divId) => {
    //ajouter le code HTML à la fin d'un DIV
    // params : htmlString = code HTML à ajouter, divId = ID du div
    // return : vide

    document.getElementById(divId).insertAdjacentHTML('beforeend', htmlString)
}

let collectFund = () => {
    return new Promise(function (resolve, reject) {
        //on resoud directement one ne teste pas le résultat
        resolve('Amount reached')
    })
}

let buyConsole = (message) => {
    return new Promise(function (resolve, reject) {
        resolve(message + ' console bought')
    })
}

let playRDR2 = (message) => {
    return new Promise(function (resolve, reject) {
        resolve(message + ' play Red Dead Redemption 2')
    })
}

// ------------------------ MAIN

document.addEventListener("DOMContentLoaded", function () {
    //On DOM ready

    // les promesses sont dépendants les unes des autres, elles s'executent dans l'ordre au fur et mesure qu'elles se terminent
    // Dans ce contexte, la deuxième promesse a besoin de données de la première pour pouvoir s'executer et ainsi de suite

    collectFund().then(function (result) {
        return buyConsole(result) //C'est en fait une promesse
    }).then(function (result) {
        return playRDR2(result)
    }).then(function (result) {
        addToEndOfDiv('<p>Tasks finished succesfully : ' + result + '</p>', 'consoleview')
    }).catch(function (result) {
        addToEndOfDiv('<p>Something went wrong ! : ' + result + '</p>', 'consoleview')
    })

    // On souhaite executer les trois promesses : les 3 doivent être satisfaites mais ne sont pas dépendantes les unes des autres
    Promise.all([collectFund(), buyConsole('ok'), playRDR2('ok')]).then(function () {
        addToEndOfDiv('<p>All tasks (promises) finished successfully</p>', 'consoleview')
    }).catch(function () {
        addToEndOfDiv('<p>One of the tasks (promises) one more didn\'t succeed</p>', 'consoleview')
    })

    // On souhaite executer les trois promesses en parallèle : 1 seule des promesses doit être satisfaite 
    Promise.race([collectFund(), buyConsole('ok'), playRDR2('ok')]).then(function () {
        addToEndOfDiv('<p>One or more tasks (promises) finished successfully</p>', 'consoleview')
    }).catch(function () {
        addToEndOfDiv('<p>None of the tasks (promises) succeeded</p>', 'consoleview')
    })
})

