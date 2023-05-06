# About 📝
⚠️ This is an unofficial DeepFloyd IF API, so it **may be UNSTABLE**!
<br />
✌️ Open issues if you found a bug or want to improve this API!

# Requirements 📎
**Node.js >= 18.2.0**

# Example of use ⌨️
index.js:
```js
const DeepFloyd = require('./deepfloyd');
const df = new DeepFloyd('sst5l'); // это индекс пространства приложения в hugging face, его можно найти в ссылке пространства (например: https://deepfloyd-if--sst5l.hf.space/)

let images = await df.createImages('rabbit with black sunglasses', 'ugly, glitchy'); // массив из картинок с их функциями

console.log(images.map(image => image.url)); // вывод ссылок на картинки
images.map(async (image, index) => await image.download(`image-${index}`)); // скачать все картинки

let upscaled = await images[0].upscale(); // буффер увеличенной картинки
await upscaled.download(`upscaled`); // скачать увеличенную картинку
```
Raw image (`image-0.png`): ![image](https://github.com/Pozaza/DeepFloyd-Unofficial-API/blob/main/image-0.png)
<br />
Upscaled image (`upscaled.png`): ![image](https://github.com/Pozaza/DeepFloyd-Unofficial-API/blob/main/upscaled.png?raw=true)

# Credits 🤗
Made by me - [Pozaza](https://github.com/Pozaza), made with love
