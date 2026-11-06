"""Export the rendered production routes into one offline review file."""
import base64,json,mimetypes,re,sys
from pathlib import Path
from urllib.parse import urlparse,parse_qs,unquote
from lxml import html,etree
repo=Path(__file__).resolve().parents[1]
build=repo/'.next/server/app'
routes={'/':'index.html','/about':'about.html','/craft':'craft.html','/projects':'projects.html','/projects/glyph':'projects/glyph.html','/blog':'blog.html','/blog/building-glyph':'blog/building-glyph.html','/blog/if-you-want-a-good-ui':'blog/if-you-want-a-good-ui.html'}
assets={};by_path={}
def data(path,token=True):
 path=Path(path)
 if token and str(path) in by_path:return by_path[str(path)]
 value='data:'+(mimetypes.guess_type(str(path))[0] or 'application/octet-stream')+';base64,'+base64.b64encode(path.read_bytes()).decode()
 if not token:return value
 key='asset:'+str(len(assets));assets[key]=value;by_path[str(path)]=key;return key
root=html.fromstring((build/'index.html').read_text())
css_paths=set();views={}
for route,filename in routes.items():
 doc=html.fromstring((build/filename).read_text());css_paths.update(l.get('href') for l in doc.xpath('//link[@rel="stylesheet"]'))
 shell=doc.xpath('//*[@data-quiet]')[0]
 for im in shell.xpath('.//img'):
  src=im.get('src','')
  if src.startswith('/_next/image'):src=parse_qs(urlparse(src).query).get('url',[''])[0]
  im.set('data-original-src',src)
  path=repo/'public'/unquote(src).lstrip('/')
  if src.startswith('/') and path.is_file():im.set('src',data(path))
  for attr in ['srcset','sizes']:im.attrib.pop(attr,None)
  im.set('loading','eager')
 for element in shell.xpath('//*[@data-preview-name]'):
  for attr in ['data-preview-logo','data-preview-image']:
   src=element.get(attr,'');path=repo/'public'/src.lstrip('/')
   if src.startswith('/') and path.is_file():element.set(attr,data(path))
 views[route]=etree.tostring(shell,method='html',encoding='unicode')
css='\n'.join((repo/str(p).lstrip('/').replace('_next/','.next/',1)).read_text() for p in sorted(css_paths))
def font(m):
 name=m.group(1).strip('"\'').split('/')[-1];path=repo/'.next/static/media'/name
 return 'url('+data(path,False)+')' if path.is_file() else m.group(0)
css=re.sub(r'url\(([^)]+)\)',font,css)
css=css.replace('[src*=', '[data-original-src*=')
classes={k:v for v,k in re.findall(r'\.((?:Quiet)_([A-Za-z0-9]+)__[A-Za-z0-9_-]+)',css)}
script=r'''
const A=ASSETS,V=VIEWS,C=CLASSES,app=document.getElementById('app'),cn=k=>C[k],q=k=>app.querySelector('.'+cn(k)),hydrate=s=>s.replace(/asset:\d+/g,k=>A[k]||k);
let route='/',greeting=0,greetingTimer=null,snakeEngine=null,pageMotion=null,popup=null,trigger=null,touch=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),system=matchMedia('(prefers-color-scheme: dark)');
function theme(value){document.documentElement.classList.toggle('dark',value==='dark');document.documentElement.style.colorScheme=value}
let saved;try{saved=localStorage.getItem('theme')}catch{}theme(saved||(system.matches?'dark':'light'));
system.addEventListener('change',()=>{let value;try{value=localStorage.getItem('theme')}catch{}if(!value)theme(system.matches?'dark':'light')});
function dismiss(){const closing=popup,previous=trigger;popup=null;trigger=null;touch=false;previous?.querySelector('button')?.setAttribute('aria-expanded','false');closing?.remove()}
function navigate(r,anchor){dismiss();snakeEngine?.destroy();pageMotion?.();route=V[r]?r:'/';app.innerHTML=hydrate(V[route]);const activity=app.querySelector('[data-github-activity]');snakeEngine=activity?createQuietSnake(activity):null;pageMotion=revealQuietPage(app);greeting=0;clearInterval(greetingTimer);if(route==='/')greetingTimer=setInterval(()=>{if(!reduced.matches&&!document.hidden){greeting=(greeting+1)%3;setGreeting(greeting)}},3000);document.title=(route==='/'?'Sumit Sharma':route.split('/').filter(Boolean).at(-1).replaceAll('-',' '))+' — Portfolio';scrollTo(0,0);if(anchor)requestAnimationFrame(()=>document.getElementById(anchor)?.scrollIntoView())}
function fromHash(){const [r,a]=location.hash.slice(1).split('~');navigate(!r||r==='home'?'/':'/'+r,a)}
function go(r,a){const h=(r==='/'?'home':r.slice(1))+(a?'~'+a:'');if(location.hash.slice(1)===h)navigate(r,a);else location.hash=h}
addEventListener('hashchange',fromHash);fromHash();
function tag(name,cls,text){const el=document.createElement(name);if(cls)el.className=cn(cls);if(text)el.textContent=text;return el}
function show(el,isTouch=false){dismiss();trigger=el;touch=isTouch;const d=el.dataset,a=el.getBoundingClientRect(),col=app.querySelector('main').getBoundingClientRect(),vp=document.documentElement.clientWidth,side=vp-col.right-38>=280,w=Math.min(320,side?vp-col.right-38:vp-32),height=d.previewImage?w/1.6+82:245,left=side?col.right+22:Math.max(16,Math.min(a.left,vp-w-16)),desired=side?a.top-height/3:a.top-height-12,top=Math.max(16,Math.min(desired>=16?desired:a.bottom+12,innerHeight-height-16));popup=tag('span','hoverPreview');popup.dataset.previewPopup='';if(touch)popup.classList.add(cn('touchPreview'));else popup.setAttribute('aria-hidden','true');Object.assign(popup.style,{left:left+'px',top:top+'px',width:w+'px'});
if(touch){const b=tag('button','closePreview','×');b.type='button';b.setAttribute('aria-label','Close preview');b.dataset.closePreview='';popup.append(b);el.querySelector('button')?.setAttribute('aria-expanded','true')}
if(d.previewImage){const frame=tag('span','previewImage'),img=document.createElement('img');img.src=d.previewImage;img.alt=d.previewName+' preview';Object.assign(img.style,{position:'absolute',inset:'0',width:'100%',height:'100%'});frame.append(img);popup.append(frame)}else{const identity=tag('span','namePreview');if(d.previewLogo){const im=document.createElement('img');im.src=d.previewLogo;im.width=28;im.height=28;im.alt='';identity.append(im)}identity.append(tag('strong',null,d.previewName),tag('small',null,d.previewNote||(d.previewHref.startsWith('http')?new URL(d.previewHref).hostname:'Project preview')));popup.append(identity)}
const label=tag('span','previewLabel'),names=tag('span');names.append(tag('strong',null,d.previewName),tag('small',null,d.previewHandle?'@'+d.previewHandle:d.previewHref.startsWith('http')?new URL(d.previewHref).hostname:d.previewNote||'Project notes'));label.append(names);if(touch){const link=tag('a',null,'↗');link.href=d.previewHref;link.setAttribute('aria-label','Open '+d.previewName);if(d.previewHref.startsWith('http')){link.target='_blank';link.rel='noreferrer'}label.append(link)};if(d.previewImage||d.previewHandle||touch)popup.append(label);app.querySelector('[data-quiet]').append(popup)}
app.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const el=e.target.closest('[data-preview-name]');if(el&&!el.contains(e.relatedTarget))show(el)});
app.addEventListener('pointerout',e=>{const el=e.target.closest('[data-preview-name]');if(el&&!el.contains(e.relatedTarget)&&!el.contains(document.activeElement)&&!touch)dismiss()});
app.addEventListener('focusin',e=>{const el=e.target.closest('[data-preview-name]');if(el&&e.target.tagName==='A'&&e.target.matches(':focus-visible')&&matchMedia('(hover:hover) and (pointer:fine)').matches)show(el)});
app.addEventListener('focusout',e=>{const el=e.target.closest('[data-preview-name]');if(el&&!el.contains(e.relatedTarget)&&!popup?.contains(e.relatedTarget))dismiss()});
document.addEventListener('pointerdown',e=>{if(trigger&&!trigger.contains(e.target)&&!popup?.contains(e.target))dismiss()});
app.addEventListener('click',async e=>{if(e.target.closest('[data-close-preview]')){const button=trigger?.querySelector('button');dismiss();button?.focus();return}const preview=e.target.closest('.'+cn('brandPreviewTrigger'));if(preview){const el=preview.closest('[data-preview-name]');if(el===trigger&&touch)dismiss();else show(el,true);return}if(e.target.closest('button[aria-label="Toggle colour theme"]')){const value=document.documentElement.classList.contains('dark')?'light':'dark';theme(value);try{localStorage.setItem('theme',value)}catch{}return}if(e.target.closest('button[aria-label="Copy email address"]')){const status=q('copyStatus');try{await navigator.clipboard.writeText('sumitsharma9128@gmail.com');status.textContent='Copied'}catch{status.textContent='Couldn’t copy. Use the email link.'}setTimeout(()=>status.textContent='',3000);return}const a=e.target.closest('a');if(!a)return;const h=a.getAttribute('href');if(h.startsWith('/')){e.preventDefault();const [r,anchor]=h.split('#');go(r||'/',anchor)}else if(h.startsWith('#')){e.preventDefault();document.getElementById(h.slice(1))?.scrollIntoView()}});
addEventListener('keydown',e=>{if(e.key==='Escape'){const b=touch?trigger?.querySelector('button'):null;dismiss();b?.focus();if(e.target.type==='search'){e.target.value='';e.target.dispatchEvent(new Event('input',{bubbles:true}))}}});
addEventListener('scroll',dismiss,{passive:true});addEventListener('resize',dismiss);
function setGreeting(i){app.querySelectorAll('.'+cn('greetingWord')).forEach((w,n)=>w.classList.toggle(cn('greetingActive'),n===i))}
reduced.addEventListener('change',()=>{greeting=0;setGreeting(0)});

'''
script=script+'\n'+(repo/'src/lib/quiet-snake.js').read_text().replace('export function','function')
script=script.replace('ASSETS',json.dumps(assets)).replace('VIEWS',json.dumps(views,ensure_ascii=False).replace('</script','<\\/script')).replace('CLASSES',json.dumps(classes))
out=Path(sys.argv[1] if len(sys.argv)>1 else 'Sumit-Portfolio-Live.html').resolve()
out.write_text('<!doctype html><html lang="en" class="'+root.get('class','')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sumit Sharma — Quiet portfolio</title><style>'+css+'\nhtml,body{margin:0;background:#faf8f3}html.dark,html.dark body{background:#000}[hidden]{display:none!important}</style></head><body><div id="app"></div><script>'+script+'</script></body></html>')
print(str(out),out.stat().st_size,'bytes',len(views),'routes')
