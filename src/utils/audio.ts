/**
 * Audio synthesis using standard Web Audio API for luxury tactile feedback.
 * No external sound files needed; zero latency and crystal clear.
 */

class LuxuryAudioController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Delicate crystal bottle clink / luxury chime when picking a polish
   */
  public playBottleSelect() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Primary glass chime oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft harmonic overtones
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, now);
      osc.frequency.exponentialRampToValueAtTime(1860, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      // Highpass to eliminate any rumble
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);

      // Secondary overtone for crystal brilliance
      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(2960, now);

      overtoneGain.gain.setValueAtTime(0.001, now);
      overtoneGain.gain.linearRampToValueAtTime(0.03, now + 0.015);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      overtone.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);

      overtone.start(now);
      overtone.stop(now + 0.3);
    } catch {
      // Audio autoplay policy catch
    }
  }

  /**
   * Subtle soft tactile click for zoom and finger selection
   */
  public playSoftClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Silent catch
    }
  }

  /**
   * Toggle gentle ambient spa drone (peaceful warm resonant chords)
   */
  public toggleAmbient(): boolean {
    const ctx = this.getContext();
    if (!ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      }
      setTimeout(() => {
        try {
          this.ambientOsc?.stop();
          this.ambientOsc?.disconnect();
          this.ambientGain?.disconnect();
        } catch {
          // ignore
        }
        this.ambientOsc = null;
        this.ambientGain = null;
        this.isAmbientPlaying = false;
      }, 900);
      return false;
    } else {
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(216, now); // 432 Hz octave

        // Gentle filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(480, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 2.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        this.ambientOsc = osc;
        this.ambientGain = gain;
        this.isAmbientPlaying = true;
        return true;
      } catch {
        return false;
      }
    }
  }

  public getAmbientState(): boolean {
    return this.isAmbientPlaying;
  }
}

export const luxuryAudio = new LuxuryAudioController();
