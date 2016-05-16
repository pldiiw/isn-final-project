"use strict";

function AudioData () {

  this.audioContext = new window.AudioContext();

  this.musicSource = document.querySelector('#music');
  this.source = this.audioContext.createMediaElementSource(this.musicSource);

  // high freqs
  // create the high frequencies filter
  this.highpass = this.audioContext.createBiquadFilter();
  this.highpass.type = "highpass";
  this.highpass.frequency.value = 10000;

  // create the linked analyzer and two arrays that will received the data of
  // the analysis
  this.highAnalyser = this.audioContext.createAnalyser();
  this.highFrequencyData = new Uint8Array(this.highAnalyser.fftSize);
  this.highTimeDomainData = new Uint8Array(this.highAnalyser.fftSize);

  // routing
  this.source.connect(this.highpass);
  this.highpass.connect(this.highAnalyser);

  // medium freqs
  // same as for the high frequencies
  this.bandpass = this.audioContext.createBiquadFilter();
  this.bandpass.type = "bandpass";
  this.bandpass.frequency.value = 4750;

  this.bandpassAnalyser = this.audioContext.createAnalyser();
  this.mediumFrequencyData = new Uint8Array(this.bandpassAnalyser.fftSize);
  this.mediumTimeDomainData = new Uint8Array(this.bandpassAnalyser.fftSize);

  this.source.connect(this.bandpass);
  this.bandpass.connect(this.bandpassAnalyser);

  // low freqs
  // same as for the medium and high frenquencies
  this.lowpass = this.audioContext.createBiquadFilter();
  this.lowpass.type = "lowpass";
  this.lowpass.frequency.value = 500;

  this.lowAnalyser = this.audioContext.createAnalyser();
  this.lowFrequencyData = new Uint8Array(this.lowAnalyser.fftSize);
  this.lowTimeDomainData = new Uint8Array(this.lowAnalyser.fftSize);

  this.source.connect(this.lowpass);
  this.lowpass.connect(this.lowAnalyser);

  // all freqs
  // same, again
  // no filter needed here, as we need all the frequencies
  this.allAnalyser = this.audioContext.createAnalyser();
  this.allFrequencyData = new Uint8Array(this.allAnalyser.fftSize);
  this.allTimeDomainData = new Uint8Array(this.allAnalyser.fftSize);

  this.source.connect(this.allAnalyser);

  // finally, route the source to the audio context's destination
  this.source.connect(this.audioContext.destination);

};

// Now that all the instantiation and routing is done, we have to create
// an update function that will have to be called at every browser's frame to
// process the new incoming audio and assign it to the arrays receiving the
// analysis.
// As it is a function, we have to create it in the audioData prototype.

AudioData.prototype.update = () => {
  // update high freqs
  this.highAnalyser.getByteFrequencyData(this.highFrequencyData);
  this.highAnalyser.getByteTimeDomainData(this.highTimeDomainData);
  // update medium freqs
  this.bandpassAnalyser.getByteFrequencyData(this.mediumFrequencyData);
  this.bandpassAnalyser.getByteTimeDomainData(this.mediumTimeDomainData);
  // update low freqs
  this.lowAnalyser.getByteFrequencyData(this.lowFrequencyData);
  this.lowAnalyser.getByteTimeDomainData(this.lowTimeDomainData);
}
