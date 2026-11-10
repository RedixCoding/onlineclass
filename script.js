/* ---------- Participants ---------- */
const COLORS = ['#6c5ce7','#00b894','#e17055','#0984e3','#d63031','#e84393','#fdcb6e','#00cec9','#a29bfe','#fd79a8','#55a3a3','#e67e22','#2d98da','#8e44ad','#27ae60','#c0392b'];

const people = [
  { id:'t',  name:'Shubhanshu',      role:'Host',    muted:false },
  { id:'me', name:'Rinku Singh',     role:'You',     muted:true  },
  { id:'p1', name:'Tia Sharma',      muted:true },
  { id:'p2', name:'Halima Khan',     muted:true },
  { id:'p3', name:'Vinay Kumar',     muted:true },
  { id:'p4', name:'Rohit Verma',     muted:true },
  { id:'p5', name:'Vidyut Chauhan',  muted:true },
  { id:'p6', name:'Ismahil Ansari',  muted:true },
  { id:'p7', name:'Aarav Mehta',     muted:true },
  { id:'p8', name:'Priya Nair',      muted:true },
  { id:'p9', name:'Sneha Reddy',     muted:true },
  { id:'p10',name:'Arjun Patel',     muted:true },
  { id:'p11',name:'Kavya Iyer',      muted:true },
  { id:'p12',name:'Manpreet Kaur',   muted:true },
  { id:'p13',name:'Deepak Yadav',    muted:true },
  { id:'p14',name:'Ananya Das',      muted:true },
];
people.forEach((p,i)=>{ p.color = COLORS[i % COLORS.length]; p.hand=false; p.cam=true; p.initials = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(); });
const byId = id => people.find(p=>p.id===id);

/* ---------- Icons ---------- */
const I = {
  mic:'<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  micOff:'<svg viewBox="0 0 24 24"><path d="M3 3l18 18M9 9v2a3 3 0 0 0 5 2M15 9V6a3 3 0 0 0-5.5-1.6M5 11a7 7 0 0 0 11 5.6M19 11a7 7 0 0 1-.5 2.6M12 18v3"/></svg>',
  cam:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>',
  camOff:'<svg viewBox="0 0 24 24"><path d="M3 3l18 18M16 11l6-4v10l-4-2M16 16v1a1 1 0 0 1-1 1H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/></svg>',
  share:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M9 11l3-3 3 3M12 8v6"/></svg>',
  upload:'<svg viewBox="0 0 24 24"><path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>',
  hand:'<svg viewBox="0 0 24 24"><path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V3.5a1.5 1.5 0 0 1 3 0V11M14 11V5.5a1.5 1.5 0 0 1 3 0V14c0 4-2 7-6 7-3 0-4-1.5-6-5l-2-3.500a1.500 1.500 0 0 1 2.500-1.500L8 14"/></svg>',
  react:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14a5 5 0 0 0 8 0M9 9.500h.01M15 9.500h.01"/></svg>',
  grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  speaker:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="11" rx="1"/><rect x="3" y="17" width="4" height="4" rx="1"/><rect x="10" y="17" width="4" height="4" rx="1"/><rect x="17" y="17" width="4" height="4" rx="1"/></svg>',
  micSm:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.500" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  micOffSm:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.500" stroke-linecap="round"><path d="M3 3l18 18M9 9v2a3 3 0 0 0 5 2M15 9V6a3 3 0 0 0-5.500-1.600M5 11a7 7 0 0 0 11 5.600M12 18v3"/></svg>'
};

/* ---------- DOM ---------- */
const $ = s => document.querySelector(s);
const stage = $('#stage');
const tiles = {};
let myStream = null, screenStream = null, myFileUrl = null, handUp = false;

/* ---------- Build tiles ---------- */
function buildTiles(){
  stage.innerHTML = '';
  people.forEach(p=>{
    const t = document.createElement('div');
    t.className = 'tile' + (p.id==='t' ? ' teacher' : '') + (p.id==='me' ? ' mirror' : '');
    t.innerHTML = `
      <div class="avatar"><span style="background:${p.color}">${p.initials}</span></div>
      <video playsinline autoplay ${p.id==='me' ? 'muted' : ''} loop></video>
      <div class="hand">✋</div>
      <div class="nameplate"><b>${p.name}</b>${p.role?`<span class="role ${p.role==='You'?'you':''}">${p.role}</span>`:''}</div>
      <div class="mic-ico"></div>
      ${p.id!=='me' ? '<button class="hover-btn"></button>' : ''}
    `;
    stage.appendChild(t);
    tiles[p.id] = t;
    const hb = t.querySelector('.hover-btn');
    if(hb) hb.onclick = () => toggleMute(p.id);
    paintTile(p.id);
  });
}

function paintTile(id){
  const p = byId(id), t = tiles[id];
  const ico = t.querySelector('.mic-ico');
  ico.innerHTML = p.muted ? I.micOffSm : I.micSm;
  ico.classList.toggle('muted', p.muted);
  t.classList.toggle('hand-up', p.hand);
  const hb = t.querySelector('.hover-btn');
  if(hb) hb.textContent = p.muted ? 'Unmute' : 'Mute';
  const v = t.querySelector('video');
  if(id!=='me' || myFileUrl) v.muted = p.muted;   // lecture video sound follows mute state
  paintPeople();
  if(id==='me') paintControls();
}

/* ---------- Mute / unmute ---------- */
function toggleMute(id, force){
  const p = byId(id);
  p.muted = (typeof force==='boolean') ? force : !p.muted;
  if(myStream && id==='me') myStream.getAudioTracks().forEach(tr=>tr.enabled = !p.muted);
  paintTile(id);
  if(id==='me') toast(p.muted ? 'You are muted' : 'You are unmuted');
  else toast(`${p.name} ${p.muted ? 'muted' : 'unmuted'}`);
}
$('#btn-mute-all').onclick = () => {
  people.forEach(p=>{ if(p.id!=='me' && p.id!=='t' && !p.muted){ p.muted=true; paintTile(p.id);} });
  toast('All participants muted');
};

/* ---------- Controls ---------- */
function paintControls(){
  const me = byId('me');
  const mic = $('#btn-mic'), cam = $('#btn-cam');
  mic.innerHTML = me.muted ? I.micOff : I.mic;
  mic.classList.toggle('off', me.muted);
  cam.innerHTML = me.cam ? I.cam : I.camOff;
  cam.classList.toggle('off', !me.cam);
  $('#btn-share').innerHTML = I.share;
  $('#lbl-upload').innerHTML = I.upload;
  $('#btn-hand').innerHTML = I.hand;
  $('#btn-hand').classList.toggle('active', me.hand);
  const rp = $('#react-pop'); $('#btn-react').prepend(); 
  if(!$('#btn-react').querySelector('svg')) $('#btn-react').insertAdjacentHTML('afterbegin', I.react);
  const speaker = stage.classList.contains('speaker-view');
  $('#btn-view').innerHTML = speaker ? I.grid : I.speaker;
  $('#btn-view').title = speaker ? 'Switch to Grid view' : 'Switch to Speaker view';
}

$('#btn-mic').onclick = () => toggleMute('me');

$('#btn-cam').onclick = async () => {
  const me = byId('me');
  if(me.cam){
    me.cam = false;
    if(myStream) myStream.getVideoTracks().forEach(t=>t.enabled=false);
    showVideo(false);
  } else {
    me.cam = true;
    if(!myStream && !myFileUrl) await startCamera();
    else if(myStream) myStream.getVideoTracks().forEach(t=>t.enabled=true);
    showVideo(true);
  }
  paintControls();
};

async function startCamera(){
  try{
    myStream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
    myStream.getAudioTracks().forEach(tr=>tr.enabled = !byId('me').muted);
    const v = tiles.me.querySelector('video');
    v.srcObject = myStream; v.loop = false; v.muted = true;
    tiles.me.classList.add('mirror'); tiles.me.classList.remove('no-mirror');
    showVideo(true);
    toast('Camera started');
  }catch(e){
    byId('me').cam = false;
    toast('Camera blocked – you can still use "Add my video"');
  }
  paintControls();
}

function showVideo(on){
  tiles.me.classList.toggle('has-video', on && (!!myStream || !!myFileUrl || !!screenStream));
}

/* Add my own video file */
$('#file-me').onchange = e => {
  const f = e.target.files[0]; if(!f) return;
  if(myFileUrl) URL.revokeObjectURL(myFileUrl);
  myFileUrl = URL.createObjectURL(f);
  const v = tiles.me.querySelector('video');
  v.srcObject = null; v.src = myFileUrl; v.loop = true;
  v.muted = byId('me').muted;
  v.play().catch(()=>{});
  tiles.me.classList.remove('mirror'); tiles.me.classList.add('no-mirror');
  byId('me').cam = true;
  showVideo(true); paintControls();
  toast('Your video is now playing in your tile');
};

/* Screen share */
$('#btn-share').onclick = async () => {
  if(screenStream){ stopShare(); return; }
  try{
    screenStream = await navigator.mediaDevices.getDisplayMedia({video:true});
    const v = tiles.me.querySelector('video');
    v.srcObject = screenStream; v.loop = false; v.muted = true;
    tiles.me.classList.remove('mirror'); tiles.me.classList.add('no-mirror');
    showVideo(true);
    $('#btn-share').classList.add('active');
    screenStream.getVideoTracks()[0].onended = stopShare;
    toast('You are sharing your screen');
  }catch(e){ toast('Screen share cancelled'); }
};
function stopShare(){
  if(screenStream){ screenStream.getTracks().forEach(t=>t.stop()); screenStream=null; }
  $('#btn-share').classList.remove('active');
  const v = tiles.me.querySelector('video');
  if(myStream){ v.srcObject = myStream; tiles.me.classList.add('mirror'); tiles.me.classList.remove('no-mirror'); }
  else if(myFileUrl){ v.srcObject = null; v.src = myFileUrl; v.play().catch(()=>{}); }
  else showVideo(false);
  toast('Screen sharing stopped');
}

/* Hand + reactions */
function toggleHand(){
  const me = byId('me'); me.hand = !me.hand;
  paintTile('me'); toast(me.hand ? 'Hand raised ✋' : 'Hand lowered');
}
$('#btn-hand').onclick = toggleHand;

$('#btn-react').onclick = e => {
  const em = e.target.dataset && e.target.dataset.e;
  if(em){ floatEmoji(em); $('#react-pop').classList.remove('show'); return; }
  $('#react-pop').classList.toggle('show');
};
document.addEventListener('click', e => { if(!e.target.closest('#btn-react')) $('#react-pop').classList.remove('show'); });
function floatEmoji(em){
  const s = document.createElement('div');
  s.className='float-emoji'; s.textContent=em;
  s.style.right = (20 + Math.random()*40) + '%';
  tiles.me.appendChild(s); setTimeout(()=>s.remove(),1800);
}

/* View switch */
$('#btn-view').onclick = () => {
  stage.classList.toggle('grid-view'); stage.classList.toggle('speaker-view'); paintControls();
};

/* Leave / rejoin */
$('#btn-leave').onclick = () => { if(confirm('Leave this class?')){ $('#left-screen').classList.add('show'); } };
$('#btn-rejoin').onclick = () => $('#left-screen').classList.remove('show');

/* Keyboard shortcuts (not while typing) */
document.addEventListener('keydown', e => {
  if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
  const k = e.key.toLowerCase();
  if(k==='m') toggleMute('me');
  if(k==='v') $('#btn-cam').click();
  if(k==='h') toggleHand();
});

/* ---------- Sidebar tabs ---------- */
document.querySelectorAll('.tab').forEach(tab=>{
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    $('#panel-'+tab.dataset.tab).classList.add('active');
  };
});

/* ---------- People list ---------- */
function paintPeople(){
  const q = ($('#people-search').value||'').toLowerCase();
  const list = $('#people-list');
  list.innerHTML = '';
  people.filter(p=>p.name.toLowerCase().includes(q)).forEach(p=>{
    const row = document.createElement('div');
    row.className='person';
    row.innerHTML = `
      <div class="pa" style="background:${p.color}">${p.initials}</div>
      <div class="pn">${p.name}${p.hand?' ✋':''}<small>${p.id==='t'?'Instructor (Host)':p.id==='me'?'You':'Student'}</small></div>
      <button class="pbtn ${p.muted?'muted':''}" title="${p.muted?'Unmute':'Mute'}">${p.muted?'🔇':'🎙️'}</button>`;
    row.querySelector('button').onclick = () => toggleMute(p.id);
    list.appendChild(row);
  });
  $('#people-count').textContent = people.length;
}
$('#people-search').oninput = paintPeople;

/* ---------- Chat (user messages only, no bots) ---------- */
$('#chat-form').onsubmit = e => {
  e.preventDefault();
  const input = $('#chat-input');
  const text = input.value.trim(); if(!text) return;
  $('#chat-empty')?.remove();
  const now = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  const m = document.createElement('div');
  m.className = 'msg me';
  const meta = document.createElement('div'); meta.className='meta';
  meta.innerHTML = `<b>Rinku Singh</b> · ${now}`;
  const bub = document.createElement('div'); bub.className='bubble'; bub.textContent = text;   // textContent = safe from HTML injection
  m.append(meta, bub);
  $('#chat-list').appendChild(m);
  $('#chat-list').scrollTop = 1e9;
  input.value = '';
};

/* ---------- Timer + speaking highlight + toast ---------- */
let secs = 0;
setInterval(()=>{
  secs++;
  const h = String(Math.floor(secs/3600)).padStart(2,'0');
  const m = String(Math.floor(secs%3600/60)).padStart(2,'0');
  const s = String(secs%60).padStart(2,'0');
  $('#timer').textContent = `${h}:${m}:${s}`;
}, 1000);

setInterval(()=>{
  Object.values(tiles).forEach(t=>t.classList.remove('speaking'));
  const live = people.filter(p=>!p.muted);
  if(live.length) tiles[live[Math.floor(Math.random()*live.length)].id].classList.add('speaking');
}, 2200);

let toastTimer;
function toast(msg){
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.classList.remove('show'), 2000);
}

/* ---------- Init ---------- */
buildTiles();
paintControls();
$('#count-label').textContent = people.length + ' online';
