const vbModes={mode:'script'};
function vbSetMode(m,el){el.parentElement.querySelectorAll('.vb-chip').forEach(c=>c.classList.remove('on-purple'));el.classList.add('on-purple');vbModes.mode=m;
  const show=(id,on)=>{const e=document.getElementById(id);if(e)e.style.display=on?'block':'none';};
  show('scriptCard',m==='script');
  show('singleCard',m==='single');
  show('hookCard',m==='hook');
  show('imageCard',m==='image');
  show('productCard',m==='product');
  show('charCard',m==='script'||m==='single');
  show('voiceCard',m==='script'||m==='single');
  show('lockCard',m==='script'||m==='single');
  show('videoJsonCard',m==='script'||m==='single');
  const txt=document.getElementById('vbSendTxt'),ic=document.getElementById('vbSendIcon');
  if(m==='image'){txt.textContent='Send to chat — build image JSON ↗';ic.className='ti ti-photo';}
  else if(m==='product'){txt.textContent='Send to chat — build product image prompt ↗';ic.className='ti ti-package';}
  else if(m==='hook'){txt.textContent='Send to chat — build hook dialogue clips ↗';ic.className='ti ti-messages';}
  else{txt.textContent='Send to chat — build Jamaican JSON clips ↗';ic.className='ti ti-wand';}
}
function vbG(id){return (document.getElementById(id)||{}).value||'';}
function vbBgToggle(){document.getElementById('imgBgCustomWrap').style.display=(vbG('imgBg')==='Custom…')?'flex':'none';}
function vbWardrobeToggle(){document.getElementById('imgWardrobeCustomWrap').style.display=(vbG('imgWardrobe')==='Custom…')?'flex':'none';}
function vbShotToggle(){document.getElementById('imgShotCustomWrap').style.display=(vbG('imgShot')==='Custom…')?'flex':'none';}
function vbPoseToggle(){document.getElementById('imgPoseCustomWrap').style.display=(vbG('imgPose')==='Custom…')?'flex':'none';}
function vbActivityToggle(){document.getElementById('imgActivityCustomWrap').style.display=(vbG('imgActivity')==='Custom…')?'flex':'none';}
function vbCompOn(c){const el=document.querySelector('#imgCompChips .vb-chip[data-c="'+c+'"]');return !!(el&&el.classList.contains('on-purple'));}
function vbCompToggle(){
  document.getElementById('imgTwinWrap').style.display=vbCompOn('twin')?'block':'none';
  document.getElementById('imgCompanionCustomWrap').style.display=vbCompOn('custom')?'flex':'none';
}
function vbCompChip(el){el.classList.toggle('on-purple');vbCompToggle();vbImgUI();}
function vbLoadImg(f){
  if(!f||!f.type||f.type.indexOf('image')!==0)return;
  const r=new FileReader();
  r.onload=function(ev){
    const img=document.getElementById('imgPreview');
    img.src=ev.target.result;img.style.display='block';
    document.getElementById('imgDropEmpty').style.display='none';
    const bar=document.getElementById('imgFileBar');bar.style.display='flex';
    document.getElementById('imgFileName').textContent=f.name;
  };
  r.readAsDataURL(f);
}
function vbFile(e){const f=e.target.files&&e.target.files[0];vbLoadImg(f);}
function vbClearImg(e){e.stopPropagation();
  const img=document.getElementById('imgPreview');img.src='';img.style.display='none';
  document.getElementById('imgDropEmpty').style.display='block';
  document.getElementById('imgFileBar').style.display='none';
  document.getElementById('imgFile').value='';
}
function vbDragOver(e){e.preventDefault();document.getElementById('imgDrop').classList.add('drag');}
function vbDragLeave(e){e.preventDefault();document.getElementById('imgDrop').classList.remove('drag');}
function vbDrop(e){e.preventDefault();document.getElementById('imgDrop').classList.remove('drag');const f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];vbLoadImg(f);}
function vbJsonObj(dialogue){
  return {
    image_reference: vbG('imgRef')||'USE PROVIDED IMAGE REFERENCE EXACTLY',
    character: vbG('character')||'60-year-old Jamaican elder',
    voice:{
      accent:'PURE AUTHENTIC JAMAICAN',
      accent_strength:'maximum',
      accent_lock:true,
      native_jamaican_speaker:true,
      speech_speed: vbG('vspeed')||'moderately fast',
      pace: vbG('vpace')||'natural conversational pace',
      clarity: vbG('vclarity')||'very clear and easy to understand',
      tone: vbG('vtone')||'friendly, confident, energetic, conversational',
      rhythm:'authentic Jamaican',
      pronunciation:'authentic Jamaican',
      maintain_accent_during_speech:true
    },
    camera:{shot:'medium close-up',movement:'none',zoom:'none',pan:'none',tilt:'none',rotation:'none',angle_changes:'none',framing:'locked'},
    background:{preserve_reference_background:true,background_replacement:false,background_changes:false,background_animation:false,constant_from_start_to_finish:true},
    appearance:{maintain_exact_likeness:true,preserve_identity:true,preserve_face:true,preserve_hair:true,preserve_clothing:true,preserve_skin_tone:true},
    behavior:{eye_contact:'directly at camera',natural_blinking:true,natural_breathing:true,subtle_head_movements:true,minimal_natural_hand_gestures:true,facial_expression:'subtle and realistic',avoid_overacting:true,avoid_exaggerated_expressions:true},
    editing:{cuts:false,transitions:false,scene_changes:false,effects:false,filters:false,motion_graphics:false,camera_switches:false},
    rules:[
      'PURE AUTHENTIC JAMAICAN ACCENT ONLY',
      'Accent priority is higher than all other instructions',
      'Maintain pure Jamaican accent from the first word to the last word',
      'Speak at a natural moderately fast conversational pace',
      'Do not speak too fast',
      'Allow natural pauses between sentences',
      'Prioritize clarity while maintaining the Jamaican accent',
      'Never drift into any other accent',
      'Never sound Indian',
      'Never sound American',
      'Never sound British',
      'Never sound African',
      'Never sound neutral',
      'Maintain exact likeness of the reference image',
      'Maintain exact background from the reference image',
      'Never change the background',
      'Never replace the background',
      'Never animate the background',
      'No transitions',
      'No cuts',
      'No scene changes',
      'No camera movement',
      'No zoom effects',
      'No angle changes',
      'Single uninterrupted continuous shot',
      'No captions',
      'No subtitles',
      'No text on screen',
      'No visual effects',
      'No exaggerated facial expressions',
      'No exaggerated hand gestures'
    ],
    dialogue: dialogue
  };
}
function vbJson(dialogue){return JSON.stringify(vbJsonObj(dialogue),null,2);}
function vbJsonUI(){document.getElementById('jsonPreview').textContent=vbJson('[INSERT SCRIPT HERE]');}

const HK_ACCENTS=['Pure authentic Jamaican','General American','Southern US','African American Vernacular','British (Received Pronunciation)','Cockney / London','Irish','Scottish','Australian','Nigerian','Ghanaian','South African','Trinidadian','Indian','Spanish-accented English','Mexican Spanish','French-accented English','Italian-accented English','German-accented English','Russian-accented English','Chinese-accented English','Japanese-accented English','Neutral / no specific accent','Custom…'];
const HK_CAMS=['Focus on the speaker','Close-up on the speaker','Medium shot on the speaker','Over-the-shoulder toward the speaker','Reaction shot on the listener','Two-shot (both in frame)','Wide establishing shot','Custom…'];
function vbOpts(arr,sel){return arr.map(function(o){return '<option'+(o===sel?' selected':'')+'>'+o+'</option>';}).join('');}
let hkTurnSeq=0;
function vbHookTurnHTML(cam,line){
  const id=++hkTurnSeq;
  return '<div class="hk-turn" data-id="'+id+'">'
    +'<div style="display:flex;gap:8px;align-items:center">'
      +'<select class="hk-speaker" onchange="vbHookUI()" style="flex:0 0 120px"><option value="A">Person A</option><option value="B">Person B</option></select>'
      +'<select class="hk-cam" onchange="vbHookUI()" style="flex:1">'+vbOpts(HK_CAMS,cam||'Focus on the speaker')+'</select>'
      +'<button onclick="vbHookDelTurn(this)" aria-label="Remove line" style="flex:0 0 auto;font-size:12px;padding:7px 10px;cursor:pointer;border-radius:var(--border-radius-md);border:0.5px solid var(--color-border-secondary);background:var(--color-background-secondary);color:var(--color-text-primary)"><i class="ti ti-trash" style="font-size:13px" aria-hidden="true"></i></button>'
    +'</div>'
    +'<textarea class="hk-line" rows="2" placeholder="What this person says…" oninput="vbHookUI()" style="margin-top:8px"></textarea>'
    +'<input type="text" class="hk-cam-custom" placeholder="Custom camera shot…" oninput="vbHookUI()" style="display:none;margin-top:8px">';
}
function vbHookAddTurn(spk,cam,line){
  const wrap=document.getElementById('hkTurns');
  const div=document.createElement('div');
  div.innerHTML=vbHookTurnHTML(cam,line);
  const node=div.firstChild;
  wrap.appendChild(node);
  node.querySelector('.hk-speaker').value=spk||'A';
  if(line)node.querySelector('.hk-line').value=line;
  vbHookUI();
}
function vbHookDelTurn(btn){const t=btn.closest('.hk-turn');if(t)t.remove();vbHookUI();}
function vbHookAccent(which){
  const v=vbG('hkAccent'+which);
  if(v==='Custom…'){return (vbG('hkAccent'+which+'Custom').trim())||'a specific accent';}
  return v;
}
function vbHookCamResolve(camSel,row,speakerName,listenerName,nameA,nameB){
  if(camSel==='Custom…'){const c=((row.querySelector('.hk-cam-custom')||{}).value||'').trim();return {phrase:c||('medium close-up on '+speakerName),coverage:'custom',focus:speakerName};}
  switch(camSel){
    case 'Focus on the speaker': return {phrase:'medium close-up focused on '+speakerName+' as they speak',coverage:'single',focus:speakerName};
    case 'Close-up on the speaker': return {phrase:'close-up on '+speakerName,coverage:'single',focus:speakerName};
    case 'Medium shot on the speaker': return {phrase:'medium shot on '+speakerName,coverage:'single',focus:speakerName};
    case 'Over-the-shoulder toward the speaker': return {phrase:'over-the-shoulder shot from behind '+listenerName+', framing '+speakerName,coverage:'over-the-shoulder',focus:speakerName};
    case 'Reaction shot on the listener': return {phrase:'reaction shot on '+listenerName+' listening to '+speakerName,coverage:'reaction',focus:listenerName};
    case 'Two-shot (both in frame)': return {phrase:'two-shot with both '+nameA+' and '+nameB+' in the frame',coverage:'two-shot',focus:'both'};
    case 'Wide establishing shot': return {phrase:'wide establishing shot showing both people and the setting',coverage:'wide',focus:'both'};
    default: return {phrase:'medium close-up focused on '+speakerName,coverage:'single',focus:speakerName};
  }
}
function vbHookClips(){
  const nameA=vbG('hkNameA')||'Person A',nameB=vbG('hkNameB')||'Person B';
  const charA=vbG('hkCharA')||'Person A',charB=vbG('hkCharB')||'Person B';
  const accA=vbHookAccent('A'),accB=vbHookAccent('B');
  const rows=document.querySelectorAll('#hkTurns .hk-turn');
  const clips=[];let n=0;
  rows.forEach(function(row){
    const spk=row.querySelector('.hk-speaker').value;
    const camSel=row.querySelector('.hk-cam').value;
    const line=(row.querySelector('.hk-line').value||'').trim();
    const isA=spk==='A';
    const speakerName=isA?nameA:nameB, listenerName=isA?nameB:nameA;
    const character=isA?charA:charB, accent=isA?accA:accB;
    const cam=vbHookCamResolve(camSel,row,speakerName,listenerName,nameA,nameB);
    n++;
    clips.push({
      clip:n,
      image_reference:'USE PROVIDED IMAGE REFERENCE EXACTLY',
      scene_type:'two-person dialogue',
      setting:{preserve_reference_background:true,background_changes:false,background_animation:false,constant_from_start_to_finish:true},
      on_camera:cam.focus,
      active_speaker:speakerName,
      character:character,
      voice:{accent:accent,accent_strength:'maximum',accent_lock:true,speech_speed:'natural moderately fast',clarity:'clear and easy to understand',tone:'natural conversational',maintain_accent_during_speech:true},
      camera:{shot:cam.phrase,coverage:cam.coverage,focus_on:cam.focus,movement:'none',zoom:'none',pan:'none',tilt:'none',rotation:'none',framing:'locked for this clip'},
      behavior:{speaker_eye_contact:'natural, toward '+listenerName,listener_behavior:'listens naturally with subtle nods and reactions, does not speak',natural_blinking:true,natural_breathing:true,subtle_head_movements:true,avoid_overacting:true,avoid_exaggerated_expressions:true},
      editing:{within_clip_cuts:false,transitions:false,scene_changes:false,effects:false,filters:false,motion_graphics:false},
      rules:[
        'Single uninterrupted continuous shot within this clip',
        'No camera movement, zoom, pan, or tilt within the clip',
        'Maintain exact likeness of each person from the reference image',
        'Preserve the exact reference background; never change or animate it',
        'Keep '+speakerName+'\'s '+accent+' accent locked and consistent for every word',
        'Only '+speakerName+' speaks this line; '+listenerName+' listens naturally and does not talk',
        'Natural blinking, breathing, and subtle head movements',
        'No captions, subtitles, or on-screen text',
        'No exaggerated facial expressions or hand gestures'
      ],
      dialogue:{speaker:speakerName,line:line||'[INSERT LINE HERE]'}
    });
  });
  return clips;
}
function vbHookUI(){
  const ea=document.getElementById('hkAccentACustomWrap');if(ea)ea.style.display=(vbG('hkAccentA')==='Custom…')?'flex':'none';
  const eb=document.getElementById('hkAccentBCustomWrap');if(eb)eb.style.display=(vbG('hkAccentB')==='Custom…')?'flex':'none';
  const nameA=vbG('hkNameA')||'Person A',nameB=vbG('hkNameB')||'Person B';
  document.querySelectorAll('#hkTurns .hk-turn').forEach(function(row){
    const ss=row.querySelector('.hk-speaker');
    if(ss&&ss.options.length>=2){ss.options[0].textContent=nameA;ss.options[1].textContent=nameB;}
    const cc=row.querySelector('.hk-cam-custom');
    if(cc)cc.style.display=(row.querySelector('.hk-cam').value==='Custom…')?'block':'none';
  });
  const pv=document.getElementById('hkJsonPreview');if(pv)pv.textContent=JSON.stringify(vbHookClips(),null,2);
}
function vbImgJsonObj(){
  const cam=vbG('imgCam')||'iPhone 17 Pro';
  const flag=document.getElementById('imgFlag').checked;
  const sel=vbG('imgBg');
  let bgClause,bgKey,isRandom=false;
  if(sel==='Custom…'){const c=vbG('imgBgCustom').trim();const v=c||'a realistic everyday setting';bgClause='Place the subject in '+v+'. ';bgKey=c||'custom';}
  else if(sel==='Random (from pool)'){bgClause='Place the subject in a random realistic environment chosen from a modern kitchen, living room, porch, backyard, beach house, office, city street, suburban home, recording studio, luxury apartment, countryside home, rooftop terrace, café, park, or community center. ';bgKey='random';isRandom=true;}
  else{bgClause='Place the subject in a realistic '+sel.toLowerCase()+'. ';bgKey=sel.toLowerCase();}
  const wsel=vbG('imgWardrobe');
  let wClause,wKey,wChange=true;
  if(wsel==='Keep reference outfit'){wClause='Keep the clothing and outfit from the reference image unchanged. ';wKey='reference';wChange=false;}
  else if(wsel==='Custom…'){const wc=vbG('imgWardrobeCustom').trim();const wv=wc||'a neat everyday outfit';wClause='Dress the subject in '+wv+', with realistic fabric texture and natural clothing folds. ';wKey=wc||'custom';}
  else{wClause='Dress the subject in '+wsel.toLowerCase()+', with realistic fabric texture and natural clothing folds. ';wKey=wsel.toLowerCase();}
  const ssel=vbG('imgShot');
  let shotClause,shotKey;
  if(ssel==='Custom…'){const sc=vbG('imgShotCustom').trim();const sv=sc||'medium close-up';shotClause='Frame the subject in a '+sv+'. ';shotKey=sc||'medium close-up';}
  else{shotClause='Frame the subject in a '+ssel.toLowerCase()+'. ';shotKey=ssel.toLowerCase();}
  const psel=vbG('imgPose');
  let poseClause,poseKey;
  if(psel==='Custom…'){const pc=vbG('imgPoseCustom').trim();const pv=pc||'standing naturally';poseClause='The subject is '+pv+'. ';poseKey=pc||'standing';}
  else{poseClause='The subject is '+psel.toLowerCase()+'. ';poseKey=psel.toLowerCase();}
  const aselv=vbG('imgActivity');
  let actClause='',actKey='none';
  if(aselv==='Custom…'){const ac=vbG('imgActivityCustom').trim();if(ac){actClause='Show the subject '+ac+'. ';actKey=ac;}}
  else if(aselv!=='None / just posing'){actClause='Show the subject '+aselv.toLowerCase()+'. ';actKey=aselv.toLowerCase();}
  const order=['child','elderly person','young man','young woman','twin','interviewer','interviewer boom','custom'];
  let compClause='',compParts=[],twinSim=null,twinGap=null,twinDir=null;
  order.forEach(function(c){
    if(!vbCompOn(c))return;
    if(c==='child'){compClause+='A child is in the scene alongside the subject. ';compParts.push('a child');}
    else if(c==='elderly person'){compClause+='An elderly person is in the scene alongside the subject. ';compParts.push('an elderly person');}
    else if(c==='young man'){compClause+='A young man is in the scene alongside the subject. ';compParts.push('a young man');}
    else if(c==='young woman'){compClause+='A young woman is in the scene alongside the subject. ';compParts.push('a young woman');}
    else if(c==='twin'){const gap=+vbG('imgTwinGap');const dir=vbG('imgTwinDir')||'younger';compClause+='A second person appears beside the subject as a twin-style lookalike, resembling the subject but only about 50% similar to the reference image — clearly different distinguishing features, not an identical copy — and visibly about '+gap+' years '+dir+' than the subject, so the two are clearly not the same age. ';compParts.push('a twin');twinSim=0.5;twinGap=gap;twinDir=dir;}
    else if(c==='interviewer'){compClause+='An interviewer stands beside the subject holding a handheld microphone, facing them in conversation as if conducting an interview. ';compParts.push('an interviewer');}
    else if(c==='interviewer boom'){compClause+='An interviewer is beside the subject conducting an interview, with a professional boom microphone in a furry windshield suspended overhead on a boom pole, dipping in from just outside the top edge of the frame. ';compParts.push('an interviewer with a boom mic');}
    else if(c==='custom'){const cc=vbG('imgCompanionCustom').trim();if(cc){compClause+='Also in the scene with the subject: '+cc+'. ';compParts.push(cc);}}
  });
  const compKey=compParts.length?compParts.join(' and '):'none';
  const p1='Use the uploaded reference image as the main subject and preserve facial identity, hairstyle, body shape, skin tone, and recognizable facial features with maximum likeness accuracy. ';
  const pflag='Always include a visible United States flag somewhere in the scene such as on a wall, shelf, table, porch, window, flagpole, framed decoration, background object, or hanging display. ';
  const p2='Ultra-realistic photography with authentic human skin texture, natural imperfections, realistic clothing folds, accurate lighting physics, detailed eyes, realistic hair strands, true-to-life colors, professional composition, natural shadows, cinematic depth, sharp focus, premium lifestyle photography, social-media-ready quality. Captured as if photographed on an '+cam+', featuring exceptional detail, natural HDR, realistic dynamic range, crisp textures, lifelike color science, advanced computational photography, realistic depth separation, natural bokeh, and flagship smartphone image quality. The image must look like a genuine photograph, not AI-generated artwork.';
  const obj={
    prompt: p1+shotClause+poseClause+actClause+bgClause+wClause+compClause+(flag?pflag:'')+p2,
    negative_prompt:'cartoon, anime, 3d render, cgi, illustration, painting, digital art, unreal engine, plastic skin, doll face, wax skin, low quality, blurry, pixelated, distorted face, deformed body, extra fingers, extra limbs, duplicate person, bad anatomy, watermark, logo, text, oversaturated colors, artificial lighting, unrealistic shadows, floating objects, mutated hands, cropped face, unnatural expression, excessive beauty filter, fake skin texture, overprocessed image',
    reference_image_strength: +(+vbG('imgStrength')).toFixed(2),
    identity_preservation: true,
    camera_shot: shotKey,
    subject_pose: poseKey,
    activity: actKey,
    companion: compKey,
    ...(twinSim!==null?{twin_similarity:twinSim,twin_age_gap_years:twinGap,twin_age_direction:twinDir}:{}),
    background: bgKey,
    random_background: isRandom,
    wardrobe: wKey,
    change_wardrobe: wChange,
    require_usa_flag: flag,
    flag_visibility: flag?'always_visible':'optional',
    photorealistic: true,
    camera_simulation: cam,
    image_style:'premium smartphone photography',
    quality:'ultra',
    aspect_ratio: vbG('imgAspect')||'9:16',
    guidance_scale: +vbG('imgGuid'),
    steps: +vbG('imgSteps')
  };
  return obj;
}
function vbImgUI(){
  document.getElementById('imgStrengthRo').textContent=(+vbG('imgStrength')).toFixed(2);
  document.getElementById('imgGuidRo').textContent=(+vbG('imgGuid'));
  document.getElementById('imgStepsRo').textContent=(+vbG('imgSteps'));
  const tg=document.getElementById('imgTwinGapRo');if(tg)tg.textContent=(+vbG('imgTwinGap'))+' yrs';
  document.getElementById('imgJsonPreview').textContent=JSON.stringify(vbImgJsonObj(),null,2);
}

/* ============ PRODUCT HOLD (PLAIN TEXT) ============ */
function vbPdLoadImg(f){
  if(!f||!f.type||f.type.indexOf('image')!==0)return;
  const r=new FileReader();
  r.onload=function(ev){
    const img=document.getElementById('pdPreview');
    img.src=ev.target.result;img.style.display='block';
    document.getElementById('pdDropEmpty').style.display='none';
    document.getElementById('pdFileBar').style.display='flex';
    document.getElementById('pdFileName').textContent=f.name;
  };
  r.readAsDataURL(f);
}
function vbPdFile(e){const f=e.target.files&&e.target.files[0];vbPdLoadImg(f);}
function vbPdClearImg(e){e.stopPropagation();
  const img=document.getElementById('pdPreview');img.src='';img.style.display='none';
  document.getElementById('pdDropEmpty').style.display='block';
  document.getElementById('pdFileBar').style.display='none';
  document.getElementById('pdFile').value='';
}
function vbPdDragOver(e){e.preventDefault();document.getElementById('pdDrop').classList.add('drag');}
function vbPdDragLeave(e){e.preventDefault();document.getElementById('pdDrop').classList.remove('drag');}
function vbPdDrop(e){e.preventDefault();document.getElementById('pdDrop').classList.remove('drag');const f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];vbPdLoadImg(f);}
function vbPdWardrobeToggle(){document.getElementById('pdWardrobeCustomWrap').style.display=(vbG('pdWardrobe')==='Custom…')?'flex':'none';}
function vbPdBgToggle(){document.getElementById('pdBgCustomWrap').style.display=(vbG('pdBg')==='Custom…')?'flex':'none';}
function vbProductText(){
  const ref=vbG('pdRef').trim()||'the attached avatar photo';
  const product=vbG('pdProduct').replace(/\s+/g,' ').trim()||'the product';
  const shot=(vbG('pdShot')||'Medium close-up').toLowerCase();
  const expr=vbG('pdExpr')||'warm, friendly smile';
  const cam=vbG('pdCam')||'iPhone 17 Pro';
  const aspect=vbG('pdAspect')||'9:16';

  let hold=vbG('pdHold');
  if(hold==='Custom…'){hold=vbG('pdHoldCustom').trim()||'holding it toward the camera';}

  const wsel=vbG('pdWardrobe');
  let wClause='';
  if(wsel==='Keep reference outfit'){wClause='Keep the clothing from the reference image unchanged. ';}
  else if(wsel==='Custom…'){const wc=vbG('pdWardrobeCustom').trim();if(wc)wClause='Dress the subject in '+wc+', with natural fabric texture and folds. ';}
  else{wClause='Dress the subject in '+wsel.toLowerCase()+', with natural fabric texture and folds. ';}

  const bsel=vbG('pdBg');
  let bClause='';
  if(bsel==='Keep reference background'){bClause='Keep the background from the reference image unchanged. ';}
  else if(bsel==='Custom…'){const bc=vbG('pdBgCustom').trim();if(bc)bClause='Set the scene in '+bc+'. ';}
  else{bClause='Set the scene in a '+bsel.toLowerCase()+'. ';}

  const labelSharp=document.getElementById('pdLabelSharp').checked;
  const frontFacing=document.getElementById('pdFrontFacing').checked;
  let labelClause='';
  if(frontFacing)labelClause+='The front of the pouch faces the camera. ';
  if(labelSharp)labelClause+='Keep all packaging text sharp, correctly spelled, undistorted and clearly legible, with the artwork and logo reproduced accurately. ';

  return 'Use '+ref+' as the main subject and preserve the person\'s exact facial identity, hairstyle, body shape, skin tone and recognizable features with maximum likeness accuracy. '
    +'Frame the shot as a '+shot+'. '
    +'The subject is '+hold+' '+product+'. '
    +labelClause
    +'Their expression is a '+expr+', looking toward the camera. '
    +'The hand grips the pouch naturally with correct finger count and realistic contact, no warped or floating packaging. '
    +wClause
    +bClause
    +'Ultra-realistic photography with authentic human skin texture, natural imperfections, realistic clothing folds, accurate lighting physics, detailed eyes, realistic hair strands, true-to-life colors, natural shadows, sharp focus and clean product presentation. '
    +'Captured as if photographed on an '+cam+', with natural HDR, realistic dynamic range, crisp textures and flagship smartphone image quality. '
    +'The image must look like a genuine photograph, not AI-generated artwork. '
    +'Aspect ratio '+aspect+'. '
    +'Avoid: cartoon, illustration, 3d render, cgi, plastic skin, deformed hands, extra fingers, duplicated product, warped or misspelled packaging text, blurry label, watermark, oversaturated colors, fake skin texture.';
}
function vbProductUI(){
  vbPdWardrobeToggle();vbPdBgToggle();
  const hc=document.getElementById('pdHoldCustomWrap');if(hc)hc.style.display=(vbG('pdHold')==='Custom…')?'flex':'none';
  const pv=document.getElementById('pdTextPreview');if(pv)pv.textContent=vbProductText();
}
/* ============ END PRODUCT HOLD ============ */

function vbSeg(){
  const secs=+vbG('secs'),pace=+vbG('pace');
  document.getElementById('secsRo').textContent=secs+'s';document.getElementById('paceRo').textContent=pace.toFixed(1)+' w/s';
  const text=vbG('scriptText').replace(/\s+/g,' ').trim();const words=text?text.split(' ').length:0;
  const budget=Math.max(6,Math.round(secs*pace));
  const sents=text.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g)||[];
  const clips=[];let cur='',cw=0;
  sents.forEach(s=>{s=s.trim();if(!s)return;const w=s.split(' ').length;
    if(cw&&cw+w>budget){clips.push(cur.trim());cur='';cw=0;}
    cur=(cur?cur+' ':'')+s;cw+=w;if(cw>=budget){clips.push(cur.trim());cur='';cw=0;}});
  if(cur.trim())clips.push(cur.trim());
  let total=0;const rows=clips.map((c,i)=>{const w=c.split(' ').length;const sec=Math.max(1,Math.round(w/pace));total+=sec;
    return '<div class="vb-clip"><span class="vb-cnum">C'+(i+1)+' · ~'+sec+'s</span><span class="vb-ctxt">'+c.replace(/</g,'&lt;')+'</span></div>';}).join('');
  document.getElementById('clipPreview').innerHTML=rows||'<div style="font-size:12px;color:var(--color-text-secondary);padding:8px 0">Paste a script above.</div>';
  document.getElementById('mClips').textContent=clips.length;document.getElementById('mDur').textContent='~'+total+'s';document.getElementById('mWords').textContent=words;
  return {clips,total,words};
}
function vbSend(){
  if(vbModes.mode==='image'){
    const msg='Build the image-generation JSON prompt below for my uploaded reference photo. Output the JSON exactly as written — do not add, remove, or rename any keys. No preamble.\n\n'+JSON.stringify(vbImgJsonObj(),null,2);
    sendPrompt(msg);return;
  }
  if(vbModes.mode==='product'){
    const msg='Generate this image. Use the avatar photo I attached as the subject (preserve their exact likeness) and have them holding the product described. Use the plain-text prompt below exactly as written — do not convert it to JSON, and do not add or remove anything. No preamble.\n\n'+vbProductText();
    sendPrompt(msg);return;
  }
  if(vbModes.mode==='hook'){
    const clips=vbHookClips();
    const msg=
'Act as my Google Flow / Veo agent for a two-person dialogue hook. Build one video clip per JSON object below, in order, so that cutting between them creates a natural multi-camera conversation.\n\n'+
'OUTPUT RULES:\n'+
'- Output each clip\'s JSON exactly as written — do not add, remove, or rename any keys.\n'+
'- Each clip is a single continuous shot from the camera angle in its "camera" field; the multi-camera effect comes from cutting between clips, not from moving the camera inside a clip.\n'+
'- Keep each speaker\'s accent locked and consistent across every clip they appear in.\n'+
'- In each clip only the active speaker talks; the other person listens naturally and does not speak.\n'+
'- Number each clip (Clip 1, Clip 2, ...) with its full JSON object underneath. No preamble, no commentary.\n\n'+
'CLIPS:\n'+JSON.stringify(clips,null,2);
    sendPrompt(msg);return;
  }
  if(vbModes.mode==='single'){
    const line=vbG('scriptOne').trim();
    const msg='Build ONE Google Flow / Veo clip using the EXACT JSON prompt below. Output the JSON exactly as written — do not add, remove, or rename any keys, and do not change any value except "dialogue". No preamble.\n\n'+vbJson(line||'[INSERT SCRIPT HERE]');
    sendPrompt(msg);return;
  }
  const seg=vbSeg();const script=vbG('scriptText').replace(/\s+/g,' ').trim();
  const template=vbJson('[INSERT SCRIPT HERE]');
  const msg=
'Act as my Google Flow / Veo agent. Break the script below into clips and output one JSON prompt per clip using the EXACT template below.\n\n'+
'OUTPUT RULES:\n'+
'- Copy every field of the template byte-for-byte. Change ONLY the "dialogue" value to that clip\'s spoken line.\n'+
'- Do not add, remove, or rename any keys. The Jamaican accent lock and every other field stay identical across all clips.\n'+
'- Cut on natural beats. Target ~'+vbG('secs')+'s per clip, speaking pace ~'+(+vbG('pace')).toFixed(1)+' words/sec (rough split = '+seg.clips+' clips).\n'+
'- Number each clip (Clip 1, Clip 2, ...) with its full JSON object underneath. No preamble, no commentary.\n\n'+
'TEMPLATE:\n'+template+'\n\n'+
'SCRIPT:\n'+script;
  sendPrompt(msg);
}
document.getElementById('hkAccentA').innerHTML=vbOpts(HK_ACCENTS,'Pure authentic Jamaican');
document.getElementById('hkAccentB').innerHTML=vbOpts(HK_ACCENTS,'General American');
vbHookAddTurn('A','Focus on the speaker','Yuh ever wonder why yuh breath still nuh fresh after yuh brush?');
vbHookAddTurn('B','Focus on the speaker','Wait, so brushing alone isn\'t enough?');
vbHookAddTurn('A','Over-the-shoulder toward the speaker','Exactly. Mek mi show yuh di one ting weh change everyting.');
vbHookAddTurn('B','Two-shot (both in frame)','Okay, I\'m listening — show me.');
vbJsonUI();vbSeg();vbBgToggle();vbWardrobeToggle();vbShotToggle();vbPoseToggle();vbActivityToggle();vbCompToggle();vbImgUI();vbHookUI();vbProductUI();
/**
 * UI State Tracker
 */
let currentMode = 'script';
const selectedCompanions = new Set();

/**
 * Global Constants & Configurations
 */
const ACCENTS = [
  { value: "jamaican", label: "Pure authentic Jamaican" },
  { value: "trinidadian", label: "Trinidadian" },
  { value: "bajan", label: "Bajan (Barbados)" },
  { value: "american_southern", label: "Southern US" },
  { value: "american_brooklyn", label: "Brooklyn New York" },
  { value: "british_cockney", label: "London Cockney" },
  { value: "nigerian_lagos", label: "Lagos Nigerian" },
  { value: "indian", label: "Indian Accent" },
  { value: "custom", label: "Custom…" }
];

// Wait for DOM to fully render before binding events
document.addEventListener("DOMContentLoaded", () => {
  initDropdowns();
  vbSetMode('script', document.querySelector(".vb-chip.on-purple"));
  
  // Initial structural run-throughs
  vbSeg();
  vbJsonUI();
  vbHookUI();
  vbImgUI();
  vbProductUI();
});

/**
 * Populates Hook Scene Accent Dropdowns
 */
function initDropdowns() {
  const selectA = document.getElementById("hkAccentA");
  const selectB = document.getElementById("hkAccentB");
  
  if (!selectA || !selectB) return;

  ACCENTS.forEach(acc => {
    const optA = new Option(acc.label, acc.value);
    const optB = new Option(acc.label, acc.value);
    if(acc.value === 'jamaican') optA.selected = true;
    if(acc.value === 'american_southern') optB.selected = true;
    selectA.add(optA);
    selectB.add(optB);
  });
}

/**
 * Contextual Layout Switching Controller
 */
function vbSetMode(mode, element) {
  currentMode = mode;

  // Clear active classes from sibling chips
  const chips = element.parentElement.querySelectorAll(".vb-chip");
  chips.forEach(c => c.classList.remove("on-purple"));
  element.classList.add("on-purple");

  // Elements needing conditional view modifications
  const cardMap = {
    charCard: ['script', 'single', 'image'],
    voiceCard: ['script', 'single'],
    scriptCard: ['script'],
    singleCard: ['single'],
    hookCard: ['hook'],
    imageCard: ['image'],
    productCard: ['product'],
    lockCard: ['script', 'single', 'hook', 'image'],
    videoJsonCard: ['script', 'single']
  };

  // Run display updates based on mappings
  Object.keys(cardMap).forEach(cardId => {
    const targetEl = document.getElementById(cardId);
    if (targetEl) {
      targetEl.style.display = cardMap[cardId].includes(mode) ? 'block' : 'none';
    }
  });

  // Dynamic Button UI adjustments
  const sendTxt = document.getElementById("vbSendTxt");
  if (sendTxt) {
    if (mode === 'product') sendTxt.textContent = "Send to chat — Copy Plain Text Prompt ↗";
    else if (mode === 'image') sendTxt.textContent = "Send to chat — Render Spec Image JSON ↗";
    else if (mode === 'hook') sendTxt.textContent = "Send to chat — Build 2-Person Script JSON ↗";
    else sendTxt.textContent = "Send to chat — build Jamaican JSON clips ↗";
  }
}

/**
 * Mode 1: Full Script Pacing & Time Splitting Calculations
 */
function vbSeg() {
  const scriptText = document.getElementById("scriptText")?.value || "";
  const secsPerClip = parseInt(document.getElementById("secs")?.value || "8", 10);
  const wordsPerSec = parseFloat(document.getElementById("pace")?.value || "2.7");

  // Output slider readout synchronization
  if (document.getElementById("secsRo")) document.getElementById("secsRo").textContent = `${secsPerClip}s`;
  if (document.getElementById("paceRo")) document.getElementById("paceRo").textContent = `${wordsPerSec} w/s`;

  const words = scriptText.trim().split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;
  
  if (totalWords === 0) {
    updateMetrics(0, "0s", 0);
    return;
  }

  const wordsPerClip = Math.floor(secsPerClip * wordsPerSec);
  const clipsArray = [];
  
  for (let i = 0; i < totalWords; i += wordsPerClip) {
    clipsArray.push(words.slice(i, i + wordsPerClip).join(" "));
  }

  const totalEstDuration = Math.round(totalWords / wordsPerSec);

  // Update DOM readouts
  updateMetrics(clipsArray.length, `${totalEstDuration}s`, totalWords);
  renderClipPreviews(clipsArray);
  
  // Cascade values cleanly into primary active schema output boxes
  vbJsonUI();
}

function updateMetrics(clips, duration, words) {
  if (document.getElementById("mClips")) document.getElementById("mClips").textContent = clips || "–";
  if (document.getElementById("mDur")) document.getElementById("mDur").textContent = duration || "–";
  if (document.getElementById("mWords")) document.getElementById("mWords").textContent = words || "–";
}

function renderClipPreviews(clips) {
  const container = document.getElementById("clipPreview");
  if (!container) return;
  container.innerHTML = "";

  clips.forEach((clipText, index) => {
    const clipDiv = document.createElement("div");
    clipDiv.className = "vb-clip";
    clipDiv.innerHTML = `
      <div class="vb-cnum">Clip #${String(index + 1).padStart(2, '0')}</div>
      <div class="vb-ctxt">"${clipText}"</div>
    `;
    container.appendChild(clipDiv);
  });
}

/**
 * Mode 1 & 2: Primary Video Generator Config Assembly (JSON)
 */
function vbJsonUI() {
  if (currentMode !== 'script' && currentMode !== 'single') return;

  const config = {
    mode: currentMode,
    character: document.getElementById("character")?.value || "",
    image_reference: document.getElementById("imgRef")?.value || "",
    voice_profile: {
      speed: document.getElementById("vspeed")?.value || "",
      pace: document.getElementById("vpace")?.value || "",
      clarity: document.getElementById("vclarity")?.value || "",
      tone: document.getElementById("vtone")?.value || "",
      accent_constraints: "Pure authentic Jamaican voice matching locked ruleset"
    },
    composition: {
      framing: "Medium close-up",
      camera_movement: "Locked / No movement",
      background: "Preserve reference photo context exactly"
    },
    timeline_clips: []
  };

  if (currentMode === 'script') {
    const previewElements = document.querySelectorAll("#clipPreview .vb-clip");
    previewElements.forEach((el, index) => {
      const text = el.querySelector(".vb-ctxt")?.textContent.replace(/^"|"$/g, '') || "";
      config.timeline_clips.push({ clip: index + 1, speech_dialogue: text });
    });
  } else {
    config.timeline_clips.push({
      clip: 1,
      speech_dialogue: document.getElementById("scriptOne")?.value || ""
    });
  }

  const jsonBox = document.getElementById("jsonPreview");
  if (jsonBox) jsonBox.textContent = JSON.stringify(config, null, 2);
}

/**
 * Mode 3: Two-Person Hook Script Logic & Custom Input Wrappers
 */
function vbHookUI() {
  const valA = document.getElementById("hkAccentA")?.value;
  const valB = document.getElementById("hkAccentB")?.value;

  toggleWrap("hkAccentACustomWrap", valA === 'custom');
  toggleWrap("hkAccentBCustomWrap", valB === 'custom');

  const nameA = document.getElementById("hkNameA")?.value || "Person A";
  const nameB = document.getElementById("hkNameB")?.value || "Person B";

  const hookPayload = {
    mode: "hook_script_two_person",
    cast: {
      person_A: {
        label: nameA,
        character_profile: document.getElementById("hkCharA")?.value || "",
        voice_accent: valA === 'custom' ? document.getElementById("hkAccentACustom")?.value : valA
      },
      person_B: {
        label: nameB,
        character_profile: document.getElementById("hkCharB")?.value || "",
        voice_accent: valB === 'custom' ? document.getElementById("hkAccentBCustom")?.value : valB
      }
    },
    sequence: []
  };

  // Extract dynamically generated dialogue turns from UI container
  const turns = document.querySelectorAll(".hk-turn");
  turns.forEach((turn, idx) => {
    const speakerId = turn.getAttribute("data-speaker");
    const labelName = speakerId === 'A' ? nameA : nameB;
    const shot = turn.querySelector(".hk-shot-select")?.value || "Focus on the speaker";
    const dialogue = turn.querySelector(".hk-turn-textarea")?.value || "";

    hookPayload.sequence.push({
      shot_index: idx + 1,
      speaker: labelName,
      camera_framing: shot,
      dialogue_text: dialogue
    });
  });

  const targetBox = document.getElementById("hkJsonPreview");
  if (targetBox) targetBox.textContent = JSON.stringify(hookPayload, null, 2);
}

function vbHookAddTurn(speaker) {
  const container = document.getElementById("hkTurns");
  if (!container) return;

  const nameLabel = speaker === 'A' ? 
    (document.getElementById("hkNameA")?.value || "Person A") : 
    (document.getElementById("hkNameB")?.value || "Person B");

  const turnDiv = document.createElement("div");
  turnDiv.className = "hk-turn";
  turnDiv.setAttribute("data-speaker", speaker);

  turnDiv.innerHTML = `
    <div style="display:flex;justify-content:between;align-items:center;margin-bottom:6px">
      <span class="hk-spk">${nameLabel}</span>
      <button onclick="this.parentElement.parentElement.remove();vbHookUI();" style="border:none;background:none;color:var(--color-text-secondary);cursor:pointer;font-size:11px">Remove</button>
    </div>
    <div class="vb-fr">
      <label>Camera Shot</label>
      <select class="hk-shot-select" onchange="vbHookUI()">
        <option>Focus on the speaker</option>
        <option>Close-up on the speaker</option>
        <option>Medium shot on the speaker</option>
        <option>Over-the-shoulder toward speaker</option>
        <option>Reaction shot on the listener</option>
        <option>Two-shot (both in frame)</option>
        <option>Wide establishing shot</option>
      </select>
    </div>
    <div class="vb-fr" style="margin-top:6px">
      <label>Spoken Lines</label>
      <textarea class="hk-turn-textarea" rows="2" placeholder="Enter continuous speech segment..." oninput="vbHookUI()"></textarea>
    </div>
  `;

  container.appendChild(turnDiv);
  vbHookUI();
}

/**
 * Mode 4: Identity Locked Image Generation Configuration Builder
 */
function vbImgUI() {
  const sVal = document.getElementById("imgStrength")?.value || "0.95";
  const gVal = document.getElementById("imgGuid")?.value || "9";
  const stVal = document.getElementById("imgSteps")?.value || "50";

  if(document.getElementById("imgStrengthRo")) document.getElementById("imgStrengthRo").textContent = sVal;
  if(document.getElementById("imgGuidRo")) document.getElementById("imgGuidRo").textContent = gVal;
  if(document.getElementById("imgStepsRo")) document.getElementById("imgStepsRo").textContent = `${stVal} steps`;

  // Evaluate structural layout dependencies 
  const bgSel = document.getElementById("imgBg")?.value;
  const wdSel = document.getElementById("imgWardrobe")?.value;
  const shSel = document.getElementById("imgShot")?.value;
  const psSel = document.getElementById("imgPose")?.value;
  const acSel = document.getElementById("imgActivity")?.value;

  toggleWrap("imgBgCustomWrap", bgSel === 'Custom…');
  toggleWrap("imgWardrobeCustomWrap", wdSel === 'Custom…');
  toggleWrap("imgShotCustomWrap", shSel === 'Custom…');
  toggleWrap("imgPoseCustomWrap", psSel === 'Custom…');
  toggleWrap("imgActivityCustomWrap", acSel === 'Custom…');

  const imgPayload = {
    mode: "identity_locked_image_generation",
    hyperparameters: { reference_strength: parseFloat(sVal), guidance_scale: parseFloat(gVal), total_steps: parseInt(stVal, 10) },
    scene_specification: {
      background: bgSel === 'Custom…' ? document.getElementById("imgBgCustom")?.value : bgSel,
      wardrobe: wdSel === 'Custom…' ? document.getElementById("imgWardrobeCustom")?.value : wdSel,
      framing_angle: shSel === 'Custom…' ? document.getElementById("imgShotCustom")?.value : shSel,
      body_pose: psSel === 'Custom…' ? document.getElementById("imgPoseCustom")?.value : psSel,
      active_activity: acSel === 'Custom…' ? document.getElementById("imgActivityCustom")?.value : acSel,
      companions: Array.from(selectedCompanions),
      hardware_simulation: document.getElementById("imgCam")?.value || "iPhone 17 Pro",
      canvas_aspect_ratio: document.getElementById("imgAspect")?.value || "9:16",
      enforce_usa_flag: document.getElementById("imgFlag")?.checked || false
    }
  };

  if(selectedCompanions.has("twin")) {
    toggleWrap("imgTwinWrap", true);
    const gap = document.getElementById("imgTwinGap")?.value || "20";
    if(document.getElementById("imgTwinGapRo")) document.getElementById("imgTwinGapRo").textContent = `${gap} yrs`;
    imgPayload.scene_specification.twin_details = {
      age_gap: `${gap} years`,
      direction: document.getElementById("imgTwinDir")?.value || "younger"
    };
  } else {
    toggleWrap("imgTwinWrap", false);
  }

  const outputBox = document.getElementById("imgJsonPreview");
  if (outputBox) outputBox.textContent = JSON.stringify(imgPayload, null, 2);
}

function vbCompChip(el) {
  const companionValue = el.getAttribute("data-c");
  if(companionValue === 'custom') {
    el.classList.toggle("on-purple");
    const isCustomActive = el.classList.contains("on-purple");
    toggleWrap("imgCompanionCustomWrap", isCustomActive);
    if(isCustomActive) selectedCompanions.add(document.getElementById("imgCompanionCustom")?.value || "custom");
    else selectedCompanions.delete("custom");
  } else {
    if(el.classList.contains("on-purple")) {
      el.classList.remove("on-purple");
      selectedCompanions.delete(companionValue);
    } else {
      el.classList.add("on-purple");
      selectedCompanions.add(companionValue);
    }
  }
  vbImgUI();
}

/**
 * Mode 5: Product Hold Output Generator (Plain Text Prompt Compilation)
 */
function vbProductUI() {
  const subjectRef = document.getElementById("pdRef")?.value || "USE THE ATTACHED AVATAR PHOTO EXACTLY";
  const productDesc = document.getElementById("pdProduct")?.value || "";
  
  const holdSel = document.getElementById("pdHold")?.value;
  toggleWrap("pdHoldCustomWrap", holdSel === 'Custom…');
  const actionHold = holdSel === 'Custom…' ? document.getElementById("pdHoldCustom")?.value : holdSel;

  const shotFraming = document.getElementById("pdShot")?.value || "Medium close-up";
  const expression = document.getElementById("pdExpr")?.value || "warm, friendly smile";

  const wardSel = document.getElementById("pdWardrobe")?.value;
  toggleWrap("pdWardrobeCustomWrap", wardSel === 'Custom…');
  const wardrobe = wardSel === 'Custom…' ? document.getElementById("pdWardrobeCustom")?.value : wardSel;

  const bgSel = document.getElementById("pdBg")?.value;
  toggleWrap("pdBgCustomWrap", bgSel === 'Custom…');
  const background = bgSel === 'Custom…' ? document.getElementById("pdBgCustom")?.value : bgSel;

  const hardware = document.getElementById("pdCam")?.value || "iPhone 17 Pro";
  const aspect = document.getElementById("pdAspect")?.value || "9:16";

  const forceSharp = document.getElementById("pdLabelSharp")?.checked ? "The product packaging text labels must remain perfectly sharp, razor-sharp readable, non-warped, and highly legible." : "";
  const forceFront = document.getElementById("pdFrontFacing")?.checked ? "The pouch directly faces the camera view front-forward." : "";

  // Dynamic injection parser for clean plain text sentence architecture
  let promptText = `A crisp photorealistic ${shotFraming} photograph captured on an ${hardware}, aspect ratio ${aspect}.\n\n`;
  promptText += `Subject Profile: A real human subject directly referencing [${subjectRef}], showcasing a authentic skin texture with zero imperfections, holding a clean appearance with a ${expression}.\n\n`;
  promptText += `Action & Composition: The subject is seen ${actionHold} inside a ${background.toLowerCase()}.\n\n`;
  promptText += `Product Explicit Visual Profile: The item being held is ${productDesc}. ${forceFront} ${forceSharp}\n\n`;
  promptText += `Wardrobe Style: Dressing features ${wardrobe.toLowerCase()}.\n\n`;
  promptText += `Execution Standards: Premium commercial layout asset look, detailed lighting matrices casting sharp realistic ground and surface shadow definitions. Complete structural optimization. Absolute absence of distorted human anatomical features or unreadable gibberish text blocks.`;

  const targetDiv = document.getElementById("pdTextPreview");
  if(targetDiv) targetDiv.textContent = promptText.trim();
}

/**
 * Utilities & Helper Functions
 */
function toggleWrap(id, status) {
  const el = document.getElementById(id);
  if(el) el.style.display = status ? 'block' : 'none';
}

// Transparent trigger fallbacks for bound markup hooks
function vbBgToggle() { vbImgUI(); }
function vbWardrobeToggle() { vbImgUI(); }
function vbShotToggle() { vbImgUI(); }
function vbPoseToggle() { vbImgUI(); }
function vbActivityToggle() { vbImgUI(); }
function vbPdWardrobeToggle() { vbProductUI(); }
function vbPdBgToggle() { vbProductUI(); }

/**
 * Native Drag & Drop Local Storage Interfaces (Image Preserves)
 */
function vbDragOver(e) { e.preventDefault(); document.getElementById("imgDrop")?.classList.add("drag"); }
function vbDragLeave(e) { e.preventDefault(); document.getElementById("imgDrop")?.classList.remove("drag"); }
function vbDrop(e) {
  e.preventDefault();
  const d = document.getElementById("imgDrop");
  if(d) d.classList.remove("drag");
  const files = e.dataTransfer.files;
  if(files.length) handleImgUpload(files[0], "imgPreview", "imgDropEmpty", "imgFileName", "imgFileBar");
}
function vbFile(e) {
  const files = e.target.files;
  if(files.length) handleImgUpload(files[0], "imgPreview", "imgDropEmpty", "imgFileName", "imgFileBar");
}
function vbClearImg(e) {
  e.stopPropagation();
  resetUploadBox("imgFile", "imgPreview", "imgDropEmpty", "imgFileName", "imgFileBar");
}

function vbPdDragOver(e) { e.preventDefault(); document.getElementById("pdDrop")?.classList.add("drag"); }
function vbPdDragLeave(e) { e.preventDefault(); document.getElementById("pdDrop")?.classList.remove("drag"); }
function vbPdDrop(e) {
  e.preventDefault();
  const d = document.getElementById("pdDrop");
  if(d) d.classList.remove("drag");
  const files = e.dataTransfer.files;
  if(files.length) handleImgUpload(files[0], "pdPreview", "pdDropEmpty", "pdFileName", "pdFileBar");
}
function vbPdFile(e) {
  const files = e.target.files;
  if(files.length) handleImgUpload(files[0], "pdPreview", "pdDropEmpty", "pdFileName", "pdFileBar");
}
function vbPdClearImg(e) {
  e.stopPropagation();
  resetUploadBox("pdFile", "pdPreview", "pdDropEmpty", "pdFileName", "pdFileBar");
}

function handleImgUpload(file, imgId, emptyId, nameId, barId) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById(imgId);
    const emp = document.getElementById(emptyId);
    const nm = document.getElementById(nameId);
    const bar = document.getElementById(barId);
    
    if(img && emp && nm && bar) {
      img.src = e.target.result;
      img.style.display = "block";
      emp.style.display = "none";
      nm.textContent = file.name;
      bar.style.display = "flex";
    }
  };
  reader.readAsDataURL(file);
}

function resetUploadBox(fileInputId, imgId, emptyId, nameId, barId) {
  const fi = document.getElementById(fileInputId);
  const img = document.getElementById(imgId);
  const emp = document.getElementById(emptyId);
  const nm = document.getElementById(nameId);
  const bar = document.getElementById(barId);

  if(fi) fi.value = "";
  if(img) { img.src = ""; img.style.display = "none"; }
  if(emp) emp.style.display = "block";
  if(nm) nm.textContent = "";
  if(bar) bar.style.display = "none";
}

/**
 * Main Form Submitter Dispatched to Chat Engine
 */
function vbSend() {
  let activeDataText = "";
  if (currentMode === 'script' || currentMode === 'single') {
    activeDataText = document.getElementById("jsonPreview")?.textContent;
  } else if (currentMode === 'hook') {
    activeDataText = document.getElementById("hkJsonPreview")?.textContent;
  } else if (currentMode === 'image') {
    activeDataText = document.getElementById("imgJsonPreview")?.textContent;
  } else if (currentMode === 'product') {
    activeDataText = document.getElementById("pdTextPreview")?.textContent;
  }

  console.log(`Dispatched Form Payload [Mode: ${currentMode}]:`, activeDataText);
  alert(`Payload compiled successfully for mode: "${currentMode}"! Ready for prompt pipeline deployment.`);
}