const scraper = require('../../utilidades/scrapingMarcador')
const path = require('path')
const Commando = require('discord.js-commando')
const fs = require('fs')
const say = require('say');
const captureWebsite = require('capture-website');
//////////////////////////////////////////7
const Discord = require("discord.js");
const { dirname } = require('path');
const client = new Discord.Client()

let marcadores = {
    marcador1 : {
        liveInterval: null,
        urlScore: "https://wpt.puntuate.com/m0.aspx?ct=0",
        puntosPareja1: 0,
        puntosPareja2: 0,
        jugadores1:null,
        jugadores2:null        
    },
    marcador2 : {
        liveInterval: null,
        urlScore: "https://wpt.puntuate.com/m0.aspx?ct=0",
        puntosPareja1: 0,
        puntosPareja2: 0,
        jugadores1:null,
        jugadores2:null
    }
}

module.exports = class InitLiveCommand extends Commando.Command {
    constructor(client){
        super(client, {
            name:'marcador',
            group: 'misc',
            memberName:'initlive',
            description:'init live score',
            args: [
                {
                    key:'status',
                    prompt: 'status live is ON or OFF?',
                    type:'string'
                },
                {
                    key:'Marcador',
                    prompt:'Que marcador quieres arrancar?',
                    type:'string'
                }
            ]
            
        })
        
    }

    

    async run(message, {status, Marcador}){
        message.reply(`Live Marcador ${Marcador} ${status}`);
        (async () => {
            //fs.copyFile(
            await captureWebsite.file('https://www.worldpadeltour.com/', `.//Resources//screenshoots//marcador1.png`);})();
            const suplovanie = new Discord.MessageAttachment(`.//Resources//screenshoots//marcador1.png`)
            message.channel.send(suplovanie);
            message.reply(marcadores.marcador1.urlScore)
            
        

        if (status.toUpperCase() === 'ON'){
            console.log(`Está corriendo el bot`)
            if (Marcador === '1') {
                console.log(`marcador 1`)
                marcadores.marcador1.liveInterval = setInterval( () => {
                    this.tratamientoJsonMarcadorToText(message);
            }, 10000);
            
 //           message.channel.messages.fetch().then((results) => {
   //             message.channel.bulkDelete(results)
    //        })
                /*
                marcadores.marcador1.liveInterval = setInterval( () => {
                    scraper(marcadores.marcador1.urlScore).then( marcadorResult => {
                        //72 y 73
                        if (marcadores.marcador1.puntosPareja1 !== marcadorResult.enjuego.pareja1 ||
                            marcadores.marcador1.puntosPareja2 !== marcadorResult.enjuego.pareja2){
                                
                                this.tratamientoJsonMarcadorToText(Marcador, marcadorResult, message);
                                this.tratamientoJsonMarcadorToVoice(Marcador, marcadorResult, message, marcadores.marcador1);
                                
                                marcadores.marcador1.puntosPareja1 = marcadorResult.enjuego.pareja1;
                                marcadores.marcador1.puntosPareja2 = marcadorResult.enjuego.pareja2;
                            } //
                        
                         }).catch(console.error); 
                }, 3000);*/
            } else if (Marcador === '2'){
                marcadores.marcador2.liveInterval = setInterval( () => {
                    scraper(marcadores.marcador2.urlScore).then( marcadorResult => {
                        
                        marcadorResult.jugadores.pareja1.jugador1 = "ALEJANDRA SALAZAR"
                        marcadorResult.jugadores.pareja1.jugador2 = "GEMMA TRIAY"
                        marcadorResult.jugadores.pareja2.jugador1 = "LUCIA SAINZ"
                        marcadorResult.jugadores.pareja2.jugador2 = "BEATRIZ GONZALEZ"    

                        marcadorResult.enjuego.pareja1 = "15"
                        marcadorResult.enjuego.pareja2 = "0"

                        if (marcadores.marcador2.puntosPareja1 !== marcadorResult.enjuego.pareja1 ||
                            marcadores.marcador2.puntosPareja2 !== marcadorResult.enjuego.pareja2){
                                this.tratamientoJsonMarcadorToText(Marcador, marcadorResult, message);
                                this.tratamientoJsonMarcadorToVoice(Marcador, marcadorResult, message, marcadores.marcador2);
                                
                                marcadores.marcador2.puntosPareja1 = marcadorResult.enjuego.pareja1;
                                marcadores.marcador2.puntosPareja2 = marcadorResult.enjuego.pareja2;
                            }        
                        
                            console.log(marcadores);                            
                    }).catch(console.error); 
                }, 5000);
            }         
        } else{
            const logo = 'https://yt3.ggpht.com/ytc/AAUvwng-TdmqhS19tic2CtMBp1tdg5RUJraADJ5NhJWTcw=s900-c-k-c0x00ffffff-no-rj'
            const logo1 ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNtuMBQfpYIRmFfQhAvDQCx9swVW6EdAJXQ&usqp=CAU'
            //const logo2 = 'https://www.worldpadeltour.com/marcador/'
            const embed = new Discord.MessageEmbed()
            .setTitle('Marcador apagado!')
            .setColor('#FF0000')
         //   .setAuthor(client.user.username, client.user.avatarURL)
            .setThumbnail(logo1)
            //.setImage(logo2)
            .setFooter('Marcador World Padel Tour', logo)
            .addFields(
                {
                    name: 'Está apagado el marcador',
                    value: 'Si quiere encenderlo escriba **!marcador**',
                    inline: false,
                }
            )
            .addField('👇👇👇', '[Más marcadores aquí](https://www.worldpadeltour.com/marcador/)',true)
            .setTimestamp()


            message.channel.send(embed)
            
            /*
            if (Marcador === '1') {
                clearInterval(marcadores.marcador1.liveInterval);
            } else {
                clearInterval(marcadores.marcador2.liveInterval);
            }   */         
        }    
    }


    tratamientoJsonMarcadorToText(message){
       /* var result = marcadorResult;           
        
        //109 a 116
        result.jugadores.pareja1.jugador1 = "Alejandra Salazar"
        result.jugadores.pareja1.jugador2 = "Gemma Triay"
        result.jugadores.pareja2.jugador1 = "Lucía Sainz"
        result.jugadores.pareja2.jugador2 = "Bea Gonzalez"
        
    
        result.sets.set1.pareja1 = 1;
    
        var resultados = `\n***__${marcador} - ${result.torneo.patrocinador} __***\n`
        resultados += `**${result.jugadores.pareja1.jugador1}/${result.jugadores.pareja1.jugador2}** => ${result.enjuego.pareja1} \n` 
        resultados += `**${result.jugadores.pareja2.jugador1}/${result.jugadores.pareja2.jugador2}** => ${result.enjuego.pareja2} \n`
        if (result.sets.set1.pareja1 != '0' | result.sets.set1.pareja2 != '0') resultados += `**__Set 1:__** ${result.sets.set1.pareja1} - ${result.sets.set1.pareja2} \n`
        if (result.sets.set2.pareja1 != '0' | result.sets.set2.pareja2 != '0') resultados += `**__Set 2:__** ${result.sets.set2.pareja1} - ${result.sets.set2.pareja2} \n`
        if (result.sets.set3.pareja1 != '0' | result.sets.set3.pareja2 != '0') resultados += `**__Set 3:__** ${result.sets.set3.pareja1} - ${result.sets.set3.pareja2} \n`            
                  
        message.reply(resultados);*/

        const logo = 'https://yt3.ggpht.com/ytc/AAUvwng-TdmqhS19tic2CtMBp1tdg5RUJraADJ5NhJWTcw=s900-c-k-c0x00ffffff-no-rj'
            const logo1 ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNtuMBQfpYIRmFfQhAvDQCx9swVW6EdAJXQ&usqp=CAU'
            //const logo2 = 'https://www.worldpadeltour.com/marcador/'
            const embed = new Discord.MessageEmbed()
            .setTitle('Marcador en directo!')
            .setDescription('__Torneo Alicante__')
            .setColor('#00AAFF')
         //   .setAuthor(client.user.username, client.user.avatarURL)
            .setThumbnail(logo1)
          //  .attachFile(suplovanie)
            //.setImage(marcadores.marcador1.urlScore)
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
         //   message.reply(file=File(`.//Resources//screenshoots//marcador${suma}.png`))
    }
    

    tratamientoJsonMarcadorToVoice(marcador, marcadorResult, message, marcadores){        
        const { voice } = message.member

        if (!voice.channelID){
            message.reply('You must be in a voice channel')
            return
        }

        let stringAudio = ''; 
        
        if (marcador === '1'){
            stringAudio = 'Marcador1.m4a'
        } else {
            stringAudio = 'Marcador2.m4a'
        }
                
        if ((marcadores.jugadores1 !== formateoPareja(marcadorResult.jugadores.pareja1)) ||
            (marcadores.jugadores2 !== formateoPareja(marcadorResult.jugadores.pareja2)))
            {
                let audioInicio = encontrarAudioGenerico('audioInicio');
                let audioPareja1Jugador1 = encontrarAudioJugador(marcadorResult.jugadores.pareja1.jugador1);
                let audioPareja1Jugador2 = encontrarAudioJugador(marcadorResult.jugadores.pareja1.jugador2);
                let audioPareja2Jugador1 = encontrarAudioJugador(marcadorResult.jugadores.pareja2.jugador1);
                let audioPareja2Jugador2 = encontrarAudioJugador(marcadorResult.jugadores.pareja2.jugador2);

                voice.channel.join().then((connection) =>{
                    connection.play(path.join(__dirname, audioInicio))
                    connection.play(path.join(__dirname, audioPareja1Jugador1))
                    connection.play(path.join(__dirname, audioPareja1Jugador2))
                    connection.play(path.join(__dirname, audioPareja2Jugador1))
                    connection.play(path.join(__dirname, audioPareja2Jugador2))                    
                })

                marcadores.jugadores1 = formateoPareja(marcadorResult.jugadores.pareja1);
                marcadores.jugadores2 = formateoPareja(marcadorResult.jugadores.pareja2);
            } else {
                let audioY = encontrarAudioGenerico('audioY');                
                let audioJugador1;
                let audioJugador2;

                if (marcadores.jugadores1 !== formateoPareja(marcadorResult.jugadores.pareja1)){
                    audioJugador1 = encontrarAudioJugador(marcadorResult.jugadores.pareja1.jugador1);
                    audioJugador2 = encontrarAudioJugador(marcadorResult.jugadores.pareja1.jugador2);                    
                } else {
                    audioJugador1 = encontrarAudioJugador(marcadorResult.jugadores.pareja2.jugador1);
                    audioJugador2 = encontrarAudioJugador(marcadorResult.jugadores.pareja2.jugador2);
                }

                voice.channel.join().then((connection) =>{
                    connection.play(path.join(__dirname, audioPuntoDe))
                    connection.play(path.join(__dirname, audioJugador1))
                    connection.play(path.join(__dirname, audioY))
                    connection.play(path.join(__dirname, audioJugador2))                   
                })
            }               
    }

    formateoPareja(pareja){
        return `**${pareja.jugador1}/${pareja.jugador2}**`
    }


    encontrarAudioGenerico(nombreAudio){

    }

    encontrarAudioJugador(nombreJugador) {

    }


    vozcelestial(voiceChannel, text) {          
        if (!fs.existsSync('./temp')){
            fs.mkdirSync('./temp');
        }
        const timestamp = new Date().getTime();
        const soundPath = `./temp/${timestamp}.wav`;
        say.export(text, null, 1, soundPath, (err) => {
            if (err) {
                console.error(err);
                return;
            }else{
                voiceChannel.join().then((connection) => {
                    connection.play(soundPath).on('end', () => {
                        connection.disconnect();
                        fs.unlinkSync(soundPath);
                    }).on('error', (err) => {
                        console.error(err);
                        connection.disconnect();
                        fs.unlinkSync(soundPath);
                    });
                }).catch((err) => {
                    console.error(err);
                });
            }
        });        
    }

    pruebaText(voicechannel, text){

        say.speak(text)
    }
}
