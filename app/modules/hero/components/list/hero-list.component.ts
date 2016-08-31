import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { HeroDetailComponent } from '../detail/hero-detail.component';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';

@Component({
    selector:   'my-heroes',
    styleUrls: ['app/modules/hero/components/list/hero-list.component.css'],
    templateUrl: 'app/modules/hero/components/list/hero-list.component.html',
    directives: [HeroDetailComponent]
})
export class HeroListComponent implements OnInit {
    heroList: Hero[];
    selectedHero: Hero;
    addingHero:boolean = false;
    error: any;

    constructor(
        private router: Router,
        private heroService: HeroService) {
    }

    getHeroes() {
        this.heroService
            .getHeroes()
            .then(heroes => this.heroList = heroes)
            .catch(error => this.error = error); // TODO: Display error message
    }
    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }
    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }
    delete(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroList = this.heroList.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            })
            .catch(error => this.error = error); // TODO: Display error message
    }
    ngOnInit() {
        this.getHeroes();
    }
    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    }
    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}
