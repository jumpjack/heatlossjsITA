
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

generalElementColor = {}
generalElementColor["Wall:external"] = "#6F6";
generalElementColor["Wall:internal"] = "#FFF";
generalElementColor["Wall:party"] = "#444";
generalElementColor["Floor:first"] = "#AAA";
generalElementColor["Floor:loft"] ="#FFF";
generalElementColor["Floor:InsulatedGround"] = "#AAF";
generalElementColor["Floor:ground"] = "#99F";
generalElementColor["Glazing:double"] = "#CCF";

generalElementImage = {}
generalElementImage["Wall:external"] = "external";
generalElementImage["Wall:internal"] = "internal";
generalElementImage["Wall:party"] = "party";
generalElementImage["Floor:first"] = "first";
generalElementImage["Floor:loft"] ="loft";
generalElementImage["Floor:InsulatedGround"] = "insground";
generalElementImage["Floor:ground"] = "ground";
generalElementImage["Glazing:double"] = "gdouble";

// config.element_type: localElementType, // localized
// e.uvalue = config.element_type[e.type].uvalue

localElementType = {}
localElementType["Parete:esterna"] = generalElementType["Wall:external"];
localElementType["Parete:interna"] = generalElementType["Wall:internal"];
localElementType["Parete:condivisa"] = generalElementType["Wall:party"];
localElementType["Piano:Primo"] = generalElementType["Floor:first"];
localElementType["Piano:Mansarda"] = generalElementType["Floor:loft"];
localElementType["Piano:terraIsolato"] = generalElementType["Floor:InsulatedGround"];
localElementType["Piano:terra"] = generalElementType["Floor:ground"];
localElementType["Vetri:Doppi"] = generalElementType["Glazing:double"];


localElementColor = {}
localElementColor["Parete:esterna"] = generalElementColor["Wall:external"];
localElementColor["Parete:interna"] = generalElementColor["Wall:internal"];
localElementColor["Parete:condivisa"] = generalElementColor["Wall:party"];
localElementColor["Piano:Primo"] = generalElementColor["Floor:first"];
localElementColor["Piano:Mansarda"] = generalElementColor["Floor:loft"];
localElementColor["Piano:terraIsolato"] = generalElementColor["Floor:InsulatedGround"];
localElementColor["Piano:terra"] = generalElementColor["Floor:ground"];
localElementColor["Vetri:Doppi"] = generalElementColor["Glazing:double"];

localElementImage = {}
localElementImage["Parete:esterna"] = generalElementImage["Wall:external"];
localElementImage["Parete:interna"] = generalElementImage["Wall:internal"];
localElementImage["Parete:condivisa"] = generalElementImage["Wall:party"];
localElementImage["Piano:Primo"] = generalElementImage["Floor:first"];
localElementImage["Piano:Mansarda"] = generalElementImage["Floor:loft"];
localElementImage["Piano:terraIsolato"] = generalElementImage["Floor:InsulatedGround"];
localElementImage["Piano:terra"] = generalElementImage["Floor:ground"];
localElementImage["Vetri:Doppi"] = generalElementImage["Glazing:double"];
