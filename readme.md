# HeatLossJS

Calcolatore di dispersione di calore di edifici - localizzazione in italiano e predisposizione per altre lingue.

Riferimento per valori di trasmittanza (U-value) di vari tippi di muri: https://mcscertified.com/wp-content/uploads/2020/04/Guidance-on-U-Values-from-Domestic-Heating-Design-Guide.pdf  (disponibile anche [qui nel repository](https://github.com/jumpjack/heatlossjsITA/blob/master/Guidance-on-U-Values-from-Domestic-Heating-Design-Guide.pdf)).

Il tool permette di calcolare quanti kW di energia vengono emessi da ogni stanza verso l'esterno, e quindi quanta potenza riscaldante è necessaria per mantenere una casa alla temperatura deisderata, e quanta energia si consuma in un anno per farlo.

Quantità usate nei calcoli:
 - U-value (trasmittanza): capacità di una parete di trasmettere il calore; espressa in W/m2K
 - [degreedays](https://degreedays.net) ("gradi-giorno): un "grado-giorno" (°D) è la differenza di temperatura tra esterno e interno della casa; sommando i "gradi-giorno" di ogni giorno dell'anno, si ottengono i "gradi-giorno annuali"

In base ai gradi-giorno calcolati per ogni località, formalizzati nel [decreto 412 del 1993](https://www.gazzettaufficiale.it/eli/id/1993/10/14/093G0451/sg,  l'Italia è stata suddivisa in 6 zone climatiche:
![image](https://user-images.githubusercontent.com/1620953/198236792-39a431a7-3d4d-4e30-aa0a-a452c43c81ef.png)
(fonte: [www.certifico.com](https://www.certifico.com/categorie/337-impianti/documenti-impianti/documenti-impianti-riservati/7099-zone-climatiche-tabella-a-aggiornata-d-p-r-412-1993))


Il tool si basa anche sulla "temperatura convenzionale" del luogo in cui si trova la casa; nel tool originale era fissata a -3°C per Londra; questi sono invece i valori per le varie città italiane, in ordine alfabetico ([fonte: Decreto del Presidente della Repubblica 1052/1977, allegato 1](https://www.gazzettaufficiale.it/eli/id/1978/02/06/077U1052/sg)):

```
Torino                       -8
Alessandria                  -8
Asti                         -8
Cuneo                       -10
Alta valle cuneese          -15
Novara                       -5
Vercelli                     -7

Aosta                       -10
Valle d'Aosta               -15
Alta Valle d'Aosta          -20

Genova                        0
Imperia                       0
La Spezia                     0
Savona                        0

Milano                       -5
Bergamo                      -5
Brescia                      -7
Como                         -5
Provincia di Como            -7
Cremona                      -5
Mantova                      -5
Pavia                        -5
Sondrio                     -10
Alta Valtellina             -13
Varese                       -5

Trento                      -12
Bolzano                     -15

Venezia                      -5
Belluno                     -10
Padova                       -3
Rovigo                       -5
Treviso                      -5
Verona                       -5

Terni                        -2

Roma                          0
Frosinone                     0
Latina                        2
Rieti                        -3
Viterbo                      -2

Napoli                        2
Avellino                     -2
Benevento                    -2
Caserta                       0
Salerno                       2

L'Aquila                     -5
Chieti                        0
Pescara                       2
Teramo                        0
Campobasso                   -4

Bari                          0
Brindisi                      0
Foggia                        0

Verona (zona lago)           -3
Verona (zona montagna)      -10
Vicenza                      -5
Vicenza (zona altopiani)    -10

Trieste                      -5
Gorizia                      -5
Pordenone                    -5
Udine                        -5
Bassa Carnia                 -7
Alta Carnia                 -10

Tarvisio                    -15
Bologna                      -5
Ferrara                      -5
Forli                        -5
Modena                       -5
Parma                        -5
Piacenza                     -5
Provincia di Piacenza        -7
Ravenna                      -5
Reggio Emilia                -5

Ancona                       -2
Ascoli Piceno                -2
Macerata                     -2
Pesaro                       -2

Firenze                       0
Arezzo                        0
Grosseto L.                   0
Livorno                       0
Lucca                         0
Massa Carrara                 0
Pisa                          0
Siena                        -2
Perugia                      -2

Lecce                         0
Taranto                       0

Potenza                      -3
Matera                       -2

Reggio Calabria               3
Catanzaro                    -2
Cosenza                      -3

Palermo                       5
Agrigento                     3
Caltanissetta                 0
Catania                       5
Enna                         -3
Messina                       5
Ragusa                        0
Siracusa                      5
Trapani                       5

Cagliari                      3
Nuoro                         0
Sassari                       2
```

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
