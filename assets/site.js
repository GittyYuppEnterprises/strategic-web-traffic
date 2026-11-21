/* Strategic Web Traffic V10: no cookies, local storage, trackers, third-party requests, or submission backend. */
(function(){
  'use strict';
  const menu=document.getElementById('mobile-menu');
  if(menu){menu.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.open=false}));}
  const form=document.getElementById('inquiry-form');
  if(!form)return;
  const feedback=document.getElementById('inquiry-feedback');
  const copyBtn=document.getElementById('copy-brief');
  const labels={qr:'QR',email:'Agency email',referral:'Referral',linkedin:'LinkedIn'};
  let source='';
  try{const key=new URLSearchParams(location.search).get('src');source=Object.prototype.hasOwnProperty.call(labels,key)?labels[key]:'';}catch(_){source='';}
  function clean(s,max){return (s||'').replace(/[\r\n]+/g,' ').trim().slice(0,max)}
  function brief(){
    const d=new FormData(form),kind=clean(d.get('kind'),40),agency=clean(d.get('agency'),100),reply=clean(d.get('reply'),160),details=String(d.get('details')||'').trim().slice(0,2500),date=clean(d.get('deadline'),80);
    const lines=['Work type: '+kind,'Agency / contact: '+(agency||'Not provided'),'Reply-to: '+(reply||'Not provided'),'Target date: '+(date||'To be discussed'),'','Project details / public URLs:',details||'To be discussed','', 'Please confirm your availability, proposed scope and terms before proceeding.'];
    if(source)lines.push('', 'Source: Strategic Web Traffic / '+source);
    return {kind,body:lines.join('\n')};
  }
  form.addEventListener('submit',function(ev){ev.preventDefault();const b=brief();const subject='Strategic Web Traffic — '+b.kind+' inquiry';const uri='mailto:webtrafficstrategic@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(b.body);feedback.textContent='Your email application should open a draft. Nothing was submitted here. If it did not open, select “Copy inquiry.”';window.location.href=uri;});
  copyBtn.addEventListener('click',async function(){
    const b=brief(),msg='To: webtrafficstrategic@gmail.com\nSubject: Strategic Web Traffic — '+b.kind+' inquiry\n\n'+b.body;
    try{if(!navigator.clipboard||!isSecureContext)throw Error('Clipboard permission unavailable');await navigator.clipboard.writeText(msg);feedback.textContent='Inquiry copied. Paste it into your email app and send it when ready.';}
    catch(_){
      const area=document.createElement('textarea');area.value=msg;area.style.cssText='position:fixed;top:-99999px;left:-99999px';document.body.appendChild(area);area.select();
      try{if(!document.execCommand('copy'))throw Error('Copy blocked');feedback.textContent='Inquiry copied. Paste it into your email app.';}
      catch(_){feedback.textContent='Automatic copy is unavailable. Use the email address shown to the left and paste your project details manually.';}
      finally{area.remove()}
    }
  });
  document.querySelectorAll('a[data-work]').forEach(a=>a.addEventListener('click',()=>{
    const val=a.getAttribute('data-work')==='content'?'SEO content operations':'QA pilot';const r=form.querySelector('input[name="kind"][value="'+val+'"]');if(r)r.checked=true;
  }));
}());