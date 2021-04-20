
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
tratamientoJsonMarcadorToText(message){

            const logo = 'https://yt3.ggpht.com/ytc/AAUvwng-TdmqhS19tic2CtMBp1tdg5RUJraADJ5NhJWTcw=s900-c-k-c0x00ffffff-no-rj'
            const logo1 ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNtuMBQfpYIRmFfQhAvDQCx9swVW6EdAJXQ&usqp=CAU'
            const embed = new Discord.MessageEmbed()
            .setTitle('Marcador en directo!')
            .setDescription('__Torneo Alicante__')
            .setColor('#00AAFF')
            .setThumbnail(logo1)
            .setFooter('Marcador World Padel Tour', logo)
            .addFields(
                {
                    name: 'Pareja 1',
                    value: 'Alejandra Salazar/Gemma Triay',
                    inline: false,
                },
                {
                    name: 'Pareja 2',
                    value: 'Lucía Sainz/Bea Gonzalez',
                    inline: false,
                },{
                    name: 'Puntuación',
                    value: '__P 1__\t**6**\t5 **15**\n__P 2__\t4\t4 **30**',
                    inline: false,
                },
                {
                    name: 'Pareja ganadora',
                    value: '**Alejandra Salazar/Gemma Triay** \n**6-4/7-6(7-5)**',
                    inline: false,
                },
            )
            .addField('👇👇👇', '[Más marcadores aquí](https://www.worldpadeltour.com/marcador/)',true)
            .setTimestamp()

            
           // message.reply(embed)
            message.channel.send(embed)
            .then(msg => {
                msg.delete({ timeout: 8000 /*time unitl delete in milliseconds*/});
            })
            .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
