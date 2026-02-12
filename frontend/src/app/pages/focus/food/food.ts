import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './food.html',
  styleUrls: ['./food.scss'],
})
export class FoodComponent {}
