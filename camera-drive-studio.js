/* Camera and Google Drive enhancements; no credentials embedded. */
(()=>{'use strict';const $=id=>document.getElementById(id);let stream=null,token=null,tokenClient=null;const status=t=>{$('camStatus').textContent=t};function stop(){if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}$('camVideo').srcObject=null;$('camModal').hidden=true}async function open(){ $('camModal').hidden=false;try{stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}});$('camVideo').srcObject=stream;await $('camVideo').play();status('Camera ready')}catch(e){status('Camera unavailable: '+e.message+' — use Upload instead')}}let capturing=false;
async function capture(){
 if(capturing)return;
 const v=$('camVideo'),btn=$('camCapture');
 if(!stream||!v||v.readyState<2||!v.videoWidth||!v.videoHeight){status('Camera is still starting. Wait a moment and try again.');return;}
 capturing=true;btn.disabled=true;btn.textContent='Capturing…';
 try{
  const scale=Math.min(1,2200/Math.max(v.videoWidth,v.videoHeight));
  const c=document.createElement('canvas');c.width=Math.max(1,Math.round(v.videoWidth*scale));c.height=Math.max(1,Math.round(v.videoHeight*scale));
  const ctx=c.getContext('2d',{alpha:false});if(!ctx)throw Error('Canvas unavailable');
  ctx.drawImage(v,0,0,c.width,c.height);
  const blob=await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(Error('Could not encode camera image')),'image/jpeg',.86));
  const file=new File([blob],`camera-${Date.now()}.jpg`,{type:'image/jpeg'});
  if(typeof window.ShopStudioReceiveCameraPage==='function'){
   const count=await window.ShopStudioReceiveCameraPage(file);
   status(`Page ${count} captured successfully`);
   stop();
  }else{
   throw Error('Scanner editor not ready. Refresh the page and try again.');
  }
 }catch(e){console.error('Camera capture failed',e);status('Capture failed: '+(e.message||String(e)));}
 finally{capturing=false;btn.disabled=false;btn.textContent='Capture Page';}
}

function selectedCanvas(){return $('scanCanvas')}function saveBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),30000)}async function output(format){const c=selectedCanvas();if(!c||!c.width)throw Error('Scan or upload a page first');if(format==='jpg')return new Promise((resolve,reject)=>c.toBlob(b=>b?resolve({blob:b,name:'ShopStudio-scan.jpg'}):reject(Error('Image export failed')),'image/jpeg',.9));if(!window.PDFLib)throw Error('PDF library is not loaded');const doc=await PDFLib.PDFDocument.create();const bytes=await new Promise(r=>c.toBlob(async b=>r(await b.arrayBuffer()),'image/jpeg',.88));const img=await doc.embedJpg(bytes);const p=doc.addPage([img.width,img.height]);p.drawImage(img,{x:0,y:0,width:img.width,height:img.height});return {blob:new Blob([await doc.save()],{type:'application/pdf'}),name:'ShopStudio-scan.pdf'}}
async function driveToken(){const id=$('driveClientId').value.trim();if(!id)throw Error('Enter your Google OAuth Client ID in Cloud Settings');if(!window.google?.accounts?.oauth2)throw Error('Google login unavailable. Check your internet connection');return new Promise((resolve,reject)=>{tokenClient=google.accounts.oauth2.initTokenClient({client_id:id,scope:'https://www.googleapis.com/auth/drive.file',callback:r=>r.error?reject(Error(r.error)): (token=r.access_token,resolve(token))});tokenClient.requestAccessToken({prompt:token?'':'consent'})})}
async function uploadDrive(){try{status('Preparing file…');const format=$('cloudFormat').value;const {blob,name}=await output(format);if(window.ShopStudioDriveLibrary){try{await window.ShopStudioDriveLibrary.save(blob,name);status('Saved in your Shop Studio Drive folder: '+name);return}catch(e){if(!/Connect Google first/.test(e.message))throw e}}throw Error('Connect Google in My Document Library first. This keeps your files inside Shop Studio Documents, not your Drive root.');}catch(e){status('Drive: '+e.message)}}
async function download(){try{const f=await output($('cloudFormat').value);saveBlob(f.blob,f.name);status('Downloaded '+f.name)}catch(e){status(e.message)}}
window.addEventListener('DOMContentLoaded',()=>{const btn=$('cameraScanBtn');if(btn){btn.addEventListener('click',e=>{e.stopImmediatePropagation();open()},{capture:true})}$('camClose').onclick=stop;$('camCapture').onclick=capture;$('camSwitch').onclick=async()=>{stop();await open()};$('driveClientId').value=localStorage.getItem('shopstudio_google_client_id')||'761768918710-d0vlh0ca65lpab7d8qbo58det25op9hv.apps.googleusercontent.com';$('driveClientId').addEventListener('change',e=>localStorage.setItem('shopstudio_google_client_id',e.target.value.trim()));$('driveSave').onclick=uploadDrive;$('cloudDownload').onclick=download;window.addEventListener('pagehide',stop)});
})();
