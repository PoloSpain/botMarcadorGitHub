
function run (marcador, marcadorResult, message, client) {
    return new Promise(async (resolve, reject) => {       

        try {            
                var result = marcadorResult;                   
        
                var resultados = `\n***__${marcador.numMarcador} - ${result.torneo.patrocinador} __***\n`
                resultados += `**${result.jugadores.pareja1.jugador1}/${result.jugadores.pareja1.jugador2}** => ${result.enjuego.pareja1} \n` 
                resultados += `**${result.jugadores.pareja2.jugador1}/${result.jugadores.pareja2.jugador2}** => ${result.enjuego.pareja2} \n`
                if (result.sets.set1.pareja1 != '0' | result.sets.set1.pareja2 != '0') resultados += `**__Set 1:__** ${result.sets.set1.pareja1} - ${result.sets.set1.pareja2} \n`
                if (result.sets.set2.pareja1 != '0' | result.sets.set2.pareja2 != '0') resultados += `**__Set 2:__** ${result.sets.set2.pareja1} - ${result.sets.set2.pareja2} \n`
                if (result.sets.set3.pareja1 != '0' | result.sets.set3.pareja2 != '0') resultados += `**__Set 3:__** ${result.sets.set3.pareja1} - ${result.sets.set3.pareja2} \n`                                   

                if (marcador.msgTEXTId !== null) {

                    let channel = client.channels.cache.get(message.channel.id);
                    let messageEdit = channel.messages.cache.get(marcador.msgIMGId);
            
                    messageEdit.delete()
                }

                message.channel.send(resultados).then((message)=> {      
                    marcador.msgTEXTId = message.id;
                });

            return resolve();
        } catch (e) {
            return reject(e);
        }
    })
}




module.exports = run