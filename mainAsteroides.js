console.log("Proyecto de Empleabilidad")
const keyAPI = "n6jKxpqdXbqFMIldrFHwbm5j9rag99ZrdCRCHvWh"

class classAsteroide{
    constructor(id,nombre,year,diametro,proximo){
        this.id=id;
        this.nombre=nombre;
        this.year=year;
        this.diametro=diametro;
        this.proximo=proximo;
    }

}
var auxiliar="";
const arraryAsteroides=[];
//para saber si se encontraron o no asteroides
let bandera = false;

const arrayAsteroides = new Array();

/***************************************************
START FUNCION CONSULTAR ASTEROIDES ENTRE DOS FECHAS
****************************************************/
var asteroides = async(startDate,endDate)=>{
    //Obtenindo los ids de los meteoritos peligrosos
    var respuesta1 = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${keyAPI}`)
    var meteoritos = await respuesta1.json()
    Object.keys(meteoritos.near_earth_objects).forEach(object =>{
        const asteroides = meteoritos.near_earth_objects[object]
        asteroides.forEach(peligrosos=>{
            if(peligrosos.is_potentially_hazardous_asteroid === true){
                
                console.log(`El asteroide ${peligrosos.name} es potencialmente peligroso para la Tierra y se acerca en la fecha ${peligrosos.close_approach_data[0].close_approach_date_full}`)
                
                arrayAsteroides.push(peligrosos.neo_reference_id)
                asteroidesPeligrosos(peligrosos.neo_reference_id);
                
                
            }else{
                //console.log(`El asteroide ${peligrosos.name} no representa una amenaza`)
            }    
        })
    })
    console.log(arrayAsteroides)    
}


/**************************************************************************************
START FUNCION OBTENIENDO LOS DATOS de los meteoritos peligrosos E IMPRIMIR EN DOM
**************************************************************************************/
var asteroidesPeligrosos = async(arrayAsteroides)=>{

       var respuesta2 = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${arrayAsteroides}?api_key=${keyAPI}`)
       var meteoritosPeligrosos = await respuesta2.json()
       console.log(meteoritosPeligrosos)
/*        console.log(meteoritosPeligrosos.designation)
 */       /* console.log(meteoritosPeligrosos.close_approach_data[0].close_approach_date_full) */
       /* console.log(meteoritosPeligrosos.estimated_diameter.meters.estimated_diameter_min)
       console.log(meteoritosPeligrosos.estimated_diameter.meters.estimated_diameter_max) */
       //bandera = true;

       Object.keys(meteoritosPeligrosos.close_approach_data).forEach(object =>{
        var fechaCercana = meteoritosPeligrosos.close_approach_data[object].close_approach_date
            //console.log(fechaCercana)
            const fechaActual1 = new Date("2022-03-30")
            const fechaSiguiente2 = new Date(fechaCercana)
            //console.log(fechaSiguiente2)
            /* console.log(fechaActual1)
            console.log(fechaSiguiente2) */
            
            if (fechaActual1 && fechaSiguiente2) {
                //cuantos dias de diferencia tienen
                var diferenciaDias = (fechaSiguiente2.getTime() - fechaActual1.getTime())/(1000 * 3600 * 24)
                if (diferenciaDias>0) {
                    if (!auxiliar) {
                        auxiliar = meteoritosPeligrosos.close_approach_data[object].close_approach_date_full;
                        console.log(auxiliar)
                    } else {
                        
                    }
                } else {
                    
                }
            }
            
        })        
        
        const asteroidePeligroso = new classAsteroide(arrayAsteroides,meteoritosPeligrosos.name,meteoritosPeligrosos.close_approach_data[0].close_approach_date_full,meteoritosPeligrosos.estimated_diameter.meters.estimated_diameter_min.toFixed(2) + `m` + ` x ` + meteoritosPeligrosos.estimated_diameter.meters.estimated_diameter_max.toFixed(2) + `m`,auxiliar);
        console.log(asteroidePeligroso)
        arraryAsteroides.push({...asteroidePeligroso})

        auxiliar="";


       document.getElementById("body-table-id").innerHTML += `
                    <tr id="${asteroidePeligroso.id}" class="tr-table-campos">
                        <td id="id-table-id" class="campos-table-id">${asteroidePeligroso.id}</td>
                        <td class="campos-table-nombre">${asteroidePeligroso.nombre}</td>
                        <td class="campos-table-anio">${asteroidePeligroso.year}</td>
                        <td class="campos-table-precio">${asteroidePeligroso.diametro}</td>
                        <td class="campos-table-boton">${asteroidePeligroso.proximo}</td>
                    </tr>`

}

//Probando la consulta ASTEROIDES 1900-03-08  2200-11-26
//asteroides('1900-03-08','1900-03-14')
//console.log('1900-03-08' < '1888-03-08' ? true:false)
/* var fechaUno = '1900/03/08'
var fechaDos = '1900/03/09'
var nose =  fechaDos - fechaUno
console.log(nose) */


/***************************************
START FUNCION TRAER ASTEROIDES PELIGROSO
***************************************/
function buscarAsteroides() {
    /* nombreDisco = document.getElementById("disc-name-id").value;
    anioDisco = document.getElementById('number-anio-id').value;
    precioDisco = document.getElementById('number-precio-id').value; */
    
    let divError = document.getElementById('aviso-id');
    divError.classList.remove('exito');   
    divError.classList.remove('mostrar');         
    divError.classList.add('ocultar'); 

    fechaInicio = document.getElementById('dateStart').value;
    fechaFin = document.getElementById('dateEnd').value;

    console.log(fechaInicio)
    console.log(fechaFin)
    const date1 = new Date(fechaInicio)
    const date2 = new Date(fechaFin)

    if (date1 && date2) {
        //cuantos dias de diferencia tienen
        var diferenciaDias = (date2.getTime() - date1.getTime())/(1000 * 3600 * 24)

        //validamos que los dias de diferencia no sean mayor a 7
        if (diferenciaDias<=7) {
            //validamos que los dias de diferencia no sean menor que 0
            if (diferenciaDias>=0) {
                //imprimimos los asteroides peligrosos
                limpiarTablaAsteroidesPeligrosos()
                asteroides(fechaInicio,fechaFin)
                
                if (!bandera) {
                    let HTMLString = `(Se encontraron asteroides peligrosos)`;
                    divError.innerHTML = HTMLString;
                    divError.classList.remove('ocultar');
                    divError.classList.remove('mostrar');
                    divError.classList.add('exito');
                    bandera = true;
                    console.log(bandera)
                } 
                
            } 
            else {
                let HTMLString = `(La fecha de inicio es mayor a la fecha final)`;
                divError.innerHTML = HTMLString;
                divError.classList.remove('ocultar');
                divError.classList.remove('exito');
                divError.classList.add('mostrar');
                console.log("La fecha de inicio es mayor a la fecha final")
            }
        } 
        else {
            let HTMLString = `(Las fechas tiene mas de 7 dias de diferencia)`;
            divError.innerHTML = HTMLString;
            divError.classList.remove('ocultar');
            divError.classList.remove('exito');
            divError.classList.add('mostrar');
            console.log("Las fechas tiene mas de 7 dias de diferencia") 
        }
    } 
    
    else {
        let HTMLString = `(Los datos no son fechas)`;
        divError.innerHTML = HTMLString;
        divError.classList.remove('ocultar');
        divError.classList.remove('exito');
        divError.classList.add('mostrar');
        console.log("Los datos no son fechas")
    }


    console.log((date2.getTime() - date1.getTime())/(1000 * 3600 * 24))
    
    bandera = false;
}

/************************************
START FUNCION LIMPIAR TABLA
*************************************/
function limpiarTablaAsteroidesPeligrosos() {

    Borrar = document.getElementById("body-table-id").remove();

    document.getElementById("table-table-id").innerHTML += `
    <tbody id="body-table-id" class="body-table">
    </tbody>`
}


