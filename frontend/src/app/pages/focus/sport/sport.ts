import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sport.html',
  styleUrls: ['./sport.scss'],
})
export class SportComponent {}
