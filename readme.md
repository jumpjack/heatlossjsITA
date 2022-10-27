# HeatLossJS

Calcolatore di dispersione di calore di edifici - localizzazione in italiano e predisposizione per altre lingue.

Riferimento per valori di trasmittanza (U-value) di vari tippi di muri: https://mcscertified.com/wp-content/uploads/2020/04/Guidance-on-U-Values-from-Domestic-Heating-Design-Guide.pdf  (disponibile anche [qui nel repository](https://github.com/jumpjack/heatlossjsITA/blob/master/Guidance-on-U-Values-from-Domestic-Heating-Design-Guide.pdf)).

Il tool permette di calcolare quanti kW di energia vengono emessi da ogni stanza verso l'esterno, e quindi quanta potenza riscaldante è necessaria per mantenere una casa alla temperatura deisderata, e quanta energia si consuma in un anno per farlo.

Quantità usate nei calcoli:
 - U-value (trasmittanza): capacità di una parete di trasmettere il calore; espressa in W/m2K
 - [degreedays](https://degreedays.net) ("gradogiorni"?!?): un "gradogiorno" (°D) è la differenza di temperatura tra esterno e interno della casa; sommando i "gradogiorni" di ogni giorno dell'anno, si ottengono i "gradogiorni annuali"


Il tool si basa anche sulla "temperatura convenzionale" del luogo in cui si trova la casa; nel tool originale era fissata a -3°C per Londra; questi sono i valori per le varie città italiane, in ordine alfabetico ([fonte: D.P.R. 1052/1977](https://www.docenti.unina.it/webdocenti-be/allegati/materiale-didattico/667663)):

- Bari 0 °C
- Bologna -5 °C
- Catania +5 °C
- Firenze 0 °C
- Foggia 0 °C
- Genova 0 °C
- Matera -2 °C
- Milano -5 °C
- Napoli +2 °C
- Novara -5 °C
- Perugia -2 °C
- Potenza -3 °C
- Reggio Calabria +3 °C
- Roma 0 °C
- Salerno +2 °C
- Sondrio -10 °C
- Torino -8 °C
- Venezia -5 °C

La Temperatura interna si pone uguale a 20 °C (D.P.R. 412/1993)

Il caolcolo per una stanza viene suddiviso nei calcoli per le singole pareti; le formule utlizzate per i calcoli di ogni parete sono le seguenti:

 - `uvalue = XXXXXXXX                      ` // Trasmittanza della parete in esame:                               **[W/m2K]** = [W/K] / [m2]   = Potenza/DeltaT  /  m2
 - `deltaT = roomTemperature - temperature  ` // Differenza tra temperatura della stanza in esame e quella della stanza al di là della parete in esame
 - `powerW = A * uvalue * deltaT            ` // Potenza termica dispersa (power heat loss), in Watt:              [m2] * [W/m2K] *  [K] = **[W]**
 - `energyWh = A * uvalue * degreedays * 24 ` // Energia necessaria in un giorno, in Wh:                           [m2]  * [W/m2K] * [K] * [giorni] * [ore/giorno] = **[Wh]**

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
