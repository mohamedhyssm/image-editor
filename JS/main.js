// Catch filters
let filters = document.querySelectorAll("ul li input"),
  saturateFilter = document.getElementById("saturate"),
  contrastFilter = document.getElementById("contrast"),
  brightnessFilter = document.getElementById("brightness"),
  sepiaFilter = document.getElementById("sepia"),
  grayscaleFilter = document.getElementById("grayscale"),
  blurFilter = document.getElementById("blur"),
  hueRotateFilter = document.getElementById("hue-rotate")
// Catch Image
let image = document.getElementById("img"),
  imgBox = document.querySelector(".image-box")
// Catch Canvas
const canvas = document.getElementById("canvas"),
  ct = canvas.getContext("2d")
// Catch Main Buttons
let uploadButton = document.getElementById("upload"),
  downloadButton = document.getElementById("download"),
  resetButton = document.getElementById("reset"),
  imageType = document.querySelectorAll(".image-type input"),
  widthInput = document.getElementById("width"),
  heigthInput = document.getElementById("heigth")


// Setting
let imageTypeNow = "png"

window.onload = function () {
  downloadButton.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
}

imageType.forEach(type => {
  type.onchange = function () {
    imageTypeNow = type.id
  }
})

filters.forEach(filter => {
  filter.addEventListener("input", function () {
    ct.filter = `
    saturate(${saturateFilter.value}%)
    contrast(${contrastFilter.value}%)
    brightness(${brightnessFilter.value}%)
    sepia(${sepiaFilter.value}%)
    grayscale(${grayscaleFilter.value}%)
    blur(${blurFilter.value}px)
    hue-rotate(${hueRotateFilter.value}deg)
    `
    ct.drawImage(image, 0, 0, canvas.width, canvas.height);
  })
})

resetButton.onclick = resetValue;

uploadButton.onchange = function () {
  resetValue()
  downloadButton.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(uploadButton.files[0]);
  file.onload = function () {
    image.src = file.result
  }
  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ct.drawImage(image, 0, 0, image.width, image.height)
    image.style.display = "none"
  }
}

function resetValue() {
  ct.filter = `none`;
  saturateFilter.value = `100`
  contrastFilter.value = `100`
  brightnessFilter.value = `100`
  sepiaFilter.value = `100`
  grayscaleFilter.value = `0`
  blurFilter.value = `0`
  hueRotateFilter.value = `0`
  ct.drawImage(image, 0, 0, canvas.width, canvas.height);
}

downloadButton.onclick = function () {
  downloadButton.href = canvas.toDataURL(`image/${imageTypeNow}`);
}