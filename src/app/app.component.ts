import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from './services/firebase.service'
import { DialogGame } from './models/game'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-launcher'
  games: any
  value: string = ""
  searchText: string = '';

  constructor(private fire: FirebaseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fire.getGames().subscribe(temp => {
      this.games = temp
    })
  }

  openAddGameDialog(): void {
    const addGame = this.dialog.open(AddGameModal, {
      width: '500px',
      data: {
        tmp: {
          name: "",
          version: "",
          link: "",
          img: ""
        }
      }
    });
    addGame.afterClosed().subscribe(result => {
      try {
        this.fire.addGame(result)
      } catch (e) {
        console.log(`Error: ${e}`)
      }
    });
  }
}

@Component({
  selector: 'add-game-dialog',
  templateUrl: './Modals/addGame.dialog.html'
})
export class AddGameModal {
  constructor(public dialogRef: MatDialogRef<AddGameModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogGame) { }
  no(): void { //Yes, I know. Creative name
    this.dialogRef.close()
  }
}