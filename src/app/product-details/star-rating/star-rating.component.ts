import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() Rating: number = 0;
  starWidth: number = 0;

  constructor() {
    this.Rating = 5;
    this.starWidth = this.Rating * 90 / 5;
  }

  ngOnChanges(): void {
    this.starWidth = this.Rating * 90 / 5;
  }
}
