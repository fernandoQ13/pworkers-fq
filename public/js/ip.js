function getIP(json) {
    //  funcion que me guarda la ip en una variable

    let ip = json.ip;
   
    // document.getElementById('ip ')selecciona del elemento con el atributo id 
    // que contiene como valor ip.
    // setAttribute me cambia el valor del atributo value por el valor ip
    document.getElementById('ip').setAttribute('value', ip);
  }