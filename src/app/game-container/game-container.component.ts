import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-game-container',
    //templateUrl: './game-container.component.html',
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
                <button *ngIf="show" (click)="name = 'Thanks!'" mat-button> Click me </button>
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

    show: Boolean = true

    constructor() {}

    ngOnInit() {
        
    }

    hide() {
        this.show = false
    }
}