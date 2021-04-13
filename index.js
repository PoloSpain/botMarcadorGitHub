const path = require('path')
const fs = require('fs')
const config = require("./config.json")

/*
const Discord = require("discord.js")
const client = new Discord.Client()
*/
const Commando = require('discord.js-commando')

const client = new Commando.CommandoClient({
    owner: config.ownerId,
    commandPrefix: config.prefix
})

client.on('ready', () => {
    console.log('The client is ready!')

    client.registry
    .registerGroups([
        ['misc','misc commands']        
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname,'cmds'))
})

client.login(config.BOT_TOKEN)

/*
scraper().then( results => {
    var result = results[0];
    //console.log(results);

    /*
    result.jugadores.pareja1.pareja1a = "Alejandra Salazar"
    result.jugadores.pareja1.pareja1b = "Gemma Triay"
    result.jugadores.pareja2.pareja2a = "Lucía Sainz"
    result.jugadores.pareja2.pareja2b = "Bea Gonzalez"

    result.sets.set1.pareja1 = 1;

    var resultados = `**${result.jugadores.pareja1.pareja1a}/${result.jugadores.pareja1.pareja1b}** => ${result.enjuego.pareja1} \n` 
    resultados += `**${result.jugadores.pareja2.pareja2a}/${result.jugadores.pareja2.pareja2b}** => ${result.enjuego.pareja2} \n`
    if (result.sets.set1.pareja1 != '0' | result.sets.set1.pareja2 != '0') resultados += `**__Set 1:__** ${result.sets.set1.pareja1} - ${result.sets.set1.pareja2} \n`
    if (result.sets.set2.pareja1 != '0' | result.sets.set2.pareja2 != '0') resultados += `**__Set 2:__** ${result.sets.set2.pareja1} - ${result.sets.set2.pareja2} \n`
    if (result.sets.set3.pareja1 != '0' | result.sets.set3.pareja2 != '0') resultados += `**__Set 3:__** ${result.sets.set3.pareja1} - ${result.sets.set3.pareja2} \n`            

    
    console.log(resultados)

}).catch(console.error);   
*/

/*
client.on('message', message => {
    scraper().then( results => {
        var result = results[0];
    
        result.jugadores.pareja1.pareja1a = "Alejandra Salazar"
        result.jugadores.pareja1.pareja1b = "Gemma Triay"
        result.jugadores.pareja2.pareja2a = "Lucía Sainz"
        result.jugadores.pareja2.pareja2b = "Bea Gonzalez"
    
        result.sets.set1.pareja1 = 1;
    
        var resultados = `**${result.jugadores.pareja1.pareja1a}/${result.jugadores.pareja1.pareja1b}** => ${result.enjuego.pareja1} \n` 
        resultados += `**${result.jugadores.pareja2.pareja2a}/${result.jugadores.pareja2.pareja2b}** => ${result.enjuego.pareja2} \n`
        if (result.sets.set1.pareja1 != '0' | result.sets.set1.pareja2 != '0') resultados += `**__Set 1:__** ${result.sets.set1.pareja1} - ${result.sets.set1.pareja2} \n`
        if (result.sets.set2.pareja1 != '0' | result.sets.set2.pareja2 != '0') resultados += `**__Set 2:__** ${result.sets.set2.pareja1} - ${result.sets.set2.pareja2} \n`
        if (result.sets.set3.pareja1 != '0' | result.sets.set3.pareja2 != '0') resultados += `**__Set 3:__** ${result.sets.set3.pareja1} - ${result.sets.set3.pareja2} \n`            
    
        message.channel.send(resultados);
    }).catch(console.error);   
});
*/



