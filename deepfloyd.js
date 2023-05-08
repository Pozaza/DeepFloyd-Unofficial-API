const WebSocket = require('ws');
const crypto = require('crypto');
const fs = require("fs");
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require("path");

module.exports = class DeepFloyd {
	constructor(spaceIndex) {
		this.api = `deepfloyd-if--${spaceIndex}.hf.space`;
		this.sessionHash = crypto.randomBytes(16).toString('hex');
	}

	createImages(prompt, negative = "", scaleGuidance = 7) {
		let api = this.api;
		let hash = this.sessionHash;
		
		return new Promise(function(resolve, reject) {
			let ws = new WebSocket(`wss://${api}/queue/join`);
			
			ws.on('message', async data => {
				let json = JSON.parse(data);
			
				switch(json.msg) {
					case 'send_hash':
						ws.send(JSON.stringify({ fn_index: 20, session_hash: hash }));
						break;
					case 'queue_full':
						console.error('Очередь заполнена, попробуйте ещё раз.');
						reject({ message: 'queue_full' });
						break;
					case 'send_data':
						ws.send(JSON.stringify({ fn_index: 20, data: [prompt, negative, Math.floor(Math.random() * 100000000), 4, scaleGuidance, "smart50", 100], event_data: null, session_hash: hash }));
						break;
					case 'process_completed':
						resolve(json.output.data[0].map((image, index) => {
							let temp = json.output.data[2];
							
							image.download = async (name = image.name.slice(5)) => { // Скачать картинку
								try {
								  const res = await fetch(`https://${api}/file=${image.name}`);
								  const fileStream = fs.createWriteStream(path.resolve(".", name + '.png'), { flags: 'wx' });
								  await finished(Readable.fromWeb(res.body).pipe(fileStream));
								} catch (e) {
									throw new Error("Ошибка" + e);
								}
							}
							image.url = `https://${api}/file=${image.name}`; // URL картинки
							image.upscale = (scaleGuidanceUpscale) => new Promise(function(resolve, reject) { // Апскейл
								ws = new WebSocket(`wss://${api}/queue/join`);
								
								ws.on('message', async data => {
									json = JSON.parse(data);
									
									switch(json.msg) {
										case 'send_hash':
											ws.send(JSON.stringify({ fn_index: 34, session_hash: hash }));
											break;
										case 'queue_full':
											reject({ message: 'queue_full' });
											break;
										case 'send_data':
											ws.send(JSON.stringify({ fn_index: 34, data: [temp, index, Math.floor(Math.random() * 100000000), 4, "smart50", 50, prompt, negative, Math.floor(Math.random() * 100000000), scaleGuidanceUpscale, 40], event_data: null, session_hash: hash }));
											break;
										case 'process_completed':
											try {
												let imageBuffer = Buffer.from(json.output.data[0].replace(/^data:image\/png;base64,/, ""), "base64");
											
												imageBuffer.download = async (name = `upscale-${image.name.slice(5)}`) => await fs.writeFileSync(name + '.png', imageBuffer); // Скачать апскейл
											
												resolve(imageBuffer);
											} catch (e) {
												reject({ message: 'bad space index' });
											}
											break;
									}
								});
							});
							return image;
						}));
						break;
				}
			});
		});
	}
}
