AFRAME.registerComponent('dancing', {
  init: function () {
    var textElement = this.textElement = document.getElementById('centeredText');
    var counter0 = this.counter0 = document.getElementById('counter0');
    var counter1 = this.counter1 = document.getElementById('counter1');

    this.dancingTime = this.el.getAttribute('game-state').dancingTime;

    textElement.setAttribute('visible', true);
    textElement.setAttribute('text', {value: 'Dance!', opacity: 1});
    var object = { opacity: 1.0 };
    new AFRAME.TWEEN.Tween(object)
      .to({opacity: 0.0}, 500)
      .delay(300)
      .onUpdate(function () {
        textElement.setAttribute('text', {opacity: object.opacity});
      })
      .onComplete(function () {
        textElement.setAttribute('visible', false);
      })
      .start();

    counter0.setAttribute('text', {value: this.dancingTime.toString()});
    counter1.setAttribute('text', {value: this.dancingTime.toString()});
    counter0.setAttribute('visible', true);
    counter1.setAttribute('visible', true);

    this.countdown = this.countdown.bind(this);
    this.el.components['avatar-recorder'].startRecording();
    this.interval = window.setInterval(this.countdown, 1000);
  },

  countdown: function () {
    this.dancingTime--;
    this.counter0.setAttribute('text', {value: this.dancingTime.toString()});
    this.counter1.setAttribute('text', {value: this.dancingTime.toString()});

    this.el.setAttribute('game-state', 'dancingTime', this.dancingTime);
    if (this.dancingTime === 0) {
      window.clearInterval(this.interval);
      this.el.components['avatar-recorder'].stopRecording();
    }
    this.el.setAttribute('game-state', 'dancingTime', this.dancingTime);
  },

  remove: function () {
    this.textElement.setAttribute('visible', false);
    this.counter0.setAttribute('visible', false);
    this.counter1.setAttribute('visible', false);
  }
});
