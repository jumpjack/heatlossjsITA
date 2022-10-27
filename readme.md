# HeatLossJS

Calcolatore di dispersione di calore di edifici - localizzazione in italiano e predisposizione per altre lingue.

Il tool permette di calcolare quanti kW di energia vengono emessi da ogni stanza verso l'esterno, e quindi quanta potenza riscaldante è necessaria per mantenere una casa alla temperatura deisderata, e quanta energia si consuma in un anno per farlo.

------------

Riferimento per **valori di trasmittanza** (U-value) di vari tipi di muri: https://mcscertified.com/wp-content/uploads/2020/04/Guidance-on-U-Values-from-Domestic-Heating-Design-Guide.pdf  (disponibile anche [qui nel repository](https://github.com/jumpjack/heatlossjsITA/blob/master/Guidance-on-U-Values-from-Domestic-Heating-Design-Guide.pdf)).


Quantità usate nei calcoli:
 - U-value (trasmittanza): capacità di una parete di trasmettere il calore; espressa in W/m2K
 - [degreedays](https://degreedays.net) ("gradi-giorno): un "grado-giorno" (°D) è la differenza di temperatura tra esterno e interno della casa; sommando i "gradi-giorno" di ogni giorno dell'anno, si ottengono i "gradi-giorno annuali"

In base ai gradi-giorno calcolati per ogni località, formalizzati nel [decreto 412 del 1993](https://www.gazzettaufficiale.it/eli/id/1993/10/14/093G0451/sg) ,  l'Italia è stata suddivisa in 6 zone climatiche:

![image](https://user-images.githubusercontent.com/1620953/198236792-39a431a7-3d4d-4e30-aa0a-a452c43c81ef.png)
(fonte: [www.certifico.com](https://www.certifico.com/categorie/337-impianti/documenti-impianti/documenti-impianti-riservati/7099-zone-climatiche-tabella-a-aggiornata-d-p-r-412-1993))

File dei gradi-giorno per l'Italia: [link](https://github.com/jumpjack/heatlossjsITA/blob/master/gradigiorno.txt)

Il tool si basa anche sulla "**temperatura convenzionale**" del luogo in cui si trova la casa; nel tool originale era fissata a -3°C per Londra;  i valori per le varie città italiane sono elencati in questo [file](https://github.com/jumpjack/heatlossjsITA/blob/master/temp-IT.txt) ([fonte: Decreto del Presidente della Repubblica 1052/1977, allegato 1](https://www.gazzettaufficiale.it/eli/id/1978/02/06/077U1052/sg)).

Query Openstreetmap per ricavare coordinate geografiche dal nome di un comune (necessita [APIKEY personale](https://www.geoapify.com/openstreetmap-geocoding)): https://api.geoapify.com/v1/geocode/search?text=COMUNE&type=city&format=json&apiKey=APIKEY 

La Temperatura interna si pone uguale a 20 °C (D.P.R. 412/1993).

Il caolcolo per una stanza viene suddiviso nei calcoli per le singole pareti; le formule utlizzate per i calcoli di ogni parete sono le seguenti:

 - `uvalue = XXXXXXXX                      ` // Trasmittanza della parete in esame:                               **[W/m2K]** = [W/K] / [m2]   = Potenza/DeltaT  /  m2
 - `deltaT = roomTemperature - temperature  ` // Differenza tra temperatura della stanza in esame e quella della stanza al di là della parete in esame
 - `powerW = A * uvalue * deltaT            ` // Potenza termica istantanea dispersa (power heat loss), in Watt:   [m2] * [W/m2K] *  [K] = **[W]**
 - `energyWh = A * uvalue * degreedays * 24 ` // Energia necessaria **in un anno**, in Wh:                         [m2]  * [W/m2K] * [K] * [giorni] * [ore/giorno] = **[Wh]**

-----------------------

A small open source room by room heat loss calculator

![heatlossjs.png](heatlossjs.png)

Create html page, load heatloss.js tool with the following:

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    
    <script type="text/javascript" src="files/config_new.js"></script>
    <script type="text/javascript" src="files/bothylab_data.js"></script>
    <link rel="stylesheet" type="text/css" href="heatlossjs/style.css" />
    <div id="heatloss"></div>
    <script type="text/javascript" src="heatlossjs/model.js"></script>
    
Define your building in json object input definition (loaded in the first line above).

Examples: 

- [midterrace_data.js](files/midterrace_data.js)
- [bothylab_data.js](files/bothylab_data.js)
- [mainhouse_data.js](files/mainhouse_data.js)
- [study_data.js](files/study_data.js)

Examples with notes on input values:

- [Mid Terrace house](https://trystanlea.org.uk/roombyroomheatloss2)
- [Bothy](https://trystanlea.org.uk/bothy)
- [Detached house](https://trystanlea.org.uk/house)
