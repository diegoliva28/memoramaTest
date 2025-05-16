const totalCartas=12;
let cartas=[];
//Es un arreglo de divs
let tarjetasSeleccionadas=[];
let valoresUsados=[];
let movimientoActual=0;
let intentos=0;


let cartasTemplate='<div class="card"><div class="back"></div><div class="face"></div></div>';

//Esta funcion recibe el evento del elemento del DOM

function active(evento) {
    if (movimientoActual<2) {
        //no la entendi TARGET
        //Se puede captura eventos?
        
        if(!tarjetasSeleccionadas[0] || tarjetasSeleccionadas[0]!=evento.target 
            && !evento.target.classList.contains("active")
        ){
            // E.target. es distinto a la carta seleccionada
        evento.target.classList.add("active");
          tarjetasSeleccionadas.push(evento.target);
          if(++movimientoActual==2){

            // intentos++;
            // document.querySelector("stats").innerHTML=intentos+ " intentos";

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
                },600)
            };
          }  
        }
    }    
}

for (let i = 0; i < totalCartas; i++) {
    let div= document.createElement('div');
    //Creo el div
    div.innerHTML=cartasTemplate;
    //Atribuyo las variables
    cartas.push(div);
    document.querySelector("#game").append(cartas[i]);
    // Append averiguar

    randomValue();
    cartas[i].querySelectorAll(".face")[0].innerHTML=valoresUsados[i];
    cartas[i].querySelectorAll(".card")[0].addEventListener("click",active);
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