import { Component,signal,ElementRef,Input,AfterViewInit, ViewChild,OnDestroy  } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave', { static: false }) container!: ElementRef;
  private waveSurfer: WaveSurfer | null = null;
  isPlaying = signal(false);

  ngAfterViewInit() {
    // Verifica si estás en el entorno del navegador
    if (typeof window !== 'undefined') {
      this.waveSurfer = WaveSurfer.create({
        container: this.container.nativeElement,
        waveColor: 'violet',
        progressColor: 'purple'
      });
      this.waveSurfer.load(this.audioUrl);
      this.waveSurfer.on('play', () => this.isPlaying.set(true));
      this.waveSurfer.on('pause', () => this.isPlaying.set(false));
    }
  }

  playPause() {
    if (this.waveSurfer) {
      this.waveSurfer.playPause();
    }
  }

  ngOnDestroy() {
    // Limpia la instancia de WaveSurfer si fue creada
    if (this.waveSurfer) {
      this.waveSurfer.destroy();
      this.waveSurfer = null;
    }
  }
}