// Particle Atelier — standalone Canvas 2D particle engine.
// Effects are data-driven; each layer owns its emitter, forces and lifecycle.
export const EFFECTS = [
  ['rain','Rain','Nature','rain','streak','#69baf3',235,1.7,420,1.5,'top'],
  ['snow','Snow','Nature','snow','flake','#d6ecff',90,7.5,65,3.2,'top'],
  ['fog','Fog','Nature','fog','smoke','#8ba8c5',23,11,26,78,'box'],
  ['smoke','Smoke','Nature','smoke','smoke','#a3a2c9',50,5.2,67,32,'bottom'],
  ['dust','Dust','Nature','dust','soft','#dbc7a5',88,9,25,2.2,'box'],
  ['sandstorm','Sandstorm','Nature','sand','streak','#e8b783',220,2.6,310,1.7,'left'],
  ['wind','Wind','Nature','wind','streak','#bbdef2',95,2.8,240,1.2,'left'],
  ['leaves','Leaves','Nature','leaves','leaf','#d9a66a',46,8,90,7.8,'top'],
  ['splash','Water Splash','Nature','splash','drop','#6ad4ff',120,1.7,260,3,'bottom'],
  ['bubbles','Bubbles','Nature','bubbles','ring','#9be8ff',63,7,85,7.5,'bottom'],
  ['fire','Fire','Nature','fire','flame','#ff8246',210,1.35,190,8.5,'bottom'],
  ['embers','Embers','Nature','embers','soft','#ffaf59',130,4.5,105,2.5,'bottom'],
  ['spark','Spark','Light','spark','spark','#ffe6a4',160,1.5,295,2.1,'center'],
  ['glitter','Glitter','Light','glitter','star','#fbccff',115,2.7,95,2.5,'box'],
  ['twinkle','Twinkle','Light','twinkle','star','#e5fbff',120,6.5,10,2.2,'box'],
  ['glow','Glow Particles','Light','glow','soft','#91caff',105,5.5,55,8,'box'],
  ['fireflies','Fireflies','Light','fireflies','soft','#e6ff80',95,6.5,35,3.8,'box'],
  ['magic','Magic Dust','Light','magic','star','#d4a2ff',130,4.5,100,3.2,'center'],
  ['orb','Energy Orb','Light','orb','soft','#78d9ff',175,4.2,140,4.8,'ring'],
  ['beam','Energy Beam','Light','beam','streak','#8bbdff',160,1.65,430,2.8,'line'],
  ['arc','Electric Arc','Light','arc','spark','#ae9aff',130,.85,300,2.6,'line'],
  ['plasma','Plasma','Light','plasma','soft','#c47fff',175,3.4,180,10,'center'],
  ['neon','Neon Trail','Light','neon','streak','#ff82ce',135,3.2,160,2.2,'path'],
  ['streak','Light Streak','Light','streak','streak','#95ccff',115,1.6,380,2.8,'left'],
  ['explosion','Explosion','Impact','explosion','flame','#ff9962',290,1.85,360,4.8,'center'],
  ['shockwave','Shockwave','Impact','shockwave','ring','#84dcff',110,1.55,280,3,'center'],
  ['radial','Radial Burst','Impact','radial','spark','#f5cbff',225,2.1,300,2.6,'center'],
  ['debris','Debris','Impact','debris','shard','#f0b99b',150,3.1,210,4.5,'center'],
  ['shatter','Shatter','Impact','shatter','shard','#b5d7ff',215,2.5,255,6,'center'],
  ['impact','Impact Sparks','Impact','impact','spark','#ffd29c',250,1.5,340,2.5,'bottom'],
  ['fireworks','Fireworks','Impact','fireworks','star','#ff8bdb',260,2.9,260,3,'center'],
  ['meteor','Meteor Trail','Impact','meteor','streak','#ffa878',130,2,400,3,'top'],
  ['pulse','Energy Pulse','Impact','pulse','soft','#86fcf0',190,2.45,190,4,'center'],
  ['trail','Particle Trail','Digital','trail','soft','#b49cff',190,2.2,180,3,'path'],
  ['vortex','Vortex','Digital','vortex','soft','#a9a1ff',225,5,205,3,'ring'],
  ['spiral','Spiral','Digital','spiral','star','#94ecf4',205,4.5,175,3,'ring'],
  ['flow','Particle Flow','Digital','flow','streak','#74e0ca',190,5,135,2,'box'],
  ['wave','Particle Wave','Digital','wave','soft','#98b5ff',170,5.5,92,2.8,'line'],
  ['noise','Noise Field','Digital','noise','pixel','#d29dff',210,4.8,120,3,'box'],
  ['network','Particle Network','Digital','network','soft','#8ee4e0',75,7.5,43,2.5,'box'],
  ['data','Data Stream','Digital','data','pixel','#77f3c8',185,3.1,245,3,'top'],
  ['dissolve','Pixel Dissolve','Digital','dissolve','pixel','#a6ceff',180,4.4,125,3.6,'mask'],
  ['glitch','Glitch Particles','Digital','glitch','pixel','#ff77bd',180,2.6,145,5,'mask'],
  ['morph','Particle Morphing','Digital','morph','soft','#d7b7ff',175,7.5,110,3,'mask'],
  ['assemble','Particle Assembly','Digital','assemble','soft','#a4d9ff',170,7,135,3.2,'mask'],
  ['disintegrate','Disintegration','Digital','disintegrate','pixel','#ffacb2',185,4,155,4.3,'mask'],
  ['orbital','Orbital Particles','Digital','orbital','star','#d5caff',170,7,130,2.5,'ring'],
  ['swarm','Particle Swarm','Digital','swarm','soft','#c5f392',185,6.5,135,3.2,'box']
].map(([id,name,group,mode,shape,color,rate,life,speed,size,emitter]) => ({
  id,name,group,mode,shape,color,rate,life,speed,size,emitter
}));

export const EFFECT_MAP = new Map(EFFECTS.map(effect => [effect.id,effect]));
export const CATEGORIES = ['Nature','Light','Impact','Digital'];
const TAU = Math.PI * 2;
const clamp = (x,a,b) => Math.min(b,Math.max(a,x));
const hex = value => {
  const str = /^#[0-9a-f]{6}$/i.test(value || '') ? value : '#a7b7ff';
  return [parseInt(str.slice(1,3),16),parseInt(str.slice(3,5),16),parseInt(str.slice(5,7),16)];
};

export const PRESETS = [
  {name:'Aurora Drift',caption:'Luminous / ambient',layers:['glow','fireflies','flow'],colors:['#67e8df','#d4ff9a','#9c82ff']},
  {name:'After The Rain',caption:'Atmospheric / nocturnal',layers:['rain','fog','twinkle'],colors:['#78cafa','#8296be','#e4f6ff']},
  {name:'Solar Flare',caption:'Energetic / cinematic',layers:['fire','embers','spark'],colors:['#ff7d49','#ffb24f','#ffe6a1']},
  {name:'Cosmic Ritual',caption:'Magical / orbital',layers:['orb','spiral','magic'],colors:['#7bd2ff','#b194ff','#ff99e9']},
  {name:'Digital Bloom',caption:'Synthetic / generative',layers:['assemble','network','glitch'],colors:['#8fdfff','#69eac6','#ff71bd']},
  {name:'Midnight Snow',caption:'Quiet / cinematic',layers:['snow','wind','glitter'],colors:['#d4edff','#b3d6f5','#faf4ff']},
  {name:'Impact Study',caption:'Explosive / kinetic',layers:['explosion','shockwave','debris'],colors:['#ff8c5f','#9ce4ff','#ffcaa0']}
];

export class ParticleEngine {
  constructor(canvas, onMetrics) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', {alpha:false});
    this.onMetrics = onMetrics;
    this.layers = [];
    this.particles = [];
    this.pool = [];
    this.serial = 0;
    this.seed = 814211;
    this.randomState = this.seed;
    this.lockSeed = true;
    this.playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.quality = 'auto';
    this.adaptiveScale = 1;
    this.timeScale = 1;
    this.pointerMode = 'attract';
    this.pointer = {x:0,y:0,active:false,down:false};
    this.width = 1;
    this.height = 1;
    this.dpr = 1;
    this.fps = 60;
    this.frames = 0;
    this.metricTime = 0;
    this.lastTime = 0;
    this.timer = 0;
    this.maskPoints = [];
    this.frame = this.frame.bind(this);
    this.resize = this.resize.bind(this);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(canvas.parentElement);
    this.resize();
    this.raf = requestAnimationFrame(this.frame);
  }
  rand() {
    let x = this.randomState | 0;
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    this.randomState = x;
    return (x >>> 0) / 4294967296;
  }
  between(a,b) {return a + (b-a)*this.rand();}
  pick(array) {return array[Math.floor(this.rand()*array.length)] || [this.width/2,this.height/2];}
  get cap() {
    const mobile = this.width < 690;
    const base = this.quality === 'low' ? 500 : this.quality === 'high' ? 2500 : mobile ? 850 : 1700;
    return Math.round(base * this.adaptiveScale);
  }
  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const w = Math.max(1,Math.round(rect.width)),h=Math.max(1,Math.round(rect.height));
    if(w===this.width && h===this.height)return;
    const sx = w/this.width,sy=h/this.height;
    this.width=w;this.height=h;
    this.dpr=Math.min(window.devicePixelRatio||1,this.quality==='low'?1:2);
    this.canvas.width=Math.round(w*this.dpr);
    this.canvas.height=Math.round(h*this.dpr);
    this.canvas.style.width=w+'px';
    this.canvas.style.height=h+'px';
    this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    if (sx<10 && sy<10) for(const p of this.particles){p.x*=sx;p.y*=sy;}
    this.buildMask();
    if(!this.playing)this.draw();
  }
  buildMask() {
    const temp=document.createElement('canvas');
    const size=Math.min(this.width*.20,160);
    temp.width=this.width;temp.height=this.height;
    const ctx=temp.getContext('2d',{willReadFrequently:true});
    ctx.fillStyle='#fff';
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.font='900 '+Math.max(36,size)+'px system-ui,sans-serif';
    ctx.fillText('VFX',this.width/2,this.height/2);
    const area=ctx.getImageData(0,0,temp.width,temp.height).data;
    const coords=[];
    const step=this.width<690?7:8;
    for(let y=0;y<this.height;y+=step)for(let x=0;x<this.width;x+=step){
      if(area[(y*this.width+x)*4+3]>100)coords.push([x,y]);
    }
    this.maskPoints=coords;
  }
  makeLayer(effectId, options={}) {
    const def=EFFECT_MAP.get(effectId);
    if(!def)return null;
    const obj = {
      uid:++this.serial,effectId,
      color:def.color,amount:75,rate:100,life:100,size:100,speed:100,
      direction:0,gravity:0,wind:0,turbulence:25,glow:65,opacity:85,
      blend: ['rain','snow','fog','smoke','dust','sandstorm','leaves','debris'].includes(effectId)?'source-over':'lighter',
      emitter:def.emitter,loop:true,enabled:true,
      clock:0,accum:0,burstPending:true
    };
    const numeric=['amount','rate','life','size','speed','direction','gravity','wind','turbulence','glow','opacity'];
    numeric.forEach(key=>{if(Number.isFinite(Number(options[key])))obj[key]=clamp(Number(options[key]),key==='direction'?-180:key==='gravity'||key==='wind'?-100:0,key==='direction'?180:key==='gravity'||key==='wind'?100:300);});
    if(/^#[0-9a-f]{6}$/i.test(options.color||''))obj.color=options.color;
    if(['source-over','lighter','screen'].includes(options.blend))obj.blend=options.blend;
    if(['point','line','ring','box','top','bottom','left','path','mask'].includes(options.emitter))obj.emitter=options.emitter;
    if(typeof options.loop==='boolean')obj.loop=options.loop;
    if(typeof options.enabled==='boolean')obj.enabled=options.enabled;
    this.layers.push(obj);
    return obj;
  }
  clearParticles(){this.pool.push(...this.particles);this.particles.length=0;for(const l of this.layers){l.clock=0;l.accum=0;l.burstPending=true;}if(!this.playing)this.draw();}
  reset(randomize=false){
    if(randomize || !this.lockSeed)this.seed=(Math.random()*0x7fffffff)|0;
    this.randomState=this.seed||1;this.timer=0;this.clearParticles();
  }
  removeLayer(uid){this.layers=this.layers.filter(l=>l.uid!==uid);for(let i=this.particles.length-1;i>=0;i--)if(this.particles[i].uid===uid)this.recycle(i);if(!this.playing)this.draw();}
  recycle(i){this.pool.push(this.particles[i]);const last=this.particles.pop();if(i<this.particles.length)this.particles[i]=last;}
  setPointer(x,y,active=true,down=false){this.pointer={x,y,active,down};}
  burst(x=this.width/2,y=this.height/2) {
    const enabled=this.layers.filter(l=>l.enabled);
    for(const l of enabled){
      const d=EFFECT_MAP.get(l.effectId);
      const n=Math.min(65,Math.round(25*l.amount/75));
      for(let k=0;k<n && this.particles.length<this.cap;k++)this.spawn(l,d,x,y,true);
    }
    if(!this.playing)this.draw();
  }
  spawn(l,d,overrideX,overrideY,impulse=false){
    if(this.particles.length>=this.cap)return;
    const p=this.pool.pop()||{};
    let x=this.width*.5,y=this.height*.5;
    const emitter=l.emitter;
    if(emitter==='top'){x=this.between(-20,this.width+20);y=this.between(-35,3);}
    else if(emitter==='bottom'){x=this.between(0,this.width);y=this.height+this.between(-3,25);}
    else if(emitter==='left'){x=-20;y=this.between(0,this.height);}
    else if(emitter==='box'){x=this.between(0,this.width);y=this.between(0,this.height);}
    else if(emitter==='line'){x=this.between(this.width*.1,this.width*.9);y=this.height*.5;}
    else if(emitter==='ring'){const a=this.between(0,TAU);const r=this.between(10,Math.min(this.width,this.height)*.31);x=this.width*.5+Math.cos(a)*r;y=this.height*.5+Math.sin(a)*r;}
    else if(emitter==='path'){x=this.pointer.active?this.pointer.x:this.width*(.5+.2*Math.cos(this.timer*.7));y=this.pointer.active?this.pointer.y:this.height*(.5+.22*Math.sin(this.timer));}
    else if(emitter==='mask'){const pt=this.pick(this.maskPoints);x=pt[0];y=pt[1];}
    else {x=this.width/2+this.between(-32,32);y=this.height/2+this.between(-25,25);}
    if(Number.isFinite(overrideX)){x=overrideX;y=overrideY;}
    const theta=this.between(0,TAU) + l.direction*Math.PI/180;
    const speed=d.speed*l.speed/100*this.between(.45,1.18);
    let vx=Math.cos(theta)*speed,vy=Math.sin(theta)*speed;
    if(['rain','snow','data'].includes(d.mode)){vx*=.18;vy=Math.abs(speed);}
    if(['fire','embers','smoke','bubbles','fog'].includes(d.mode))vy=-Math.abs(speed);
    if(['sand','wind','streak','meteor','beam'].includes(d.mode)){vx=Math.abs(speed);vy*=.18;}
    if(['splash','impact'].includes(d.mode)){vy=-Math.abs(vy)-speed*.5;}
    if(impulse){vx=Math.cos(theta)*speed*1.7;vy=Math.sin(theta)*speed*1.7;}
    const life=Math.max(.3,d.life*l.life/100*this.between(.65,1.55));
    const target=this.pick(this.maskPoints);
    Object.assign(p,{
      uid:l.uid,mode:d.mode,shape:d.shape,x,y,originX:x,originY:y,
      vx,vy,age:0,life,size:d.size*l.size/100*this.between(.5,1.4),
      rotation:theta,spin:this.between(-3,3),phase:this.between(0,TAU),
      z:this.between(.55,1.6),orbitR:this.between(12,Math.min(this.width,this.height)*.36),
      targetX:target[0],targetY:target[1],color:l.color,
      flicker:this.between(.65,1.2)
    });
    this.particles.push(p);
    return p;
  }
  emit(dt){
    const counts={};
    for(const p of this.particles)counts[p.uid]=(counts[p.uid]||0)+1;
    for(const l of this.layers){
      if(!l.enabled)continue;
      const d=EFFECT_MAP.get(l.effectId);
      l.clock+=dt;
      const maxThisLayer=Math.max(3,Math.floor(this.cap*(l.amount/100)*.65));
      const allowed=()=>this.particles.length<this.cap&&(counts[l.uid]||0)<maxThisLayer;
      const impact=d.group==='Impact' || ['arc','pulse'].includes(d.mode);
      if(impact){
        if(l.burstPending || (l.loop && l.clock>2.4)){
          l.clock=0;l.burstPending=false;
          const n=Math.min(maxThisLayer,Math.max(16,Math.round(d.rate*l.amount/100*.50)));
          for(let i=0;i<n && allowed();i++){this.spawn(l,d);counts[l.uid]=(counts[l.uid]||0)+1;}
        }
        continue;
      }
      if(!l.loop && !l.burstPending)continue;
      if(l.burstPending){l.burstPending=false;if(!l.loop)l.accum=Math.min(maxThisLayer,d.rate*l.amount/100);}
      l.accum+=d.rate*(l.rate/100)*(l.amount/75)*dt*this.adaptiveScale;
      let n=Math.min(85,Math.floor(l.accum));
      l.accum-=n;
      while(n-->0 && allowed()){this.spawn(l,d);counts[l.uid]=(counts[l.uid]||0)+1;}
    }
  }
  simulate(dt) {
    this.timer+=dt;this.emit(dt);
    const w=this.width,h=this.height,t=this.timer;
    const lookup=new Map(this.layers.map(l=>[l.uid,l]));
    for(let i=this.particles.length-1;i>=0;i--){
      const p=this.particles[i],l=lookup.get(p.uid);
      if(!l || !l.enabled){this.recycle(i);continue;}
      p.age+=dt;
      if(p.age>=p.life || Math.abs(p.x)>w*2 || Math.abs(p.y)>h*2){this.recycle(i);continue;}
      const m=p.mode;
      const v=l.turbulence/100;
      const noiseX=Math.sin(t*1.3+p.phase*8+p.y*.011)*v*64;
      const noiseY=Math.cos(t*.91+p.phase*7+p.x*.012)*v*36;
      const px=this.pointer.x-p.x,py=this.pointer.y-p.y;
      const pd=Math.hypot(px,py);
      if(this.pointer.active && pd<190 && pd>1){
        const strength=(1-pd/190)*(this.pointer.down?1100:550)*dt;
        const sign=this.pointerMode==='repel'?-1:1;
        p.vx+=px/pd*strength*sign;p.vy+=py/pd*strength*sign;
      }
      if(['orb','orbital','spiral','vortex','plasma'].includes(m)){
        const a=p.phase+t*(m==='vortex'?2.6:m==='spiral'?1.6:.7)*(l.speed/100)*p.z;
        const radius=m==='vortex'?Math.max(5,p.orbitR*(1-p.age/p.life*.84)):
          m==='spiral'?p.orbitR*(p.age/p.life):p.orbitR;
        p.x=w*.5+Math.cos(a)*radius*(m==='plasma'?.62:1);
        p.y=h*.5+Math.sin(a)*radius*(m==='orbital'?.48:.77);
      } else if(['morph','assemble','dissolve','disintegrate','glitch'].includes(m)){
        const f=1-Math.exp(-dt*(m==='assemble'?2.2:1.6));
        if(m==='assemble'||m==='morph'){
          p.x+=(p.targetX-p.x)*f + noiseX*dt*.2;
          p.y+=(p.targetY-p.y)*f + noiseY*dt*.2;
          if(m==='morph'){p.x+=Math.sin(t*1.5+p.phase)*dt*7;p.y+=Math.cos(t*1.3+p.phase)*dt*8;}
        }else{
          const progress=p.age/p.life;
          p.vx+=(noiseX+(m==='glitch'?this.between(-800,800):0))*dt*.32;
          p.vy+=(noiseY-15)*dt*.4;
          p.x+=p.vx*dt*(.2+progress*1.5);p.y+=p.vy*dt*(.2+progress*1.5);
        }
      } else if(m==='wave'){
        p.x+=p.vx*dt*.28;p.y=p.originY+Math.sin(p.x*.021+t*2+p.phase)*Math.min(h*.26,90);
      } else if(m==='network'||m==='swarm'||m==='fireflies'){
        const cx=w*.5+Math.sin(t*.8)*w*.16,cy=h*.5+Math.cos(t*.6)*h*.16;
        p.vx+=(cx-p.x)*dt*(m==='swarm'?.32:.12);
        p.vy+=(cy-p.y)*dt*(m==='swarm'?.32:.12);
        p.vx+=noiseX*dt*1.3;p.vy+=noiseY*dt*1.3;
        p.vx*=Math.exp(-dt*.46);p.vy*=Math.exp(-dt*.46);
        p.x+=p.vx*dt;p.y+=p.vy*dt;
      } else {
        const gravity=l.gravity*2+(m==='debris'||m==='shatter'?200:m==='rain'?55:0);
        const wind=l.wind*2+(m==='sand'||m==='wind'?85:0);
        p.vx+=(wind+noiseX)*dt;
        p.vy+=(gravity+noiseY)*dt;
        if(m==='snow'||m==='leaves'){p.vx+=Math.sin(t*1.9+p.phase)*65*dt;p.vy+=Math.cos(t+p.phase)*18*dt;}
        if(m==='flow'||m==='noise'){p.vx+=Math.sin(p.y*.012+t+p.phase)*80*dt;p.vy+=Math.cos(p.x*.012-t+p.phase)*80*dt;}
        p.vx*=Math.exp(-dt*(m==='fog'?.6:.16));
        p.vy*=Math.exp(-dt*(m==='fog'?.6:.09));
        p.x+=p.vx*dt;p.y+=p.vy*dt;
      }
      p.rotation+=p.spin*dt;
      if(m==='twinkle'||m==='glitter')p.flicker=.4+.6*Math.abs(Math.sin(t*2.7+p.phase*9));
    }
  }
  backdrop(){
    const ctx=this.ctx,w=this.width,h=this.height;
    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='#070b18';ctx.fillRect(0,0,w,h);
    let g=ctx.createRadialGradient(w*.50,h*.48,0,w*.50,h*.48,Math.max(w,h)*.67);
    g.addColorStop(0,'#17233a');g.addColorStop(.48,'#0b1425');g.addColorStop(1,'#070b18');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    const soft=ctx.createRadialGradient(w*.58,h*.50,0,w*.58,h*.50,Math.min(w,h)*.65);
    soft.addColorStop(0,'rgba(74,95,163,.12)');soft.addColorStop(1,'rgba(74,95,163,0)');
    ctx.fillStyle=soft;ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(168,186,231,.055)';
    ctx.lineWidth=1;
    const space=42;
    ctx.beginPath();
    for(let x=space;x<w;x+=space){ctx.moveTo(x+.5,0);ctx.lineTo(x+.5,h);}
    for(let y=space;y<h;y+=space){ctx.moveTo(0,y+.5);ctx.lineTo(w,y+.5);}
    ctx.stroke();
  }
  drawParticle(p,l) {
    const ctx=this.ctx,d=EFFECT_MAP.get(l.effectId);
    const progress=p.age/p.life,fade=Math.min(1,progress*8,(1-progress)*4);
    let alpha=clamp(fade*l.opacity/100*.87*p.flicker,0,1);
    if(p.mode==='twinkle')alpha*=.65+.35*Math.sin(this.timer*6+p.phase*5)**2;
    if(p.mode==='fog'||p.mode==='smoke')alpha*=.22;
    if(p.mode==='dust'||p.mode==='network')alpha*=.7;
    if(alpha<.006)return;
    const rgb=hex(l.color);
    const c='rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',';
    const s=clamp(p.size*p.z,.6,110);
    const x=p.x,y=p.y;
    ctx.globalAlpha=alpha;
    const glow=l.glow/100;
    ctx.shadowBlur=glow*(d.shape==='soft'?22:12);
    ctx.shadowColor=l.color;
    ctx.fillStyle=l.color;ctx.strokeStyle=l.color;
    if(d.shape==='smoke'||d.shape==='soft'||d.shape==='flame'){
      const r=d.shape==='smoke'?s:s*(d.shape==='flame'?1.8:2);
      const grad=ctx.createRadialGradient(x,y,0,x,y,r);
      grad.addColorStop(0,c+(d.shape==='smoke'?'.4)':'.95)'));
      grad.addColorStop(.3,c+(d.shape==='smoke'?'.26)':'.4)'));
      grad.addColorStop(1,c+'0)');
      ctx.fillStyle=grad;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
      if(d.shape==='flame'){ctx.fillStyle=c+'.7)';ctx.beginPath();ctx.ellipse(x,y,s*.34,s*1.1,p.rotation*.3,0,TAU);ctx.fill();}
    }else if(d.shape==='streak'||d.shape==='spark'){
      const dx=-p.vx*.020,dy=-p.vy*.020;
      const len=d.shape==='streak'?clamp(Math.hypot(dx,dy)*3,8,65):clamp(Math.hypot(dx,dy)*.9,4,28);
      const a=Math.atan2(p.vy,p.vx);
      ctx.lineWidth=clamp(s*(d.shape==='spark'?.75:.55),.7,6);
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-Math.cos(a)*len,y-Math.sin(a)*len);ctx.stroke();
      if(d.shape==='spark'){ctx.beginPath();ctx.arc(x,y,s*.52,0,TAU);ctx.fill();}
    } else if(d.shape==='star'||d.shape==='flake'){
      const points=d.shape==='flake'?6:4;
      ctx.save();ctx.translate(x,y);ctx.rotate(p.rotation);
      ctx.beginPath();
      for(let i=0;i<points*2;i++){
        const a=i*Math.PI/points,rad=i%2?s*.27:s*1.55;
        if(i===0)ctx.moveTo(Math.cos(a)*rad,Math.sin(a)*rad);
        else ctx.lineTo(Math.cos(a)*rad,Math.sin(a)*rad);
      }
      ctx.closePath();ctx.fill();ctx.restore();
    }else if(d.shape==='ring'){
      ctx.lineWidth=Math.max(.8,s*.2);
      ctx.beginPath();ctx.arc(x,y,s,0,TAU);ctx.stroke();
    }else if(d.shape==='leaf'){
      ctx.save();ctx.translate(x,y);ctx.rotate(p.rotation);
      ctx.beginPath();ctx.ellipse(0,0,s*.52,s*1.3,.35,0,TAU);ctx.fill();
      ctx.strokeStyle='rgba(255,236,189,.45)';ctx.lineWidth=.7;
      ctx.beginPath();ctx.moveTo(0,-s);ctx.lineTo(0,s);ctx.stroke();ctx.restore();
    }else if(d.shape==='shard'){
      ctx.save();ctx.translate(x,y);ctx.rotate(p.rotation);
      ctx.beginPath();ctx.moveTo(-s*.8,s*.7);ctx.lineTo(s*.7,-s*.5);ctx.lineTo(s*.3,s*.8);ctx.closePath();ctx.fill();ctx.restore();
    }else if(d.shape==='pixel'){ctx.fillRect(x-s*.5,y-s*.5,s,s);}
    else {ctx.beginPath();ctx.arc(x,y,s,0,TAU);ctx.fill();}
    ctx.shadowBlur=0;ctx.globalAlpha=1;
  }
  renderSpecial(l) {
    const ctx=this.ctx,d=EFFECT_MAP.get(l.effectId);
    if(!d)return;
    const t=l.clock,x=this.width*.5,y=this.height*.5;
    ctx.globalCompositeOperation='lighter';
    if(['shockwave','pulse','explosion','fireworks'].includes(d.mode)){
      const progress=(t%2.4)/2.4;
      const r=Math.min(this.width,this.height)*.48*progress;
      ctx.lineWidth=d.mode==='shockwave'?3:1.8;
      ctx.strokeStyle=l.color;
      ctx.globalAlpha=Math.pow(1-progress,2)*.65;
      ctx.shadowBlur=18*l.glow/100;ctx.shadowColor=l.color;
      ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();
    }
    if(d.mode==='arc'){
      ctx.strokeStyle=l.color;ctx.lineWidth=2.2;ctx.shadowBlur=18;ctx.shadowColor=l.color;ctx.globalAlpha=.6;
      ctx.beginPath();
      for(let i=0;i<=20;i++){
        const px=this.width*(.14+.72*i/20);
        const py=y+Math.sin(i*7.8+this.timer*24)*this.height*.14*(i>0&&i<20?1:0);
        if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
      }
      ctx.stroke();
    }
    if(d.mode==='beam'){
      const g=ctx.createLinearGradient(x-12,0,x+12,0);
      g.addColorStop(0,'rgba(100,180,255,0)');g.addColorStop(.5,l.color);g.addColorStop(1,'rgba(100,180,255,0)');
      ctx.globalAlpha=.15;ctx.fillStyle=g;ctx.fillRect(x-12,0,24,this.height);
    }
    if(d.mode==='orb'||d.mode==='plasma'){
      ctx.globalAlpha=.3;ctx.strokeStyle=l.color;ctx.lineWidth=1;ctx.beginPath();
      ctx.arc(x,y,Math.min(this.width,this.height)*.11*(1+Math.sin(this.timer*2)*.10),0,TAU);ctx.stroke();
    }
    ctx.shadowBlur=0;ctx.globalAlpha=1;
  }
  draw(){
    if(!this.ctx)return;
    this.backdrop();
    const ctx=this.ctx;
    const lookup=new Map(this.layers.map(l=>[l.uid,l]));
    for(const p of this.particles){
      const l=lookup.get(p.uid);
      if(!l||!l.enabled)continue;
      ctx.globalCompositeOperation=l.blend;
      this.drawParticle(p,l);
    }
    for(const l of this.layers)if(l.enabled)this.renderSpecial(l);
    for(const l of this.layers){
      if(!l.enabled||l.effectId!=='network')continue;
      const pts=this.particles.filter(p=>p.uid===l.uid).slice(0,70);
      ctx.globalCompositeOperation='screen';ctx.strokeStyle=l.color;ctx.lineWidth=.7;
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<110){ctx.globalAlpha=(1-d/110)*.25*l.opacity/100;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
      }
      ctx.globalAlpha=1;
    }
    ctx.globalCompositeOperation='source-over';
  }
  frame(now){
    this.raf=requestAnimationFrame(this.frame);
    if(!this.lastTime)this.lastTime=now;
    const dt=Math.min((now-this.lastTime)/1000,.05);
    this.lastTime=now;
    if(document.hidden||!this.playing)return;
    this.simulate(dt*this.timeScale);
    this.draw();
    this.frames++;this.metricTime+=dt;
    if(this.metricTime>=.75){
      this.fps=this.frames/this.metricTime;
      if(this.quality==='auto'&&this.particles.length>180){
        if(this.fps<34)this.adaptiveScale=Math.max(.5,this.adaptiveScale-.1);
        else if(this.fps>54)this.adaptiveScale=Math.min(1,this.adaptiveScale+.035);
      }
      this.onMetrics?.({fps:Math.round(this.fps),particles:this.particles.length,cap:this.cap});
      this.metricTime=0;this.frames=0;
    }
  }
  snapshot(){return {version:1,seed:this.seed,lockSeed:this.lockSeed,quality:this.quality,timeScale:this.timeScale,pointerMode:this.pointerMode,layers:this.layers.map(({uid,clock,accum,burstPending,...rest})=>rest)};}
  load(data) {
    if(!data||!Array.isArray(data.layers))throw new Error('Invalid preset');
    this.layers=[];this.particles.length=0;this.pool.length=0;
    this.serial=0;
    data.layers.slice(0,6).forEach(raw=>{if(raw && EFFECT_MAP.has(raw.effectId))this.makeLayer(raw.effectId,raw);});
    if(!this.layers.length)throw new Error('No valid effects');
    if(Number.isSafeInteger(data.seed))this.seed=data.seed||1;
    this.lockSeed=data.lockSeed!==false;
    this.quality=['auto','low','high'].includes(data.quality)?data.quality:'auto';
    this.timeScale=clamp(Number(data.timeScale)||1,.2,2);
    this.pointerMode=['attract','repel'].includes(data.pointerMode)?data.pointerMode:'attract';
    this.reset();
    this.resize();
  }
  destroy(){cancelAnimationFrame(this.raf);this.resizeObserver.disconnect();}
}
