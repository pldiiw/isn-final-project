'use strict';

function AudioData () {

  this.audioContext = new window.AudioContext();

  this.source = {};
  this.source.element = document.querySelector('#music');
  this.source.signal = this.audioContext.createMediaElementSource(
    this.source.element
  );

  let template = {};
  template.filter = this.audioContext.createBiquadFilter();
  template.analyser = this.audioContext.createAnalyser();
  template.analyser.smoothingTimeConstant = 0;
  template.frequencyData = new Uint8Array(2048);
  template.timeDomainData = new Uint8Array(2048);

  this.high = template;
  this.high.filter.type = 'highpass';
  this.high.filter.frequency.value = 10000;
  this.source.signal.connect(this.high.filter);
  this.high.filter.connect(this.high.analyser);

  this.medium = template;
  this.medium.filter.type = 'bandpass';
  this.medium.filter.frequency.value = 4750;
  this.source.signal.connect(this.medium.filter);
  this.medium.filter.connect(this.medium.analyser);

  this.low = template;
  this.low.filter.type = 'lowpass';
  this.low.filter.frequency.value = 200;
  this.source.signal.connect(this.low.filter);
  this.low.filter.connect(this.low.analyser);

  this.all = template;
  this.all.filter.type = 'allpass';
  this.source.signal.connect(this.all.filter);
  this.all.filter.connect(this.all.analyser);

  this.all.filter.connect(this.audioContext.destination);
}

AudioData.prototype.update = function () {
  this.high.analyser.getByteFrequencyData(this.high.frequencyData);
  this.high.analyser.getByteTimeDomainData(this.high.timeDomainData);
  this.medium.analyser.getByteFrequencyData(this.medium.frequencyData);
  this.medium.analyser.getByteTimeDomainData(this.medium.timeDomainData);
  this.low.analyser.getByteFrequencyData(this.low.frequencyData);
  this.low.analyser.getByteTimeDomainData(this.low.timeDomainData);
  this.all.analyser.getByteFrequencyData(this.all.frequencyData);
  this.all.analyser.getByteTimeDomainData(this.all.timeDomainData);
};
