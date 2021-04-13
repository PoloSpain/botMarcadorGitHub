const scraper = require('../../utilidades/scrapingMarcador')
const path = require('path')
const Commando = require('discord.js-commando')
const fs = require('fs')
const say = require('say');

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
            name:'initlivelocal',
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

        const { voice } = message.member

        if (!voice.channelID){
            message.reply('You must be in a voice channel')
            return
        }

        this.vozcelestial(voice.channel,"Esta apunto de empezar el partido: ");
        this.vozcelestial(voice.channel,"Alejandra Salazar ");
               /* this.vozcelestial(voice.channel,"y");
                this.vozcelestial(voice.channel,"Gemma Triay");
                this.vozcelestial(voice.channel,"contra");
                this.vozcelestial(voice.channel,"Lucia Sainz");
                this.vozcelestial(voice.channel,"y");
                this.vozcelestial(voice.channel,"Bea Gonzalez");*/

        if (status.toUpperCase() === 'ON'){
            if (Marcador === '1') {
                marcadores.marcador1.liveInterval = setInterval( () => {
                    scraper(marcadores.marcador1.urlScore).then( marcadorResult => {
                        
                        /*if (marcadores.marcador1.puntosPareja1 !== marcadorResult.enjuego.pareja1 ||
                            marcadores.marcador1.puntosPareja2 !== marcadorResult.enjuego.pareja2){*/
                                this.tratamientoJsonMarcadorToText(Marcador, marcadorResult, message);
                                this.tratamientoJsonMarcadorToVoice(Marcador, marcadorResult, message, marcadores.marcador1);
                                
                                marcadores.marcador1.puntosPareja1 = marcadorResult.enjuego.pareja1;
                                marcadores.marcador1.puntosPareja2 = marcadorResult.enjuego.pareja2;
                            /*}                           */
                        
                    }).catch(console.error); 
                }, 60000);
            } else if (Marcador === '2'){
                marcadores.marcador2.liveInterval = setInterval(() => {
                    scraper(marcadores.marcador2.urlScore).then( marcadorResult => {
                        /*if (marcadores.marcador2.puntosPareja1 !== marcadorResult.enjuego.pareja1 ||
                            marcadores.marcador2.puntosPareja2 !== marcadorResult.enjuego.pareja2){*/
                                this.tratamientoJsonMarcadorToText(Marcador, marcadorResult, message);
                                this.tratamientoJsonMarcadorToVoice(Marcador, marcadorResult, message, marcadores.marcador2);

                                marcadores.marcador2.puntosPareja1 = marcadorResult.enjuego.pareja1;
                                marcadores.marcador2.puntosPareja2 = marcadorResult.enjuego.pareja2;
                           /* }      */                       
                    }).catch(console.error); 
                }, 60000);
            }           
        } else{
            if (Marcador === '1') {
                clearInterval(marcadores.marcador1.liveInterval);
            } else {
                clearInterval(marcadores.marcador2.liveInterval);
            }            
        }    
    }

    tratamientoJsonMarcadorToText(marcador, marcadorResult, message){
        var result = marcadorResult;           
        
        /*
        result.jugadores.pareja1.pareja1a = "Alejandra Salazar"
        result.jugadores.pareja1.pareja1b = "Gemma Triay"
        result.jugadores.pareja2.pareja2a = "Lucía Sainz"
        result.jugadores.pareja2.pareja2b = "Bea Gonzalez"
    
        result.sets.set1.pareja1 = 1;
    */
        var resultados = `\n***__${marcador} - ${result.torneo.patrocinador} __***\n`
        resultados += `**${result.jugadores.pareja1.jugador1}/${result.jugadores.pareja1.jugador2}** => ${result.enjuego.pareja1} \n` 
        resultados += `**${result.jugadores.pareja2.jugador1}/${result.jugadores.pareja2.jugador2}** => ${result.enjuego.pareja2} \n`
        if (result.sets.set1.pareja1 != '0' | result.sets.set1.pareja2 != '0') resultados += `**__Set 1:__** ${result.sets.set1.pareja1} - ${result.sets.set1.pareja2} \n`
        if (result.sets.set2.pareja1 != '0' | result.sets.set2.pareja2 != '0') resultados += `**__Set 2:__** ${result.sets.set2.pareja1} - ${result.sets.set2.pareja2} \n`
        if (result.sets.set3.pareja1 != '0' | result.sets.set3.pareja2 != '0') resultados += `**__Set 3:__** ${result.sets.set3.pareja1} - ${result.sets.set3.pareja2} \n`            
                  
        message.reply(resultados);
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