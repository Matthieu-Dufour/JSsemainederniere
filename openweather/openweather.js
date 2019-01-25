/**
 * Gestion des appels OpenWeatherMap
 */

/**
 * Appel ajax en jQuery
 * @param {*} urlSend 
 * @param {*} success 
 */
let sendXhr = (urlSend, success) => {

    let xhr = $.ajax({
        url: urlSend,
        method: 'GET',
        dataType: 'json'
    }).done(data => {
        success(data);
    }).fail(error => {
        console.log('data transfert error' + error);
        let errorMessage = "<p>Le serveur de données météo n'est pas disponible</p>";
        errorMessage += "Code d'erreur : " 
        $("#meteo").html(errorMessage);
    });
}

/**
 * Affiche la meteo
 * @param {*} data 
 */
let showWeatherData = data => {
    console.log("retour de l'API : ", data);

    let iconCode = data.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

    let meteo = "<img src='" + iconUrl + "' id='weathericon' />" +
                "<h2>Meteo à " + data.name + "</h2>" +
                "<p>" + "<b>" + "Tendance</b> : " + data.weather[0].description + "</p>" +
                "<p>" + "<b>" + "Temperature</b> : " + data.main.temp + "°C" +"</p>" +
                "<p>" + "<b>" + "Pression</b> : " + data.main.pressure + "hPa" + "</p>" +
                "<p>" + "<b>" +" Humidite</b> : " + data.main.humidity + "%" + "</p>"
    $("#meteo").html(meteo);
}

/**
 * Main
 */
$(document).ready(() => {

    let apiKey = "2ff23c23b228f51a1388f2e2b27e6ef4";

    let city = "Paris,fr";

    let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&lang=fr" + "&units=metric";

    sendXhr(weatherUrl, showWeatherData);
});