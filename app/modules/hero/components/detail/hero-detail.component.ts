import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { HeroService } from '../../services/hero.service';

import { Hero } from '../../models/hero.model';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/modules/hero/components/detail/hero-detail.component.html',
    styleUrls: ['app/modules/hero/components/detail/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    constructor(
        private heroService: HeroService,
        private routeParams: RouteParams) {
    }

    ngOnInit() {
        if (this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id');
            this.navigated = true;
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }
    
    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) { window.history.back(); }
    }
    
    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }
}