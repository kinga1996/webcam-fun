const video = document.querySelector('.smallPhoto');
const canvas = document.querySelector('.bigPhoto');
const ctx = canvas.getContext('2d');
const photos = document.querySelector('.photos');
const click = document.querySelector('#click');
let red = false;
let green = false;
let blue = false;
let ghost = false;
let RGB = false;

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      alert("Access to the webcam is blocked");
    });
}

function videoCanvas(){
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() =>{
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);

		let valueOfRed = document.querySelector('#rangeRed').value;
		let valueOfGreen = document.querySelector('#rangeGreen').value;
		let valueOfBlue = document.querySelector('#rangeBlue').value;
		let valueOfGhost = document.querySelector('#rangeGhost').value;

		if (red == true){
		pixels = redEffect(pixels, valueOfRed);
		document.querySelector('#rangeRed').style.display = "inline";
		document.querySelector('#makeMeRed').style.display = "none";
		}

		if (red == false){
		document.querySelector('#rangeRed').style.display = "none";
		document.querySelector('#makeMeRed').style.display = "inline";
		}	

		if (green == true){
		pixels = greenEffect(pixels, valueOfGreen);
		document.querySelector('#rangeGreen').style.display = "inline";
		document.querySelector('#makeMeGreen').style.display = "none";
		}

		if (green == false){
		document.querySelector('#rangeGreen').style.display = "none";
		document.querySelector('#makeMeGreen').style.display = "inline";
		}

		if (blue == true){
		pixels = blueEffect(pixels, valueOfBlue);
		document.querySelector('#rangeBlue').style.display = "inline";
		document.querySelector('#makeMeBlue').style.display = "none";
		}

		if (blue == false){
		document.querySelector('#rangeBlue').style.display = "none";
		document.querySelector('#makeMeBlue').style.display = "inline";
		}

		if (ghost == true){
		pixels = ghostEffect(pixels);
		document.querySelector('#rangeGhost').style.display = "inline";
		document.querySelector('#makeMeGhost').style.display = "none";
		ctx.globalAlpha = (0.01 * valueOfGhost);
		}

		if (ghost == false){
		document.querySelector('#rangeGhost').style.display = "none";
		document.querySelector('#makeMeGhost').style.display = "inline";
		ctx.globalAlpha = 1;
		}

		ctx.putImageData(pixels, 0, 0);
	},16);

	ctx.putImageData(pixels, 0, 0);
}

function takePhoto(){
	click.currentTime = 0;
	click.play();

	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'FunWebcam');
	link.innerHTML = `<img src="${data}" alt="Photo from webcam" />`;
	photos.insertBefore(link, photos.firstChild);

}

function makeMeRed(){
	red = true;
	green= false; blue= false; ghost= false; RGB= false;
}

function redEffect(pixels, valueOfRed) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i] = pixels.data[i] + (190 * (valueOfRed / 10)); // RED
  }
  return pixels;
}

function makeMeGreen(){
	green = true;
	red = false; blue = false; ghost = false; RGB = false;
}

function greenEffect(pixels, valueOfGreen) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 1] = pixels.data[i + 1] + (180 * (valueOfGreen / 10)); // GREEN
  }
  return pixels;
}

function makeMeBlue(){
	blue = true;
	red = false; green = false; ghost = false; RGB = false;
}

function blueEffect(pixels, valueOfBlue) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 2] = pixels.data[i + 2] + (200 * (valueOfBlue / 10));
  }
  return pixels;
}

function makeMeGhost(){
	ghost = true;
	red = false; green = false; blue = false; RGB = false;
}

function ghostEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; 
    pixels.data[i + 500] = pixels.data[i + 1]; 
    pixels.data[i - 550] = pixels.data[i + 2]; 
  }
  return pixels;
}

function deleteFilters(){
	blue = false; red = false; green = false; ghost = false; RGB = false;
}

getVideo();
video.addEventListener('canplay', videoCanvas);