const uploadBox=document.querySelector(".upload-box"),
previewImg=document.querySelector("img"),
fileInput=uploadBox.querySelector("input"),
widthInput=document.querySelector(".width input"),
heightInput=document.querySelector(".height input"),
ratioInput=document.querySelector(".ratio input"),
qualityInput=document.querySelector(".quality input"),
downloadBtn=document.querySelector(".download-btn");

let ogImageRatio;

const loadFile= (e)=>{
    const file=e.target.files[0];
    if(!file) return;
    previewImg.src=URL.createObjectURL(file);
    previewImg.addEventListener("load",()=>{
        widthInput.value=previewImg.naturalWidth;
        heightInput.value=previewImg.naturalHeight;
        ogImageRatio=previewImg.naturalWidth/previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
    
}

widthInput.addEventListener("keyup",()=>{
    const height=ratioInput.checked? widthInput.value/ogImageRatio:heightInput.value;
    heightInput.value=Math.floor(height);
});
heightInput.addEventListener("keyup",()=>{
    const width=ratioInput.checked? heightInput.value* ogImageRatio:widthInput.value;
    widthInput.value=Math.floor(width);
});


const resizeAndDownload=()=>{
    const canvas=document.createElement("canvas");
    const a=document.createElement("a");
    const ctx=canvas.getContext("2d");

    const imageQuality=qualityInput.checked?0.7:1.0;

    canvas.width=widthInput.value;
    canvas.height=heightInput.value;
    ctx.drawImage(previewImg,0,0,canvas.width,canvas.height);
    
    a.href=canvas.toDataURL("image/jpeg",imageQuality);
    a.download=new Date().getTime();//passing current time as a download value;
    a.click();//clicking the a element so the file download
}



downloadBtn.addEventListener("click",resizeAndDownload);
fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click",()=>fileInput.click());