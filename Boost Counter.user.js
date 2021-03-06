// ==UserScript==
// @name         Boost Counter
// @namespace    http://github.com/KillaBoi
// @version      1.0
// @description  See boosting stats
// @author       Killa
// @match        https://steamcommunity.com/id/*/gcpd/730/
// @match        https://steamcommunity.com/profiles/*/gcpd/730/
// @match        https://steamcommunity.com/profiles/*/gcpd/730/?tab=accountmain
// @match        https://steamcommunity.com/id/*/gcpd/730/?tab=accountmain
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @require      https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// ==/UserScript==

(function() {
    var cfg = new MonkeyConfig({
    title: 'Boost Counter',
    menuCommand: true,
    params: {
        URL: {
            type: 'text',
            default: ''
        }
    }
});
    'use strict';
    console.log("%c+", 'font-size: 1px; padding: 150px 150px; line-height: 0; background: url("https://i.imgur.com/dRr5g1S.png"); background-size: 300px 300px; color: transparent;') //Totally did not steal this idea from xPaw
    console.log("[INIT] Script Loaded!");
    GM_setValue("INIT", "Init Success!");
    console.log("[INIT] LocalStorage" + GM_getValue("INIT"));
    localStorage.setItem('DiscordWebhookURL', "");

    var h2 = document.getElementsByClassName("generic_kv_line");
    var tables = document.getElementsByClassName("generic_kv_table");
    for (var ii = 0; ii < tables.length; ii++){
        var stringFinder = document.getElementsByClassName("generic_kv_table").item(ii).textContent.trim().replace(/[0-9]/g, '').replace(': ', '');

        if(stringFinder.includes("offers")){
            tables[ii].remove();
         }

         if(stringFinder.includes("Limited Offer Items")){
            tables[ii].remove();
         }

    }
    for (var iii = 0; iii < tables.length; iii++){
        var stringFinder2 = document.getElementsByClassName("generic_kv_table").item(iii).textContent.trim().replace(/[0-9]/g, '').replace(': ', '');

        if(stringFinder2.includes("offers")){
            tables[iii].remove();
         }

    }

    var subtabs = document.getElementById("subtabs");
    subtabs.remove();
    //Just in case there are more than one...
    for(var i = 0; i < h2.length; i++){
        console.log(h2.length);
        //check for the certain string
        //console.log(h2.length);
        //console.log(h2[i].textContent.trim().replace(/[0-9]/g, '').replace(': ', ''));
        if(h2[i].textContent.trim().replace(/[0-9]/g, '').replace(': ', '') == "Experience points earned towards next rank"){
            //console.log("Found smth!");
            var currentXPCount = h2[i].textContent.trim().replace(/\D+/g, "").replace(': ', '');
            //console.log(h2[i].textContent.trim().replace(/\D+/g, "").replace(': ', ''));
            //console.log((1+(5000-currentXPCount)/84).round() + " games left until next XP rankup");
            var sentence = "<b>" + ((1+(5000-currentXPCount)/84).round() + "</b> games left until next XP rankup");
            var newHTML = document.createElement ('div');
            newHTML.innerHTML = '<br><div id="GameCounter">' + sentence + '</div>';
            newHTML.classList.add ("generic_kv_line");
            h2[i].after(newHTML);

        }
        else if (h2[i].textContent.trim().replace(/[0-9]/g, '').replace(': ', '') == "CS:GO Profile Rank"){
            //console.log("Found Profile Rank smth!");
            var currentProfileRank = h2[i].textContent.trim().replace(/\D+/g, "").replace(': ', '');
            //console.log(h2[i].textContent.trim().replace(/\D+/g, "").replace(': ', ''));
            //console.log("Current Profile Rank: " + currentProfileRank);
            //console.log(currentProfileRank);

        }
        /// REMOVE CHINESE ANTIADDICTION TIMER ///
        else if (h2[i].textContent.trim().replace(/[0-9]/g, '').replace(': ', '') == "Anti-addiction online time::"){
            //console.log("Found antiaddction smth!");
            var AntiAddiction = h2[i].remove();
            //console.log(h2[i].textContent.trim().replace(/\D+/g, "").replace(': ', ''));

        }
        /// REMOVE IP ADDRESS ///
        else if (h2[i].textContent.trim().replace(/[0-9]/g, '').replace(': ', '') == "Last known IP address..."){
            //console.log("Found antiaddction smth!");
            var IPAddress = h2[i].remove();
            //console.log(h2[i].textContent.trim().replace(/\D+/g, "").replace(': ', ''));

        }
    }

    var currentXPTotal = ((( +currentProfileRank*5000)+ +currentXPCount));
    //console.log(currentXPTotal);
    //console.log(((200000- +currentXPTotal)/84).round() + " games left until next service medal");
    var totalGamesRemainingCalc = (((200000- +currentXPTotal)/84).round());
    var serviceMedalCalc = "<b>" + (((200000- +currentXPTotal)/84).round() + "</b> games left until next service medal");
    var serviceMedal = document.createElement ('div');
    serviceMedal.innerHTML = '<div id="ServiceMedalCounter">' + serviceMedalCalc + '</div><br>';
    serviceMedal.classList.add ("generic_kv_line");
    newHTML.after(serviceMedal);
    var timeCalc = "<b> If each game takes 8 minutes including wait times, your next service medal will be in " + ((+totalGamesRemainingCalc*8)/1440).round() + " days.</b>";
    var serviceMedalDays = document.createElement ('div');
    serviceMedalDays.innerHTML = '<div id="ServiceMedalDayCounter">' + timeCalc + '</div>';
    serviceMedalDays.classList.add ("generic_kv_line");
    serviceMedal.after(serviceMedalDays);
    console.log("URL: " + cfg.get('URL'));

})();