/* Strategic Web Traffic V11: no cookies, local storage, trackers, third-party requests, or submission backend. */
(function(){
  'use strict';
  const menu=document.getElementById('mobile-menu');
  if(menu){menu.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.open=false}));}
  const addressBtn=document.getElementById('copy-address');
  const addressFeedback=document.getElementById('address-feedback');
  if(addressBtn){
    addressBtn.hidden=false;
    addressBtn.addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText('webtrafficstrategic@gmail.com');addressFeedback.textContent='Email address copied.';}
      catch(_){addressFeedback.textContent='Select the email address above to copy it manually.';}
    });
  }
  const form=document.getElementById('inquiry-form');
  if(!form)return;
  // Inquiry controls intentionally have no HTML form element or network submission route.
  const feedback=document.getElementById('inquiry-feedback');
  const copyBtn=document.getElementById('copy-brief');
  const labels={qr:'QR',email:'Agency email',referral:'Referral',linkedin:'LinkedIn'};
  let source='';
  try{const key=new URLSearchParams(location.search).get('src');source=Object.prototype.hasOwnProperty.call(labels,key)?labels[key]:'';}catch(_){source='';}
  function clean(s,max){return (s||'').replace(/[\r\n]+/g,' ').trim().slice(0,max)}
  function brief(){
    const val=name=>form.querySelector('[name="'+name+'"]')?.value||'';
    const kind=clean(form.querySelector('input[name="kind"]:checked')?.value,40),agency=clean(val('agency'),100),reply=clean(val('reply'),160),details=String(val('details')).trim().slice(0,2500),date=clean(val('deadline'),80);
    const lines=['Work type: '+kind,'Agency / contact: '+(agency||'Not provided'),'Reply-to: '+(reply||'Not provided'),'Target date: '+(date||'To be discussed'),'','Project details / public URLs:',details||'To be discussed','', 'Please confirm your availability, proposed scope and terms before proceeding.'];
    if(source)lines.push('', 'Source: Strategic Web Traffic / '+source);
    return {kind,body:lines.join('\n')};
  }
  const draftBtn=document.getElementById('open-email-draft');
  draftBtn.addEventListener('click',function(){const email=form.querySelector('input[name="reply"]');if(email && !email.checkValidity()){email.reportValidity();return;}const b=brief();const subject='Strategic Web Traffic — '+b.kind+' inquiry';const uri='mailto:webtrafficstrategic@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(b.body);feedback.textContent='Your email application should open a draft. Nothing was submitted here. If it did not open, select “Copy inquiry.”';window.location.href=uri;});
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
  const builder=document.getElementById('brief-builder');
  document.querySelectorAll('a[data-work]').forEach(a=>a.addEventListener('click',()=>{
    const val=a.getAttribute('data-work')==='content'?'SEO content operations':'QA pilot';
    const r=form.querySelector('input[name="kind"][value="'+val+'"]');
    if(r)r.checked=true;
    if(builder)builder.open=true;
  }));
}());