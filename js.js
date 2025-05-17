const totalCartas=12;
let cartas=[];
//Es un arreglo de divs
let tarjetasSeleccionadas=[]; //mano
let movimientoActual=0;

let timer=60;
let controlarTiempo;
let primeraVez=false;

let valoresUsados=[];

let etiquetaBtn=document.querySelector(".btn");
let etiquetaTiempo=document.querySelector("#stats");
let cartasTemplate='<div class="card"><div class="back"></div><div class="face"></div></div>';


//Esta funcion recibe el evento del elemento del DOM

 function deshabilitarCartas() {
     let cartasTotales=document.querySelectorAll(".card");
     console.log(cartasTotales.length);
    
     for (let i = 0; i < cartasTotales.length; i++) {
         cartasTotales[i].classList.add("disable")
    }
}

function ejecutarTiempo() {
    controlarTiempo=setInterval(()=> {
        timer--;
        etiquetaTiempo.innerHTML=`Tiempo: ${timer} restante`;
        if(timer==0){
            clearInterval(controlarTiempo);
            etiquetaTiempo.innerHTML="Perdiste";
            etiquetaBtn.style.visibility=("visible");
            etiquetaBtn.innerHTML="Reintentar";
            deshabilitarCartas();
        }
    },1000)
}

function active(carteElegida) {
    //Captura la carta sobre la que se toco el evento
    // carteElegida.target El elemento especifico que fue clickeado
    if (!primeraVez) {
        ejecutarTiempo();
        primeraVez=true;
    }
    
    if (movimientoActual<2) {
        if(!tarjetasSeleccionadas[0] || //Si la carta 1 no esta puesta
            tarjetasSeleccionadas[0]!=carteElegida.target  && // que no sea igual a la primera carta
            !carteElegida.target.classList.contains("active")){ //que no este activada la carta elegida
            // E.target. es distinto a la carta seleccionada
            carteElegida.target.classList.add("active");
            tarjetasSeleccionadas.push(carteElegida.target);
          if(++movimientoActual==2){

            if(tarjetasSeleccionadas[0].querySelectorAll(".face")[0].innerHTML==tarjetasSeleccionadas[1].querySelectorAll(".face")[0].innerHTML){
                tarjetasSeleccionadas=[];
                movimientoActual=0;    
            }
            else{
                setTimeout(()=>{
                    tarjetasSeleccionadas[0].classList.remove("active");
                    tarjetasSeleccionadas[1].classList.remove("active");
                    tarjetasSeleccionadas=[];
                    movimientoActual=0;    
                },400)
            };
          }  
        }
    }   
    finalizaPartida();    
    }
    
    
function finalizaPartida() {
    let activadas=document.querySelectorAll(".active").length;
    if(activadas==12){
        let tiempoConseguido=timer;
        clearInterval(controlarTiempo);
        etiquetaTiempo.innerHTML=`Ganaste: En ${timer} segundos`;
        etiquetaBtn.style.visibility=("visible");
        etiquetaBtn.innerHTML="Continuar";
    }
}

function randomValue() {
    let rnd=Math.floor(Math.random()*totalCartas*0.5);
    let values= valoresUsados.filter(value => value ===rnd)
    if(values.length<2){
        valoresUsados.push(rnd);
    }
    else{
        randomValue();
        //Recursion
    }
}

for (let i = 0; i < totalCartas; i++) {
    let div= document.createElement('div');
    //Creo el div
    div.innerHTML=cartasTemplate;
    //Atribuyo las variables
    cartas.push(div);
    //aca agrego la carta(div)
    document.querySelector("#game").append(cartas[i]);
    // Append averiguar

    randomValue();
    cartas[i].querySelectorAll(".face")[0].innerHTML=valoresUsados[i];
    cartas[i].querySelectorAll(".card")[0].addEventListener("click",active);
}
