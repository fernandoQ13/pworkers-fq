
// función para obtener la fecha y hora del envío del formulario,
// es llamada al presionar el botón enviar la por el atributo onclick .
function fc() {
  // document.getElementById('fecha ')selecciona del elemento con el atributo id 
  // que contiene como valor fecha.
  // setAttribute me cambia el valor del atributo value por el valor data()
  document.getElementById('fecha').setAttribute('value',Date())
}
 
function vcaptcha(a) {
  // validacion del recaptcah
         var response = grecaptcha.getResponse();

        if(response.length == 0){
            alert("Captcha no verificado")
            return false;
        } else {
            alert("Captcha verificado");
            return true;
        }
    }

