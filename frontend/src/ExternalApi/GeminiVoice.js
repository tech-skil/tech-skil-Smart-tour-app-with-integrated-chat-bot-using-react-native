import Voice from "@react-native-voice/voice";
import Tts from "react-native-tts"; // For Text-to-Speech

class GeminiVoice {
  constructor() {
    // Bind methods
    this.onSpeechResults = this.onSpeechResults.bind(this);
    this.onSpeechError = this.onSpeechError.bind(this);

    // Set up Voice event listeners
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechError = this.onSpeechError;
  }

  recognizedText = "";

  // Start Speech Recognition
  async startRecognition() {
    try {
      const permissionGranted = await requestMicrophonePermission();
      if (!permissionGranted) {
        throw new Error("Microphone permission denied");
      }
      await Voice.start("en-US");
      console.log("Voice recognition started");
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      throw error; // Rethrow to handle in calling code
    }
  }

  // Stop Speech Recognition
  async stopRecognition() {
    try {
      await Voice.stop();
      console.log("Voice recognition stopped");
      return this.recognizedText;
    } catch (error) {
      console.error("Error stopping voice recognition:", error);
      return null;
    }
  }

  // Handle Speech-to-Text Results
  onSpeechResults(event) {
    if (event.value && event.value.length > 0) {
      this.recognizedText = event.value[0];
      console.log("Recognized Text:", this.recognizedText);
    }
  }

  // Handle Errors in Speech Recognition
  onSpeechError(error) {
    console.error("Speech recognition error:", error);
  }

  // Speak Text (Text-to-Speech)
  speak(text) {
    Tts.speak(text);
    console.log("Speaking:", text);
  }
}

export default new GeminiVoice();
