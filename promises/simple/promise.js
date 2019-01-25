// Explication du fonctionnement de promise en JS

let addToEndOfDiv = (htmlString, divId) => {
    //ajouter le code HTML à la fin d'un DIV
    // params : htmlString = code HTML à ajouter, divId = ID du div
    // return : vide

    document.getElementById(divId).insertAdjacentHTML('beforeend', htmlString)
}

let promiseToCleanTheKitchen = new Promise(function (resolve, reject) {
    // promesse : nettoyer la cuisine (événement)
    // params : vide
    // return chaine contenant le statut de l'événement

    // ici on déclenche ou bien on gère l'événement
    let isClean = true

    if (isClean) {
        // en cas de success, la valeur est retournée dans le THEN
        resolve('clean')
    }
    else {
        // en cas d'erreur, la valeur est retournée dans le CATCH
        reject('still dirty')
    }
})

// ------------------------ MAIN

document.addEventListener("DOMContentLoaded", function () {
    //On DOM ready

    promiseToCleanTheKitchen.then(function (fromResolve) {
        addToEndOfDiv('Kitchen Status : ' + fromResolve, "consoleview")
    }).catch(function (fromReject) {
        addToEndOfDiv('Kitchen Status : ' + fromReject, "consoleview")
    })
})