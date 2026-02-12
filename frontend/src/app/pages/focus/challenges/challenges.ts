import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './challenges.html',
  styleUrls: ['./challenges.scss'],
})
export class ChallengesComponent {}
