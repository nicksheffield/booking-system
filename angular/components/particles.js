Mousetrap.bindGlobal(['up up down down left right left right b a'], function() {
	window.konami = true
	document.body.classList.add('konami-code')
	return false
})

$(document).on('click', function(event) {
	if(window.konami) {
		if(event.clientX && event.clientY) {
			explode(event)
		}
	}
})

function explode(e) {
	var x = e.clientX
	var y = e.clientY
	var c = document.createElement('canvas')
	var ctx = c.getContext('2d')
	var ratio = window.devicePixelRatio
	var particles = []
	var colors = [
		'#3F51B5',
		'#D00',
		'#FF9800',
		'#00BCD4',
		'#8BC34A'
	]
	
	document.body.appendChild(c)
	
	c.style.position = 'absolute'
	c.style.left = (x - 100) + 'px'
	c.style.top = (y - 100) + 'px'
	c.style.pointerEvents = 'none'
	c.style.width = 200 + 'px'
	c.style.height = 200 + 'px'
	c.style.zIndex = 9999
	c.width = 400 / ratio
	c.height = 400 / ratio
	
	function Particle() {
		return {
			x: c.width / 2,
			y: c.height / 2,
			size: r(15,25) * ratio,
			color: colors[parseInt(Math.random()*colors.length)],
			rotation: r(0,360, true),
			speed: r(8,12),
			friction: 0.9,
			opacity: r(0,0.5, true),
			yVel: 0,
			gravity: 0
		}
	}
	
	for(var i=0; ++i<25;) {
		particles.push(Particle())
	}
	
	function render() {
		ctx.clearRect(0, 0, c.width, c.height)
		
		particles.forEach(function(p, i) {
			
			var step = at.step(p.rotation, p.speed)
			
			p.x += step.x
			p.y += step.y
			
			p.opacity -= 0.0
			p.speed *= p.friction
			p.size *= p.friction
			
			p.yVel += p.gravity
			p.y += p.yVel
			
			if(p.opacity < 0) return
			if(p.radius < 0) return
			
			ctx.beginPath()
			ctx.globalAlpha = p.opacity
			ctx.fillStyle = p.color
			// ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false)
			ctx.rect(p.x, p.y, p.size, p.size)
			ctx.fill()
		})
	}
	
	;(function renderLoop(){
		requestAnimationFrame(renderLoop)
		render()
	})()
	
	setTimeout(function() {
		document.body.removeChild(c)
	}, 3000)
}

var at = {
	angle: function(a,b){return Math.atan2(b.y-a.y,b.x-a.x)/Math.PI*180},
	dist:  function(a,b){return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y))},
	step:  function(a,s){return {x:s*Math.cos(a*Math.PI/180),y:s*Math.sin(a*Math.PI/180)}}
}
function r(a,b,c){ return parseFloat((Math.random()*((a?a:1)-(b?b:0))+(b?b:0)).toFixed(c?c:0)); }