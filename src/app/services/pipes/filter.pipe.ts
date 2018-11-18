import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        //TODO - Buscar seviço de busca de webcomics por titulo ou nome do autor
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.name.toLowerCase().includes(searchText);
        });
    }

}
