const path = require('path')
const Commando = require('discord.js-commando')

function run (message, marcador, client) {
    return new Promise(async (resolve, reject) => {       

        try {
            if (marcador.msgIMGId !== null) {

                let channel = client.channels.cache.get(message.channel.id);
                let messageEdit = channel.messages.cache.get(marcador.msgIMGId);
        
                messageEdit.delete()
            }
            message.channel.send(`Marcador ${marcador.numMarcador}`, 
            {
                files: [path.join(__dirname,`../Resources/screenshoots/Marcador${marcador.numMarcador}.png`)]
            }).then((message)=> {      
                marcador.msgIMGId = message.id;
            });

            return resolve();
        } catch (e) {
            return reject(e);
        }
    })
}


module.exports = run