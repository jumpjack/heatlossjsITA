var dynamic_simulation_interval = false;
config.solver_running = false;
var app;
immParete = [];

calculate();
startup();

const fileSelector = document.getElementById('inpFile');
fileSelector.addEventListener('change', (event) => loadFile(event.target.files[0]));
console.log("Ready.");
document.getElementById("status").innerHTML = "READY.";

// Load template
/*$.ajax({
  url: 'heatlossjs/template.html?v=1',
  cache: true,
  async:false,
  success: function(data) {
    $("#heatloss").html(data);
  }               
});*/

function startup() {
	app = new Vue({
	    el: '#heatloss',
	    data: config,
	    methods: {
	        update: function() {
	            calculate();

	            if (config.solver_running) {
	                clearInterval(dynamic_simulation_interval);
	                dynamic_simulation_interval = setInterval(dynamic,100);
	            }
	        },
	        focus: function() {
	           if (config.solver_running) {
	               clearInterval(dynamic_simulation_interval);
	           }
	        },
	        add_element_type: function() {
	            var last = false;
	            var index = 0;
	            for (var name in config.element_type) {
	                last = config.element_type[name]
	                index++
	            }
	            if (last!=false) {
	                config.element_type["Elemento "+index] = JSON.parse(JSON.stringify(last))
	            } else {
	                config.element_type["Elemento "+index] = {uvalue:0}
	            }
	            calculate();
	        },
	        change_element_type_name: function(e,old_name) {
console.log(e,old_name);
	            var new_name = e.target.value;
	            // Create new element with new name
	            config.element_type[new_name] = config.element_type[old_name]
	            // Update all elements with new name
	            for (var roomName in config.rooms) {
	                for (var elementIndex in config.rooms[roomName].elements) {
	                    if (config.rooms[roomName].elements[elementIndex].type==old_name) {
	                        config.rooms[roomName].elements[elementIndex].type = new_name
	                    }
	                }
	            }
	            // Delete old element
	            delete config.element_type[old_name]
	            calculate();
	        },
	        add_new_room: function() {
	            var n=0; for (var z in config.rooms) n++;
	            config.rooms["Room "+n] = {
	                temperature: 20.0, // �C
					area: 0.0, // m2
					height: 0.0, // m
					air_change_an_hour: 1.0, // times (adimensional)
	                elements: [],
	                radiators: []
	            }
	            calculate();
	        },
	        change_room_name: function(e,old_room_name) {
	            var new_room_name = e.target.value;
	            config.rooms[new_room_name] = JSON.parse(JSON.stringify(config.rooms[old_room_name]))
	            delete config.rooms[old_room_name]
	            calculate()
	        },
	        toggleSection: function (roomName) {
	            $(".room-elements[name="+roomName+"]").slideToggle();
	        },
	        add_element: function(roomName) {
	            var length = config.rooms[roomName].elements.length;

	            if (length>0) {
	                var last = config.rooms[roomName].elements[length-1]
	                config.rooms[roomName].elements.push(JSON.parse(JSON.stringify(last)))
	            } else {
	                config.rooms[roomName].elements.push({
	                    type:Object.keys(config.element_type)[0],
	                    orientation:"",
	                    width:0.0, height:0.0
	                });
	            }
	            calculate();
	        },
	        delete_element: function(roomName,elementIndex) {
	            config.rooms[roomName].elements.splice(elementIndex,1)
	            calculate();
	        },
	        add_radiator: function(roomName) {
	            var length = config.rooms[roomName].radiators.length;

	            if (length>0) {
	                var last = config.rooms[roomName].radiators[length-1]
	                config.rooms[roomName].radiators.push(JSON.parse(JSON.stringify(last)))
	            } else {
	                config.rooms[roomName].radiators.push({
	                    name:"Double Panel Convector 1200x600",
	                    heat50k:2146
	                });
	            }
	            calculate();
	        },
	        delete_radiator: function(roomName,radiatorIndex) {
	            config.rooms[roomName].radiators.splice(radiatorIndex,1)
	            calculate();
	        },
	        add_ufh: function(roomName) {
	            var length = config.rooms[roomName].ufh.length;

	            if (length>0) {
	                var last = config.rooms[roomName].ufh[length-1]
	                config.rooms[roomName].ufh.push(JSON.parse(JSON.stringify(last)))
	            } else {
	                config.rooms[roomName].ufh.push({
	                    name:"16mm diameter, 150mm spacing",
	                    area:config.rooms[roomName].area,
	                    flooring:0.00
	                });
	            }
	            calculate();
	        },
	        delete_ufh: function(roomName,ufhIndex) {
	            config.rooms[roomName].ufh.splice(ufhIndex,1)
	            calculate();
	        },
	        file_new: function() {
	            for (var z in config_new) {
	                config[z] = JSON.parse(JSON.stringify(config_new[z]))
	            }
	            calculate();
	        },
	        file_open: function(e) {
	            open_file(e)
	        },
	        file_save: function() {

	            // Filter out computed properties
	            var filtered_config = JSON.parse(JSON.stringify(config));
	            /*
	            for (var z in filtered_config.rooms) {
	                for (var i in filtered_config.rooms[z].elements) {
	                    delete filtered_config.rooms[z].elements[i].A;
	                    delete filtered_config.rooms[z].elements[i].uvalue;
	                    delete filtered_config.rooms[z].elements[i].wk;
	                    delete filtered_config.rooms[z].elements[i].deltaT;
	                    delete filtered_config.rooms[z].elements[i].heat;
	                    delete filtered_config.rooms[z].elements[i].kwh;
	                }
	                delete filtered_config.rooms[z].wk;
	                delete filtered_config.rooms[z].heat;
	                delete filtered_config.rooms[z].kwh;
	                delete filtered_config.rooms[z].A;
	                delete filtered_config.rooms[z].area;
	            }*/

	            var date = new Date();
	            // var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];  // moved to localized.js, but using names is deprecated
	            var h = date.getHours();
	            if (h<10) h = "0"+h;
	            var m = date.getMinutes();
	            if (m<10) m = "0"+m;
	            var datestr = date.getFullYear() + "-" + (date.getMonth()+1) + "-" +  date.getDate() + "_" + h + m; //+months[date.getMonth()]+h+m
	            download_data("heatlossjs_"+config.project_name+"_"+datestr+".json",JSON.stringify(filtered_config, null, 2))
	        },
	        open_in_sapjs: function() {
	            localStorage.setItem("heatlossjs",JSON.stringify(config));
	            window.location = "/sapjs?load=heatlossjs"
	        },
	        start_solver: function() {
	            dynamic_simulation_interval = setInterval(dynamic,100);
	            config.solver_running = true;
	        },
	        stop_solver: function() {
	            clearInterval(dynamic_simulation_interval);
	            config.solver_running = false;
	        }
	    },

	    filters: {
	        toFixed: function(val,dp) {
	            if (isNaN(val)) {
	                return val;
	            } else {
	                if (val==null) return 0;
	                return val.toFixed(dp)
	            }
	        },
	        toUpperCase: function(val) {
	            return val.toUpperCase();
	        }
	    }
	});

}

function calculate() {
    var air_change_factor = 0.33 // rho * Cp / secHour = 1.22 [kg/m3] * 1000 [J/kgK] / 3600  = 1.22 * 1005 / 3600 = 0.33

    config.house = {
        heatloss: 0,
        kwh: 0,
        total_heat_output: 0,
        internal_heat_balance: 0,
    };
    
    config.JK = 50;
    
    config.heating_MWT *=1;
    if (config.heating_MWT==null || config.heating_MWT=='') config.heating_MWT = 0;
    
    for (var z in config.rooms) {
        var room = config.rooms[z]
        
        room.wk = 0
        room.heat = 0
        room.kwh = 0
        room.A = 0



        for (var i in room.elements) {
            var e = room.elements[i]
            if (e.orientation==undefined) e.orientation = "not_appl"
            
            // Boundary temperature
            if (e.boundary==undefined) e.boundary = boundaryType['external']


            if (config.T[e.boundary]!=undefined) {
                e.temperature = config.T[e.boundary]
            } else if (config.rooms[e.boundary]!=undefined) {
                e.temperature = config.rooms[e.boundary].temperature
            }
            
            if (e.area!=undefined) {
                e.A = e.area
                e.width = 0;
                e.height = 0;
            } else {
                e.A = e.width * e.height
            }
            
            // Subtract windows and doors from wall and floor elements
            for (var i2 in room.elements) {
                var e2 = room.elements[i2]
                if (e2.subtractfrom==i) {
                    if (e2.area!=undefined) {
                        e2.A = e2.area
                    } else {
                        e2.A = e2.width * e2.height
                    }
                    e.A -= e2.A
                }
            }
            
            // Calculate: heat loss rate, deltaT and heat loss
            e.uvalue = config.element_type[e.type].uvalue // Trasmittanza = [W/m2K] = [W/K] / [m2]   = Potenza/DeltaT  /  m2

            e.wk = e.A * e.uvalue // [m2] * [W/m2K] = [m2] * [W/K] * [1/m2]  =  [W]/[K]

            e.deltaT = room.temperature - e.temperature

            e.heat = config.orientationContribution[e.orientation] * e.wk * e.deltaT // potenza termica dispersa (power heat loss) = A * U * DeltaT  ( [m2] * [W/m2K] *  [K] = [W])

            e.kwh = config.orientationContribution[e.orientation] * e.wk * config.degreedays * 0.024 // = * 24 ore / 1000

console.log(z,e.boundary, e.uvalue, e.wk, e.deltaT, e.heat, e.kwh);
            if (e.boundary!=boundaryType['external'] && e.boundary!=boundaryType['ground']) e.kwh = 0

            room.wk += e.wk
            room.heat += e.heat
            room.kwh += e.kwh
            room.A += e.A

            if (e.boundary==boundaryType['external']) config.house.wk += e.wk
            else if (e.boundary==boundaryType['unheated']) config.house.wk += e.wk
            else if (e.boundary==boundaryType['ground']) config.house.wk += e.wk
            else {
                config.house.internal_heat_balance += e.heat  
            }

immParete[i+z] = "<img src='" +  localElementImage[e.type]  + ".png' width=50>";

        }

        // ----------------------------------------------------------------------------------------
        // Ventilation and infiltration
        // ----------------------------------------------------------------------------------------
        if (room.area==undefined) room.area = 0;
        
        if (room.width>0 && room.length>0) {
            room.area = room.width * room.length
        }
        room.volume = room.area * room.height
        
        var deltaT = room.temperature - config.T[boundaryType['external']] //    [K]
        var infiltration_wk = room.air_change_an_hour * air_change_factor * room.volume // [(times)] * [kg/m3][J/kgK][1/s] * [m3] = [J/s]/[K]    =   [W]/[K]
        room.wk += infiltration_wk
        config.house.wk += infiltration_wk
        
        room.infiltration_heat = infiltration_wk * deltaT // [W]/[K] * [K] = [W]
        room.heat += room.infiltration_heat
        
        var infiltration_kwh = infiltration_wk * config.degreedays * 0.024 // degreedays = K * days;  24 = hours/day; obtained value is in Wh, but stored in variable in kWh, hence "/1000"; 24/1000 = 0.024
        room.kwh += infiltration_kwh
        
        // ----------------------------------------------------------------------------------------
        // Radiators
        // ----------------------------------------------------------------------------------------
        room.total_radiator_output = 0;
        
        if (room.radiators==undefined) room.radiators = [];
        
        for (var i in room.radiators) {
           var rad = room.radiators[i]
           
           if (rad.model==undefined) rad.model="pow"
           if (rad.heat50k==undefined) rad.heat50k = 1000
           
           if (rad.model=="pow") {
               var dT = config.heating_MWT - room.temperature
               rad.heat = rad.heat50k * Math.pow((dT / 50),1.3)
           } else if (rad.model=="linear") {
               rad.heat = rad.m * config.heating_MWT + rad.c
           }
           
           room.total_radiator_output += rad.heat
        }
        
        // ----------------------------------------------------------------------------------------
        // Under floor heating
        // ----------------------------------------------------------------------------------------
        room.total_ufh_output = 0;
        
        if (room.ufh==undefined) room.ufh = [];
        
        for (var i in room.ufh) {
           var ufh = room.ufh[i]
           
           if (ufh.flooring==undefined) ufh.flooring = 0
           
           var dT = config.heating_MWT - room.temperature

           // parameters determined using curve fitting of MCS heat pump calculator data
           var m = 86.7*Math.pow(ufh.flooring,2) - 31.543*ufh.flooring + 5.74385;
           var c = 424.7*Math.pow(ufh.flooring,2) - 156.403*ufh.flooring + 28.70185;
           
           var heat_m2 = (m * dT) - c;
           if (heat_m2<0) heat_m2 = 0;
           
           ufh.heat = heat_m2 * ufh.area;

           room.total_ufh_output += ufh.heat
        }
        
        room.total_heat_output = room.total_radiator_output + room.total_ufh_output
        
        config.house.heatloss += room.heat
        config.house.kwh += room.kwh
        config.house.total_heat_output += room.total_heat_output
        
        if (room.energy==undefined) room.energy = room.temperature * config.JK;
        room.energy += ( -room.heat + room.total_heat_output) * 0.01

room.schema = "Test_"+z; // debug
    }
    
    // Heat pump model
    var heatpump_deltaT = config.house.total_heat_output / ((config.heatpump_flow_rate / 60)*4150)
    config.heatpump_flow_temperature = config.heating_MWT + 0.5*heatpump_deltaT;
    
    if (config.cop_calculation_method==undefined) {
        config.cop_calculation_method = "ecodan";
    }
    
    if (config.cop_calculation_method=="carnot") {
        config.heatpump_COP = 0.49 * (config.heatpump_flow_temperature+4+273) / ((config.heatpump_flow_temperature+4+273)-(config.T[boundaryType['external']]-6+273));
    } else {
        if (config.heatpump_capacity==undefined) config.heatpump_capacity = 5.0;
        config.heatpump_COP = get_ecodan_cop(config.heatpump_flow_temperature,config.T[boundaryType['external']],(config.house.total_heat_output*0.001)/config.heatpump_capacity);
    }
    config.heatpump_elec = config.house.total_heat_output / config.heatpump_COP 
console.log("config.heatpump_elec = config.house.total_heat_output / config.heatpump_COP ",config.heatpump_elec , config.house.total_heat_output, config.heatpump_COP );
}

// dynamic_simulation_interval = setInterval(dynamic,100);

function dynamic() {
  calculate()
  for (var z in config.rooms) {
      config.rooms[z].temperature = config.rooms[z].energy / config.JK;
  }
}



function open_file(e) {
  console.log(e)
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = JSON.parse(e.target.result);
    if (contents!=null) {
        for (var z in contents) {
            config[z] = JSON.parse(JSON.stringify(contents[z]))
        }
        calculate();
    }
  };
  reader.readAsText(file);
}

function download_data(filename, data) {
    var blob = new Blob([data], {type: 'application/json'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

function loadFile(fileHandler) {
	myName = fileHandler.name;
	const reader = new FileReader();
	reader.addEventListener('load', (event) => {
			rawFileContents = event.target.result;
			console.log("Loaded: ", event, rawFileContents.length);
			fileContentsUInt8 = new Uint8Array(rawFileContents); // Extract from the generic ArrayBuffer an array of Unsigned Integers (0..255)
            fileContentsText = String.fromCharCode(...fileContentsUInt8);
			document.getElementById("fillme").innerHTML = fileContentsText;
			calculate();
			startup();
	});
	reader.readAsArrayBuffer(fileHandler); // Read as arrayBuffer as "readAsBinaryString" is deprecated but we don't want Javascript to interpret the file at its own wish...
}

