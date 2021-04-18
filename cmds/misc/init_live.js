const scraper = require('../../utilidades/scrapingMarcador')
const path = require('path')
const Commando = require('discord.js-commando')

const fs = require('fs')
const say = require('say');
const jugadoresAudios = require("../../Resources/jsonAudios/jugadoresAudios.json");
const genericosAudios = require("../../Resources/jsonAudios/genericosAudios.json");

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
        urlScore: "https://wpt.puntuate.com/m0.aspx?ct=1",
        puntosPareja1: 0,
        puntosPareja2: 0,
        jugadores1:null,
        jugadores2:null
    },
    marcador3 : {
        liveInterval: null,
        urlScore: "https://wpt.puntuate.com/m0.aspx?ct=1",
        puntosPareja1: 0,
        puntosPareja2: 0,
        jugadores1:null,
        jugadores2:null
    }
}

module.exports = class InitLiveCommand extends Commando.Command {
    constructor(client){
        super(client, {
            name:'initlive',
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
        this.client.channels.cache.get(marcadores.marcador1.channelId).send("SUPER MENSAJES");

        if (status.toUpperCase() === 'ON'){
            if (Marcador === '1') {
                marcadores.marcador1.liveInterval = setInterval( () => {
                    scraper(Marcador, marcadores.marcador1.urlScore).then( marcadorResult => {
                        
                        marcadorResult.jugadores.pareja1.jugador1 = "ALEJANDRA SALAZAR"
                        marcadorResult.jugadores.pareja1.jugador2 = "GEMMA TRIAY"
                        marcadorResult.jugadores.pareja2.jugador1 = "LUCIA SAINZ"
                        marcadorResult.jugadores.pareja2.jugador2 = "BEATRIZ GONZALEZ"    

                        if (marcadores.marcador1.puntosPareja1 !== marcadorResult.enjuego.pareja1 ||
                            marcadores.marcador1.puntosPareja2 !== marcadorResult.enjuego.pareja2){
                                this.tratamientoJsonMarcadorToText(Marcador, marcadorResult, message);
                               // this.tratamientoJsonMarcadorToVoice(Marcador, marcadorResult, message, marcadores.marcador1);
                                
                                marcadores.marcador1.puntosPareja1 = marcadorResult.enjuego.pareja1;
                                marcadores.marcador1.puntosPareja2 = marcadorResult.enjuego.pareja2;
                            }
                            
                    }).catch(console.error); 
                }, 60000);
            } else if (Marcador === '2'){
                marcadores.marcador2.liveInterval = setInterval(() => {
                    scraper(marcadores.marcador2.urlScore).then( marcadorResult => {
                        if (marcadores.marcador2.puntosPareja1 !== marcadorResult.enjuego.pareja1 ||
                            marcadores.marcador2.puntosPareja2 !== marcadorResult.enjuego.pareja2){
                                this.tratamientoJsonMarcadorToText(Marcador, marcadorResult, message);
                                //this.tratamientoJsonMarcadorToVoice(Marcador, marcadorResult, message, marcadores.marcador2);

                                marcadores.marcador2.puntosPareja1 = marcadorResult.enjuego.pareja1;
                                marcadores.marcador2.puntosPareja2 = marcadorResult.enjuego.pareja2;
                            }                            
                    }).catch(console.error); 
                }, 60000);
            }  else if (Marcador === '3'){
                marcadores.marcador3.liveInterval = setInterval(() => {
                    scraper(marcadores.marcador3.urlScore).then( marcadorResult => {
                        if (marcadores.marcador3.puntosPareja1 !== marcadorResult.enjuego.pareja1 ||
                            marcadores.marcador3.puntosPareja2 !== marcadorResult.enjuego.pareja2){
                                this.tratamientoJsonMarcadorToText(Marcador, marcadorResult, message);
                                //this.tratamientoJsonMarcadorToVoice(Marcador, marcadorResult, message, marcadores.marcador2);

                                marcadores.marcador3.puntosPareja1 = marcadorResult.enjuego.pareja1;
                                marcadores.marcador3.puntosPareja2 = marcadorResult.enjuego.pareja2;
                            }                            
                    }).catch(console.error); 
                }, 60000);
            }         
        } else{
            if (Marcador === '1') {
                clearInterval(marcadores.marcador1.liveInterval);
            } else if (Marcador === '2') {
                clearInterval(marcadores.marcador2.liveInterval);
            }  else if (Marcador === '3') {
                clearInterval(marcadores.marcador3.liveInterval);
            }            
        }    
    }    

    tratamientoJsonMarcadorToText(marcador, marcadorResult, message){
        var result = marcadorResult;                   

        var resultados = `\n***__${marcador} - ${result.torneo.patrocinador} __***\n`
        resultados += `**${result.jugadores.pareja1.jugador1}/${result.jugadores.pareja1.jugador2}** => ${result.enjuego.pareja1} \n` 
        resultados += `**${result.jugadores.pareja2.jugador1}/${result.jugadores.pareja2.jugador2}** => ${result.enjuego.pareja2} \n`
        if (result.sets.set1.pareja1 != '0' | result.sets.set1.pareja2 != '0') resultados += `**__Set 1:__** ${result.sets.set1.pareja1} - ${result.sets.set1.pareja2} \n`
        if (result.sets.set2.pareja1 != '0' | result.sets.set2.pareja2 != '0') resultados += `**__Set 2:__** ${result.sets.set2.pareja1} - ${result.sets.set2.pareja2} \n`
        if (result.sets.set3.pareja1 != '0' | result.sets.set3.pareja2 != '0') resultados += `**__Set 3:__** ${result.sets.set3.pareja1} - ${result.sets.set3.pareja2} \n`            
                  
        message.reply(`Marcador ${marcador}`, {files: [path.join(__dirname,`../../Resources/screenshoots/Marcador${marcador}.png`)]});
    }

    tratamientoJsonMarcadorToVoice(marcador, marcadorResult, message, marcadores){    
        const { voice } = message.member

        if (!voice.channelID){
            message.reply('You must be in a voice channel')
            return
        }

        let audioMarcador = ''; 
        
        if (marcador === '1'){
            audioMarcador = this.encontrarAudioGenerico('AUDIOMARCADOR1');
        } else {
            audioMarcador = this.encontrarAudioGenerico('AUDIOMARCADOR2');
        }
                
        if ((marcadores.jugadores1 !== this.formateoPareja(marcadorResult.jugadores.pareja1)) ||
            (marcadores.jugadores2 !== this.formateoPareja(marcadorResult.jugadores.pareja2)))
            {
                let audioInicio = this.encontrarAudioGenerico('AUDIOINICIO');
                let audioContra = this.encontrarAudioGenerico('AUDIOCONTRA');
                let audioPareja1Jugador1 = this.encontrarAudioJugadorLargo(marcadorResult.jugadores.pareja1.jugador1);
                let audioPareja1Jugador2 = this.encontrarAudioJugadorLargo(marcadorResult.jugadores.pareja1.jugador2);
                let audioPareja2Jugador1 = this.encontrarAudioJugadorLargo(marcadorResult.jugadores.pareja2.jugador1);
                let audioPareja2Jugador2 = this.encontrarAudioJugadorLargo(marcadorResult.jugadores.pareja2.jugador2);
                
                voice.channel.join().then(async (connection) =>{
                    await this.reproducirAudio(connection, audioInicio)                    
                    await this.reproducirAudio(connection, audioPareja1Jugador1)
                    await this.reproducirAudio(connection, audioPareja1Jugador2)
                    await this.reproducirAudio(connection, audioContra)
                    await this.reproducirAudio(connection, audioPareja2Jugador1)
                    await this.reproducirAudio(connection, audioPareja2Jugador2)                                        
                })
                
                marcadores.jugadores1 = this.formateoPareja(marcadorResult.jugadores.pareja1);
                marcadores.jugadores2 = this.formateoPareja(marcadorResult.jugadores.pareja2);
            } else {

                let audioPuntoDe = this.encontrarAudioGenerico('AUDIOPUNTODE');                                 
                let audioJugador1;
                let audioJugador2;
                let puntoEquipo1 = this.encontrarAudioGenerico(marcadorResult.enjuego.pareja1);
                let puntoEquipo2 = this.encontrarAudioGenerico(marcadorResult.enjuego.pareja2);

                if (marcadores.puntosPareja1 !== marcadorResult.enjuego.pareja1){
                    audioJugador1 = this.encontrarAudioJugadorCorto(marcadorResult.jugadores.pareja1.jugador1);
                    audioJugador2 = this.encontrarAudioJugadorCorto(marcadorResult.jugadores.pareja1.jugador2); 
                } else {
                    audioJugador1 = this.encontrarAudioJugadorCorto(marcadorResult.jugadores.pareja2.jugador1);
                    audioJugador2 = this.encontrarAudioJugadorCorto(marcadorResult.jugadores.pareja2.jugador2);
                }

                voice.channel.join().then(async (connection) =>{
                    await this.reproducirAudio(connection, audioPuntoDe)     
                    await this.reproducirAudio(connection, audioJugador1)     
                    await this.reproducirAudio(connection, audioJugador2)  
                    await this.reproducirAudio(connection, puntoEquipo1)  
                    await this.reproducirAudio(connection, puntoEquipo2)                                          
                })           
            }              
    }

    reproducirAudio = async (connection, stringAudio) => {         
        const dispatcher = connection.play(path.join(__dirname,'../../Resources/audios/' + stringAudio))

        await new Promise(resolve => dispatcher.on('finish',resolve));                  
    }

    formateoPareja(pareja){
        return `**${pareja.jugador1}/${pareja.jugador2}**`
    }

    encontrarAudioGenerico(nombreAudio){
        let jugador = genericosAudios.find( record => record.nombre === nombreAudio)        
     
        return jugador.audio;
    }

    encontrarAudioJugadorLargo(nombreJugador) {
        let jugador = jugadoresAudios.find( record => record.nombre === nombreJugador)        
     
        return jugador.audios.largo;
    }

    encontrarAudioJugadorCorto(nombreJugador) {
        let jugador = jugadoresAudios.find( record => record.nombre === nombreJugador)        
     
        return jugador.audios.corto;
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
}