import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../services/comic.service';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '../../models/comic';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  comicId: string;
  comic: Comic;
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    ) {
      this.route.params.subscribe( params => this.comicId = params.idComic );
  }

  ngOnInit() {
    this.comicService.getComic(this.comicId).subscribe(comic => {
			this.comic = comic
		}, error => console.log(error))
  }
}
