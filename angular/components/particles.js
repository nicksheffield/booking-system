Mousetrap.bindGlobal(['up up down down left right left right b a'], function() {
	window.konami = true
	// document.body.classList.add('konami-code')
	return false
})

window.konami = true

$(document).on('click', function(event) {
	if(window.konami) {
		if(event.clientX && event.clientY) {
			explode(event)
		}
	}
})

function explode(e) {
	var x = e.pageX
	var y = e.pageY
	var c = document.createElement('canvas')
	var ctx = c.getContext('2d')
	var ratio = window.devicePixelRatio
	var ringRadius = 0
	var ringAccel = 7
	var ringAlpha = 1
	var particles = []
	var colors = [
		'#FF1461', '#18FF92', '#5A87FF', '#FBF38C'
	]
	
	document.body.appendChild(c)

	var w = 600
	var h = 600
	
	c.style.position = 'absolute'
	c.style.left = (x - (w/2)) + 'px'
	c.style.top = (y - (h/2)) + 'px'
	c.style.pointerEvents = 'none'
	c.style.width = w + 'px'
	c.style.height = h + 'px'
	c.style.zIndex = 9999
	c.width = w * ratio
	c.height = h * ratio
	
	function Particle() {
		return {
			x: c.width / 2,
			y: c.height / 2,
			radius: r(30,50),
			color: colors[parseInt(Math.random()*colors.length)],
			rotation: r(0,360, true),
			speed: r(8,12),
			opacity: r(0,0.5, true),
			yVel: 0,
			gravity: 0,
			friction: 0.5,
			shrink: 2
		}
	}
	
	for(var i=0; ++i<25;) {
		particles.push(Particle())
	}
	
	function render() {
		ctx.clearRect(0, 0, c.width, c.height)

		ringRadius += ringAccel

		ringAccel -= 0.3

		if(ringAccel < 0.6) ringAccel = 0.6

		ringAlpha -= 0.03

		ctx.strokeStyle = 'rgba(0, 0, 0, ' + ringAlpha + ')'
		
		ctx.beginPath()
		ctx.arc(c.width / 2, c.height / 2, ringRadius, 0, 2 * Math.PI, false)
		ctx.stroke()
		
		particles.forEach(function(p, i) {
			
			var step = at.step(p.rotation, p.speed)
			
			p.x += step.x
			p.y += step.y
			
			p.opacity -= 0.0
			p.speed = p.speed - p.friction > 0 ? p.speed - p.friction : 1
			p.radius -= p.shrink

			// p.friction -= 0.01
			
			p.yVel += p.gravity
			p.y += p.yVel
			
			if(p.opacity < 0) return
			if(p.radius < 0) return
			
			ctx.beginPath()
			ctx.globalAlpha = p.opacity
			ctx.fillStyle = p.color
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false)
			// ctx.rect(p.x, p.y, p.radius * 2, p.radius * 2)
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

function r(a,b,c){ return parseFloat((Math.random()*((a?a:1)-(b?b:0))+(b?b:0)).toFixed(c?c:0)) }