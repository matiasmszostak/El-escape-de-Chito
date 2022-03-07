

//Variables del canvas
var posFondo=0;
var canvas;
var ctx;

//Variables para el juego
var puntos=0;
var vidas=3;
var tecla;

//Variable inicial de los personajes
var posicionXCarpincho=200;
var posicionYCarpincho=320;

var posicionXRama1=800;
var posicionYRama1=300;

var posicionXRama2=1200;
var posicionYRama2=450;

var posicionXRama3=1600;
var posicionYRama3=100;

var posicionXPicabuey=800;
var posicionYPicabuey=150;

/*Variables para color de botón*/
var colorBoton="#000";
//en una variable para que cambia de color al estar arriba

//Variables para imagenes
var imgCarpincho=new Image();
var imgRama=new Image();
var imgRama2=new Image();
var imgPicabuey=new Image();
var imgVidas=new Image();
var imgPuntos=new Image();

//Variables de Audio
var audioPerdida;
var audioPuntos;
var audioJugar;
var audioJugarFuego;

var audioPerdisteFuego;

var audioGanastePajaros;


//Objetos
var carpincho=new Personaje(200,320,180,103); //le paso los mismos valores que img
var picabuey=new Elemento(800,150,87,50,"picabuey");
var rama1=new Elemento(800,300,215,99,"rama");
var rama2=new Elemento(1200,450,100,50,"rama2");
var rama3=new Elemento(1600,100,145,57,"rama");

//Fuente
//var fuenteLetra=new FontFace(serif,src="url(font/GLSNECB.ttf)");
/*var FontFace={
    family="myFont",
    src="url(font/GLSNECB.ttf)"
    
}*/

//agrego una variable para saber si el juego está inciado o no
var inicio=false;
//agregué estas para poder ir a las distintas pantallas del juego (instrucciones, inicio, etc)
var instrucciones=false;
var ganaste=false;

//Window Onload
window.onload=function(){
    jugar();
}

//Función jugar
function jugar(){
//muevo todo a función juego para hacer el inicio=true
    //Selecciono canvas
    canvas=document.getElementById("canvas");
    //canvas.style.backgroundImage="url(img/fondolargo.png)";

    //Defino contexto
    ctx=canvas.getContext("2d");

    //Vidas y puntos
   /* imgVidas.src="img/vidas.png";
    imgVidas.onload=function(){
        vidasObjeto.dibujar(imgVidas);
    }*/
    		//y si es al principio, hago que redibuje el botón de inicio.
    instrucciones=false;
    
}

function juego(){
    
    inicio=true; //indico que el juego está iniciado
    instrucciones=false;
    ganaste=false;
    canvas.style.cursor=""; // preventivamente, vuelvo el cursor a normal
    canvas.style.backgroundImage="url(img/fondolargo.png)";
    

    //Dibujo primero el texto de inicio
    dibujarTextoInicio();

    //Ahora dibujo lo demás
    //Dibujo al carpincho
    imgCarpincho.src="img/carpincho.png";
    imgCarpincho.onload=function(){
       
        carpincho.dibujar();
    }
    //Dibujo el texto
    dibujarTexto();

    

    //Dibujo al picabuey
    imgPicabuey.src="img/picabuey.png";
    imgPicabuey.onload=function(){
        picabuey.dibujar(imgPicabuey);//necesita que le pase la imagen
    }

    //Dibujo a la rama
    imgRama.src="img/rama1.png";
    imgRama.onload=function(){
        rama1.dibujar(imgRama);
        
        rama3.dibujar(imgRama);
    }

    imgRama2.src="img/rama2.png";
    imgRama2.onload=function(){
        rama2.dibujar(imgRama2);
        
    }

    //Audio

    audioPerdida =  new Audio();
	audioPerdida.src="audio/rama.mp3";
	audioPuntos =  new Audio();
	audioPuntos.src="audio/picabuey.mp3";
    audioJugar =  new Audio();
	audioJugar.src="audio/juego.mp3";
    audioJugarFuego=new Audio();
    audioJugarFuego.src="audio/juegofuego.wav";


    audioPerdisteFuego=new Audio();
    audioPerdisteFuego.src="audio/perdistefuego.wav";

    

    audioGanastePajaros=new Audio();
    audioGanastePajaros.src="audio/ganastepajaros.mp3";

    //Intervalo de fondo que se mueve
    
    setInterval(function(){
        //movimiento del fondo
        posFondo-=1;
        //posición inicial del fondo
        canvas.style.backgroundPosition=posFondo+"px 0px";
    },500/25);
    

    //Intervalo para que sucedan cosas automáticamente
    setInterval(function(){
        if(vidas>0){
            //hacer que vengan la rama y el picabuey
            canvas.style.cursor=""; // preventivamente, vuelvo el cursor a normal
            canvas.style.backgroundImage="url(img/fondolargo.png)";
            //posFondo=!stop;
            audioJugar.play();
            audioJugarFuego.play();
            rama1.venir();
            rama2.venir();
            rama3.venir();
            picabuey.venir();
 
            //van revisar si hay colisión o no, y si hay se activa
            rama1.colision();
            rama2.colision();
            rama3.colision();
            picabuey.colision();

            //redibujar todo
            borrar();
            canvas.style.cursor=""; // preventivamente, vuelvo el cursor a normal
            canvas.style.backgroundImage="url(img/fondolargo.png)";
            
            carpincho.dibujar();
            dibujarTexto();
            picabuey.dibujar(imgPicabuey);
            rama1.dibujar(imgRama);
            rama2.dibujar(imgRama2);
            rama3.dibujar(imgRama);
            
          
        
        }else{
            //PERDISTE!
            borrar();

            audioJugar.pause();
            audioJugarFuego.pause();
            audioPerdisteFuego.play();
            

			ctx.fillStyle=colorBoton;
			ctx.font="50px Fall Kingdom Regular";
			ctx.fillText('REINTENTAR', 170,550);
            
            //Imagen de perdiste
            canvas.style.backgroundImage="url(img/splashperdiste.png)";
            //frenar fondo
            posFondo=stop;
            //poner posición inicial del fondo (para que se vea bien la imagen)
            canvas.style.backgroundPosition="0px, 0px";
        }
        if (puntos==50){
            //Ganaste!!
            ganaste=true;
            inicio=false;
            audioJugar.pause();
            audioJugarFuego.pause();
            audioGanastePajaros.play();

            
            borrar();
            
			ctx.fillStyle=colorBoton;
			ctx.font="50px Fall Kingdom Regular";
            ctx.fillStyle="#000000";
            ctx.fillStyle=colorBoton;
			ctx.fillText('VOLVER A JUGAR', 170,550);
            // ctx.fillText('Volver al inicio', 420, 550);
            
            //imagen de ganaste
            canvas.style.backgroundImage="url(img/splashganaste.png)";
            //frenar fondo
            posFondo=stop;
            //volver a la posición inicial del fondo (para que se vea bien la imagen)
            canvas.style.backgroundPosition="0px, 0px";
        }

    },800/25);
    

    
       

}
    //Clase Personaje
function Personaje(x,y,ancho,alto){
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.alto=alto;

    //Métodos
    this.dibujar=function(){
        ctx.drawImage(imgCarpincho,this.x,this.y,this.ancho,this.alto);
        //para que sean sus atributos, de manera que aparece de vuelta en ese lugar
    }
    this.irArriba=function(){
        if(this.y>100){
        this.y-=15;
        }
    }
    this.irAbajo=function(){
        if(this.y<600-this.alto){
        this.y+=15;
        }
    }
    this.irIzquierda=function(){
        if(this.x>0){
        this.x-=15;
        }
    }
    this.irDerecha=function(){
        if(this.x<800-this.ancho){
        this.x+=15;
        }
    }
}

    //Clase Elemento para rama y picabuey
function Elemento(x,y,ancho,alto,tipo){
    //rama resta vidas, picabuey suma puntos
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.alto=alto;
    this.tipo=tipo;
    
    //Métodos

    this.dibujar=function(img){
        //vamos a hacer que esta función sea dinámica, que reciba esa imagen por parámetro
        ctx.drawImage(img,this.x,this.y,this.ancho,this.alto);
    }

    this.venir=function(){
        if(this.x>-150){
        this.x-=5;
        }else{
            this.sortear();
        }
    }



    //Fórmula de sorteo de posición

    this.sortear=function(){
        /*Math.floor(Math.random() * (max - min + 1))+ min;*/
        //rango de x, maximo 1400, minimo 850
        this.x=Math.floor(Math.random()*(1400-850+1))+850;
    
        //rango de y, maximo 450, minimo 100
        this.y=Math.floor(Math.random()*(450-100+1))+100;
    }

    

    //Detectar colisión
    
    this.colision=function(){
        if(
            
            (this.x<carpincho.x+carpincho.ancho)
            &&(this.x>carpincho.x-this.ancho)
            &&(this.y>carpincho.y-this.alto)
            &&(this.y<carpincho.y+carpincho.alto)
            //mientras el elemento atraviese al personaje desde sus vértices
        ){
            
            if(this.tipo=="picabuey"){
                puntos+=10;
                audioPuntos.play();
            }else{
                vidas--;
                audioPerdida.play();
            }
            
            this.sortear();
        }
    }

}


    //Dibujar texto
//siempre que haya algo más de una vez conviene meterlo en una función
function dibujarTexto(){
    ctx.font="27px Fall Kingdom Regular";
    ctx.fillStyle="#000000";
    
    ctx.fillText("PUNTOS "+puntos,160,70);
    ctx.fillText("VIDAS x"+vidas, 635, 70);

    imgVidas.src="img/vidas.png";
    ctx.drawImage(imgVidas,550,20,75,85);
    
    imgPuntos.src="img/puntos.png";
    ctx.drawImage(imgPuntos,70,30,83,54)
    
}
function dibujarTextoInicio(){
    instrucciones=false;
    ganaste=false;
	borrar();
	ctx.font="45px Fall Kingdom Regular";
    
    //variable de color del botón
	ctx.fillStyle=colorBoton;
	ctx.fillText('JUGAR', 180,550);
    ctx.fillText('INSTRUCCIONES', 420, 550);
    canvas.style.backgroundImage="url(img/splashinicio.png)";
    
}
function dibujarInstrucciones(){
	instrucciones=true;
	borrar();
	ctx.font="50px Fall Kingdom Regular";
    //variable de color del botón
	colorBoton="#000";
	ctx.fillText('JUGAR', 180,550);
    //ctx.fillText('Volver', 420, 550);
    canvas.style.backgroundImage="url(img/splashinstrucciones.png)";
}

    //Función borrar
function borrar(){
    //ir borrando mientras se mueve con un rectángulo creado para eso
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //cada vez que yo borro vuelva a dibujar el texto
}


    //Escuchadores para el carpincho
document.addEventListener("keydown",function(e){
    switch(e.key){
        case 'w':
            carpincho.irArriba();
        break;
        case 's':
            carpincho.irAbajo();
        break;
        case 'a':
            carpincho.irIzquierda();
        break;
        case 'd':
            carpincho.irDerecha();
        break;
        case 'ArrowUp':
            carpincho.irArriba();
        break;
        case 'ArrowDown':
            carpincho.irAbajo();
        break;
        case 'ArrowLeft':
            carpincho.irIzquierda();
        break;
        case 'ArrowRight':
            carpincho.irDerecha();
        break;
    }
    

});


//Reinicio de juego


document.addEventListener('click',function(e){
	//Acá evaluo en función de vidas y de la variable inicio, si estoy al principio o al final del juego
	if(vidas==0 || puntos==50){
		if(e.x>100&&e.x<400&&e.y>500&&e.y<580){
            //Si el cursor clickea ahí, se reinicia
			vidas=3;
			puntos=0;

            //Esto es para incluir las variables de posición inicial de personaje (si las hubiera)
			carpincho.x=posicionXCarpincho;
			carpincho.y=posicionYCarpincho;

            picabuey.x=posicionXPicabuey;
			picabuey.y=posicionYPicabuey;

            rama1.x=posicionXRama1;
			rama1.y=posicionYRama1;

            rama2.x=posicionXRama2;
			rama2.y=posicionYRama2;

            rama3.x=posicionXRama3;
			rama3.y=posicionYRama3;
			
			posFondo=0;
		}
	}else if(inicio==false){
		//si inicio es falso estamos al principio del juego y llamo a la función juego
        if(e.x>100&&e.x<400&&e.y>500&&e.y<580){
		juego();
        //para ir a las instrucciones
        }else if (e.x>420&&e.x<660&&e.y>500&&e.y<560){
            dibujarInstrucciones();

        //Esto nos debería devolver de instrucciones al menu incial (no funciona esto)
        }else if (instrucciones==true && (e.x>420&&e.x<660&&e.y>500&&e.y<560)){
            jugar();

            //Esto nos debería llevar cuando ganamos al menu incial (no funciona esto)
        }
        /*else if (ganaste==true && inicio==false && instrucciones==false){
            if(e.x>420&&e.x<660&&e.y>500&&e.y<560){
                dibujarTextoInicio();
            }
        }*/
	}
	
});

//Evento de que se cambie de color el texto cuando paso el cursor por arriba

document.addEventListener('mousemove',function(e){
    console.log(e)
	//si está al final o al principio del juego:
    // ganaste==true e instrucciones==true no lograron lo que quería 
	if(vidas==0 || puntos==50 || inicio==false){
		if(e.x>180&&e.x<330&&e.y>500&&e.y<560 || e.x>420&&e.x<660&&e.y>500&&e.y<560){
        //si pasa por esas coordenadas

				canvas.style.cursor="pointer"; //que se ponga como manito
				colorBoton="#fff";
        
        }else{
			canvas.style.cursor=""; //sacar el pointer si no está en ese área
			colorBoton="#000"; //volver al color original del texto
		}

	}
    //con instrucciones==false permite que nos quedemos en el menu de instrucciones
    if(inicio==false && instrucciones==false && ganaste==false){
        dibujarTextoInicio();
    }
	
});