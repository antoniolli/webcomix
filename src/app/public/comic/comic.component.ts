import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../services/comic.service';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '../../models/comic';
import { Page } from '../../models/page';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})

export class ComicComponent implements OnInit {
  comicId: string;
  comic: Comic;
  selectedPage: Page;
  pageSample: string = "./assets/page_sample.jpg"

  pageControl = new FormControl();

  comments = [
    {
      author: "Joãozinho",
      message: "Oi tudo bem?"
    },
    {
      author: "Mariazinha",
      message: "Tá chovendo aí? Aqui ta chovendoTá chovendo aí? Aqui ta chovendoTá chovendo aí? Aqui ta chovendoTá chovendo aí? Aqui ta chovendoTá chovendo aí? Aqui ta chovendoTá chovendo aí? Aqui ta chovendoTá chovendo aí? Aqui ta chovendoTá chovendo aí? Aqui ta chovendoTá chovendo aí? Aqui ta chovendo"
    },
  ];

  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    ) {
      this.route.params.subscribe( params => this.comicId = params.idComic );
  }

  ngOnInit() {
    this.comicService.getComic(this.comicId).subscribe(comic => {
      this.comic = comic
      this.selectedPage = this.comic.pages[this.comic.pages.length -1];
      this.pageControl.setValue(this.selectedPage.title);
		}, error => console.log(error))
  }

  onSelectedPageChange(index: number){
    this.selectedPage = this.comic.pages[index];
    this.pageControl.setValue(this.selectedPage.title);
  }

  goNext(){
    let nextIndex = this.comic.pages.findIndex(page => page == this.selectedPage) + 1
    this.selectedPage = this.comic.pages[nextIndex]
    this.pageControl.setValue(this.selectedPage.title);
  }

  goBack() {
    let nextIndex = this.comic.pages.findIndex(page => page == this.selectedPage) - 1
    this.selectedPage = this.comic.pages[nextIndex]
    this.pageControl.setValue(this.selectedPage.title);
  }

  markAsFavorite() {

  }
}
