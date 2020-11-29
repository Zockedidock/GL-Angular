import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { games } from '../games'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-launcher'
  gamesObserv = this.store.collection("Games").valueChanges({ idField: 'id' })
  games;

  constructor( private store: AngularFirestore ) { }
  ngOnInit() {
    this.gamesObserv.subscribe(games => {
      this.games = games
    })
  }
}
