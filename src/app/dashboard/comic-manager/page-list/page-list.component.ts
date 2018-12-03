import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Comic } from '../../../models/comic';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  
  @Input('comic') comic: Comic

  PageItems = 'PageItems'
  page_sample: string = "./assets/page_sample.jpg"
  pageList: Array<Page>
  subs = new Subscription();

  constructor(
    private router: Router,
    private pageService: PageService,
    private route: ActivatedRoute,
    private dragulaService: DragulaService) {
    this.subs.add(dragulaService.dropModel(this.PageItems)
      .subscribe(({targetModel, item}) => {
        targetModel.forEach((page, i) => {
           page.number = i;
           this.pageService.updateNumberPage(page, this.comic.id).subscribe(r => {
             let t = r;
           })
        })
        console.log(this.pageList);
      })
    );

  }

  ngOnInit() {
    this.reloadComicPages()
  }

  deletePage(pageId: number) {
    this.pageService.deletePage(this.comic.id, pageId).subscribe(response => {
      this.reloadComicPages()
    })
  }

  reloadComicPages() {
    this.pageService.getPages(this.comic.id).subscribe(pages => {
      this.pageList = pages.sort((x,y) => x.number - y.number)
    }, error => console.log(error))
  }

  goToCreatePage() {
    this.router.navigateByUrl(`dashboard/comics/${this.comic.id}/pages`);
  }

}
