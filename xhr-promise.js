function sendXhr(url) {
    // envoie une requete a Github ou autre
    // params : url = URL ou route de l'API, success function a appeler en cas de succes
    // return : vide


    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = function () { // en cas de retour OK de l'api
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response)
            } else {
                reject('statusText : ' + xhr.statusText)
            }
        }
        xhr.onerror = function () { // en cas d'erreur de l'appel XHRs
            reject('statusText : ' + xhr.statusText)
        }
        xhr.send()
    })


}








let getListUsers = (uid) => {


    return new Promise(function (resolve, reject) {
        sendXhr('https://api.github.com/users').then((result) => {
            let user = result.find(item => item.id == uid);
            resolve(user)
        }).catch((result) => { console.log('BUG users', result) })
    })


}

let getUserRepos = (user) => {
    return new Promise(function (resolve, reject) {
        sendXhr(user.repos_url).then((listRepos) => {
            resolve(listRepos)
        }).catch((result) => { console.log('BUG users', result) })
    })
}

let displayUsersRepos = (user_id) => {

    getListUsers(user_id).then((user) => {
        console.log('infos user : ', user)
        return getUserRepos(user)
    }).then((userData) => {
        console.log('repos user : ', userData)
    }).catch((result) => {
        console.log('erreur du serveur')
    })

}

displayUsersRepos(3)
console.log('XHR sent')