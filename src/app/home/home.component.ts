import { Component, OnInit } from '@angular/core';

// Services
import { ComicService } from '../services/comic.service';

// Models
import { Comic } from '../models/comic';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	comicList: Array<Comic>

	constructor(private comicService: ComicService) { }

	ngOnInit() {
		this.comicService.getComics().subscribe(comics => {
			this.comicList = comics;
		}, error => console.log(error))
	}

}
