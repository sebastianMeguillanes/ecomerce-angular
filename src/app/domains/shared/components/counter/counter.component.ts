import { Component, Input, signal, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'] // styleUrl debe ser styleUrls, en plural
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: number = 0;

  constructor() {
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('CounterComponent changes');
    console.log(changes);
    const duration = changes['duration'];
    if (duration) {
      this.doSomething();
    }
  }

  doSomething() {
    console.log('doSomething');
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration', this.duration);
    console.log('message', this.message);
    
    // Verifica si window está definido
    if (typeof window !== 'undefined') {
      this.counterRef = window.setInterval(() => {
        this.counter.update(statePrev => statePrev + 1);
      }, 1000);
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));

    if (typeof window !== 'undefined') {
      window.clearInterval(this.counterRef);
    }
  }
}
