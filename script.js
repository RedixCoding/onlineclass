/* ---------- Participants ---------- */
const COLORS = ['#f36805','#00b894','#e17055','#0984e3','#d63031','#e84393','#e0a100','#00a8a8','#7a6ff0','#fd79a8','#3f9494','#e67e22','#2d98da','#8e44ad','#27ae60','#c0392b'];

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
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- Icons (use currentColor so CSS controls colour) ---------- */
const I = {
  mic:'<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  micOff:'<svg viewBox="0 0 24 24"><path d="M3 3l18 18M9 9v2a3 3 0 0 0 5 2M15 9V6a3 3 0 0 0-5.5-1.6M5 11a7 7 0 0 0 11 5.6M19 11a7 7 0 0 1-.5 2.6M12 18v3"/></svg>',
  cam:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>',
  camOff:'<svg viewBox="0 0 24 24"><path d="M3 3l18 18M16 11l6-4v10l-4-2M16 16v1a1 1 0 0 1-1 1H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/></svg>',
  share:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M9 11l3-3 3 3M12 8v6"/></svg>',
  hand:'<svg viewBox="0 0 24 24"><path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V3.5a1.5 1.5 0 0 1 3 0V11M14 11V5.5a1.5 1.5 0 0 1 3 0V14c0 4-2 7-6 7-3 0-4-1.5-6-5l-2-3.5a1.5 1.5 0 0 1 2.5-1.5L8 14"/></svg>',
  react:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14a5 5 0 0 0 8 0M9 9.5h.01M15 9.5h.01"/></svg>',
  grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  compact:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="4.5" height="4.5" rx="1"/><rect x="9.75" y="3" width="4.5" height="4.5" rx="1"/><rect x="16.5" y="3" width="4.5" height="4.5" rx="1"/><rect x="3" y="9.75" width="4.5" height="4.5" rx="1"/><rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1"/><rect x="16.5" y="9.75" width="4.5" height="4.5" rx="1"/><rect x="3" y="16.5" width="4.5" height="4.5" rx="1"/><rect x="9.75" y="16.5" width="4.5" height="4.5" rx="1"/><rect x="16.5" y="16.5" width="4.5" height="4.5" rx="1"/></svg>',
  full:'<svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  exitFull:'<svg viewBox="0 0 24 24"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>',
  micSm:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  micOffSm:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><path d="M3 3l18 18M9 9v2a3 3 0 0 0 5 2M15 9V6a3 3 0 0 0-5.5-1.6M5 11a7 7 0 0 0 11 5.6M12 18v3"/></svg>'
};

/* ---------- DOM & State ---------- */
const $ = s => document.querySelector(s);
const stage = $('#stage');
const primaryScreen = $('#primary-screen');
const tiles = {};
let mainSpotlightId = 't';
let activeTargetId = null;
let screenStream = null;
let compactView = false;
let unread = 0;

/* ---------- Primary stage ---------- */
function renderPrimaryStage(){
  const p = byId(mainSpotlightId);
  if(!p) return;

  primaryScreen.innerHTML = `
    <div class="tile teacher main-stream ${p.id==='me'?'mirror':'no-mirror'}" id="main-spotlight-tile">
      <div class="avatar"><span style="background:${p.color}">${esc(p.initials)}</span></div>
      <video id="main-spotlight-video" playsinline autoplay ${p.id==='me'?'muted':''} loop></video>
      <div class="hand">✋</div>
      <div class="nameplate">
        <b>${esc(p.name)}</b>
        <span class="role ${p.role==='You'?'you':''}">${esc(p.role || 'Student')}</span>
      </div>
      <div class="mic-ico"></div>
      <button class="hover-btn" title="Control Participant">⚙️ Control</button>
    </div>
  `;
  primaryScreen.querySelector('.hover-btn').onclick = e => { e.stopPropagation(); openControlModal(p.id); };
  updatePrimaryVideo(p);
  Object.keys(tiles).forEach(id => tiles[id].classList.toggle('spot', id === mainSpotlightId));
}

function updatePrimaryVideo(p){
  const v = document.getElementById('main-spotlight-video');
  const tile = document.getElementById('main-spotlight-tile');
  if(!v || !tile) return;

  const ico = tile.querySelector('.mic-ico');
  ico.innerHTML = p.muted ? I.micOffSm : I.micSm;
  ico.classList.toggle('muted', p.muted);
  tile.classList.toggle('hand-up', p.hand);

  if(p.videoUrl){
    if(v.src !== p.videoUrl){ v.srcObject = null; v.src = p.videoUrl; v.play().catch(()=>{}); }
    tile.classList.add('has-video');
  } else if(p.stream){
    if(v.srcObject !== p.stream){ v.removeAttribute('src'); v.srcObject = p.stream; }
    tile.classList.toggle('has-video', p.cam);
  } else {
    tile.classList.remove('has-video');
  }
  v.muted = (p.id === 'me') || p.muted;
}

/* ---------- Sidebar grid ---------- */
function buildTiles(){
  stage.innerHTML = '';
  people.forEach(p=>{
    const t = document.createElement('div');
    t.className = 'tile' + (p.id==='t' ? ' teacher' : '') + (p.id==='me' ? ' mirror' : '');
    t.innerHTML = `
      <div class="avatar"><span style="background:${p.color}">${esc(p.initials)}</span></div>
      <video playsinline autoplay ${p.id==='me' ? 'muted' : ''} loop></video>
      <div class="hand">✋</div>
      <div class="nameplate"><b>${esc(p.name)}</b>${p.role?`<span class="role ${p.role==='You'?'you':''}">${esc(p.role)}</span>`:''}</div>
      <div class="mic-ico"></div>
      <button class="hover-btn">⚙️ Control</button>
    `;
    stage.appendChild(t);
    tiles[p.id] = t;

    t.onclick = e => {
      if(e.target.closest('.hover-btn')) return;
      spotlight(p.id);
    };
    t.querySelector('.hover-btn').onclick = e => { e.stopPropagation(); openControlModal(p.id); };
    paintTile(p.id);
  });
  tiles[mainSpotlightId]?.classList.add('spot');
}

function spotlight(id){
  mainSpotlightId = id;
  renderPrimaryStage();
  toast(`Now showing: ${byId(id).name}`);
}

function paintTile(id){
  const p = byId(id);
  const t = tiles[id];
  if(t){
    const ico = t.querySelector('.mic-ico');
    ico.innerHTML = p.muted ? I.micOffSm : I.micSm;
    ico.classList.toggle('muted', p.muted);
    t.classList.toggle('hand-up', p.hand);

    const v = t.querySelector('video');
    if(p.videoUrl){
      if(v.src !== p.videoUrl){ v.srcObject = null; v.src = p.videoUrl; v.play().catch(()=>{}); }
      t.classList.add('has-video');
    } else if(p.stream){
      if(v.srcObject !== p.stream){ v.removeAttribute('src'); v.srcObject = p.stream; }
      t.classList.toggle('has-video', p.cam);
    } else {
      t.classList.remove('has-video');
    }
    v.muted = (id === 'me') || p.muted;
  }
  if(mainSpotlightId === id) updatePrimaryVideo(p);
  paintPeople();
  if(id==='me') paintControls();
}

/* ---------- Control modal ---------- */
function openControlModal(id){
  activeTargetId = id;
  const p = byId(id);
  $('#modal-user-name').textContent = `Manage ${p.name}`;
  $('#modal-user-role').textContent = p.role ? `Role: ${p.role}` : 'Student';
  $('#control-modal').classList.add('show');
}
const closeModal = () => $('#control-modal').classList.remove('show');
$('#modal-btn-close').onclick = closeModal;
$('#control-modal').onclick = e => { if(e.target.id === 'control-modal') closeModal(); };

$('#modal-btn-spotlight').onclick = () => {
  if(activeTargetId) spotlight(activeTargetId);
  closeModal();
};

$('#modal-btn-toggle-cam').onclick = () => {
  if(!activeTargetId) return;
  const p = byId(activeTargetId);
  if(p.id === 'me'){
    $('#btn-cam').click();
  } else {
    p.cam = !p.cam;
    toast(`${p.name}'s camera ${p.cam ? 'turned ON' : 'turned OFF'}`);
    paintTile(p.id);
  }
  closeModal();
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
  closeModal();
  e.target.value = '';
};

/* ---------- Mute ---------- */
function toggleMute(id, force){
  const p = byId(id);
  p.muted = (typeof force==='boolean') ? force : !p.muted;
  if(p.stream && id==='me') p.stream.getAudioTracks().forEach(tr=>tr.enabled = !p.muted);
  paintTile(id);
  toast(id==='me' ? (p.muted ? 'You are muted' : 'You are unmuted') : `${p.name} ${p.muted ? 'muted' : 'unmuted'}`);
}
$('#btn-mute-all').onclick = () => {
  people.forEach(p=>{ if(p.id!=='me' && p.id!=='t' && !p.muted){ p.muted = true; paintTile(p.id); } });
  toast('All students muted');
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
  $('#btn-share').classList.toggle('active', !!screenStream);
  $('#btn-hand').innerHTML = I.hand;
  $('#btn-hand').classList.toggle('active', me.hand);
  $('#btn-view').innerHTML = compactView ? I.compact : I.grid;
  $('#btn-full').innerHTML = document.fullscreenElement ? I.exitFull : I.full;
  if(!$('#btn-react').querySelector('svg')) $('#btn-react').insertAdjacentHTML('afterbegin', I.react);
}

$('#btn-mic').onclick = () => toggleMute('me');

$('#btn-cam').onclick = async () => {
  const me = byId('me');
  if(me.cam){
    me.cam = false;
    if(me.stream && !screenStream) me.stream.getVideoTracks().forEach(t=>t.enabled=false);
    toast('Camera off');
  } else {
    me.cam = true;
    if(!me.stream && !me.videoUrl) await startCamera();
    else if(me.stream) me.stream.getVideoTracks().forEach(t=>t.enabled=true);
    toast('Camera on');
  }
  paintTile('me');
};

async function startCamera(){
  const me = byId('me');
  try{
    me.stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
    me.stream.getAudioTracks().forEach(tr=>tr.enabled = !me.muted);
  }catch(e){
    me.cam = false;
    toast('Camera blocked or unavailable');
  }
  paintControls();
}

/* Screen share */
$('#btn-share').onclick = async () => {
  if(screenStream){ stopShare(); return; }
  try{
    screenStream = await navigator.mediaDevices.getDisplayMedia({video:true});
    const me = byId('me');
    me.stream = screenStream;
    me.cam = true;
    mainSpotlightId = 'me';
    renderPrimaryStage();
    paintTile('me');
    screenStream.getVideoTracks()[0].onended = stopShare;
    toast('You are sharing your screen');
  }catch(e){ toast('Screen share cancelled'); }
};

function stopShare(){
  if(screenStream){ screenStream.getTracks().forEach(t=>t.stop()); screenStream = null; }
  const me = byId('me');
  me.stream = null;
  me.cam = false;
  paintTile('me');
  toast('Screen sharing stopped');
}

/* Hand & reactions */
function toggleHand(){
  const me = byId('me');
  me.hand = !me.hand;
  paintTile('me');
  toast(me.hand ? 'Hand raised ✋' : 'Hand lowered');
}
$('#btn-hand').onclick = toggleHand;

$('#btn-react').onclick = e => {
  const em = e.target.dataset && e.target.dataset.e;
  if(em){ floatEmoji(em); $('#react-pop').classList.remove('show'); return; }
  $('#react-pop').classList.toggle('show');
};
document.addEventListener('click', e => { if(!e.target.closest('#btn-react')) $('#react-pop').classList.remove('show'); });

function floatEmoji(em){
  [tiles.me, document.getElementById('main-spotlight-tile')].forEach(host=>{
    if(!host) return;
    const s = document.createElement('div');
    s.className = 'float-emoji'; s.textContent = em;
    s.style.right = (20 + Math.random()*50) + '%';
    host.appendChild(s);
    setTimeout(()=>s.remove(), 1800);
  });
}

/* View switch */
$('#btn-view').onclick = () => {
  compactView = !compactView;
  stage.classList.toggle('grid-view', !compactView);
  stage.classList.toggle('speaker-view', compactView);
  paintControls();
  toast(compactView ? 'Compact grid' : 'Large grid');
};

/* Fullscreen */
function toggleFullscreen(){
  if(document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen?.().catch(()=>toast('Fullscreen not supported'));
}
$('#btn-full').onclick = toggleFullscreen;
document.addEventListener('fullscreenchange', paintControls);

/* Keyboard shortcuts */
document.addEventListener('keydown', e => {
  if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
  if(e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key.toLowerCase();
  if(k === 'm') toggleMute('me');
  else if(k === 'v') $('#btn-cam').click();
  else if(k === 'h') toggleHand();
  else if(k === 's') $('#btn-share').click();
  else if(k === 'f') toggleFullscreen();
  else if(k === 'c') openTab('chat');
  else if(k === 'escape') closeModal();
});

/* ---------- Tabs ---------- */
function openTab(name){
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  $('#panel-'+name).classList.add('active');
  if(name === 'chat'){
    unread = 0; updateBadge();
    $('#chat-list').scrollTop = 1e9;
    setTimeout(()=>$('#chat-input').focus(), 50);
  }
}
document.querySelectorAll('.tab').forEach(tab => tab.onclick = () => openTab(tab.dataset.tab));

function updateBadge(){
  const b = $('#chat-badge');
  b.textContent = unread;
  b.style.display = unread ? 'inline-block' : 'none';
}

/* ---------- People list ---------- */
function paintPeople(){
  const list = $('#people-list');
  if(!list) return;
  const q = ($('#people-search')?.value || '').toLowerCase();
  list.innerHTML = '';
  people.filter(p=>p.name.toLowerCase().includes(q)).forEach(p=>{
    const row = document.createElement('div');
    row.className = 'person';
    row.innerHTML = `
      <div class="pa" style="background:${p.color}">${esc(p.initials)}</div>
      <div class="pn">${esc(p.name)}${p.hand?' ✋':''}<small>${p.id==='t'?'Instructor (Host)':p.id==='me'?'You':'Student'}</small></div>
      <button class="pbtn" title="Manage">⚙️</button>
      <button class="pbtn ${p.muted?'muted':''}" title="${p.muted?'Unmute':'Mute'}">${p.muted?'🔇':'🎙️'}</button>`;
    const btns = row.querySelectorAll('button');
    btns[0].onclick = () => openControlModal(p.id);
    btns[1].onclick = () => toggleMute(p.id);
    list.appendChild(row);
  });
  $('#people-count').textContent = people.length;

  const hands = people.filter(p=>p.hand).length;
  $('#hands-bar').style.display = hands ? 'flex' : 'none';
  $('#hands-text').textContent = `✋ ${hands} hand${hands>1?'s':''} raised`;
}
$('#people-search').oninput = paintPeople;
$('#btn-lower-hands').onclick = () => {
  people.forEach(p=>{ if(p.hand){ p.hand = false; paintTile(p.id); } });
  toast('All hands lowered');
};

/* ---------- Chat ---------- */
function addMessage(name, text, mine){
  $('#chat-empty')?.remove();
  const now = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  const m = document.createElement('div');
  m.className = 'msg' + (mine ? ' me' : '');
  m.innerHTML = `<div class="meta"><b>${esc(name)}</b> · ${now}</div><div class="bubble"></div>`;
  m.querySelector('.bubble').textContent = text;
  $('#chat-list').appendChild(m);
  $('#chat-list').scrollTop = 1e9;
  if(!mine && !$('#panel-chat').classList.contains('active')){ unread++; updateBadge(); }
}

$('#chat-form').onsubmit = e => {
  e.preventDefault();
  const input = $('#chat-input');
  const text = input.value.trim();
  if(!text) return;
  addMessage('Rinku Singh', text, true);
  input.value = '';
};

const botLines = [
  'Sir, can you repeat the two pointer example?',
  'Got it, makes sense now 👍',
  'Is this O(n) or O(n log n)?',
  'Can you share the code after class?',
  'Audio is clear 👌',
  'Please zoom in on the code a bit',
  'What about the sliding window with duplicates?',
  'Thanks sir! 🙏'
];
setInterval(()=>{
  if(Math.random() < 0.45){
    const students = people.filter(p=>p.id!=='t' && p.id!=='me');
    const s = students[Math.floor(Math.random()*students.length)];
    addMessage(s.name, botLines[Math.floor(Math.random()*botLines.length)], false);
  }
}, 12000);

/* Simulated random hand raises */
setInterval(()=>{
  const students = people.filter(p=>p.id!=='t' && p.id!=='me');
  const s = students[Math.floor(Math.random()*students.length)];
  s.hand = !s.hand && Math.random() < 0.6;
  paintTile(s.id);
}, 20000);

/* Host speaking indicator */
setInterval(()=>{
  const host = byId('t');
  const speaking = !host.muted && Math.random() < 0.75;
  tiles.t?.classList.toggle('speaking', speaking);
  document.getElementById('main-spotlight-tile')?.classList.toggle('speaking', speaking && mainSpotlightId === 't');
}, 1800);

/* ---------- Lecture ---------- */
const agenda = [...document.querySelectorAll('#agenda li')];
function paintAgenda(){
  const done = agenda.filter(li=>li.classList.contains('done')).length;
  $('#agenda-progress').textContent = `${done}/${agenda.length}`;
  $('#progress-bar').style.width = (done/agenda.length*100) + '%';
}
agenda.forEach((li, i)=>{
  li.onclick = () => {
    agenda.forEach(x=>x.classList.remove('now'));
    li.classList.toggle('done');
    if(!li.classList.contains('done')) li.classList.add('now');
    else { const next = agenda.find(x=>!x.classList.contains('done')); next?.classList.add('now'); }
    paintAgenda();
  };
});
document.querySelectorAll('.res').forEach(r => r.onclick = () => toast(`Opening: ${r.dataset.res}`));
paintAgenda();

/* ---------- Timer / toast / leave ---------- */
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
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 2000);
}

$('#btn-leave').onclick = () => { if(confirm('Leave this class?')) $('#left-screen').classList.add('show'); };
$('#btn-rejoin').onclick = () => $('#left-screen').classList.remove('show');

/* ---------- Init ---------- */
renderPrimaryStage();
buildTiles();
paintControls();
$('#count-label').textContent = people.length + ' online';
