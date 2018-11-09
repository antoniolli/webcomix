import { Component, OnInit } from '@angular/core';

// Services
import { ComicService } from '../services/comic.service';

// Models
import { Comic } from '../models/comic';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	cover_sample: string = "./assets/cover_sample.jpg"
	comicList: Array<Comic> = []

	constructor(private router: Router, private comicService: ComicService) { }

	ngOnInit() {
		this.comicService.getComics().subscribe(comics => {
			for(var i=0;i < 10;i++){
				this.comicList.push(comics[0])
			}
		}, error => console.log(error))
	}

	goToComic(comic_id: number){
		this.router.navigateByUrl('comics/' + comic_id)
	}

}
