// based on http://codepen.io/juliangarnier/pen/gmOwJX

Mousetrap.bindGlobal(['up up down down left right left right b a'], function() {
	window.konami = true
	// document.body.classList.add('konami-code')
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
	var x = e.pageX
	var y = e.pageY
	var c = document.createElement('canvas')
	var ctx = c.getContext('2d')
	var ratio = window.devicePixelRatio
	var particles = []
	var rings = []
	var colors = [
		'#FF1461', '#18FF92', '#5A87FF', '#FBF38C'
	]

	var options = {
		numParticles: 30,
		scale: 1,
		radiusMin: 60,
		radiusMax: 100,
		speedMin: 8,
		speedMax: 16,
		accel: 0.95,
		ringFade: 0.03,
		ringAccel: 20,
		ringAccelShrink: 0.8,
		ringMinAccel: 0.6,
		ringWidth: 1,
		gravity: 0
	}
	
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
	
	for(var i=0; ++i<options.numParticles+1;) {
		particles.push({
			x: c.width / 2,
			y: c.height / 2,
			radius: r(options.radiusMin * options.scale, options.radiusMax * options.scale),
			color: colors[parseInt(Math.random()*colors.length)],
			rotation: r(0, 360, true),
			speed: r(options.speedMin * options.scale, options.speedMax * options.scale),
			yVel: 0,
			gravity: options.gravity * options.scale,
			accel: options.accel,
			shrink: 0.875
		})
	}

	rings.push({
		x: c.width / 2,
		y: c.height / 2,
		radius: 0,
		accel: options.ringAccel * options.scale,
		alpha: 1
	})
	
	function render() {
		ctx.clearRect(0, 0, c.width, c.height)

		rings.forEach(function(ring, i) {
			ring.radius += ring.accel

			ring.accel -= options.ringAccelShrink * options.scale

			if(ring.accel < options.ringMinAccel) ring.accel = options.ringMinAccel

			ring.alpha -= options.ringFade

			ctx.strokeStyle = 'rgba(0, 0, 0, ' + ring.alpha + ')'
			ctx.lineWidth = options.ringWidth * options.scale
			
			ctx.beginPath()
			ctx.arc(ring.x, ring.y, ring.radius, 0, 2 * Math.PI, false)
			ctx.stroke()
		})
		
		particles.forEach(function(p, i) {
			p.radius *= p.shrink
			
			if(p.radius < 0) return
			
			var step = at.step(p.rotation, p.speed)
			
			p.x += step.x
			p.y += step.y

			p.speed *= p.accel
			
			p.yVel += p.gravity
			p.y += p.yVel
			
			ctx.beginPath()
			ctx.fillStyle = p.color
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false)
			ctx.fill()
		})
	}
	
	;(function renderLoop(){
		requestAnimationFrame(renderLoop)
		render()
	})()
	
	setTimeout(function() {
		document.body.removeChild(c)
	}, 1000)
}

var at = {
	angle: function(a,b){return Math.atan2(b.y-a.y,b.x-a.x)/Math.PI*180},
	dist:  function(a,b){return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y))},
	step:  function(a,s){return {x:s*Math.cos(a*Math.PI/180),y:s*Math.sin(a*Math.PI/180)}}
}

function r(a,b,c){ return parseFloat((Math.random()*((a?a:1)-(b?b:0))+(b?b:0)).toFixed(c?c:0)) }