
// To be localized:
boundaryType = [];

/*
boundaryType["external"] = "external";
boundaryType["ground"] = "ground";
boundaryType["unheated"] = "unheated";
*/


/*

  {
    external: -3.0,
    ground: 10.0,
    unheated: 10.0
  },

*/
boundaryType["external"] = "esterno";
boundaryType["ground"] = "terreno";
boundaryType["unheated"] = "non_riscaldato";


localT = {};
localT[boundaryType["external"]] = -3.0;
localT[boundaryType["ground"]] = 10.0;
localT[boundaryType["unheated"]] = 10.0;

/////////////////////////////////////

//var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var months = ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];

/////////////////////////////////////

generalElementType = {}
generalElementType["Wall:external"] = { uvalue:1.7 };
generalElementType["Wall:internal"] = { uvalue:1.7 };
generalElementType["Wall:party"] = { uvalue:0.5 };
generalElementType["Floor:first"] = { uvalue:1.7 };
generalElementType["Floor:loft"] = { uvalue:0.18 };
generalElementType["Floor:InsulatedGround"] = { uvalue:0.32 };
generalElementType["Floor:ground"] = { uvalue:1.0 };
generalElementType["Glazing:double"] = { uvalue:3.1 };


// config.element_type: localElementType, // localized
// e.uvalue = config.element_type[e.type].uvalue

localElementType = {}
localElementType["Parete:esterna"] = generalElementType["Wall:external"];
localElementType["Parete:interna"] = generalElementType["Wall:internal"];
localElementType["Parete:condivisa"] = generalElementType["Wall:party"];
localElementType["Piano:Primo"] = generalElementType["Floor:first"];
localElementType["Piano:Loft"] = generalElementType["Floor:loft"];
localElementType["Piano:terraIsolato"] = generalElementType["Floor:InsulatedGround"];
localElementType["Piano:terra"] = generalElementType["Floor:ground"];
localElementType["Vetri:Doppi"] = generalElementType["Glazing:double"];
