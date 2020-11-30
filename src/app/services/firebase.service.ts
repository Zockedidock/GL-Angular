import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from '../models/game'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  gamesCollection
  games
  //gamesObserv = this.afs.collection("Games").valueChanges()

  constructor(private afs: AngularFirestore) {
    this.gamesCollection = this.afs.collection("Games")
    this.games = this.gamesCollection.valueChanges({ idField: 'id' })
  }

  getGames() {
    return this.games
  }

  addGame(gameTemp) {
    this.gamesCollection.add(gameTemp)
  }
}
