﻿module.exports = async function (context) {
    
    context.log("Enriching msg with geofence");
    
    const geolib = require('geolib');
    let msg = context.bindings.msg;

    if (msg) {

        const loc = msg.measurements.location;
        const zones = context.bindings.zonedefinitions.features;

        let matchedZones = [];

        zones.forEach(zone => {
            if (geolib.isPointInPolygon(loc,zone.geometry.coordinates[0]) == true){
                matchedZones.push(zone.properties.id);
                context.log(zone.properties.id)
            }
        })
        
        msg.measurements["zones"] = matchedZones;

        return msg;
    };
}
