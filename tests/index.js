const { pipeline, env } = require('..');

// Only use local models
env.remoteModels = false;
// env.remoteModels = true; // Uncomment to test online

async function speech2text_generation() {
  // TODO add test case
  let audio =
    'd:\\Users\\Dimq1\\source\\OpenAI\\transformers.js\\assets\\audio\\jfk.wav ';
  let transcriber = await pipeline('automatic-speech-recognition');
  let output = await transcriber(audio);
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
