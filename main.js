 const fireSound= new Audio('./sounds/fire.mp3');
const burstSound= new Audio('./sounds/burst.mp3');
const powerDown= new Audio('./sounds/powerDown.mp3');

function random(min,max){
	return Math.floor(Math.random()*(max-min+1))+ min;
}
const app= new Vue({
	el:'.gameDiv',
	data(){
		return{
			score:0 ,
			x: 200,
			y: 200,
			angle:0,
			bullets:[],
			bubbleReached: false
		}
	},

	created(){
		this.updateBullet();
		this.updateBubble();
	},
	methods:{

		// Handling moving of your layer (W,A,S,D) and (↑,  ←,  ↓,  →) Up,Left,Down and right
		
		move(event)
		{
			let amount =10;
			if ((event.key=='a' || event.key =='ArrowLeft') && this.x >0)
			{
				this.x -=amount;
			}
			else if ((event.key=='d' || event.key =='ArrowRight') && this.x < 1000-100)
			{
				this.x +=amount;
			}

			else if ((event.key=='w' || event.key =='ArrowUp') && this.y>0)
			{
				this.y -=amount;
			}

			else if ((event.key=='s' || event.key =='ArrowDown') && this.y < 600-100)
			{
				this.y +=amount;
			}
			else if(event.key==" ")
			{
				this.fire();
			}
		},

		// handling mouse scroll to rotate player
		// 
	   rotate(event)
	   {
	   	if (event.deltaY >0)
	   	 {
	   	 	this.angle +=10;
	   	 	if (this.angle >360)
	   	 	 {
	   	 	 	this.angle = 0;
	   	 	 }
	   	 }
	   	 else
	   	 {
	   	 	this.angle -=10;
	   	 	if (this.angle <0)
	   	 	 {
	   	 	 	this.angle =360;
	   	 	 }
	   	 }
	   },

	   // this function will call when spacebar this push a new bullet come in bubble
	   // 
	   
	   fire()
	   {
	   	this.bullets.push({
	   		x: this.x + (100/2),
	   		Y: this.y + (100/2),
	   		angle: this.angle
	   	});
	   	fireSound.play();
	   },

	   outOfScreen(i)
	   {
	   	if( this.bullets[i].x<0    ||
	   		this.bullets[i].y<0    ||
	   		this.bullets[i].x>1000 ||
	   		this.bullets[i].y>600)

	   		{
	   			this.bullets.splice(i, 1);
	   		}
	   },

	   updateBullet()

	   /* this function will run for each others
	   a. if the bullets goes outside the playground it will be remove
	   b. update bullet position
	    */
	   
	   setInterval(()=>{
	   	const distance ==30;
	   	this.bullets.forEach((bullet,i)=>{
	   		this.outOfScreen(i);
	   		bullet.x += -Math.sin((Math.PI /180)* (bullet.angle +45)) * distance;
	   		bullet.y += Math.cos((Math.PI /180)* (bullet.angle +45)) * distance;

	   	});
	   	this.checkCollusion();
	    }, 30)
	},

	// checking if any bullet is overloping any bubble
	// 
	
	checkCollusion()
	{
		this.bullets.forEach((bullet)=>{
			this.bubbles.forEach((bubble, i)=>{
				if(
					Math.abs(bullet.x -bubble.x)<(25+7.5) &&
					Math.abs(bullet.y -bubble.y)<(25+7.5)

				){
					this.bubbles.splice(i,1);
				    this.score++;
				    burstSound.play();
				}
			})


		});
	},

	// when a bubble reached at  the top of gamediv
	// 
	
	bubbleReachedTop()
	{
		this.bubbles.forEach((bubble ,i)=>{
			if(bubble.y<0)
			{
				console.log('Done');
				this.bubbles.splice(i ,1);
				this.bubbleReached = true;
				powerDown.play();
				setTimeout(() =>{
					this.bubbleReached =false;
				}, 1000);

			}
		});
	},


	updateBubble()
	{
		const n= 50/2 
		setInterval(()=>{
			this.bubbles.forEach(bubble=>{
				bubble.y -=2;
			});
			this.bubbleReachedTop();

		}, 30)

		setInterval(()=> {
			this.bubbles.push({
				x:random(n, 1000-n),
				y:600 + n;
				color:random(1,10)
			})
		}, 2000)
	}

	computed:
	{
		// for position and rotation of the player
		// 
		player()
		{
			return{
				left: this.x + 'px',
				top:this.ym+ 'px',
				transform: 'rotate(${this.angle}deg)'

			}
		}
	},

})


// list to user input
// 
document.addEventLister("keydown",app.move);
document.addEventLister("wheel",app.rotate);




