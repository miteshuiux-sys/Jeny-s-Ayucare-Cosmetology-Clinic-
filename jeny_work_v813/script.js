const form=document.getElementById('bookingForm');
if(form){form.addEventListener('submit',(e)=>{e.preventDefault();const data=new FormData(form);const name=data.get('name');const phone=data.get('phone');const service=data.get('service');const note=data.get('note');const msg=`Hello Dr. Jeny's Ayucare Clinic,\n\nI'd like to request an appointment.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nNote: ${note||'—'}\n\nThank you.`;window.open('https://wa.me/918758649191?text='+encodeURIComponent(msg),'_blank','noopener');});}
const toggle=document.querySelector('.menu-toggle');const links=document.querySelector('.nav-links');if(toggle&&links){toggle.addEventListener('click',()=>links.classList.toggle('open'));document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));}

function initSlider(name, options={}){
  const root=document.querySelector(`[data-slider="${name}"]`);if(!root)return;
  const track=root.querySelector('.service-track,.google-review-track,.reel-video-track');if(!track)return;
  const prev=document.querySelector(`[data-slider-prev="${name}"]`),next=document.querySelector(`[data-slider-next="${name}"]`),dotsWrap=document.querySelector(`[data-slider-dots="${name}"]`);
  const cards=[...track.children];let index=0, timer=null;
  const visible=()=>{if(name==='reels') return window.innerWidth<=560?1:window.innerWidth<=800?2:window.innerWidth<=1100?3:4; return window.innerWidth<=600?1:window.innerWidth<=950?2:3;};
  const maxIndex=()=>Math.max(0,cards.length-visible());
  const renderDots=()=>{if(name==='reviews' && dotsWrap){dotsWrap.innerHTML='';return;}const count=maxIndex()+1;if(!dotsWrap)return;dotsWrap.innerHTML='';for(let i=0;i<count;i++){const b=document.createElement('button');b.className='slider-dot'+(i===index?' active':'');b.setAttribute('aria-label',`Go to slide ${i+1}`);b.addEventListener('click',()=>go(i));dotsWrap.appendChild(b);}};
  const go=(nextIndex)=>{index=Math.max(0,Math.min(nextIndex,maxIndex()));const cardWidth=cards[0]?.getBoundingClientRect().width||0;const gap=parseFloat(getComputedStyle(track).gap)||0;track.style.transform=`translateX(-${index*(cardWidth+gap)}px)`;renderDots();};
  const restart=()=>{if(name!=='reviews' && name!=='reels')return;clearInterval(timer);timer=setInterval(()=>go(index>=maxIndex()?0:index+1),5000);};
  prev?.addEventListener('click',()=>{go(index<=0?maxIndex():index-1);restart();});next?.addEventListener('click',()=>{go(index>=maxIndex()?0:index+1);restart();});
  window.addEventListener('resize',()=>{index=Math.min(index,maxIndex());go(index);});
  go(0);restart();
}
initSlider('services');
initSlider('reviews');
initSlider('reels');


// Service category filters
const serviceFilterButtons = document.querySelectorAll('.service-filters button');
const serviceCards = document.querySelectorAll('.service-card[data-category]');
serviceFilterButtons.forEach(btn => btn.addEventListener('click', () => {
  serviceFilterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const category = btn.textContent.trim();
  serviceCards.forEach(card => { card.style.display = (category === 'All Services' || card.dataset.category === category) ? '' : 'none'; });
}));

// Beautiful consultation modal — shared by every appointment CTA.
const popup = document.createElement('div');
popup.className = 'consultation-modal';
popup.innerHTML = `<div class="consultation-backdrop"></div>
<div class="consultation-dialog" role="dialog" aria-modal="true" aria-label="Book a consultation">
  <button class="consultation-close" type="button" aria-label="Close consultation form">×</button>
  <div class="consultation-intro"><div><div class="section-kicker">BOOK A CONSULTATION</div><h3>Book a Consultation</h3><p>Share a few details and we'll continue with you privately on WhatsApp.</p></div></div>
  <form class="consultation-form">
    <div class="consultation-fields">
      <label>Full Name <span>*</span><input name="name" required autocomplete="name" placeholder="Your full name"></label>
      <label>WhatsApp / Phone Number <span>*</span><div class="phone-field"><b>+91</b><input name="phone" required autocomplete="tel" inputmode="tel" placeholder="87586 49191"></div></label>
      <label class="full-field">Consultation Type <span>*</span><div class="consultation-options"><label class="consultation-option"><input type="radio" name="consultationType" value="In-clinic Consultation — ₹499" required><span><strong>In-clinic Consultation</strong><small>₹499 · Visit Dr. Jeny at the clinic</small></span></label><label class="consultation-option"><input type="radio" name="consultationType" value="Online Video Consultation — ₹499"><span><strong>Online Video Consultation</strong><small>₹499 · Consult from home by video</small></span></label></div></label>
      <label class="full-field">Select Service <span>*</span><select name="service" required><option value="">Choose a service</option><option>Skin Care &amp; Medi-Facials (HydraFacial, Carbon Glow)</option><option>Hair Care &amp; PRP / GFC Therapy (Hair Fall &amp; Regrowth)</option><option>Laser Hair Reduction (Painless Diode Laser)</option><option>Panchkarma &amp; Ayurvedic Cosmetology (Lepam, Detox)</option><option>Acne Scar &amp; Dermapen Microneedling</option><option>Melasma &amp; Pigmentation Toning</option><option>Anti-Aging &amp; Skin Tightening (HIFU)</option><option>General Skin &amp; Hair Assessment</option></select></label>
      <label class="full-field upload-field">Add Patient Photos <small>(Optional)</small><div class="upload-box"><input id="patientPhotos" name="photos" type="file" accept="image/png,image/jpeg,image/jpg" multiple><span class="upload-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 16V4m0 0L8 8m4-4 4 4M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg></span><strong>Click to upload or drag &amp; drop photo</strong><em>PNG, JPG or JPEG (Max 10MB) · Kept private</em><b class="upload-name">No photo selected</b><div class="upload-preview" aria-live="polite"></div></div></label>
      <label class="full-field">Skin Or Hair Concern <textarea name="note" rows="2" placeholder="Tell Dr. Jeny briefly about your concern..."></textarea></label>
      <label class="full-field">Preferred Timing <small>(Mon–Sat 10AM–7PM)</small><div class="timing-row"><input type="date" name="date"><select name="time"><option value="">Preferred time</option><option>10:00 AM</option><option>11:00 AM</option><option>12:00 PM</option><option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option><option>4:00 PM</option><option>5:00 PM</option><option>6:00 PM</option><option>7:00 PM</option></select></div></label>
    </div>
    <button class="btn btn-primary consultation-submit" type="submit">Confirm &amp; Send via WhatsApp <span class="arrow-icon">→</span></button>
    <a class="consultation-call" href="tel:+918758649191">Or call reception: <strong>+91 87586 49191</strong></a>
  </form>
</div>`;
document.body.appendChild(popup);
const openPopup = (service='') => { const select=popup.querySelector('[name="service"]'); if(service && [...select.options].some(o=>o.text===service)) select.value=service; else if(service) select.value=''; popup.classList.add('open'); document.body.style.overflow='hidden'; setTimeout(()=>popup.querySelector('[name="name"]').focus(),80); };
const closePopup = () => { popup.classList.remove('open'); document.body.style.overflow=''; };
const stickyConsultation = document.getElementById('stickyConsultation');
stickyConsultation?.addEventListener('click', () => openPopup('General Consultation'));
document.querySelectorAll('.book-now').forEach(btn => btn.addEventListener('click', () => openPopup(btn.dataset.service)));
document.querySelectorAll('.open-consultation').forEach(link => link.addEventListener('click', e => { e.preventDefault(); openPopup(); }));
popup.querySelector('.consultation-close').addEventListener('click', closePopup);
popup.querySelector('.consultation-backdrop').addEventListener('click', closePopup);
popup.querySelector('#patientPhotos').addEventListener('change', e => { const files=[...e.target.files]; const valid=files.filter(f=>f.size<=10*1024*1024 && f.type.startsWith('image/')); const preview=popup.querySelector('.upload-preview'); preview.innerHTML=''; valid.forEach(file=>{ const img=document.createElement('img'); img.alt=file.name; img.title=file.name; img.loading='lazy'; const url=URL.createObjectURL(file); img.src=url; img.onload=()=>URL.revokeObjectURL(url); preview.appendChild(img); }); popup.querySelector('.upload-name').textContent=valid.length ? `${valid.length} photo${valid.length>1?'s':''} selected` : 'No valid photo selected'; preview.hidden=!valid.length; });
popup.querySelector('.consultation-form').addEventListener('submit', e => { e.preventDefault(); const data=new FormData(e.currentTarget); const photoFiles=[...popup.querySelector('#patientPhotos').files].filter(f=>f.size<=10*1024*1024); const date=data.get('date'); const time=data.get('time'); const consultationType=data.get('consultationType'); const msg=`Hello Dr. Jeny's Ayucare Clinic,\n\nI'd like to book a consultation.\n\nName: ${data.get('name')}\nPhone: +91 ${data.get('phone')}\nConsultation: ${consultationType}\nService: ${data.get('service')}\nConcern: ${data.get('note')||'—'}\nPreferred timing: ${date||'Flexible'}${time?' at '+time:''}${photoFiles.length?'\nPatient photos: '+photoFiles.length+' selected (please ask me to share them here).':''}\n\nThank you.`; window.open('https://wa.me/918758649191?text='+encodeURIComponent(msg),'_blank','noopener'); closePopup(); });
document.addEventListener('keydown',e=>{if(e.key==='Escape' && popup.classList.contains('open')) closePopup();});

// Instagram reel player: opens the clinic's public reels surface inside a focused modal.
const reelModal=document.getElementById('reelModal');
const reelFrame=document.getElementById('reelFrame');
const reelOpenLink=document.getElementById('reelOpenLink');
const closeReel=()=>{if(!reelModal)return;reelModal.classList.remove('open');reelModal.setAttribute('aria-hidden','true');if(reelFrame)reelFrame.src='about:blank';document.body.style.overflow='';};
const openReel=(url)=>{if(!reelModal||!reelFrame)return;const clean=url.replace(/\/$/,'');reelFrame.src=clean+'/embed/';reelOpenLink.href=url;reelModal.classList.add('open');reelModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
document.querySelectorAll('.reel-trigger').forEach(card=>card.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();openReel(card.dataset.reelUrl);}));
reelModal?.querySelector('.reel-modal-close')?.addEventListener('click',closeReel);
reelModal?.querySelector('.reel-modal-backdrop')?.addEventListener('click',closeReel);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeReel();});


// v8.4 — reliable video controls: play means play, pause means stop.
// User pauses are never overridden by autoplay/visibility logic.
(function(){
  const videos=[...document.querySelectorAll('video')];
  videos.forEach(video=>{
    video.dataset.userPaused = video.autoplay ? 'false' : 'true';
    video.volume = 1;

    const frame=video.closest('.hero-video-frame, .reel-video-card, .video-only-card');
    const play=frame?.querySelector('.hero-video-toggle, .reel-video-toggle, .video-play-toggle');
    const sound=frame?.querySelector('.reel-sound-toggle');

    const sync=()=>{
      const paused=video.paused;
      if(play){
        play.classList.toggle('is-paused', paused);
        play.setAttribute('aria-pressed', String(!paused));
        play.setAttribute('aria-label', paused ? 'Play video' : 'Pause video');
      }
      if(sound){
        sound.classList.toggle('is-muted', video.muted);
        sound.setAttribute('aria-label', video.muted ? 'Turn sound on' : 'Mute sound');
      }
    };

    const playWithSound = () => {
      video.dataset.userPaused='false';
      video.muted=false;
      video.volume=1;
      const promise=video.play();
      if(promise && promise.catch) promise.catch(()=>{
        // If the browser blocks unmuted playback, keep the video playing muted
        // rather than leaving the control in a false playing state.
        video.muted=true;
        video.play().catch(()=>{});
      });
    };

    if(play){
      play.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        if(video.paused) playWithSound();
        else { video.dataset.userPaused='true'; video.pause(); }
      });
    }

    // Clicking the video itself also toggles play/pause, except when using controls.
    video.addEventListener('click', function(){
      if(video.paused) playWithSound();
      else { video.dataset.userPaused='true'; video.pause(); }
    });

    if(sound){
      sound.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        video.muted=!video.muted;
        if(!video.muted){
          video.volume=1;
          video.dataset.userPaused='false';
          if(video.paused) playWithSound();
        }
        sync();
      });
    }

    video.addEventListener('play',sync);
    video.addEventListener('pause',sync);
    video.addEventListener('volumechange',sync);
    video.addEventListener('ended',function(){
      if(video.loop) return;
      video.currentTime=0;
      video.dataset.userPaused='true';
      sync();
    });
    sync();
  });

  // Reel visibility autoplay: the most visible reel plays automatically;
  // off-screen reels pause. User-paused reels are respected.
  const root=document.querySelector('[data-slider="reels"]');
  const track=root?.querySelector('.reel-video-track');
  if(root && track){
    let activeCard=null;
    const updatePlayback=()=>{
      const rect=root.getBoundingClientRect();
      let best=null,bestRatio=0;
      [...track.children].forEach(card=>{
        const video=card.querySelector('video');
        if(!video) return;
        const r=card.getBoundingClientRect();
        const visible=Math.max(0,Math.min(r.right,rect.right)-Math.max(r.left,rect.left));
        const ratio=visible/Math.max(1,r.width);
        if(ratio>bestRatio){bestRatio=ratio;best=card;}
      });
      [...track.children].forEach(card=>{
        const video=card.querySelector('video');
        if(!video) return;
        if(card===best && bestRatio>.55){
          activeCard=card;
          if(video.dataset.userPaused!=='true' && video.paused) video.play().catch(()=>{});
        }else if(!video.paused){
          video.pause();
        }
      });
    };
    updatePlayback();
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(updatePlayback,{root,threshold:[0,.55,.8]});
      [...track.children].forEach(card=>io.observe(card));
    }
    window.addEventListener('resize',()=>setTimeout(updatePlayback,80));
    document.querySelectorAll('[data-slider-prev="reels"],[data-slider-next="reels"]').forEach(b=>
      b.addEventListener('click',()=>setTimeout(updatePlayback,600))
    );
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){[...track.querySelectorAll('video')].forEach(v=>v.pause());}
      else setTimeout(updatePlayback,120);
    });
  }
})();

// v7.9 — reliable before/after comparison: hover, drag, touch and keyboard
(function(){
  document.querySelectorAll('.ba-compare').forEach(function(root){
    var dragging=false;
    function setPos(clientX){
      var r=root.getBoundingClientRect();
      var pct=((clientX-r.left)/r.width)*100;
      pct=Math.max(0,Math.min(100,pct));
      root.style.setProperty('--ba-position',pct+'%');
      root.setAttribute('aria-valuenow',Math.round(pct));
    }
    root.addEventListener('pointermove',function(e){ if(e.pointerType==='mouse' || dragging) setPos(e.clientX); });
    root.addEventListener('pointerdown',function(e){ dragging=true; root.setPointerCapture?.(e.pointerId); setPos(e.clientX); });
    root.addEventListener('pointerup',function(e){ dragging=false; try{root.releasePointerCapture?.(e.pointerId);}catch(_){} });
    root.addEventListener('pointercancel',function(){dragging=false;});
    root.addEventListener('keydown',function(e){
      var value=Number(root.getAttribute('aria-valuenow'))||50;
      if(e.key==='ArrowLeft'||e.key==='ArrowDown'){e.preventDefault(); value-=5;}
      else if(e.key==='ArrowRight'||e.key==='ArrowUp'){e.preventDefault(); value+=5;}
      else if(e.key==='Home'){e.preventDefault();value=0;}
      else if(e.key==='End'){e.preventDefault();value=100;}
      else return;
      value=Math.max(0,Math.min(100,value)); root.style.setProperty('--ba-position',value+'%'); root.setAttribute('aria-valuenow',value);
    });
    root.style.setProperty('--ba-position','50%');
  });
})();
