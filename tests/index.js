const { pipeline, env } = require('..');
const fs = require('fs');
var AudioContext = require('web-audio-api').AudioContext,
  context = new AudioContext();

// Only use local models
env.remoteModels = false;
// env.remoteModels = true; // Uncomment to test online

async function speech2text_generation() {
  // TODO add test case
  let filePath = `d:/Users/Dimq1/source/OpenAI/transformers.js/assets/audio/zapis-razgovora-vika-elina-zvonit-mne_.wav`;

  // fs.readFile(filePath, (err, data) => {
  //   if (err) throw err;
  //   context.decodeAudioData(data.buffer, (err) => {
  //     console.error(err);
  //   });
  // });

  let transcriber = await pipeline(
    'automatic-speech-recognition',
    'whisper-medium'
  );
  let output = await transcriber(filePath);
  console.log(output);

  return [true, 0];
}

// hide unused initializer and node arguments warnings
console._warn = console.warn;
console.warn = (...data) => {
  if (!data[0].includes('CleanUnusedInitializersAndNodeArgs')) {
    console._warn(...data);
  }
};

// Define tests
let tests = {
  'Speech-to-text generation:': speech2text_generation,
};

// run tests
(async () => {
  let results = {};
  for (const [name, fn] of Object.entries(tests)) {
    results[name] = await fn();
    console.log(name, results[name]);
  }

  // Display final results in a table
  console.table(results);
})();
