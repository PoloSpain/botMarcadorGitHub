const scraper = require('../../utilidades/scrapingMarcador')
const path = require('path')
const Commando = require('discord.js-commando')
const urlScore1 = "https://wpt.puntuate.com/m0.aspx?ct=0";
const urlScore2 = "https://wpt.puntuate.com/m0.aspx?ct=1";

let liveInterval1;
let liveInterval2;

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

        if (status === 'on'){
            if (Marcador === '1') {
                liveInterval1 = setInterval(() => {
                    scraper(Marcador, urlScore1).then( marcadorResult => {
                        
                        let sendText = this.tratamientoJsonMarcadorToText(Marcador, marcadorResult);
                        let sendVoice = this.tratamientoJsonMarcadorToVoice(Marcador, marcadorResult);
    
                        message.reply(sendText)                   
                        
                        /*
                        const { voice } = message.member
                
                        if (!voice.channelID){
                            message.reply('You must be in a voice channel')
                            return
                        }
        
                        voice.channel.join().then((connection) =>{
                            connection.play(path.join(__dirname, sendVoice))
                        })       
                        */         
                    }).catch(console.error); 
                }, 60000);
            } else if (Marcador === '2'){
                liveInterval2 = setInterval(() => {
                    scraper(urlScore2).then( marcadorResult => {
                        
                        let sendText = this.tratamientoJsonMarcadorToText(Marcador, marcadorResult);
                        let sendVoice = this.tratamientoJsonMarcadorToVoice(Marcacdor, marcadorResult);
    
                        message.reply(sendText)                   
                        /*
                        const { voice } = message.member
                
                        if (!voice.channelID){
                            message.reply('You must be in a voice channel')
                            return
                        }
        
                        voice.channel.join().then((connection) =>{
                            connection.play(path.join(__dirname, sendVoice))
                        })     
                        */           
                    }).catch(console.error); 
                }, 60000);
            }           
        } else{
            if (Marcador === '1') {
                clearInterval(liveInterval1);
            } else {
                clearInterval(liveInterval2);
            }            
        }
    }

    tratamientoJsonMarcadorToText(marcador, marcadorResult){
        var result = marcadorResult;           
        
        /*
        result.jugadores.pareja1.pareja1a = "Alejandra Salazar"
        result.jugadores.pareja1.pareja1b = "Gemma Triay"
        result.jugadores.pareja2.pareja2a = "Lucía Sainz"
        result.jugadores.pareja2.pareja2b = "Bea Gonzalez"
    
        result.sets.set1.pareja1 = 1;
    */
        var resultados = `\n***__${marcador} - ${result.torneo.patrocinador} __***\n`
        resultados += `**${result.jugadores.pareja1.pareja1a}/${result.jugadores.pareja1.pareja1b}** => ${result.enjuego.pareja1} \n` 
        resultados += `**${result.jugadores.pareja2.pareja2a}/${result.jugadores.pareja2.pareja2b}** => ${result.enjuego.pareja2} \n`
        if (result.sets.set1.pareja1 != '0' | result.sets.set1.pareja2 != '0') resultados += `**__Set 1:__** ${result.sets.set1.pareja1} - ${result.sets.set1.pareja2} \n`
        if (result.sets.set2.pareja1 != '0' | result.sets.set2.pareja2 != '0') resultados += `**__Set 2:__** ${result.sets.set2.pareja1} - ${result.sets.set2.pareja2} \n`
        if (result.sets.set3.pareja1 != '0' | result.sets.set3.pareja2 != '0') resultados += `**__Set 3:__** ${result.sets.set3.pareja1} - ${result.sets.set3.pareja2} \n`            
                  
        return resultados;
    }

    tratamientoJsonMarcadorToVoice(marcador, marcadorResult){
        var result = marcadorResult;           
        
        /*
        result.jugadores.pareja1.pareja1a = "Alejandra Salazar"
        result.jugadores.pareja1.pareja1b = "Gemma Triay"
        result.jugadores.pareja2.pareja2a = "Lucía Sainz"
        result.jugadores.pareja2.pareja2b = "Bea Gonzalez"
    
        result.sets.set1.pareja1 = 1;
    */
        var resultados = `**${result.jugadores.pareja1.pareja1a}/${result.jugadores.pareja1.pareja1b}** => ${result.enjuego.pareja1} \n` 
        resultados += `**${result.jugadores.pareja2.pareja2a}/${result.jugadores.pareja2.pareja2b}** => ${result.enjuego.pareja2} \n`
        if (result.sets.set1.pareja1 != '0' | result.sets.set1.pareja2 != '0') resultados += `**__Set 1:__** ${result.sets.set1.pareja1} - ${result.sets.set1.pareja2} \n`
        if (result.sets.set2.pareja1 != '0' | result.sets.set2.pareja2 != '0') resultados += `**__Set 2:__** ${result.sets.set2.pareja1} - ${result.sets.set2.pareja2} \n`
        if (result.sets.set3.pareja1 != '0' | result.sets.set3.pareja2 != '0') resultados += `**__Set 3:__** ${result.sets.set3.pareja1} - ${result.sets.set3.pareja2} \n`            
                  
        return resultados;
    }
}