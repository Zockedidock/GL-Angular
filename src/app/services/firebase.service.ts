import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collection: string
  gamesCollection: any
  games: any
  //gamesObserv = this.afs.collection("Games").valueChanges()

  constructor(private afs: AngularFirestore) {
    this.setCollection('Games')
  }

  getGames(): any {
    return this.games
  }

  setCollection(col: string): void {
    this.collection = col
    this.gamesCollection = this.afs.collection(this.collection)
    this.games = this.gamesCollection
      .valueChanges({ idField: 'id' })
  }

  addGame(gameTemp: any): void {
    this.gamesCollection.add(gameTemp)
  }

  removeGame(gameObj: any): void {
    this.gamesCollection.doc(gameObj.id).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  }

}
