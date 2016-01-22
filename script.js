function Canvas(){
        //console.log("Got Here");
        /*CANVAS CREATION*/
        var canvas = document.getElementById("canvas");
        canvas.width = $(window).innerWidth();
        canvas.height = $(window).innerHeight();       
        ct = canvas.getContext("2d");        
        
        var particles = [];
        var particleIndex = 0;
        var maxLife = 100;
        
        function Particle(){
            this.posX = (Math.random() * canvas.width);
            this.posY = (Math.random() * canvas.height);
            this.radius = Math.random() * 10 + 5;
            this.vx = Math.floor((Math.random() * 4) - 2);
            this.vy = Math.floor((Math.random() * 4) - 2);
            this.life = Math.random()*100;
            this.alpha = 1;
            this.gravity = 0.1;
            this.color =  "hsla(" + parseInt(Math.random() * 360, 10) + ",30%, 60%,";// para el hlsa el tinte va de 0 a 360 
            
            /*INTERACTIONS*/
            this.interactions = function(){
                
                /*BOTTOM LIMIT*/
                if(this.posY > canvas.height - this.radius){
                    this.posY = canvas.height - this.radius;
                    this.vy *= -0.8;
                    this.vx *= 0.8;
                }
                
                /*RIGHT LIMIT*/
                if(this.posX > canvas.width - this.radius){
                    this.posx = canvas.width - this.radius;
                    this.vy *= 0.8;
                    this.vx *= -0.8;
                }
                
                /*LEFT LIMIT*/
                if(this.posX < this.radius){
                    this.posx = 0;
                    this.vy *= 0.8;
                    this.vx *= -0.8;
                }
                
                /*DYING*/
                if (this.alpha < 0){
                    delete particles[this.index];
                }  
            }
            
            this.draw = function(){
                this.vy += this.gravity;
                this.posX += this.vx;
                this.posY += this.vy; 
                this.life -= 2;
                this.alpha = this.life / maxLife;            

                this.interactions();


                ct.fillStyle =  this.color + this.alpha + ")";            
                ct.moveTo(this.posX, this.posY);
                ct.beginPath();
                ct.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
                ct.fill();
            }             
        
                    
            
            
            // cada vez que se crea una particula 
            // anadirla al arreglo y guardar su index para poder accederla despues
            particleIndex++;
            this.index = particleIndex;
            particles[particleIndex] = this;
            
            
        }
        
        
        
        
        
        
        
        /* RESIZE */
        $(window).resize(function(){ 
                    canvas.width = $(window).innerWidth();
                    canvas.height = $(window).innerHeight();                      
                    
        });
        
        
        
        
        /*ANIMATION*/
        setInterval(function(){
            ct.fillStyle = "#f1e8c8";
            ct.fillRect(0, 0, canvas.width, canvas.height);
            
            /*CREATE PARTICLES*/
            for(var i = 0; i < 20; i++){
                new Particle();
            }
            
            /*DRAW PARTICLES*/
            for(var i in particles){
                particles[i].draw();
            }
            
            
        }, 30);
    
    }
        
       
        
        
    
        
    
         
    













/*RANDOM QUOTES*/
var quotes = [
    { theme:"About life",
     author:"Buddha",
      quote:"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment."
    },
    
    { theme:"About life",
     author:"Confucius",
      quote:"Life is really simple, but we insist on making it complicated."
    },
    
    { theme:"About life",
     author:"George Bernard",
      quote:"Life isn't about finding yourself. Life is about creating yourself."
    },
    
    { theme:"About life",
     author:"Martin Luther King",
      quote:"Life's most persistent and urgent question is, What are you doing for others?"
    },
    
   
    { theme:"Socialism",
     author:"Margaret Thatcher",
      quote:"The problem with socialism is that you eventually run out of other people's money."
    },
    
    { theme:"Socialism",
     author:"Winston Churchill",
      quote:"Socialism is a philosophy of failure, the creed of ignorance, and the gospel of envy, its inherent virtue is the equal sharing of misery."
    },
    
    { theme:"About life",
     author:"Christ",
      quote:"Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God."
    },
    
    { theme:"About life",
     author:"Christ",
      quote:"For whoever wants to save their life will lose it, but whoever loses their life for me will find it."
    },
    
    { theme:"Repentance",
     author:"Christ",
      quote:"Repent: for the kingdom of heaven is at hand"
    }  
    
    
];

var randomIndex = 0;

function randomQuote(){
    randomIndex = Math.floor(Math.random() * quotes.length);
    //console.log($(".cita h4").text());
    $(".cita h4").text(quotes[randomIndex].theme);
    $(".cita p").text('"' + quotes[randomIndex].quote + '"');
    $("footer").text(quotes[randomIndex].author);
    prepTweet();
}



function urlEncode(text){
    var encodedText = "";
    var subText="";
    for(var i in text){
         
        
        switch(text[i]){
            case '"': subText = "%22";
                 break;
                
            case ' ': subText = "%20";
                 break;
            
            case '@': subText = "%40";
                 break;
            
            case '#': subText = "%23";
                 break;
                
            default: subText = text[i];
        }
        encodedText += subText;
    }
    return encodedText;
}



function prepTweet(){
var $a = $("a"); 
    //console.log(urlEncode(quotes[randomIndex].quote + " -" + quotes[randomIndex].author));
    var hrefURL = "http://twitter.com/share?text=" + '"' + urlEncode(quotes[randomIndex].quote + '"' + " -" + quotes[randomIndex].author + " #IdoNotKnow @vdmpeniel");
    $a.attr("href",hrefURL);
}


function events(){

    $(".next").click(function(){
        randomQuote();        
    });
    
    
}



$(document).ready(function(){
    Canvas();
    randomQuote();    
    events();
    


});