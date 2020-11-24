import { Component } from '@angular/core';
import { games } from '../games'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-launcher'
  games = games
}
