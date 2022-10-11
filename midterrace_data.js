var config = {
  project_name: "midterrace",
  
  degreedays: 1800,
  heating_MWT: 40.0,
  heatpump_flow_rate: 9.0,
    
  T:  localT, // Localized

  element_type: localElementType, // localized

    rooms: {
   "soggiorno":{
      temperature: 21.0,
      width: 3.4, 
      length: 6.8, 
      height: 2.4,
      air_change_an_hour: 1.5,
   
      elements: [
        {
          type:"Parete:esterna",
          orientation:"Sud",
          width:3.4, height:2.4
        },
        { 
          type:"Parete:condivisa",
          orientation:"Ovest",
          width:6.8, height:2.4,
          boundary:boundaryType["unheated"]
        },
        { 
          type:"Parete:esterna",
          orientation:"Nord",
          width:1.6, height:2.4
        },
        { 
          type:"Parete:interna",
          orientation:"Est",
          width:6.8, height:2.4,
          boundary:'hall'
        },
        { 
          type:"Piano:terraIsolato",
          width:6.8, height:3.4,
          boundary:boundaryType["ground"]
        },
        { 
          type:"Piano:Primo",
          width:6.8, height:3.4,
          boundary:'CameraLetto2'
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:0,
          width:1.8, height:1.6
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:2,
          width:1.0, height:1.5
        }
      ],

      radiators: [
          {name:"Doppio pannello a convezione 1200x600",heat50k:2146},
          {name:"Doppio pannello a convezione 1200x600",heat50k:2146},
          {name:"Doppio pannello a convezione 1200x600",heat50k:2146}
      ]
    },
    
   "hall":{
      temperature: 18.0,
      width: 1.0, 
      length: 6.8, 
      height: 2.4,
      air_change_an_hour: 2.0,
      
      elements: [
        {
          type:"Parete:esterna",
          orientation:"Sud",
          width:1.0, height:2.4
        },
        { 
          type:"Parete:interna",
          orientation:"Ovest",
          width:6.8, height:2.4,
          boundary:'soggiorno'
        },
        { 
          type:"Parete:interna",
          orientation:"Nord",
          width:1.0, height:2.4,
          boundary:'soggiorno'
        },
        { 
          type:"Parete:condivisa",
          orientation:"Est",
          width:6.8, height:2.4,
          boundary:boundaryType["unheated"]
        },
        { 
          type:"Piano:terra",
          width:6.8, height:1.0,
          boundary:boundaryType["ground"]
        },
        { 
          type:"Piano:Primo",
          width:6.8, height:1.0,
          boundary:'studio'
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:0,
          width:0.8, height:1.9
        }
      ],
      
      radiators: [{name:"Doppio pannello a convezione 1200x600",heat50k:2146}]
    },
    
   "cucina":{
      temperature: 18.0,
      width: 2.4, length: 3.0, height: 2.4,
      air_change_an_hour: 2.0,
      
      elements: [
        { 
          type:"Parete:interna",
          orientation:"Sud",
          width:2.4, height:2.4,
          boundary:'soggiorno'
        },
        { 
          type:"Parete:esterna",
          orientation:"Ovest",
          width:3.0, height:2.4
        },
        { 
          type:"Parete:esterna",
          orientation:"Nord",
          width:2.4, height:2.4
        },
        { 
          type:"Parete:condivisa",
          orientation:"Est",
          width:3.0, height:2.4,
          boundary:boundaryType["unheated"]
        },
        { 
          type:"Piano:terra",
          width:3.0, height:2.4,
          boundary:boundaryType["ground"]
        },
        { 
          type:"Piano:Primo",
          width:3.0, height:2.4,
          boundary:'bagno'
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:1,
          width:0.9, height:1.3
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:1,
          width:0.8, height:1.9
        }
      ],
      
      radiators: []
    },
    
   "CameraLetto1":{
      temperature: 18.0,
      width: 3.0, length: 3.5, height: 2.4,
      air_change_an_hour: 1.0,
      
      elements: [
        { 
          type:"Parete:interna",
          orientation:"Sud",
          width:3.0, height:2.4,
          boundary:'CameraLetto2'
        },
        { 
          type:"Parete:condivisa",
          orientation:"Ovest",
          width:3.5, height:2.4,
          boundary:boundaryType["unheated"]
        },
        { 
          type:"Parete:esterna",
          orientation:"Nord",
          width:1.6, height:2.4
        },
        { 
          type:"Parete:interna",
          orientation:"Nord",
          width:1.4, height:2.4,
          boundary:'bagno'
        },
        { 
          type:"Parete:interna",
          orientation:"Est",
          width:3.5, height:2.4,
          boundary:'ingresso'
        },
        { 
          type:"Piano:Primo",
          width:3.0, height:3.5,
          boundary:'soggiorno'
        },
        { 
          type:"Piano:Loft",
          width:3.0, height:3.5
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:2,
          width:0.9, height:1.3
        }
      ],
      
      radiators: [{name:"Double Panel Convector 1200x500",heat50k:1834}]
    },
    
   "CameraLetto2":{
      temperature: 18.0,
      width: 2.6, length: 3.2, height: 2.4,
      air_change_an_hour: 1.0,
      
      elements: [
        { 
          type:"Parete:esterna",
          orientation:"Sud",
          width:2.6, height:2.4
        },
        { 
          type:"Parete:condivisa",
          orientation:"Ovest",
          width:3.2, height:2.4,
          boundary:boundaryType["unheated"]
        },
        { 
          type:"Parete:interna",
          orientation:"Nord",
          width:2.6, height:2.4,
          boundary:'CameraLetto1'
        },
        { 
          type:"Parete:interna",
          orientation:"Est",
          width:3.2, height:2.4,
          boundary:'ingresso'
        },
        { 
          type:"Piano:Primo",
          width:2.6, height:3.2,
          boundary:'soggiorno'
        },
        { 
          type:"Piano:Loft",
          width:2.6, height:3.2
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:"32",
          width:0.9, height:1.3
        }
      ],
      
      radiators: [{name:"Double Panel Convector 1200x500",heat50k:1834}]
    },
    
   "studio":{
      temperature:21.0,
      width: 1.8, length: 2.2, height: 2.4,
      air_change_an_hour: 1.5,
      
      elements: [
        { 
          type:"Parete:esterna",
          orientation:"Sud",
          width:1.8, height:2.4
        },
        { 
          type:"Parete:interna",
          orientation:"Ovest",
          width:2.2, height:2.4,
          boundary:'CameraLetto2'
        },
        { 
          type:"Parete:interna",
          orientation:"Nord",
          width:1.8, height:2.4,
          boundary:'CameraLetto1'
        },
        { 
          type:"Parete:condivisa",
          orientation:"Est",
          width:2.2, height:2.4,
          boundary:boundaryType["unheated"]
        },
        { 
          type:"Piano:Primo",
          width:1.8, height:2.2,
          boundary:'soggiorno'
        },
        { 
          type:"Piano:Loft",
          width:1.8, height:2.2
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:0,
          width:0.8, height:1.4
        }
      ],
      
      radiators: [{name:"Double Panel Convector 1000x400",heat50k:1273}]
    },
    
   "ingresso":{
      temperature:18.0,
      width: 1.5, length: 4.4, height: 2.4,
      air_change_an_hour: 2.0,
      
      elements: [
        { 
          type:"Parete:interna",
          orientation:"Sud",
          width:1.5, height:2.4,
          boundary:'studio'
        },
        { 
          type:"Parete:interna",
          orientation:"Ovest",
          width:4.4, height:2.4,
          boundary:'CameraLetto1'
        },
        { 
          type:"Parete:interna",
          orientation:"Nord",
          width:1.5, height:2.4,
          boundary:'bagno'
        },
        { 
          type:"Parete:condivisa",
          orientation:"Est",
          width:4.4, height:2.4,
          boundary:boundaryType["unheated"]
        },
        { 
          type:"Piano:Primo",
          width:1.5, height:4.4,
          boundary:'hall'
        },
        { 
          type:"Piano:Loft",
          width:1.5, height:4.4
        }
      ]
    },
    
   "bagno":{
      temperature:22.0,
      width: 2.4, length: 3.3, height: 2.4,
      air_change_an_hour: 3.0,
      
      elements: [
        { 
          type:"Parete:interna",
          orientation:"Sud",
          width:2.4, height:2.4,
          boundary:'ingresso'
        },
        { 
          type:"Parete:esterna",
          orientation:"Ovest",
          width:3.3, height:2.4
        },
        { 
          type:"Parete:esterna",
          orientation:"Nord",
          width:2.4, height:2.4
        },
        { 
          type:"Parete:condivisa",
          orientation:"Est",
          width:3.3, height:2.4,
          boundary:boundaryType["unheated"]
        },
        { 
          type:"Piano:Primo",
          width:2.4, height:3.3,
          boundary:'cucina'
        },
        { 
          type:"Piano:Loft",
          width:2.4, height:3.3
        },
        {
          type:"Vetri:Doppi",
          subtractfrom:2,
          width:0.8, height:0.9
        }
      ],
      
      radiators: [
          {name:"Doppio pannello a convezione 800x600",heat50k:1430}
      ]
    }
  }
};
