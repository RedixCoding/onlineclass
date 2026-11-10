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

people.forEach((p,i)=>{ 
  p.color = COLORS[i % COLORS.length]; 
  p.hand = false; 
  p.cam = false; 
  p.videoUrl = null; 
  p.stream = null;
  p.initials = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(); 
});

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
const primaryScreen = $('#primary-screen');
const tiles = {};
let activeTargetId = null;
let screenStream = null;

/* ---------- Primary YouTube Main Teacher Stage ---------- */
function initPrimaryStage() {
  const teacher = byId('t');
  primaryScreen.innerHTML = `
    <div class="tile teacher main-stream" id="main-teacher-tile">
      <div class="avatar"><span style="background:${teacher.color}">${teacher.initials}</span></div>
      <video id="main-teacher-video" playsinline autoplay loop></video>
      <div class="hand">✋</div>
      <div class="nameplate"><b>${teacher.name}</b><span class="role">Instructor</span></div>
      <div class="mic-ico"></div>
      <button class="hover-btn">Control</button>
    </div>
  `;
  primaryScreen.querySelector('.hover-btn').onclick = () => openControlModal('t');
}

/* ---------- Build tiles for Sidebar Grid ---------- */
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
      <button class="hover-btn">Control</button>
    `;
    stage.appendChild(t);
    tiles[p.id] = t;

    const hb = t.querySelector('.hover-btn');
    if(hb) hb.onclick = (e) => {
      e.stopPropagation();
      openControlModal(p.id);
    };
    paintTile(p.id);
  });
}

function paintTile(id){
  const p = byId(id);
  const targetTiles = [tiles[id]];
  if(id === 't') {
    const mainTile = document.getElementById('main-teacher-tile');
    if(mainTile) targetTiles.push(mainTile);
  }

  targetTiles.forEach(t => {
    if(!t) return;
    const ico = t.querySelector('.mic-ico');
    ico.innerHTML = p.muted ? I.micOffSm : I.micSm;
    ico.classList.toggle('muted', p.muted);
    t.classList.toggle('hand-up', p.hand);

    const v = t.querySelector('video');
    if(p.videoUrl) {
      if(v.src !== p.videoUrl) {
        v.srcObject = null;
        v.src = p.videoUrl;
        v.play().catch(()=>{});
      }
      t.classList.add('has-video');
    } else if(p.stream) {
      if(v.srcObject !== p.stream) {
        v.src = '';
        v.srcObject = p.stream;
      }
      t.classList.toggle('has-video', p.cam);
    } else {
      t.classList.toggle('has-video', p.cam && p.id==='me');
    }
    
    if(id !== 'me' || p.videoUrl) v.muted = p.muted;
  });

  paintPeople();
  if(id==='me') paintControls();
}

/* ---------- Control Modal Functionality ---------- */
function openControlModal(id) {
  activeTargetId = id;
  const p = byId(id);
  $('#modal-user-name').textContent = `Manage ${p.name}`;
  $('#modal-user-role').textContent = p.role ? `Role: ${p.role}` : 'Student';
  $('#control-modal').classList.add('show');
}

$('#modal-btn-close').onclick = () => $('#control-modal').classList.remove('show');

$('#modal-btn-toggle-cam').onclick = async () => {
  if(!activeTargetId) return;
  const p = byId(activeTargetId);
  if(p.id === 'me') {
    $('#btn-cam').click();
  } else {
    p.cam = !p.cam;
    if(!p.cam && !p.videoUrl) p.stream = null;
    toast(`${p.name}'s camera ${p.cam ? 'turned ON' : 'turned OFF'}`);
    paintTile(p.id);
  }
  $('#control-modal').classList.remove('show');
};

$('#modal-btn-upload-trigger').onclick = () => $('#modal-file-input').click();

$('#modal-file-input').onchange = e => {
  const file = e.target.files[0];
  if(!file || !activeTargetId) return;
  
  const p = byId(activeTargetId);
  if(p.videoUrl) URL.revokeObjectURL(p.videoUrl);
  
  p.videoUrl = URL.createObjectURL(file);
  p.cam = true;
  paintTile(p.id);
  toast(`Uploaded video playing for ${p.name}`);
  $('#control-modal').classList.remove('show');
  e.target.value = '';
};

/* ---------- Mute / Unmute ---------- */
function toggleMute(id, force){
  const p = byId(id);
  p.muted = (typeof force==='boolean') ? force : !p.muted;
  if(p.stream && id==='me') p.stream.getAudioTracks().forEach(tr=>tr.enabled = !p.muted);
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
  $('#btn-hand').innerHTML = I.hand;
  $('#btn-hand').classList.toggle('active', me.hand);
  if(!$('#btn-react').querySelector('svg')) $('#btn-react').insertAdjacentHTML('afterbegin', I.react);
  const speaker = stage.classList.contains('speaker-view');
  $('#btn-view').innerHTML = speaker ? I.grid : I.speaker;
}

$('#btn-mic').onclick = () => toggleMute('me');

$('#btn-cam').onclick = async () => {
  const me = byId('me');
  if(me.cam){
    me.cam = false;
    if(me.stream) me.stream.getVideoTracks().forEach(t=>t.enabled=false);
  } else {
    me.cam = true;
    if(!me.stream && !me.videoUrl) await startCamera();
    else if(me.stream) me.stream.getVideoTracks().forEach(t=>t.enabled=true);
  }
  paintTile('me');
};

async function startCamera(){
  const me = byId('me');
  try{
    me.stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
    me.stream.getAudioTracks().forEach(tr=>tr.enabled = !me.muted);
    toast('Camera started');
  }catch(e){
    me.cam = false;
    toast('Camera blocked');
  }
  paintControls();
}

/* Screen Share */
$('#btn-share').onclick = async () => {
  if(screenStream){ stopShare(); return; }
  try{
    screenStream = await navigator.mediaDevices.getDisplayMedia({video:true});
    const me = byId('me');
    me.stream = screenStream;
    me.cam = true;
    paintTile('me');
    $('#btn-share').classList.add('active');
    screenStream.getVideoTracks()[0].onended = stopShare;
    toast('You are sharing your screen');
  }catch(e){ toast('Screen share cancelled'); }
};

function stopShare(){
  if(screenStream){ screenStream.getTracks().forEach(t=>t.stop()); screenStream=null; }
  $('#btn-share').classList.remove('active');
  const me = byId('me');
  me.stream = null;
  me.cam = false;
  paintTile('me');
  toast('Screen sharing stopped');
}

/* Hand & Reactions */
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

/* Sidebar Tabs Navigation */
document.querySelectorAll('.tab').forEach(tab=>{
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    $('#panel-'+tab.dataset.tab).classList.add('active');
  };
});

/* People List */
function paintPeople(){
  const q = ($('#people-search')?.value||'').toLowerCase();
  const list = $('#people-list');
  if(!list) return;
  list.innerHTML = '';
  people.filter(p=>p.name.toLowerCase().includes(q)).forEach(p=>{
    const row = document.createElement('div');
    row.className='person';
    row.innerHTML = `
      <div class="pa" style="background:${p.color}">${p.initials}</div>
      <div class="pn">${p.name}${p.hand?' ✋':''}<small>${p.id==='t'?'Instructor (Host)':p.id==='me'?'You':'Student'}</small></div>
      <button class="pbtn" title="Control Video / Cam">⚙️</button>
      <button class="pbtn ${p.muted?'muted':''}" title="${p.muted?'Unmute':'Mute'}">${p.muted?'🔇':'🎙️'}</button>`;
    
    const btns = row.querySelectorAll('button');
    btns[0].onclick = () => openControlModal(p.id);
    btns[1].onclick = () => toggleMute(p.id);
    list.appendChild(row);
  });
  $('#people-count').textContent = people.length;
}
if($('#people-search')) $('#people-search').oninput = paintPeople;

/* Chat Form */
$('#chat-form').onsubmit = e => {
  e.preventDefault();
  const input = $('#chat-input');
  const text = input.value.trim(); if(!text) return;
  $('#chat-empty')?.remove();
  const now = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  const m = document.createElement('div');
  m.className = 'msg me';
  m.innerHTML = `<div class="meta"><b>Rinku Singh</b> · ${now}</div><div class="bubble"></div>`;
  m.querySelector('.bubble').textContent = text;
  $('#chat-list').appendChild(m);
  $('#chat-list').scrollTop = 1e9;
  input.value = '';
};

/* Timer & Speaking simulation */
let secs = 0;
setInterval(()=>{
  secs++;
  const h = String(Math.floor(secs/3600)).padStart(2,'0');
  const m = String(Math.floor(secs%3600/60)).padStart(2,'0');
  const s = String(secs%60).padStart(2,'0');
  $('#timer').textContent = `${h}:${m}:${s}`;
}, 1000);

let toastTimer;
function toast(msg){
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.classList.remove('show'), 2000);
}

/* Init */
initPrimaryStage();
buildTiles();
paintControls();
$('#count-label').textContent = people.length + ' online';
