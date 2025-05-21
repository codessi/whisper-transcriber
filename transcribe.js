require('dotenv').config();
const speech = require('@google-cloud/speech');
const fs = require('fs');

async function transcribeAudio(filePath) {
  // Creates a client
  const client = new speech.SpeechClient();

  // Reads the audio file
  const audioBytes = fs.readFileSync(filePath).toString('base64');

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };

  const request = {
    audio: audio,
    config: config,
  };

  try {
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    
    console.log('✅ Transcription:\n', transcription);
  } catch (error) {
    console.error('❌ Error transcribing:', error.message);
  }
}

// 👇 Call it here with an audio file (MP3, M4A, etc.)
transcribeAudio('./test.wav');
