import { Component, OnInit, Input, Inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service'
import { Game } from '../models/game'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-game-container',
    // templateUrl: './game-container.component.html',
    styleUrls: ['./game-container.component.scss'],
    template: `
        <div class="parent">
            <div class="img">
                <img src="{{ imgSrc }}" alt="{{ name }}">
            </div>
            <div class="name">
                <a href="{{ link }}"><h3> {{ name }} </h3></a>
            </div>
            <div>
                <button *ngIf="show" (click)="openRemoveGameDialog()" mat-button> Remove </button>
            </div>
            <div class="version">
                <p> Version:  {{ version }} </p>
            </div>
        </div>
    `
})

export class GameContainerComponent implements OnInit {

    @Input() imgSrc: string
    @Input() version: string
    @Input() name: string
    @Input() link: string
    @Input() searchText: string
    @Input() obj: Game

    show: boolean = true

    constructor(private fire: FirebaseService, public dialog: MatDialog) { }

    ngOnInit(): void {

    }

    openRemoveGameDialog(): void {
        const removeGame = this.dialog.open(RemoveGameModal, {
            width: '400px',
            data: {
                heading: "Are you sure?",
                close: false
            }
        });
        removeGame.afterClosed().subscribe(result => {
            let tmp = this.obj.id
            console.log(tmp)
            if (result.close) {
                this.obj.id = ''
            }

            try {
                this.fire.removeGame(this.obj)
            } catch (e) {
                console.log(`Error: ${e}`)
            }
            this.obj.id = tmp
        });
    }
}

@Component({
    selector: 'remove-game-dialog',
    templateUrl: '../Modals/removeGame.dialog.html'
})
export class RemoveGameModal {
    constructor(public dialogRef: MatDialogRef<RemoveGameModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    no(): void { // Yes, I know. Creative name
        this.dialogRef.close()
    }
}