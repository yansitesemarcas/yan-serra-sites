const button=document.getElementById('talk');
const statusEl=document.getElementById('status');
const messages=document.getElementById('messages');
const dot=document.getElementById('dot');
const label=document.getElementById('coreLabel');
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
let rec=null,active=false;
function status(t,on=false){statusEl.textContent=t;document.body.classList.toggle('listening',on);dot.style.background=on?'#72e5ef':'#72e5a3'}
function add(text,who='assistant'){const row=document.createElement('article');row.className='message';const b=document.createElement('b');b.textContent=who==='user'?'VOCÊ':'YG';const p=document.createElement('p');p.textContent=text;row.append(b,p);messages.append(row)}
function speak(text){if(!('speechSynthesis'in window)){status('Voz não suportada neste navegador');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=1.02;u.pitch=1.02;u.onstart=()=>status('Falando');u.onend=()=>status('Sistema pronto');speechSynthesis.speak(u)}
function reply(t){let a='Entendi. Minha conexão com a inteligência artificial ainda não foi configurada. Por enquanto, este protótipo reconhece sua fala e demonstra respostas usando a voz do aparelho.';if(/quem é você|seu nome/i.test(t))a='Sou a Yggdrasil, sua assistente pessoal. Minha inteligência completa ainda está sendo conectada.';else if(/parar|silêncio/i.test(t))a='Entendido. Vou ficar em silêncio até você me chamar novamente.';add(a);speak(a)}
function listen(){if(!SR){status('Abra no Google Chrome e verifique o suporte à voz');add('Este navegador não oferece reconhecimento de fala compatível. Tente o Chrome para Android.');return}rec=new SR();rec.lang='pt-BR';rec.interimResults=false;rec.maxAlternatives=1;rec.onstart=()=>{active=true;status('Ouvindo você…',true);label.textContent='OUVINDO'};rec.onresult=e=>{const t=e.results[0][0].transcript;add(t,'user');status('Processando…');reply(t)};rec.onerror=e=>status(e.error==='not-allowed'?'Permita o acesso ao microfone':'Erro no microfone: '+e.error);rec.onend=()=>{active=false;document.body.classList.remove('listening');label.textContent='ATIVAR'};try{rec.start()}catch(e){status('Aguarde um instante e tente novamente')}}
button.addEventListener('click',()=>{if(active&&rec){rec.stop();return}if('speechSynthesis'in window)speechSynthesis.cancel();listen()});