var config_new = {
  project_name: "new",
  
  degreedays: 2228,
  heating_MWT: 40.0,
  
  T: {
    external: -3.0,
    ground: 10.0,
    unheated: 10.0
  },

 orientationContribution : {
  S : 0,
  SW : 0.05,
  W: 0.1,
  NW: 0.15,
  N: 0.2,
  NE:  0.15,
  E:  0.1,
  SE: 0.05,
  not_appl : 1
 },

  element_type: {
    "Pavimento": { uvalue:0.6 },
    "Soffitto": { uvalue:0.15 },
    "Parete:Esterna": { uvalue:0.3 },
    "Parete:Interna": { uvalue:1.7 },
    "Finestra": { uvalue:1.6 },
    "Porta": { uvalue:1.6 }
  },
  
  rooms: {
   "senza_nome":{
      temperature: 20.0,
      area: 0.0, 
      height: 0.0,
      air_change_an_hour: 1.0,
      
      elements: [
      ],
      
      radiators: [
      ],
      
      ufh: [
      ]
    }
  }
};
