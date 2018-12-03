import { Component, OnInit } from '@angular/core';
import { Comic } from '../../models/comic';
import { Router } from '@angular/router';
import { ComicService } from '../../services/comic.service';

@Component({
  selector: 'app-favorites-manager',
  templateUrl: './favorites-manager.component.html',
  styleUrls: ['./favorites-manager.component.scss']
})
export class FavoritesManagerComponent implements OnInit {

  cover_sample: string = "./assets/cover_sample.jpg"
	comicList: Array<Comic>

	constructor(private router: Router, private comicService: ComicService) { }

	ngOnInit() {
		this.reloadFavorites()
	}

	goToComic(comicId: number){
		this.router.navigateByUrl('comics/' + comicId)
  }
  
  deleteFromFavorite(comicId: number) {
      this.comicService.deleteFavorite(comicId).subscribe(response => {
        this.reloadFavorites()
      })
  }
  
  reloadFavorites() {
    this.comicService.getFavorites().subscribe(comics => {
			this.comicList = comics
		}, error => console.log(error))
  }
  
}
