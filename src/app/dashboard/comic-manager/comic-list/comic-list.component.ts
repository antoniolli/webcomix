import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComicService } from '../../../services/comic.service';
import { Comic } from '../../../models/comic';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {

  cover_sample: string = "./assets/cover_sample.jpg"
	comicList: Array<Comic>

	constructor(private router: Router, private comicService: ComicService) { }

	ngOnInit() {
		this.reloadMyComics()
	}

	goToEditComic(comicId: number){
		this.router.navigateByUrl(`dashboard/comics/${comicId}`)
  }
  
  deleteComic(comicId: number) {
      this.comicService.deleteComic(comicId).subscribe(response => {
        this.reloadMyComics()
      })
  }
  
  reloadMyComics() {
    this.comicService.getMyComics().subscribe(comics => {
			this.comicList = comics
		}, error => console.log(error))
  }

}
