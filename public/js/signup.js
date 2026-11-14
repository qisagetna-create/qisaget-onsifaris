(function(){
'use strict';
/* Supabase: public/js/config.js içində URL və anon key yazılıbsa real rejim, yoxsa demo rejim (kod göndərilmir, istənilən 6 rəqəm qəbul olunur). */
var CFG=window.QISAGET_CONFIG||{};
var SB=null;
try{if(CFG.SUPABASE_URL&&CFG.SUPABASE_ANON_KEY&&window.supabase)SB=window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY)}catch(e){SB=null}
var DEMO=!SB;
var QLOGO='<svg class="qlogo" aria-hidden="true"><use href="#qlogo"/></svg>';
var SMILE='<svg class="smile" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><circle cx="8.8" cy="9.6" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.2" cy="9.6" r="1.1" fill="currentColor" stroke="none"/><path d="M7.5 14c1 2.2 2.6 3.2 4.5 3.2s3.5-1 4.5-3.2"/></svg>';
var root=document.getElementById('reg'),app=document.getElementById('reg-app'),toastEl=document.getElementById('reg-toast');
var S=null,lastScr='',tmr=0;
function $(i){return document.getElementById(i)}
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var MAP={'ə':'e','ı':'i','ö':'o','ü':'u','ç':'c','ş':'s','ğ':'g'};
function clean(v){return String(v).toLowerCase().replace(/[əıöüçşğ]/g,function(c){return MAP[c]}).replace(/[^a-z0-9._-]/g,'').slice(0,24)}
function validUser(v){return v.length>=3&&/[a-z0-9]/.test(v)}

var PL=[['Instagram','#d6249f','I'],['WhatsApp','#25d366','W'],['TikTok','#111','T'],['YouTube','#f00','Y'],['Veb sayt','#111','◎'],['Spotify','#1db954','S'],['Telegram','#2aabee','T'],['Facebook','#1877f2','f'],['X','#111','X'],['Threads','#111','@'],['SoundCloud','#f50','S'],['Snapchat','#fffc00','S'],['Pinterest','#e60023','P'],['Twitch','#9146ff','T'],['LinkedIn','#0a66c2','in']];
var BASE={'Instagram':'https://instagram.com/','TikTok':'https://www.tiktok.com/@','YouTube':'https://www.youtube.com/@','Spotify':'https://open.spotify.com/user/','Telegram':'https://t.me/','Facebook':'https://facebook.com/','X':'https://x.com/','Threads':'https://www.threads.net/@','SoundCloud':'https://soundcloud.com/','Snapchat':'https://www.snapchat.com/add/','Pinterest':'https://www.pinterest.com/','Twitch':'https://www.twitch.tv/','LinkedIn':'https://www.linkedin.com/in/'};
var TH=[{n:'Air',pg:'#ececf0',bg:'#ebecf0',tx:'#000',bt:'#fff'},
{n:'Blocks',pg:'#7b22ff',bg:'#7b22ff',tx:'#fff',bt:'#e056d8',bx:'#000',bd:'2px solid #000',sh:'3px 3px 0 #000',br:'0'},
{n:'Göl',pg:'#14151c',bg:'linear-gradient(#2c2d3b,#0d0e14)',tx:'#fff',bt:'#0a0b10'},
{n:'Mineral',pg:'#fcebe0',bg:'#fcebe0',tx:'#2b2118',bt:'transparent',bd:'2px solid #c9b4a3'},
{n:'Çiçək',pg:'#2a2480',bg:'radial-gradient(circle at 25% 85%,#9aa0f0 0 20%,transparent 21%),radial-gradient(circle at 85% 90%,#3d8a5a 0 24%,transparent 25%),#1f1b6b',tx:'#fff',bt:'#fff'},
{n:'Konfeti',pg:'#cdf3fb',bg:'radial-gradient(circle at 20% 15%,#ff6b6b 0 3%,transparent 4%),radial-gradient(circle at 80% 20%,#ffd23f 0 3%,transparent 4%),#cdf3fb',tx:'#0d2a6b',bt:'#fff'}];
var PG={purpose:[15,1],plat:[30],links:[50],prof:[75],theme:[100]};

function fresh(u){return{scr:'join',h:[],email:'',user:u||'',purpose:'',plan:'Pulsuz',plats:[],v:{},ex:['','',''],exp:['','',''],pickFor:0,ls:0,xn:3,name:'',bio:'',av:'',th:-1,code:'',edit:false}}
function plat(n){for(var i=0;i<PL.length;i++)if(PL[i][0]===n)return PL[i];return null}

/* ---------- linklər ---------- */
var DOM={'Instagram':['instagram.com','instagr.am'],'WhatsApp':['wa.me','whatsapp.com'],'TikTok':['tiktok.com'],'YouTube':['youtube.com','youtu.be'],'Spotify':['spotify.com','spoti.fi'],'Telegram':['t.me','telegram.me','telegram.org'],'Facebook':['facebook.com','fb.com','fb.me'],'X':['x.com','twitter.com'],'Threads':['threads.net','threads.com'],'SoundCloud':['soundcloud.com'],'Snapchat':['snapchat.com'],'Pinterest':['pinterest.com','pin.it'],'Twitch':['twitch.tv'],'LinkedIn':['linkedin.com','lnkd.in']};
function onDom(host,d){host=host.toLowerCase().replace(/^www\./,'');return host===d||host.slice(-d.length-1)==='.'+d}
function hostOk(p,host){var d=DOM[p];if(!d)return true;return d.some(function(x){return onDom(host,x)})}
function knownDomain(v){v=v.toLowerCase().replace(/^@/,'').split('/')[0];for(var k in DOM)for(var i=0;i<DOM[k].length;i++)if(onDom(v,DOM[k][i]))return true;return false}
function check(p,v){
 v=(v||'').trim();if(!v)return{url:'',err:''};
 var wrong=(p&&p!=='Veb sayt')?'Bu '+p+' linki deyil. Düzgün '+p+' linkini yerləşdirin.':'Düzgün link yerləşdirin.';
 var asUrl=/^https?:\/\//i.test(v)||/^www\./i.test(v)||/\//.test(v)||knownDomain(v),u='';
 if(p==='WhatsApp'&&!asUrl){var d=v.replace(/\D/g,'');if(d.length<7||/[a-z]/i.test(v))return{url:'',err:wrong};u='https://wa.me/'+d}
 else if(asUrl){u=/^https?:\/\//i.test(v)?v:'https://'+v}
 else if(BASE[p]){if(!/^@?[A-Za-z0-9._-]{1,50}$/.test(v))return{url:'',err:'Düzgün istifadəçi adı və ya '+p+' linki yerləşdirin.'};u=BASE[p]+encodeURIComponent(v.replace(/^@/,''))}
 else if(/^[^\s\/]+\.[^\s]+$/.test(v))u='https://'+v;
 else return{url:'',err:wrong};
 try{var x=new URL(u);if(!/^https?:$/.test(x.protocol))return{url:'',err:wrong};if(p&&!hostOk(p,x.hostname))return{url:'',err:wrong};return{url:x.href,err:''}}catch(e){return{url:'',err:wrong}}
}
function hostOf(x){return x.replace(/^https?:\/\//i,'').replace(/^www\./i,'').split(/[\/?#]/)[0]||'Link'}
function links(){
 var out=[];
 PL.forEach(function(p){if(S.plats.indexOf(p[0])>-1){var raw=(S.v[p[0]]||'').trim();if(raw){var r=check(p[0],raw);out.push({t:p[0],raw:raw,url:r.url,err:r.err,p:p})}}});
 S.ex.forEach(function(x,i){x=(x||'').trim();if(x){var pn=S.exp[i]||'',r=check(pn,x);out.push({t:pn||hostOf(x),raw:x,url:r.url,err:r.err,p:pn?plat(pn):null})}});
 return out;
}
function pct(){var n=0;if(S.name)n+=20;if(S.bio)n+=20;if(S.av)n+=20;if(links().some(function(l){return l.url}))n+=20;if(S.th>-1)n+=20;return n}

/* ---------- rənglər ---------- */
function inkOn(c){var n=parseInt(c.slice(1),16),l=(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255;return l>.6?'#111':'#fff'}
function btnInk(t){return t.bx||(t.bt==='transparent'?t.tx:inkOn(t.bt))}
function tv(t,r){return'--phb:'+t.bg+';--ptx:'+t.tx+';--pbt:'+t.bt+';--pbx:'+btnInk(t)+';--pbd:'+(t.bd||0)+';--pbs:'+(t.sh||'none')+';--pbr:'+(t.br||r)}

/* ---------- ümumi HTML hissələri ---------- */
function icon(p,r){return'<div class="ic'+(r?' r':'')+'" style="background:'+p[1]+';'+(p[1]==='#fffc00'?'color:#111':'')+'">'+p[2]+'</div>'}
function logo(){return'<div class="logo">QısaGet'+QLOGO+'</div>'}
function art(){return'<div class="art"><div class="c1"></div><div class="c2"><i></i>Leyla Əliyeva<em>Foto studiya, Bakı</em><s>Portfolio</s><s>Rezervasiya</s><s>Instagram</s></div><div class="chip">'+QLOGO+' /'+esc(S.user||'leyla')+'</div><div class="dk" style="left:10%">▶</div><div class="dk" style="left:21%;bottom:9%">♪</div></div>'}
function topBar(back){var p=PG[S.scr]||[0];return'<div class="top">'+(back?'<button class="bk" onclick="QS.bk()" aria-label="Geri">‹</button>':'<span style="width:42px"></span>')+'<div class="pg'+(p[1]?' m':'')+'"><div style="width:'+p[0]+'%"></div></div><div class="star">'+QLOGO+'</div></div>'}
function foot(label,fn,dis,skip){return'<div class="foot"><button class="pill go" id="nx" '+(dis?'disabled':'')+' onclick="'+fn+'">'+label+'</button>'+(skip?'<button class="skip" onclick="'+skip+'">Keç</button>':'')+'</div>'}
function avStyle(){return S.av?' style="background-image:url(\''+esc(S.av)+'\')"':''}
function ph(i){
 var t=TH[i],st=t?tv(t,'8px'):'';
 var so=S.plats.slice(0,3).map(function(){return'<i></i>'}).join('')||'<i></i><i></i><i></i>';
 var L=links().filter(function(l){return l.url}).slice(0,3),lb='';
 for(var k=0;k<3;k++)lb+='<div class="lb">'+(L[k]?esc(L[k].t):'')+'</div>';
 return'<div class="ph" style="'+st+'"><div class="pa"'+avStyle()+'></div><b>'+esc(S.name||S.user||'adın')+'</b><div class="bar"></div><div class="bar" style="width:34%"></div><div class="so">'+so+'</div>'+lb+'</div>';
}

/* ---------- ekranlar ---------- */
var SC={
join:function(){return'<div class="scr"><div class="split"><div class="lf"><div class="fm">'+logo()+'<button class="back" onclick="QS.close()">‹ Ana səhifə</button><h1>QısaGet-ə qoşul</h1><p class="sub">Pulsuz qeydiyyatdan keç!</p><input class="in" id="em" type="email" aria-label="E-poçt" placeholder="E-poçt" autocomplete="email" autocapitalize="off" spellcheck="false" value="'+esc(S.email)+'" oninput="QS.chk()" onkeydown="QS.enter(event)"><div class="err" id="e"></div><button class="pill go" id="nx" disabled onclick="QS.j1()">Davam et</button><p class="fine"><b>Davam et</b> düyməsinə basaraq QısaGet-in <u>məxfilik bildirişini</u> və <u>şərtlərini</u> qəbul edir, yeniliklər və təkliflər almağa razılıq verirsən.</p><div class="or">VƏ YA</div><button class="pill" onclick="QS.j1(1)"><b style="color:#4285f4">G</b> Google ilə davam et</button><div class="hint">Artıq hesabın var? <button class="lnk" onclick="QS.login()">Daxil ol</button></div></div></div>'+art()+'</div></div>'},

user:function(){return'<div class="scr"><div class="split"><div class="lf"><div class="fm">'+logo()+'<button class="back" onclick="QS.bk()">‹ Geri</button><h1>İstifadəçi adını seç</h1><p class="sub" style="font-size:14.5px">Asan tanınmaq üçün sosial şəbəkədəki adına yaxın ad seç.</p><div class="pre"><span>qisaget.az/</span><div style="flex:1;min-width:0"><label for="un">istifadəçi adı</label><input id="un" value="'+esc(S.user)+'" maxlength="24" autocomplete="off" autocapitalize="off" spellcheck="false" oninput="QS.un()" onkeydown="QS.enter(event)"></div></div><div class="err" id="e"></div><button class="pill" id="nx" onclick="QS.u1()">Davam et</button></div></div>'+art()+'</div></div>'},

code:function(){
 var ins='';for(var i=0;i<6;i++)ins+='<input maxlength="1" inputmode="numeric" pattern="[0-9]*" autocomplete="'+(i?'off':'one-time-code')+'" aria-label="Rəqəm '+(i+1)+'" oninput="QS.cd(this,'+i+')" onkeydown="QS.cb(event,'+i+')" onpaste="QS.cp(event)">';
 return'<div class="scr"><div class="split"><div class="lf"><div class="fm">'+logo()+'<button class="back" onclick="QS.bk()">‹ Geri</button><h1>Gələn qutunu yoxla</h1><p class="sub" style="font-size:15px">6 rəqəmli müvəqqəti kodu <b>'+esc(S.email)+'</b> ünvanına göndərdik.</p><div class="codes">'+ins+'</div>'+(DEMO?'<p class="fine" style="margin:0 0 14px">Demo rejimi: real e-poçt göndərilmir, istənilən 6 rəqəm qəbul olunur.</p>':'')+'<button class="pill" id="nx" disabled onclick="QS.c1()">Göndər</button><button class="skip" style="margin-top:16px;color:var(--ink)" onclick="QS.resend()">Kodu yenidən göndər</button></div></div>'+art()+'</div></div>';
},

plan:function(){
 var P=[['Starter','Pulsuz plandakı hər şey, əlavə:',['Vacib linkləri önə çıxar','Ziyarətçilərin kliklərini gör','Linkləri tarixə görə planla']],['Pro','Starter plandakı hər şey, əlavə:',['QısaGet loqosunu sil','Öz dizaynını yarat','Qeydiyyatları e-poçta bağla']],['Premium','Pro plandakı hər şey, əlavə:',['Hər ziyarətçiyə görə uyğunlaşdır','Bütün zamanların statistikası','Verini istədiyin yerə köçür']]];
 return'<div class="scr"><div class="col" style="max-width:1040px;padding-bottom:30px"><div class="top"><button class="bk" onclick="QS.close()" aria-label="Bağla">✕</button></div><div class="body"><h1 style="font-size:clamp(32px,7vw,50px)">Sənə uyğun planı tap</h1><p class="sub">İstədiyin vaxt ləğv edə bilərsən.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px">'
 +P.map(function(p,i){return'<div class="card" style="margin:0;'+(i===1?'border:2px solid var(--pur);background:#f3edff;color:#121212;--mute:#5d6166;--ink:#121212':'')+'"><h3>'+p[0]+'</h3><div style="font:800 28px \'Bricolage Grotesque\',sans-serif">Tezliklə</div><p style="color:var(--mute);font-size:14px">'+p[1]+'</p><ul style="padding-left:18px;margin:8px 0 18px;font-size:14.5px">'+p[2].map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul><button class="pill'+(i===1?' pu':'')+'" style="margin:0" onclick="QS.pick(\''+p[0]+'\')">Ön sifariş ver</button></div>'}).join('')
 +'</div><div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap"><div><h3>Pulsuz</h3><div style="color:var(--mute)">✓ Hər şeyi tək linkdə topla &nbsp; ✓ Öz səhifə ünvanın</div></div><button class="pill" style="width:auto;padding:0 34px;margin:0" onclick="QS.pick(\'Pulsuz\')">Başla</button></div></div></div></div>';
},

purpose:function(){
 var O=[['yaradici','Məzmun yaradıcısı','İzləyici kütləsini böyütmək və gəlir yollarını kəşf etmək.','linear-gradient(135deg,#d4e81f 50%,#d416d4 50%)'],['biznes','Biznes','İşimi böyütmək və daha çox müştəriyə çatmaq.','#4b2072'],['sexsi','Şəxsi','Dostlarımla və tanışlarımla link paylaşmaq.','#ff3e4d']];
 return'<div class="scr"><div class="col">'+topBar(1)+'<div class="body"><h1>QısaGet-dən məqsədini ən yaxşı hansı izah edir?</h1><p class="sub">Bu, təcrübəni sənə uyğunlaşdırmağımıza kömək edir.</p>'
 +O.map(function(o){return'<button class="opt" aria-pressed="'+(S.purpose===o[0])+'" onclick="QS.sp(this,\''+o[0]+'\')"><div><b>'+o[1]+'</b><span>'+o[2]+'</span></div><div class="img" style="background:'+o[3]+'"></div></button>'}).join('')
 +'</div>'+foot('Davam et',"QS.go('plat')",!S.purpose)+'</div></div>';
},

plat:function(){return'<div class="scr"><div class="col">'+topBar(1)+'<div class="body"><h1>Hansı platformalardasan?</h1><p class="sub">Başlamaq üçün bir neçəsini seç, istədiyin vaxt yeniləyə bilərsən.</p><div class="pl">'
 +PL.map(function(p){return'<button class="pt" aria-pressed="'+(S.plats.indexOf(p[0])>-1)+'" onclick="QS.tp(this,\''+p[0]+'\')">'+icon(p)+p[0]+'</button>'}).join('')
 +'</div></div>'+foot('Davam et',"QS.go('links')",!S.plats.length,"QS.go('links')")+'</div></div>'},

links:function(){
 var pf=PL.filter(function(p){return S.plats.indexOf(p[0])>-1}).map(function(p){var wa=p[0]==='WhatsApp',web=p[0]==='Veb sayt';return'<div class="fld" data-p="'+esc(p[0])+'"><input class="in" data-k="'+esc(p[0])+'" aria-label="'+esc(p[0])+'" value="'+esc(S.v[p[0]]||'')+'" placeholder="'+(wa?'Telefon nömrəsini yaz':web?'https://':'@  istifadəçi adı')+'" inputmode="'+(wa?'tel':web?'url':'text')+'" autocapitalize="off" spellcheck="false" onchange="QS.vf(this)">'+icon(p,1)+'<div class="ferr" role="alert"></div></div>'}).join('');
 var ex='';for(var i=0;i<S.xn;i++){var pn=S.exp[i]||'',pp=pn?plat(pn):null;ex+='<div class="fld" data-p="'+esc(pn)+'"><input class="in" data-x="'+i+'" aria-label="Digər link '+(i+1)+'" value="'+esc(S.ex[i]||'')+'" placeholder="'+(pp?esc(pp[0])+' linki':'https://')+'" inputmode="url" autocapitalize="off" spellcheck="false" onchange="QS.vf(this)"><button type="button" class="ic r" style="background:'+(pp?pp[1]:'#d4e81f')+';color:'+((!pp||pp[1]==='#fffc00')?'#111':'#fff')+'" onclick="QS.pickIcon('+i+')" aria-label="Platforma seç">'+(pp?pp[2]:'∞')+'</button><div class="ferr" role="alert"></div></div>'}
 return'<div class="scr"><div class="col">'+topBar(1)+'<div class="body"><h1>Bağlantılarını əlavə et</h1><p class="sub">Məzmununu yeni QısaGet-ə əlavə etmək üçün aşağıdakı sahələri doldur.</p>'+(pf?'<div class="h3">Sosial profillərin və əlaqə məlumatların</div>'+pf:'')+'<div class="h3">Digər linklər</div><p class="hintx">Logoya basıb link üçün platforma seçə bilərsən.</p>'+ex+'<button class="plus" onclick="QS.addx()">+ Link əlavə et</button></div>'
 +(S.edit?foot('Yadda saxla',"QS.fl()"):foot('Davam et',"QS.nl()",0,"QS.go('prof')"))+'</div></div>';
},

picker:function(){
 var cur=S.exp[S.pickFor]||'';
 var tiles='<button class="pt" aria-pressed="'+(cur==='')+'" onclick="QS.setIcon(\'\')"><div class="ic" style="background:#d4e81f;color:#111">∞</div>Standart</button>'+PL.map(function(p){return'<button class="pt" aria-pressed="'+(cur===p[0])+'" onclick="QS.setIcon(\''+p[0]+'\')">'+icon(p)+p[0]+'</button>'}).join('');
 return'<div class="scr"><div class="col"><div class="top"><button class="bk" onclick="QS.pickBack()" aria-label="Geri">‹</button><div class="pg"><div style="width:50%"></div></div><div class="star">'+QLOGO+'</div></div><div class="body"><h1>Bu link üçün platformanı seç</h1><p class="sub">Yerləşdirdiyin link seçdiyin platformaya aid olmalıdır.</p><div class="pl">'+tiles+'</div></div></div></div>';
},

prof:function(){return'<div class="scr"><div class="col">'+topBar(1)+'<div class="body"><h1>Profil məlumatlarını əlavə et</h1><p class="sub">Bu məlumatlar QısaGet səhifəndə görünəcək.</p><div class="avw"><div class="av'+(S.av?' has':'')+'" id="avp"'+avStyle()+'></div><label for="avf" aria-label="Şəkil yüklə">+</label><input id="avf" type="file" accept="image/*" hidden onchange="QS.av(this)"></div><label class="lab" for="pn">Görünən ad</label><input class="in" id="pn" maxlength="40" style="border-radius:16px;height:52px" value="'+esc(S.name)+'"><label class="lab" for="pb">Bioqrafiya</label><textarea class="in" id="pb" maxlength="160" placeholder="Nə etdiyini bir-iki cümlə ilə yaz" oninput="document.getElementById(\'cn\').textContent=this.value.length+\'/160\'">'+esc(S.bio)+'</textarea><div class="cnt" id="cn">'+S.bio.length+'/160</div></div>'
 +(S.edit?foot('Yadda saxla',"QS.done()"):foot('Davam et',"QS.go('theme')"))+'</div></div>'},

theme:function(){
 return'<div class="scr"><div class="tcol"><div class="top"><button class="bk" onclick="QS.bk()" aria-label="Geri">‹</button><div class="pg"><div style="width:100%"></div></div><div class="star">'+QLOGO+'</div></div><div class="stage">'+ph(S.th)+'</div><div class="sheet"><div class="sheet-in"><h2>Tema seç</h2><div class="th">'
 +TH.map(function(t,i){return'<button class="tt" aria-pressed="'+(S.th===i)+'" onclick="QS.th('+i+')"><div style="background:'+t.bg+';color:'+t.tx+';--b:'+t.bt+';--d:'+(t.bd||0)+';--s:'+(t.sh||'none')+'">Aa</div>'+t.n+'</button>'}).join('')
 +'</div>'+(S.edit?foot('Yadda saxla',"QS.done()",S.th<0):foot('Davam et',"QS.go('admin')",S.th<0))+'</div></div></div></div>';
},

admin:function(){
 var L=links(),p=pct();
 var lk=L.map(function(l){
  var inner=(l.p?icon(l.p):'<div class="ic" style="background:#d4e81f;color:#111">∞</div>')+'<div style="flex:1;min-width:0"><b>'+esc(l.t)+'</b><small>'+esc(l.raw)+'</small>'+(l.url?'':'<small class="e">'+esc(l.err||'Düzgün link yerləşdirin.')+'</small>')+'</div>';
  return l.url?'<a class="lc" href="'+esc(l.url)+'" target="_blank" rel="noopener noreferrer">'+inner+'</a>':'<div class="lc bad">'+inner+'</div>';
 }).join('');
 if(!lk)lk='<div class="lc empty">Hələ link yoxdur. «+ Əlavə et» düyməsi ilə başla.</div>';
 var so=S.plats.map(function(n){return icon(plat(n),1)}).join('');
 return'<div class="scr"><div class="adm"><div class="ah"><button class="c" onclick="QS.bk()" aria-label="Geri">‹</button><button class="c" onclick="QS.close()" aria-label="Bağla">✕</button><button class="sh" onclick="QS.shr()">⇪ QısaGet-ini paylaş</button></div>'
 +'<div class="pro"><div class="av'+(S.av?' has':'')+'"'+avStyle()+'></div><div><b>@'+esc(S.user||'adın')+'</b>'+(S.name?'<div class="pn">'+esc(S.name)+'</div>':'')+(S.bio?'<p class="pbio">'+esc(S.bio)+'</p>':'')+(so?'<div class="soc">'+so+'</div>':'')+'<button class="ed" onclick="QS.edit(\'prof\')">Profili redaktə et</button></div></div>'
 +'<div class="tabs"><button class="on">Linklər</button><button onclick="QS.soon()">Mağaza</button></div><div class="row2"><button class="pill" onclick="QS.soon()">▦ Kolleksiya əlavə et</button><button class="pill go" onclick="QS.edit(\'links\')">+ Əlavə et</button></div>'
 +'<div class="card"><h3>QısaGet məsləhəti</h3><div style="color:var(--mute)">Linklərini yenilə, ziyarətçilərin ən yeni məzmunu görsün.</div></div>'+lk
 +'<button class="lc url" onclick="QS.shr()">qisaget.az/'+esc(S.user||'adın')+'</button></div>'
 +'<div class="ring" style="--p:'+p+'%"><div>'+p+'%<br>tamam</div></div>'
 +'<div class="bn"><button onclick="QS.edit(\'links\')"><span>＋</span>Əlavə et</button><button onclick="QS.go(\'view\')"><span>◉</span>Önizləmə</button><button onclick="QS.edit(\'theme\')"><span>▭</span>Dizayn</button><button onclick="QS.soon(1)"><span>✦</span>Gücləndir</button></div></div>';
},

view:function(){
 var t=TH[S.th>-1?S.th:0],L=links().filter(function(l){return l.url});
 var so=S.plats.map(function(n){return icon(plat(n),1)}).join('');
 return'<div class="scr"><div class="pub" style="'+tv(t,'28px')+'"><div class="pbar"><button onclick="QS.bk()" aria-label="Geri">‹</button><span>qisaget.az/'+esc(S.user)+'</span><span class="sp"></span></div><div class="pi"><div class="av'+(S.av?' has':'')+'"'+avStyle()+'></div><h2>'+esc(S.name||'@'+S.user)+'</h2>'+(S.bio?'<p class="pbio">'+esc(S.bio)+'</p>':'')+(so?'<div class="psoc">'+so+'</div>':'')
 +(L.length?L.map(function(l){return'<a class="pbtn" href="'+esc(l.url)+'" target="_blank" rel="noopener noreferrer">'+esc(l.t)+'</a>'}).join(''):'<p class="pempty">Hələ link əlavə olunmayıb.</p>')
 +'<div class="pft">QısaGet'+QLOGO+'</div></div></div></div>';
}
};

/* ---------- çəkmə və naviqasiya ---------- */
function draw(){
 var s=S.scr,keep=(s===lastScr)?root.scrollTop:0;
 app.innerHTML=SC[s]();
 if(s==='theme')root.style.setProperty('--pg',S.th>-1?TH[S.th].pg:'#ececf0');
 else if(s==='view')root.style.setProperty('--pg',TH[S.th>-1?S.th:0].pg);
 else root.style.removeProperty('--pg');
 lastScr=s;root.scrollTop=keep;
 if(s==='join')chk();else if(s==='user')un();
}
function save(){
 [].forEach.call(root.querySelectorAll('[data-k]'),function(e){S.v[e.getAttribute('data-k')]=e.value.trim()});
 [].forEach.call(root.querySelectorAll('[data-x]'),function(e){S.ex[+e.getAttribute('data-x')]=e.value.trim()});
 var pn=$('pn'),pb=$('pb');if(pn)S.name=pn.value.trim();if(pb)S.bio=pb.value.trim();
}
function focusFirst(){var f=app.querySelector('#em,#un,.codes input');if(f)try{f.focus({preventScroll:true})}catch(e){}}
function go(s){save();S.h.push(S.scr);S.scr=s;if(s==='admin')savePreorder();draw();root.scrollTop=0;if(s==='user'||s==='code')focusFirst()}
function bk(){save();S.scr=S.h.pop()||'join';if(S.scr==='admin')S.edit=false;draw();root.scrollTop=0}
function edit(s){save();S.edit=true;S.h.push('admin');S.scr=s;draw();root.scrollTop=0}
function done(){save();savePreorder();S.edit=false;S.h=['theme'];S.scr='admin';draw();root.scrollTop=0}
function toast(m){toastEl.textContent=m;toastEl.hidden=false;clearTimeout(tmr);tmr=setTimeout(function(){toastEl.hidden=true},2600)}
function copy(t,cb){try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){cb(true)},function(){cb(false)});return}}catch(e){}cb(false)}

function openReg(user){S=fresh(user);lastScr='';toastEl.hidden=true;noteHide();root.classList.add('open');document.body.style.overflow='hidden';draw();root.scrollTop=0;setTimeout(focusFirst,60)}
function closeReg(){root.classList.remove('open');document.body.style.overflow='';clearTimeout(tmr);toastEl.hidden=true;noteHide()}

/* ---------- addım əməliyyatları ---------- */
function chk(){var el=$('em');if(!el)return;var v=el.value.trim();S.email=v;$('nx').disabled=!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v)}
function enter(e){if(e.key==='Enter'){e.preventDefault();var b=$('nx');if(b&&!b.disabled)b.click()}}
function j1(g){if(g){toast('Google ilə giriş tezliklə aktiv olacaq.');return}go('user')}
function login(){toast('Giriş səhifəsi tezliklə aktiv olacaq.')}
function un(){var el=$('un');if(!el)return;var v=clean(el.value);if(v!==el.value)el.value=v;S.user=v;$('nx').className='pill'+(validUser(v)?' go':'');$('e').textContent=''}
function u1(){
 if(!validUser(S.user)){$('e').textContent='İstifadəçi adı ən azı 3 simvol olmalıdır.';return}
 if(!SB){go('code');return}
 var b=$('nx');b.disabled=true;
 SB.rpc('username_taken',{u:S.user}).then(function(r){
  if(r.error)throw r.error;
  if(r.data){var b1=$('nx');if(b1)b1.disabled=false;$('e').textContent='Bu ad artıq götürülüb. Başqa ad seç.';return}
  return SB.auth.signInWithOtp({email:S.email.toLowerCase(),options:{shouldCreateUser:true}}).then(function(r2){if(r2.error)throw r2.error;go('code')});
 }).catch(function(err){var b2=$('nx');if(b2)b2.disabled=false;var e=$('e');if(e)e.textContent='Xəta oldu: '+((err&&err.message)||'bir az sonra yenidən yoxla')});
}
function codeInputs(){return root.querySelectorAll('.codes input')}
function codeSync(){var c=[].map.call(codeInputs(),function(x){return x.value}).join('');S.code=c;var nx=$('nx');nx.disabled=c.length<6;nx.className='pill'+(c.length===6?' go':'')}
function cd(el,i){el.value=el.value.replace(/\D/g,'').slice(0,1);var a=codeInputs();if(el.value&&a[i+1])a[i+1].focus();codeSync()}
function cb(e,i){var a=codeInputs();if(e.key==='Backspace'&&!e.target.value&&i>0){a[i-1].focus()}else if(e.key==='Enter'){e.preventDefault();var b=$('nx');if(b&&!b.disabled)b.click()}}
function cp(e){var d=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);if(!d)return;e.preventDefault();var a=codeInputs();for(var i=0;i<6;i++)a[i].value=d.charAt(i);a[Math.min(d.length,5)].focus();codeSync()}
function resend(){
 if(!SB){toast('Kod yenidən göndərildi.');return}
 SB.auth.signInWithOtp({email:S.email.toLowerCase(),options:{shouldCreateUser:true}}).then(function(r){toast(r.error?'Kod göndərilmədi, bir az sonra yenidən yoxla.':'Kod yenidən göndərildi.')});
}
function c1(){
 if(S.code.length<6)return;
 if(!SB){S.h=[];S.scr='plan';draw();root.scrollTop=0;return}
 var b=$('nx');b.disabled=true;
 SB.auth.verifyOtp({email:S.email.toLowerCase(),token:S.code,type:'email'}).then(function(r){
  if(r.error||!r.data||!r.data.user)throw r.error||new Error('no user');
  S.uid=r.data.user.id;S.h=[];S.scr='plan';draw();root.scrollTop=0;
 }).catch(function(){var b2=$('nx');if(b2)b2.disabled=false;toast('Kod yanlışdır və ya vaxtı bitib.')});
}
function savePreorder(){
 if(!SB||!S.uid)return;
 var row={user_id:S.uid,email:S.email.toLowerCase(),username:S.user,plan:S.plan,purpose:S.purpose||null,platforms:S.plats,
  links:links().filter(function(l){return l.url}).map(function(l){return{title:l.t,url:l.url}}),
  display_name:S.name||null,bio:S.bio||null,theme:S.th>-1?S.th:null};
 SB.from('preorders').upsert(row,{onConflict:'user_id'}).then(function(r){if(r.error)throw r.error}).catch(function(){toast('Məlumat saxlanmadı. İnternetini yoxla və yenidən cəhd et.')});
}
function pick(name){S.plan=name;savePreorder();go('purpose')}
function sp(el,v){S.purpose=v;[].forEach.call(el.parentNode.querySelectorAll('.opt'),function(x){x.setAttribute('aria-pressed',String(x===el))});$('nx').disabled=false}
function tp(el,n){var i=S.plats.indexOf(n);if(i<0)S.plats.push(n);else S.plats.splice(i,1);el.setAttribute('aria-pressed',String(i<0));$('nx').disabled=!S.plats.length}
function addx(){save();S.xn++;draw()}
function setAv(url){S.av=url;var a=$('avp');if(a){a.style.backgroundImage='url(\''+url+'\')';a.classList.add('has')}}
function av(f){
 var file=f.files&&f.files[0];if(!file)return;
 if(!/^image\//.test(file.type)){toast('Zəhmət olmasa şəkil faylı seç.');return}
 var r=new FileReader();
 r.onload=function(){
  var raw=String(r.result),im=new Image();
  im.onload=function(){
   try{var c=document.createElement('canvas'),n=320,s=Math.min(im.width,im.height),ctx=c.getContext('2d');c.width=c.height=n;ctx.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,n,n);setAv(c.toDataURL('image/jpeg',.88))}catch(e){setAv(raw)}
  };
  im.onerror=function(){toast('Şəkil açıla bilmədi.')};
  im.src=raw;
 };
 r.readAsDataURL(file);
}
function th(i){S.th=i;draw()}
var noteT=0;
function noteHide(){var n=$('reg-note');if(n)n.hidden=true;clearTimeout(noteT)}
function shr(){
 var n=$('reg-note');if(!n)return;
 n.innerHTML='<button type="button" class="sx" onclick="QS.noteClose()" aria-label="Bağla">✕</button><div class="sn">Qisaget'+QLOGO+'</div><p>İstəyiniz üçün təşəkkürlər '+SMILE+'</p><p>Sizin üçün link hazır olan zaman bu gmailə linkinizi göndərəcəyik:<b>'+esc(S.email)+'</b></p>';
 n.hidden=false;clearTimeout(noteT);noteT=setTimeout(function(){n.hidden=true},12000);
}
function vfield(f){var inp=f.querySelector('input'),r=check(f.getAttribute('data-p'),inp.value);f.classList.toggle('bad',!!r.err);f.querySelector('.ferr').textContent=r.err;inp.setAttribute('aria-invalid',r.err?'true':'false');return r.err?inp:null}
function vf(inp){vfield(inp.parentNode)}
function vall(){var first=null;[].forEach.call(root.querySelectorAll('.fld[data-p]'),function(f){var b=vfield(f);if(b&&!first)first=b});if(first){try{first.focus()}catch(e){}}return!first}
function nl(){if(vall())go('prof')}
function fl(){if(vall())done()}
function pickIcon(i){S.ls=root.scrollTop;S.pickFor=i;go('picker')}
function pickBack(){S.scr=S.h.pop()||'links';draw();root.scrollTop=S.ls||0;[].forEach.call(root.querySelectorAll('.fld[data-p]'),function(f){if(f.querySelector('input').value.trim())vfield(f)})}
function setIcon(n){S.exp[S.pickFor]=n;pickBack()}
function soon(p){toast(p?'Pro planlar tezliklə aktiv olacaq.':'Bu bölmə tezliklə aktiv olacaq.')}

window.QS={go:go,bk:bk,close:closeReg,edit:edit,done:done,chk:chk,enter:enter,j1:j1,login:login,un:un,u1:u1,cd:cd,cb:cb,cp:cp,resend:resend,c1:c1,pick:pick,sp:sp,tp:tp,addx:addx,av:av,th:th,shr:shr,soon:soon,vf:vf,nl:nl,fl:fl,pickIcon:pickIcon,setIcon:setIcon,pickBack:pickBack,noteClose:noteHide};

/* ---------- landing ilə əlaqə ---------- */
document.querySelectorAll('.urlfield input').forEach(function(i){i.addEventListener('input',function(){var c=clean(i.value);if(c!==i.value)i.value=c;i.parentElement.classList.remove('err')})});
window.startOnboarding=function(e,f){
 e.preventDefault();
 var i=f.querySelector('.urlfield input'),v=clean(i.value);
 if(!validUser(v)){i.parentElement.classList.add('err');i.placeholder='ən azı 3 simvol';i.focus();return false}
 openReg(v);return false;
};
document.querySelectorAll('a[href="#signup"]').forEach(function(a){a.addEventListener('click',function(){setTimeout(function(){var i=document.querySelector('#signup .urlfield input');if(i)try{i.focus({preventScroll:true})}catch(e){}},600)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&root.classList.contains('open'))closeReg()});
})();
