(function(){
'use strict';
/* Supabase: public/js/config.js içində URL və anon key yazılıbsa real rejim, yoxsa demo rejim (kod göndərilmir, istənilən 6 rəqəm qəbul olunur). */
var CFG=window.QISAGET_CONFIG||{};
var SB=null;
try{if(CFG.SUPABASE_URL&&CFG.SUPABASE_ANON_KEY&&window.supabase)SB=window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY)}catch(e){SB=null}
var DEMO=!SB;
var QLOGO='<svg class="qlogo" aria-hidden="true"><use href="#qlogo"/></svg>';
var root=document.getElementById('reg'),app=document.getElementById('reg-app'),toastEl=document.getElementById('reg-toast');
var S=null,lastScr='',tmr=0;
function $(i){return document.getElementById(i)}
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var MAP={'ə':'e','ı':'i','ö':'o','ü':'u','ç':'c','ş':'s','ğ':'g'};
function clean(v){return String(v).toLowerCase().replace(/[əıöüçşğ]/g,function(c){return MAP[c]}).replace(/[^a-z0-9._-]/g,'').slice(0,24)}
function validUser(v){return v.length>=3&&/[a-z0-9]/.test(v)}

var PL=[['Instagram','#d6249f'],['WhatsApp','#25d366'],['TikTok','#000'],['YouTube','#f00'],['Veb sayt','#111'],['Spotify','#1ed760'],['Telegram','#27a7e7'],['Facebook','#1877f2'],['X','#000'],['Threads','#000'],['SoundCloud','#f50'],['Snapchat','#fffc00'],['Pinterest','#e60023'],['Twitch','#9146ff'],['LinkedIn','#0a66c2']];
/* Rəsmi brend loqoları (Simple Icons, Font Awesome Free). Hər biri: [viewBox, path]. */
var GL={"Instagram":["0 0 24 24","M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388 5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552 1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388 5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912.056-1.28.07-1.69.063-4.948-.006-3.258-.02-3.667-.081-4.947-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123 5.86 5.86 0 0 0-2.128-1.38C19.074.322 18.202.12 16.924.066 15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895 3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228-.06-1.264-.072-1.644-.08-4.848-.006-3.204.006-3.583.061-4.848.05-1.169.246-1.805.408-2.228.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417 1.265-.06 1.644-.072 4.848-.08 3.203-.006 3.583.006 4.85.062 1.168.05 1.804.244 2.227.408.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227.06 1.265.074 1.645.08 4.848.005 3.203-.006 3.583-.061 4.848-.051 1.17-.245 1.805-.408 2.23-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442 1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024 6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16 4 4 0 0 1 8 12.008"],"WhatsApp":["0 0 24 24","M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"],"TikTok":["0 0 24 24","M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07"],"YouTube":["0 0 24 24","M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z"],"Veb sayt":["0 0 512 512","M351.9 280H161c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zm-191-48h190.9c-2.8-64.5-17.1-123.9-37.4-167.4-11.4-24.4-23.7-41.8-35.1-52.4C268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4m-48 0c3.5-85.6 25.6-165.1 57.9-217.3C78.7 47.3 10.9 131.2 1.5 232zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3zm111.4-48C501.9 131.2 434.1 47.3 342 14.7c32.3 52.2 54.4 131.7 57.9 217.3z"],"Spotify":["0 0 24 24","M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0m5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02m1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6s.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2m.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3"],"Telegram":["0 0 24 24","M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024q-.159.037-5.061 3.345-.72.495-1.302.48c-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789q.04-.324.893-.663 5.247-2.286 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635"],"Facebook":["0 0 24 24","M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036 27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647"],"X":["0 0 24 24","M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"],"Threads":["0 0 24 24","M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a14 14 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32l-1.757-1.18c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388q.163.07.321.142c1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69q-.362 0-.739.021c-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221"],"SoundCloud":["0 0 24 24","M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.75.75 0 0 1 .452-.724s.75-.513 2.333-.513a5.36 5.36 0 0 1 2.763.755 5.43 5.43 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373M10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0M9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0m-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0m-1.647.77a26.1 26.1 0 0 1-.008 7.147.272.272 0 0 1-.542 0 28 28 0 0 1 0-7.147.275.275 0 0 1 .55 0m-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0m-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0"],"Snapchat":["0 0 24 24","M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a1 1 0 0 1 .464-.104c.182 0 .359.029.509.09.45.149.734.479.734.838q.022.674-1.213 1.168c-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509a.6.6 0 0 1-.045.225c-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03a3 3 0 0 1-.538-.074 6 6 0 0 0-1.273-.135c-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884a7 7 0 0 0-.928-.074c-.54 0-.958.089-1.272.149a3 3 0 0 1-.54.074c-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226a.6.6 0 0 1-.055-.225.496.496 0 0 1 .42-.509c3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809a2 2 0 0 1-.346-.119c-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"],"Pinterest":["0 0 24 24","M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026z"],"Twitch":["0 0 24 24","M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0 1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"],"LinkedIn":["0 0 448 512","M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8c0-14.3 5.7-27.9 15.8-38S39.6 0 53.8 0s27.9 5.7 38 15.8 15.8 23.8 15.8 38c0 29.7-24.1 54.3-53.8 54.3M447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"]};
var PBG={'Instagram':'radial-gradient(circle at 30% 107%,#fdf497 0,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)'};
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
 PL.forEach(function(p){if(S.plats.indexOf(p[0])>-1){var raw=(S.v[p[0]]||'').trim();if(raw){var r=check(p[0],raw);out.push({t:p[0],raw:raw,url:r.url,err:r.err,p:p,ex:false})}}});
 S.ex.forEach(function(x,i){x=(x||'').trim();if(x){var pn=S.exp[i]||'',r=check(pn,x);out.push({t:pn||hostOf(x),raw:x,url:r.url,err:r.err,p:pn?plat(pn):null,ex:true})}});
 return out;
}
function pct(){var n=0;if(S.name)n+=20;if(S.bio)n+=20;if(S.av)n+=20;if(links().some(function(l){return l.url}))n+=20;if(S.th>-1)n+=20;return n}

/* ---------- rənglər ---------- */
function inkOn(c){var n=parseInt(c.slice(1),16),l=(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255;return l>.6?'#111':'#fff'}
function btnInk(t){return t.bx||(t.bt==='transparent'?t.tx:inkOn(t.bt))}
function tv(t,r){return'--phb:'+t.bg+';--ptx:'+t.tx+';--pbt:'+t.bt+';--pbx:'+btnInk(t)+';--pbd:'+(t.bd||0)+';--pbs:'+(t.sh||'none')+';--pbr:'+(t.br||r)}

/* ---------- ümumi HTML hissələri ---------- */
function glyph(n){var g=GL[n];return g?'<svg viewBox="'+g[0]+'" aria-hidden="true"'+(n==='Snapchat'?' class="sn"':'')+'><path d="'+g[1]+'"/></svg>':''}
function icStyle(p){return'background:'+(PBG[p[0]]||p[1])+';color:'+(p[0]==='Spotify'?'#111':'#fff')}
function icon(p,r){return'<div class="ic'+(r?' r':'')+'" style="'+icStyle(p)+'">'+glyph(p[0])+'</div>'}
function logo(){return'<div class="logo">Qısaget'+QLOGO+'</div>'}
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
join:function(){return'<div class="scr join-screen"><div class="split"><div class="lf join-lf"><div class="fm"><div class="join-brand">Qısaget<svg class="qlogo join-logo" aria-hidden="true"><use href="#qlogo"/></svg></div><h1 class="join-title">Qısagetə DAXİL OL</h1><p class="sub join-sub">Pulsuz qeydiyyatdan keç!</p><input class="in" id="em" type="email" aria-label="E-poçt" placeholder="E-poçt" autocomplete="email" autocapitalize="off" spellcheck="false"'+(S.uid?' readonly':'')+' value="'+esc(S.email)+'" oninput="QS.chk()" onkeydown="QS.enter(event)"><div class="err" id="e"></div><button class="pill go" id="nx" disabled onclick="QS.j1()">Davam et</button><p class="fine"><b>Davam et</b> düyməsinə basaraq Qısaget-in <u>məxfilik bildirişini</u> və <u>şərtlərini</u> qəbul edir, yeniliklər və təkliflər almağa razılıq verirsən.</p><div class="or">VƏ YA</div><button class="pill" onclick="QS.j1(1)"><b style="color:#4285f4">G</b> Google ilə davam et</button><div class="hint">Artıq hesabın var? <button class="lnk" onclick="QS.login()">Daxil ol</button></div></div></div>'+art()+'</div></div>'},

user:function(){return'<div class="scr"><div class="split"><div class="lf"><div class="fm">'+logo()+'<button class="back" onclick="QS.bk()">‹ Geri</button><h1>İstifadəçi adını seç</h1><p class="sub" style="font-size:14.5px">Asan tanınmaq üçün sosial şəbəkədəki adına yaxın ad seç.</p><div class="pre"><span>qisaget.az/</span><div style="flex:1;min-width:0"><label for="un">istifadəçi adı</label><input id="un" value="'+esc(S.user)+'" maxlength="24" autocomplete="off" autocapitalize="off" spellcheck="false" oninput="QS.un()" onkeydown="QS.enter(event)"></div></div><div class="err" id="e"></div><button class="pill" id="nx" onclick="QS.u1()">Davam et</button></div></div>'+art()+'</div></div>'},

code:function(){
 var ins='';for(var i=0;i<6;i++)ins+='<input maxlength="1" inputmode="numeric" pattern="[0-9]*" autocomplete="'+(i?'off':'one-time-code')+'" aria-label="Rəqəm '+(i+1)+'" oninput="QS.cd(this,'+i+')" onkeydown="QS.cb(event,'+i+')" onpaste="QS.cp(event)">';
 return'<div class="scr"><div class="split"><div class="lf"><div class="fm">'+logo()+'<button class="back" onclick="QS.bk()">‹ Geri</button><h1>Gələn qutunu yoxla</h1><p class="sub" style="font-size:15px">6 rəqəmli müvəqqəti kodu <b>'+esc(S.email)+'</b> ünvanına göndərdik.</p><div class="codes">'+ins+'</div>'+(DEMO?'<p class="fine" style="margin:0 0 14px">Demo rejimi: real e-poçt göndərilmir, istənilən 6 rəqəm qəbul olunur.</p>':'')+'<button class="pill" id="nx" disabled onclick="QS.c1()">Göndər</button><button class="skip" style="margin-top:16px;color:var(--ink)" onclick="QS.resend()">Kodu yenidən göndər</button></div></div>'+art()+'</div></div>';
},

plan:function(){
 var P=[['Starter','Pulsuz plandakı hər şey, əlavə:',['Vacib linkləri önə çıxar','Ziyarətçilərin kliklərini gör','Linkləri tarixə görə planla']],['Pro','Starter plandakı hər şey, əlavə:',['Qısaget loqosunu sil','Öz dizaynını yarat','Qeydiyyatları e-poçta bağla']],['Premium','Pro plandakı hər şey, əlavə:',['Hər ziyarətçiyə görə uyğunlaşdır','Bütün zamanların statistikası','Verini istədiyin yerə köçür']]];
 return'<div class="scr"><div class="col" style="max-width:1040px;padding-bottom:30px"><div class="top"><button class="bk" onclick="QS.close()" aria-label="Bağla">✕</button></div><div class="body"><h1 style="font-size:clamp(32px,7vw,50px)">Sənə uyğun planı tap</h1><p class="sub">İstədiyin vaxt ləğv edə bilərsən.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px">'
 +P.map(function(p,i){return'<div class="card" style="margin:0;'+(i===1?'border:2px solid var(--pur);background:#f3edff;color:#121212;--mute:#5d6166;--ink:#121212':'')+'"><h3>'+p[0]+'</h3><div style="font:800 28px \'Bricolage Grotesque\',sans-serif">Tezliklə</div><p style="color:var(--mute);font-size:14px">'+p[1]+'</p><ul style="padding-left:18px;margin:8px 0 18px;font-size:14.5px">'+p[2].map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul><button class="pill'+(i===1?' pu':'')+'" style="margin:0" onclick="QS.pick(\''+p[0]+'\')">Ön sifariş ver</button></div>'}).join('')
 +'</div><div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap"><div><h3>Pulsuz</h3><div style="color:var(--mute)">✓ Hər şeyi tək linkdə topla &nbsp; ✓ Öz səhifə ünvanın</div></div><button class="pill" style="width:auto;padding:0 34px;margin:0" onclick="QS.pick(\'Pulsuz\')">Başla</button></div></div></div></div>';
},

purpose:function(){
 var O=[['yaradici','Məzmun yaradıcısı','İzləyici kütləsini böyütmək və gəlir yollarını kəşf etmək.','linear-gradient(135deg,#d4e81f 50%,#d416d4 50%)'],['biznes','Biznes','İşimi böyütmək və daha çox müştəriyə çatmaq.','#4b2072'],['sexsi','Şəxsi','Dostlarımla və tanışlarımla link paylaşmaq.','#ff3e4d']];
 return'<div class="scr"><div class="col">'+topBar(1)+'<div class="body"><h1>Qısaget-dən məqsədini ən yaxşı hansı izah edir?</h1><p class="sub">Bu, təcrübəni sənə uyğunlaşdırmağımıza kömək edir.</p>'
 +O.map(function(o){return'<button class="opt" aria-pressed="'+(S.purpose===o[0])+'" onclick="QS.sp(this,\''+o[0]+'\')"><div><b>'+o[1]+'</b><span>'+o[2]+'</span></div><div class="img" style="background:'+o[3]+'"></div></button>'}).join('')
 +'</div>'+foot('Davam et',"QS.go('plat')",!S.purpose)+'</div></div>';
},

plat:function(){return'<div class="scr"><div class="col">'+topBar(1)+'<div class="body"><h1>Hansı platformalardasan?</h1><p class="sub">Başlamaq üçün bir neçəsini seç, istədiyin vaxt yeniləyə bilərsən.</p><div class="pl">'
 +PL.map(function(p){return'<button class="pt" aria-pressed="'+(S.plats.indexOf(p[0])>-1)+'" onclick="QS.tp(this,\''+p[0]+'\')">'+icon(p)+p[0]+'</button>'}).join('')
 +'</div></div>'+foot('Davam et',"QS.go('links')",!S.plats.length,"QS.go('links')")+'</div></div>'},

links:function(){
 var pf=PL.filter(function(p){return S.plats.indexOf(p[0])>-1}).map(function(p){var wa=p[0]==='WhatsApp',web=p[0]==='Veb sayt';return'<div class="fld" data-p="'+esc(p[0])+'"><input class="in" data-k="'+esc(p[0])+'" aria-label="'+esc(p[0])+'" value="'+esc(S.v[p[0]]||'')+'" placeholder="'+(wa?'Telefon nömrəsini yaz':web?'https://':'@  istifadəçi adı')+'" inputmode="'+(wa?'tel':web?'url':'text')+'" autocapitalize="off" spellcheck="false" onchange="QS.vf(this)">'+icon(p,1)+'<div class="ferr" role="alert"></div></div>'}).join('');
 var ex='';for(var i=0;i<S.xn;i++){var pn=S.exp[i]||'',pp=pn?plat(pn):null;ex+='<div class="fld" data-p="'+esc(pn)+'"><input class="in" data-x="'+i+'" aria-label="Digər link '+(i+1)+'" value="'+esc(S.ex[i]||'')+'" placeholder="'+(pp?esc(pp[0])+' linki':'https://')+'" inputmode="url" autocapitalize="off" spellcheck="false" onchange="QS.vf(this)"><button type="button" class="ic r" style="'+(pp?icStyle(pp):'background:#d4e81f;color:#111')+'" onclick="QS.pickIcon('+i+')" aria-label="Platforma seç">'+(pp?glyph(pp[0]):'∞')+'</button><div class="ferr" role="alert"></div></div>'}
 return'<div class="scr"><div class="col">'+topBar(1)+'<div class="body"><h1>Bağlantılarını əlavə et</h1><p class="sub">Məzmununu yeni Qısaget-ə əlavə etmək üçün aşağıdakı sahələri doldur.</p>'+(pf?'<div class="h3">Sosial profillərin və əlaqə məlumatların</div>'+pf:'')+'<div class="h3">Digər linklər</div><p class="hintx">Logoya basıb link üçün platforma seçə bilərsən.</p>'+ex+'<button class="plus" onclick="QS.addx()">+ Link əlavə et</button></div>'
 +foot('Davam et',"QS.nl()",0,"QS.go('prof')")+'</div></div>';
},

picker:function(){
 var cur=S.exp[S.pickFor]||'';
 var tiles='<button class="pt" aria-pressed="'+(cur==='')+'" onclick="QS.setIcon(\'\')"><div class="ic" style="background:#d4e81f;color:#111">∞</div>Standart</button>'+PL.map(function(p){return'<button class="pt" aria-pressed="'+(cur===p[0])+'" onclick="QS.setIcon(\''+p[0]+'\')">'+icon(p)+p[0]+'</button>'}).join('');
 return'<div class="scr"><div class="col"><div class="top"><button class="bk" onclick="QS.pickBack()" aria-label="Geri">‹</button><div class="pg"><div style="width:50%"></div></div><div class="star">'+QLOGO+'</div></div><div class="body"><h1>Bu link üçün platformanı seç</h1><p class="sub">Yerləşdirdiyin link seçdiyin platformaya aid olmalıdır.</p><div class="pl">'+tiles+'</div></div></div></div>';
},

prof:function(){return'<div class="scr"><div class="col">'+topBar(1)+'<div class="body"><h1>Profil məlumatlarını əlavə et</h1><p class="sub">Bu məlumatlar Qısaget səhifəndə görünəcək.</p><div class="avw"><div class="av'+(S.av?' has':'')+'" id="avp"'+avStyle()+'></div><label for="avf" aria-label="Şəkil yüklə">+</label><input id="avf" type="file" accept="image/*" hidden onchange="QS.av(this)"></div><label class="lab" for="pn">Görünən ad</label><input class="in" id="pn" maxlength="40" style="border-radius:16px;height:52px" value="'+esc(S.name)+'"><label class="lab" for="pb">Bioqrafiya</label><textarea class="in" id="pb" maxlength="160" placeholder="Nə etdiyini bir-iki cümlə ilə yaz" oninput="document.getElementById(\'cn\').textContent=this.value.length+\'/160\'">'+esc(S.bio)+'</textarea><div class="cnt" id="cn">'+S.bio.length+'/160</div></div>'
 +foot('Davam et',"QS.go('theme')")+'</div></div>'},

theme:function(){
 return'<div class="scr"><div class="tcol"><div class="top"><button class="bk" onclick="QS.bk()" aria-label="Geri">‹</button><div class="pg"><div style="width:100%"></div></div><div class="star">'+QLOGO+'</div></div><div class="stage">'+ph(S.th)+'</div><div class="sheet"><div class="sheet-in"><h2>Tema seç</h2><div class="th">'
 +TH.map(function(t,i){return'<button class="tt" aria-pressed="'+(S.th===i)+'" onclick="QS.th('+i+')"><div style="background:'+t.bg+';color:'+t.tx+';--b:'+t.bt+';--d:'+(t.bd||0)+';--s:'+(t.sh||'none')+'">Aa</div>'+t.n+'</button>'}).join('')
 +'</div>'+foot('Davam et',"QS.go('admin')",S.th<0)+'</div></div></div></div>';
}
};

/* ---------- çəkmə və naviqasiya ---------- */
function draw(){
 var s=S.scr,keep=(s===lastScr)?root.scrollTop:0;
 app.innerHTML=SC[s]();
 if(s==='theme')root.style.setProperty('--pg',S.th>-1?TH[S.th].pg:'#ececf0');
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
function go(s){
 if(s==='admin'){finish();return}
 save();S.h.push(S.scr);S.scr=s;savePreorder();draw();root.scrollTop=0;if(s==='user'||s==='code')focusFirst()}
/* Son addım: məlumatı yaz, sonra admin panelə keç. */
function finish(){
 save();
 if(!SB){toast('Demo rejimi: admin panel üçün Supabase qoşulmalıdır.');return}
 var b=$('nx');if(b)b.disabled=true;
 savePreorder().then(function(ok){if(ok)location.href='/admin';else if(b)b.disabled=false});
}
function bk(){save();S.scr=S.h.pop()||'join';draw();root.scrollTop=0}
function toast(m){toastEl.textContent=m;toastEl.hidden=false;clearTimeout(tmr);tmr=setTimeout(function(){toastEl.hidden=true},2600)}
function copy(t,cb){try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){cb(true)},function(){cb(false)});return}}catch(e){}cb(false)}

function openState(st){S=st;lastScr='';toastEl.hidden=true;root.classList.add('open');document.body.style.overflow='hidden';draw();root.scrollTop=0}
function openReg(user){openState(fresh(user));setTimeout(focusFirst,60)}
function closeReg(){root.classList.remove('open');document.body.style.overflow='';clearTimeout(tmr);toastEl.hidden=true}

/* ---------- addım əməliyyatları ---------- */
function chk(){var el=$('em');if(!el)return;var v=el.value.trim();S.email=v;$('nx').disabled=!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v)}
function enter(e){if(e.key==='Enter'){e.preventDefault();var b=$('nx');if(b&&!b.disabled)b.click()}}
var GOOGLE_INTENT='qisaget_google_signup';
function clearGoogleIntent(){try{sessionStorage.removeItem(GOOGLE_INTENT)}catch(e){console.error('Google giriş vəziyyətini silmək alınmadı.',e)}}
function takeGoogleIntent(){
 try{
  var raw=sessionStorage.getItem(GOOGLE_INTENT);if(!raw)return null;
  sessionStorage.removeItem(GOOGLE_INTENT);
  var intent=JSON.parse(raw);
  return{user:clean(intent.username||'')};
 }catch(e){console.error('Google qeydiyyat məlumatını oxumaq alınmadı.',e);return null}
}
function j1(g){
 if(g){
  if(!SB){toast('Google ilə giriş üçün Supabase qoşulmalıdır.');return}
  try{sessionStorage.setItem(GOOGLE_INTENT,JSON.stringify({username:S.user||''}))}
  catch(e){console.error('Google girişinə hazırlıq alınmadı.',e);toast('Google ilə giriş başlatmaq mümkün olmadı. Yenidən cəhd et.');return}
  SB.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/',queryParams:{prompt:'select_account'}}}).then(function(r){
   if(r.error){clearGoogleIntent();console.error('Google OAuth başladıla bilmədi.',r.error);toast('Google ilə giriş başladıla bilmədi: '+r.error.message)}
  }).catch(function(e){clearGoogleIntent();console.error('Google OAuth zamanı xəta oldu.',e);toast('Google ilə giriş alınmadı. Yenidən cəhd et.')});
  return
 }
 go('user')
}
function login(){location.href='/admin'}
function un(){var el=$('un');if(!el)return;var v=clean(el.value);if(v!==el.value)el.value=v;S.user=v;$('nx').className='pill'+(validUser(v)?' go':'');$('e').textContent=''}
function u1(){
 if(!validUser(S.user)){$('e').textContent='İstifadəçi adı ən azı 3 simvol olmalıdır.';return}
 if(!SB){go('code');return}
 var b=$('nx');b.disabled=true;
 SB.rpc('username_taken',{u:S.user}).then(function(r){
  if(r.error)throw r.error;
  if(r.data){var b1=$('nx');if(b1)b1.disabled=false;$('e').textContent='Bu ad artıq götürülüb. Başqa ad seç.';return}
  if(S.uid){go('plan');return}
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
  if(r.error||!r.data||!r.data.user){var b2=$('nx');if(b2)b2.disabled=false;toast('Kod yanlışdır və ya vaxtı bitib.');return}
  return afterVerify(r.data.user.id);
 }).catch(function(){var b3=$('nx');if(b3)b3.disabled=false;toast('Xəta oldu. Bir az sonra yenidən cəhd et.')});
}
/* Kod təsdiqləndi: əvvəlki qeydiyyat varsa onu aç, yoxdursa e-poçt və adı dərhal yaz. */
function afterVerify(uid){
 return SB.from('preorders').select('*').eq('user_id',uid).maybeSingle().then(function(q){
  if(q.error)throw q.error;
  if(q.data){if(q.data.theme!=null){location.href='/admin';return}openState(restore(q.data));return}
  S.uid=uid;
  if(!validUser(S.user)){S.h=[];S.scr='user';draw();root.scrollTop=0;return}
  return SB.from('preorders').upsert(rowData(),{onConflict:'user_id'}).then(function(w){
   if(w.error){
    if(w.error.code==='23505'){S.h=[];S.scr='user';draw();root.scrollTop=0;var e=$('e');if(e)e.textContent='Bu ad artıq götürülüb. Başqa ad seç.';return}
    throw w.error;
   }
   avStore();S.h=[];S.scr='plan';draw();root.scrollTop=0;
  });
 });
}
function rowData(){
 return{user_id:S.uid,email:S.email.toLowerCase(),username:S.user,plan:S.plan,purpose:S.purpose||null,platforms:S.plats,
  links:links().filter(function(l){return l.url}).map(function(l){return{title:l.t,url:l.url,extra:l.ex}}),
  display_name:S.name||null,bio:S.bio||null,theme:S.th>-1?S.th:null};
}
function avStore(){try{if(S.uid&&S.av)localStorage.setItem('qs_av_'+S.uid,S.av)}catch(e){}}
function savePreorder(){
 if(!SB||!S.uid)return Promise.resolve(false);
 avStore();
 return SB.from('preorders').upsert(rowData(),{onConflict:'user_id'}).then(function(r){if(r.error)throw r.error;return true}).catch(function(err){toast(err&&err.code==='23505'?'Bu istifadəçi adı artıq götürülüb.':'Məlumat saxlanmadı. İnternetini yoxla və yenidən cəhd et.');return false});
}
/* Supabase sətrindən qeydiyyat vəziyyətini bərpa et. Yarımçıq qalıbsa, qaldığı addımdan davam edir. */
function restore(row){
 var s=fresh(row.username);
 s.uid=row.user_id;s.email=row.email||'';s.purpose=row.purpose||'';s.plan=row.plan||'Pulsuz';
 s.plats=(row.platforms||[]).filter(function(n){return plat(n)});
 s.name=row.display_name||'';s.bio=row.bio||'';s.th=(row.theme==null)?-1:row.theme;
 var xs=[],xp=[];
 (row.links||[]).forEach(function(l){
  var extra=(l.extra!=null)?l.extra:!(s.plats.indexOf(l.title)>-1&&!s.v[l.title]);
  if(!extra)s.v[l.title]=l.url;else{xs.push(l.url);xp.push(plat(l.title)?l.title:'')}
 });
 s.xn=Math.max(3,xs.length);
 for(var i=0;i<s.xn;i++){s.ex[i]=xs[i]||'';s.exp[i]=xp[i]||''}
 try{s.av=localStorage.getItem('qs_av_'+s.uid)||''}catch(e){}
 var ORD=['plan','purpose','plat','links','prof','theme'];
 s.scr=!s.purpose?'purpose':(!s.plats.length?'plat':(s.th>-1?'theme':'links'));s.h=ORD.slice(0,ORD.indexOf(s.scr));
 return s;
}
function pick(name){S.plan=name;go('purpose')}
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
function vfield(f){var inp=f.querySelector('input'),r=check(f.getAttribute('data-p'),inp.value);f.classList.toggle('bad',!!r.err);f.querySelector('.ferr').textContent=r.err;inp.setAttribute('aria-invalid',r.err?'true':'false');return r.err?inp:null}
function vf(inp){vfield(inp.parentNode)}
function vall(){var first=null;[].forEach.call(root.querySelectorAll('.fld[data-p]'),function(f){var b=vfield(f);if(b&&!first)first=b});if(first){try{first.focus()}catch(e){}}return!first}
function nl(){if(vall())go('prof')}
function pickIcon(i){S.ls=root.scrollTop;S.pickFor=i;go('picker')}
function pickBack(){S.scr=S.h.pop()||'links';draw();root.scrollTop=S.ls||0;[].forEach.call(root.querySelectorAll('.fld[data-p]'),function(f){if(f.querySelector('input').value.trim())vfield(f)})}
function setIcon(n){S.exp[S.pickFor]=n;pickBack()}
function soon(p){toast(p?'Pro planlar tezliklə aktiv olacaq.':'Bu bölmə tezliklə aktiv olacaq.')}

window.QS={go:go,bk:bk,close:closeReg,chk:chk,enter:enter,j1:j1,login:login,un:un,u1:u1,cd:cd,cb:cb,cp:cp,resend:resend,c1:c1,pick:pick,sp:sp,tp:tp,addx:addx,av:av,th:th,soon:soon,vf:vf,nl:nl,pickIcon:pickIcon,setIcon:setIcon,pickBack:pickBack};

/* Qayıdan istifadəçi: sessiyanı və varsa OAuth-dan qayıdan qeydiyyatı bərpa et. */
if(SB){SB.auth.getSession().then(function(r){
 if(r.error)throw r.error;
 var ss=r.data&&r.data.session;
 if(!ss){
  if(new URLSearchParams(location.search).has('error')){
   clearGoogleIntent();openReg();toast('Google ilə giriş alınmadı. Yenidən cəhd et.');
  }
  return
 }
 if(root.classList.contains('open'))return;
 return SB.from('preorders').select('*').eq('user_id',ss.user.id).maybeSingle().then(function(q){
  if(q.error)throw q.error;
  if(root.classList.contains('open'))return;
  if(q.data){clearGoogleIntent();if(q.data.theme!=null)location.href='/admin';else openState(restore(q.data));return}
  var intent=takeGoogleIntent();if(!intent)return;
  var st=fresh(intent.user);st.uid=ss.user.id;st.email=ss.user.email||'';st.scr='join';st.h=[];
  openState(st);
 });
}).catch(function(e){
 console.error('İstifadəçi sessiyasını yoxlamaq alınmadı.',e);
 if(!root.classList.contains('open'))openReg();
 toast('Hesab məlumatını yükləmək alınmadı. Yenidən cəhd et.')
})}

/* ---------- landing ilə əlaqə ---------- */
document.querySelectorAll('.urlfield input').forEach(function(i){i.addEventListener('input',function(){var c=clean(i.value);if(c!==i.value)i.value=c;i.parentElement.classList.remove('err')})});
window.startOnboarding=function(e,f){
 e.preventDefault();
 var i=f.querySelector('.urlfield input'),v=i?clean(i.value):'';
 openReg(validUser(v)?v:'');return false;
};
document.querySelectorAll('a[href="#signup"]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();openReg()})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&root.classList.contains('open'))closeReg()});
})();
