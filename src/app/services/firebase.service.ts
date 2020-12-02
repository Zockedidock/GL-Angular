import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  gamesCollection
  games
  //gamesObserv = this.afs.collection("Games").valueChanges()

  constructor(private afs: AngularFirestore) {
    this.gamesCollection = this.afs.collection("Games")
    this.games = this.gamesCollection
      .valueChanges({ idField: 'id' })
  }

  getGames() {
    return this.games
  }

  addGame(gameTemp) {
    this.gamesCollection.add(gameTemp)
  }
}
