# About 📝
⚠️ This is an unofficial DeepFloyd IF API, so it **may be UNSTABLE**!
<br />
✌️ Open issues if you found a bug or want to improve this API!

# Requirements 📎
**Node.js >= 18.2.0**

# Example of use ⌨️
index.js:
```js
import DeepFloyd from './deepfloyd.js';
const df = new DeepFloyd('xs5wx'); // это индекс пространства приложения в hugging face, его можно найти в ссылке пространства (например: https://deepfloyd-if--sst5l.hf.space/)

let prompt = 'rabbit with black sunglasses';
let negative = 'ugly, blurry, glitchy, artefacts, bad res, low quality, poor quality, jpeg compression, cropped, out of borders, cutted';
let scaleGuidance = 9;
let seed = 215616;

let images = await df.createImages(prompt, negative, scaleGuidance, seed); // массив из картинок с их функциями и параметрами
// let images = await df.createImages(prompt); - можно и так

console.log(images.map(image => image.url)); // вывод ссылок на картинки
images.map(async (image, index) => await image.download(`image-${index}`)); // скачать все картинки

let upscaled1 = await images[0].upscale(scaleGuidance, seed); // буффер увеличенной картинки
let upscaled2 = await images[1].upscale();

await upscaled1.download(`upscaled1`); // скачать увеличенную картинку
await upscaled2.download(`upscaled2`);
```
Raw image (`image-0.png`): ![image](https://github.com/Pozaza/DeepFloyd-Unofficial-API/blob/main/image-0.png)
<br />
Upscaled image (`upscaled.png`): ![image](https://github.com/Pozaza/DeepFloyd-Unofficial-API/blob/main/upscaled.png?raw=true)

# Credits 🤗
Made by me - [Pozaza](https://github.com/Pozaza), made with love
