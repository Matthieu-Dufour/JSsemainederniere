// 1 Recuperer la liste des users de github
// 2 Afficher la liste des repos d'un user avec son id 
// 3 Appeller l'URL : user.repos_url
// 4 Afficher l'avatar du user, id, login
// 5 Affiche un tableau avec sur chaque ligne nom du repos, description, homepage,
// derniere maj


let collectFund = () => {
    return new Promise(function (resolve, reject) {
        //on resoud directement one ne teste pas le résultat
        resolve('Amount reached')
    })
}



/**
 * @param  {} url
 * @param  {} success
 */// Exercice pour implementer une requete XHR
function sendXhr(url, success) {
    // envoi une requete a GitHub ou autre
    // params : url = URL de l'API, success function a appeler en cas de succes
    // return : vide
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', function (e) {//e est la reponse du serveur
        success(e.target.response)//en cas de reponse ok
    });
    xhr.addEventListener('error', function (e) {
        console.log('erreur retouree : ', e)//en cas d'erreur
    });
}
/**
 * 
 * @param  {} data
 */
function showGithubUsers(data) {
    // Affiche la reponse de github users
    // params : reponse de github a la requete xhr
    let githubUsers = data;//transforme la reponse en objet js
    console.log(githubUsers);
    for (i in githubUsers) {
        document.getElementById('content').innerHTML += '<li>' + githubUsers[i].login + '</li>';
    }
    let html = githubUsers.length + ' users Github : <br/><ul>';
    if (githubUsers.length !== 0) {
        githubUsers.forEach(element => {
            html += '<li>' + element.login + '</li>';
        });
    }
    document.getElementById('content').innerHTML += html + '</ul>';
}
/**
 * 
 */
function getAndShowGithubUsers() {
    sendXhr('https://api.github.com/users', showGithubUsers);
}
/**
 * 
 * @param {*} data 
 * @param {*} uid 
 */
let getUser = (data, uid) => {

    let user = data.find(item => item.id == uid);
    console.log('user : ' + user.login +
        ' repos : ' + user.repos_url);

    let infoUser = "";
    infoUser = `
        <div class="row">
            <div class="col-md-3 text-center">
                <img src="${user.avatar_url}" height="150" alt="${user.login}"></img>
                <span class="text-primary">#ID : ${user.id}</span>
            </div>
            <div class="col-md-6 d-flex align-items-center">
                <h2 class="text-primary">${user.login}</h2>
            </div>
            <div class="col-md-3 d-flex align-items-center">
                <button type="button" class="btn btn-primary btn-lg">Page des repos</button>
            </div>
        </div>
            `

    document.getElementById("content").innerHTML = infoUser;

    sendXhr(user.repos_url, displayUserRepos);
}

/**
 * @param  {} userId
 */
function showUserRepos(userId) {
    /**
     * 
     * @param {*} data 
     */
    sendXhr('https://api.github.com/users', function (data) {
        getUser(data, userId)
    });
}

/**
 * 
 * @param {*} response 
 */
let displayUserRepos = (response) => {
    console.log(response);

    let tableRepo = `
    <table class='table'>
        <thead>
            <tr>
            <th scope='col'>#id</th>
            <th scope='col'>Nom du repos</th>
            <th scope='col'>Descriptif</th>
            <th scope='col'>Lien homepage</th>
            <th scope='col'>Dernière mise à jour</th>
            </tr>
        </thead>
        <tbody>
                    `
    
    response.forEach(element => {
        tableRepo += '<tr><td>' + element.id + '</td><td>' + element.name + '</td><td>' + element.description + '</td><td><a href="' + element.homepage + '">' + element.homepage + '</a></td><td>' + element.updated_at + '</td></tr>';
    });
    tableRepo += '</tbody></table>';
    document.getElementById('repo').innerHTML += tableRepo;

}

// ---------------------------------------
sendXhr('https://api.github.com/users', showGithubUsers);
console.log('requete Github envoyée');

// getAndShowGithubUsers();
console.log('requete Github envoyée');

showUserRepos(3);
console.log('requete Github envoyée');

