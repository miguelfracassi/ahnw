(()=>{
const J=/^\/join\/?(\.html)?$/.test(location.pathname),L=J?[]:[['/','Início'],['/expressoes','Expressões'],['/como-funciona','Como funciona'],['/faq','Dúvidas']],p=location.pathname.replace(/\.html$/,'').replace(/(.)\/$/,'$1');
const FACE=`<svg viewBox="-10 -10 140 140" aria-hidden="true"><defs><radialGradient id="nbg" cx=".35" cy=".3"><stop offset="0" style="stop-color:var(--c1)"/><stop offset="1" style="stop-color:var(--c2)"/></radialGradient><path id="nh" d="M10 18C2 12 0 8 0 5a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 3-2 7-10 13z" fill="#e5195f"/></defs><circle cx="60" cy="60" r="58" fill="#fff"/><circle cx="60" cy="60" r="52" fill="url(#nbg)"/><g fill="none" stroke="#3a2a1a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><g class="nx feliz"><path d="M34 54q7-10 15 0M71 54q7-10 15 0M38 72q22 20 44 0"/></g>
<g class="nx bravo"><path d="M30 42l22 9M90 42l-22 9M42 90q18-16 36 0"/><circle cx="42" cy="62" r="4.5" fill="#3a2a1a" stroke="none"/><circle cx="78" cy="62" r="4.5" fill="#3a2a1a" stroke="none"/><path d="M92 22q6 0 6-6M104 22q-6 0-6-6M92 10q6 0 6 6M104 10q-6 0-6 6" stroke="#d32f2f" stroke-width="3"/></g>
<g class="nx dormindo"><path d="M32 58q8 7 16 0M72 58q8 7 16 0M52 80q8 5 16 0"/><path class="z" d="M94 30h9l-9 11h9" stroke-width="3"/><path class="z z2" d="M104 14h7l-7 9h7" stroke-width="2.5"/></g>
<g class="nx triste"><path d="M31 52l22-8M89 52l-22-8M44 88q16-13 32 0"/><circle cx="42" cy="62" r="4.5" fill="#3a2a1a" stroke="none"/><circle cx="78" cy="62" r="4.5" fill="#3a2a1a" stroke="none"/><path class="tear" d="M84 68q6 9 0 13q-6-4 0-13z" fill="#7fb4ff" stroke="none"/></g>
<g class="nx amando"><use href="#nh" x="31" y="44"/><use href="#nh" x="69" y="44"/><path d="M44 76q16 16 32 0"/><g fill="#ff7ab8" stroke="none" opacity=".6"><ellipse cx="26" cy="74" rx="7" ry="4"/><ellipse cx="94" cy="74" rx="7" ry="4"/></g></g>
<g class="nx surpreso"><circle cx="42" cy="56" r="8" fill="#fff" stroke-width="3"/><circle cx="78" cy="56" r="8" fill="#fff" stroke-width="3"/><circle cx="42" cy="56" r="3.5" fill="#3a2a1a" stroke="none"/><circle cx="78" cy="56" r="3.5" fill="#3a2a1a" stroke="none"/><path d="M32 38q10-6 20 0M68 38q10-6 20 0"/><ellipse cx="60" cy="88" rx="6" ry="8" fill="#3a2a1a"/></g>
<g class="nx rindo"><path d="M34 48l14 6-14 6M86 48l-14 6 14 6"/><path d="M36 70q24 2 48 0q-3 26-24 26t-24-26z" fill="#3a2a1a"/><path d="M48 90q12-9 24 0q-12 7-24 0z" fill="#ff7a8a" stroke="none"/></g>
<g class="nx pensando"><path d="M31 46h20M69 38q10-6 20 0M46 86q10-5 26-2"/><circle cx="44" cy="54" r="4.5" fill="#3a2a1a" stroke="none"/><circle cx="80" cy="50" r="4.5" fill="#3a2a1a" stroke="none"/><g fill="#fff" stroke-width="2.5"><circle cx="98" cy="20" r="3"/><circle cx="107" cy="9" r="4.5"/><circle cx="118" cy="-3" r="6.5"/></g></g>
</g></svg>`;
const MO=['feliz','amando','rindo','surpreso','pensando','triste','bravo','dormindo'];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let cached=null;try{cached=JSON.parse(localStorage.getItem('bup_u')||'null')}catch(e){}
const userHtml=u=>J?'':u?`<div class="um"><button class="ub" type="button" aria-haspopup="true" aria-expanded="false"><b>${esc(u.name[0]||'?').toUpperCase()}</b><span>${esc(u.name.split(' ')[0])}</span></button><div class="dd" hidden><a href="/conta">Minha conta</a><a href="/configuracoes">Configurações</a><a href="/conversar">Conversar com o Bup</a><button type="button" id="sair">Sair</button></div></div>`:`<a class="btn sm" href="/conversar">Entrar</a>`;
const n=document.getElementById('nav');
if(n){n.outerHTML=`<header class="nav"><div class="nin"><a class="brand" href="/" aria-label="Bup, início"><span class="nbf" data-m="feliz">${FACE}</span><span class="logo">BUP</span></a><nav id="mn" aria-label="Principal">${L.map(([h,t])=>`<a href="${h}"${p===h?' aria-current="page"':''}>${t}</a>`).join('')}</nav><div class="nr" id="nr">${userHtml(cached)}</div><button class="burger" type="button" aria-label="Abrir menu" aria-expanded="false"><i></i><i></i></button></div></header>`;
 const f=document.querySelector('.nbf'),xs=[...f.querySelectorAll('.nx')];let i=0;
 const go=m=>{f.dataset.m=m;xs.forEach(g=>g.classList.toggle('on',g.classList.contains(m)))};go('feliz');
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(()=>go(MO[++i%MO.length]),1900);
 const bg=document.querySelector('.burger'),mn=document.getElementById('mn');
 bg.onclick=()=>{const o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
 const wire=()=>{const b=document.querySelector('.ub'),d=document.querySelector('.dd');if(!b)return;
  b.onclick=e=>{e.stopPropagation();d.hidden=!d.hidden;b.setAttribute('aria-expanded',!d.hidden)};
  document.getElementById('sair').onclick=async()=>{await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'logout'})});try{localStorage.removeItem('bup_u')}catch(e){}location.href='/'}};
 document.addEventListener('click',()=>{const d=document.querySelector('.dd');if(d)d.hidden=true});
 wire();
 window.bupUser=J?Promise.resolve(null):fetch('/api/auth',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(d=>{const u=d&&d.user||null;
  try{u?localStorage.setItem('bup_u',JSON.stringify({name:u.name})):localStorage.removeItem('bup_u')}catch(e){}
  document.getElementById('nr').innerHTML=userHtml(u);wire();document.documentElement.classList.toggle('logged',!!u);return u}).catch(()=>null);
}else window.bupUser=Promise.resolve(null);
const f=document.getElementById('foot');if(f&&J)f.outerHTML=`<footer class="lock"><div class="copy">© 2026 Todos os direitos reservados.</div></footer>`;else if(f)f.outerHTML=`<footer><div class="fin"><div><a href="https://ticord.website" target="_blank" rel="noopener"><img src="/assets/ticord.png" alt="Ticord Grupo"></a><p>Bots, sites e automações. Grupo Ticord.</p></div>
<div><h4>Bup</h4>${L.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}<a href="/conversar">Conversar com o Bup</a></div>
<div><h4>Conta</h4><a href="/conta">Minha conta</a><a href="/configuracoes">Configurações</a><a href="/termos">Termos de Serviço</a><a href="/privacidade">Política de Privacidade</a></div>
<div><h4>Contato</h4><a href="https://ticord.website" target="_blank" rel="noopener">ticord.website</a><a href="tel:+5519999894031">(19) 99989-4031</a><a href="mailto:helpticord@gmail.com">helpticord@gmail.com</a></div></div><div class="copy">© 2026 Todos os direitos reservados. Bup é um projeto do Grupo Ticord.</div></footer>`;
})();
