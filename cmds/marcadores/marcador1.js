const scraper = require('../../utilidades/scrapingMarcador')
const path = require('path')
const Commando = require('discord.js-commando')
const config = require('../../config.json')
const sendMessageImg = require('../../utilidades/enviarMensajeImg')
const sendMessageText = require('../../utilidades/enviarMensajeText')

let marcador = {
        numMarcador: 1,
        liveInterval: null,
        urlScore: config.urlMarcador1,
        puntosPareja1: 0,
        puntosPareja2: 0,
        jugadores1:null,
        jugadores2:null,
        msgIMGId:null,
        msgTEXTId:null,
        status: 'OFF'           
}

module.exports = class InitLiveCommand extends Commando.Command {
    constructor(client){
        super(client, {
            name:'marcador1',
            group: 'marcadores',
            memberName:'marcador1',
            description:'init live score'            
        })
    }   

    async run(message){       
        message.delete()         
        if (marcador.status === 'OFF'){   
            marcador.status = 'ON';
            marcador.liveInterval = setInterval( () => {
                console.log(marcador.urlScore)
                scraper(marcador.numMarcador, marcador.urlScore).then( marcadorResult => {               

                    if (marcador.puntosPareja1 !== marcadorResult.enjuego.pareja1 ||
                        marcador.puntosPareja2 !== marcadorResult.enjuego.pareja2){
                            sendMessageImg(message, marcador, this.client);
                            sendMessageText(marcador, marcadorResult, message, this.client)
                            //sendMessageVoz()
                            marcador.puntosPareja1 = marcadorResult.enjuego.pareja1;
                            marcador.puntosPareja2 = marcadorResult.enjuego.pareja2;
                        }
                            
                    }).catch(console.error); 
                }, 60000);
        } else{
            clearInterval(marcador.liveInterval);   
            
            marcador = {
                numMarcador: 1,
                liveInterval: null,
                urlScore: config.urlMarcador1,
                puntosPareja1: 0,
                puntosPareja2: 0,
                jugadores1:null,
                jugadores2:null,
                msgIMGId:null,
                msgTEXTId:null,
                status: 'OFF'           
            }
        }    

        message.channel.send(`Marcador ${marcador.numMarcador} Live ${marcador.status}`);
        console.log(`Marcador ${marcador.numMarcador} Live ${marcador.status}`);
    }   
}