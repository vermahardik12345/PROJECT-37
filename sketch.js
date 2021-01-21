     //declaring global variables

      var dog,dogimg,happydog,happydogimg,database,foodS,foodStock;
      var foodobj;
      var addfood,feedpet;
      var fedtime,lastfed;
      var input2;
      var feedTime,feedTime1;
      var greeting;
      var readstate,Gamestate;
      var bedroomimg,gardernimg,washroomimg;
      var currentTime;
      var living;
  
  
      function preload()
  {
      //loading images
    
      dogimg=loadImage("dogImg.png");

      happydogimg=loadImage("dogImg1.png");

      bedroomimg=loadImage("Bed Room.png");

      gardernimg=loadImage("Garden.png");

      washroomimg=loadImage("Wash Room.png");

      living=loadImage("Living Room.png")

  }

  function setup() {
   
      database=firebase.database();
      
      createCanvas(1000, 500);
      foodStock=database.ref('Food');
      foodStock.on("value",readStock);


      readstate=database.ref('Gamestate');
      readstate.on("value",function(data){
        Gamestate=data.val();
        
      });
      
 

   dog=createSprite(450,350,10,10);
   dog.addImage(dogimg);
   dog.scale=0.15;


   feedTime=database.ref('feedTime');
   feedTime.on("value",readtime);

   foodobj=new food();
 
    
   addfood=createButton("ADD FOOD");
  
   addfood.position(350,250);

   addfood.mousePressed(adds);

   feedpet=createButton("FEED");

   feedpet.position(450,250);
   feedpet.mousePressed(feedDog);
   input2=createInput("ADD🦊 DOGNAME");
   input2.position(550,250);
 
   greeting=createElement('h3');

   SaveName=createButton("save name");
   SaveName.position(550,300);
   SaveName.mousePressed(function(){
   
  
   var name = input2.value();
   
   greeting.html("WELCOME   "+name);
   greeting.position(650,300);

    
  })
   
  
  
}

function draw() {  
   background(46,139,87);

  



  

  


      if(foodS==0){
        dog.addImage(dogimg)
        foodS=20;
      }
        

        drawSprites();
      textSize(20);
      fill("pink");
      stroke("yellow");
      
      
        text("FOOD STOCK:"+     foodS,100,480);
        

      if(lastfed>=12){
        text("LAST FEED:"+lastfed%12+"PM",350,30);

      }else if(lastfed==0){
        text("LAST FEED:12 AM",350,30);

      }else {
        text("LAST FEED:"+lastfed+"AM",350,30);
      }
      /*if(addfood.mousePressed(function()){
        foodobj.display();
      )}*/
      foodobj.display();





      if(Gamestate!=="Hungry"){
        feedpet.hide();
        addfood.hide();
        
        
      }else{
        feedpet.show();
        addfood.show();
        dog.addImage(dogimg);
      }

      currentTime=hour();
        if(currentTime===(lastfed+1)){
      update("Playing");
      foodobj.garden();
      textSize(15);
      text("DOG IS PLAYING RIGHT NOW.DOG'S STOMACH IS FULL THANKS",1,100);

        }else if(currentTime===(lastfed+2)){
          update("sleeping");
          foodobj.bedroom();
          textSize(15);
          text("DOG IS SLEEPING RIGHT NOW.DOG'S STOMACH IS FULL THANKS",1,100);
        }else if(currentTime>(lastfed+2)&&currentTime<=(lastfed+4)){
          update("Bathing");
          foodobj.washroom();
        push();
        fill("red");
        textSize(15);
        text("DOG IS HAVING A BATH  RIGHT NOW.DOG'S STOMACH IS FULL THANKS",1,100);
          pop();
        }
        else{
          update("Hungry");
          foodobj.display();
          textSize(15);
          text("DOG IS HUNGRY!PLS FEED 🥩",1,100);
        }
      

      console.log(Gamestate);


      }

      function adds(){
        foodS++
        dog.addImage(dogimg);
        database.ref('/').update({
          Food:foodS
        })
      }
      function readtime(data)
      {
        
        lastfed=data.val();
      
      }
      function feedDog() {
        console.log("this is a message");
        dog.addImage(happydogimg);
        foodobj.deductFood(foodS);
        database.ref('/').update({
        Food:foodS,
          feedTime: hour()
        })
      }

      function readStock(data)
      {
        foodS=data.val();
      }
      
      function writeStock(x){
      if(x<=0){
        x=0;
      }
      else{
        x=x-1;
      }
      database.ref('/').update({
        Food:x
      })
      }
      function update(state){
        
        database.ref('/').update({
          Gamestate:state
          
        })
      }

