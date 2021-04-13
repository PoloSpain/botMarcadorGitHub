const puppeteer = require('puppeteer')

function run (marcadorParam, url) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();           
            
            await page.goto(url);           
            await page.waitForTimeout(3000);

            let urls = await page.evaluate(() => {
                let results = [];                

                console.log(document)
                let patrocinadorVal =  document.querySelectorAll('#textoTrama1')[0].innerText;
                let ciudadVal =  document.querySelectorAll('#textoTrama2')[0].innerText;
                let modalidadVal =  document.querySelectorAll('#textoTrama3')[0].innerText;
                let proximoVal =  document.querySelectorAll('#textoTrama4')[0].innerText;
                let diasVal =  document.querySelectorAll('#textoTrama5')[0].innerText;
                let localizacionVal =  document.querySelectorAll('#textoTrama6')[0].innerText;


                let pareja1aVal =  document.querySelectorAll('#pareja1a')[0].innerText;
                let pareja1bVal =  document.querySelectorAll('#pareja1b')[0].innerText;
                let pareja2aVal =  document.querySelectorAll('#pareja2a')[0].innerText;
                let pareja2bVal =  document.querySelectorAll('#pareja2b')[0].innerText;


                let pareja1set1 =  document.querySelectorAll('#set1Pareja1')[0].innerText;
                let pareja1set2 =  document.querySelectorAll('#set2Pareja1')[0].innerText;
                let pareja1set3 =  document.querySelectorAll('#set3Pareja1')[0].innerText;
                let pareja2set1 =  document.querySelectorAll('#set1Pareja2')[0].innerText;
                let pareja2set2 =  document.querySelectorAll('#set2Pareja2')[0].innerText;
                let pareja2set3 =  document.querySelectorAll('#set3Pareja2')[0].innerText;

                let enjuegopareja1 =  document.querySelectorAll('#enJuegoPareja1')[0].innerText;
                let enjuegopareja2 =  document.querySelectorAll('#enJuegoPareja2')[0].innerText;                
                
                results.push({
                    torneo: {
                        patrocinador: patrocinadorVal,
                        ciudad: ciudadVal,
                        modalidad: modalidadVal,
                        proximo: proximoVal,
                        dias: diasVal,
                        localizacion: localizacionVal
                    },
                    jugadores : {
                        pareja1 : {
                            pareja1a : pareja1aVal,
                            pareja1b : pareja1bVal
                        },
                        pareja2: {
                            pareja2a : pareja2aVal,
                            pareja2b : pareja2bVal
                        }
                    },
                    sets : {
                        set1 : {
                            pareja1: pareja1set1,
                            pareja2: pareja2set1
                        },
                        set2 : {
                            pareja1: pareja1set2,
                            pareja2: pareja2set2
                        },
                        set3 : {
                            pareja1: pareja1set3,
                            pareja2: pareja2set3
                        }                         
                    },
                    enjuego: {
                        pareja1: enjuegopareja1,
                        pareja2: enjuegopareja2
                    }                                  
                })

                return results[0];
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}


module.exports = run