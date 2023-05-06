# About
This is an unofficial DeepFloyd IF API, so it may be UNSTABLE

# Example of use
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

# Credits
Made with me - Pozaza, made with love
