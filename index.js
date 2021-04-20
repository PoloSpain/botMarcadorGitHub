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
        ['marcadores','marcadores']         
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname,'cmds'))   
})

client.login(config.BOT_TOKEN)


