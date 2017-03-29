import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pages'
})
export class PagesPipe implements PipeTransform {

    transform(items:any[], pageNumber?:number, itemsPerPage?:number):any {
        if (!pageNumber || !itemsPerPage) {
            return items;
        }

        if (!items) {
            return [];
        }

        let lower:number = (pageNumber - 1) * itemsPerPage;
        let upper:number = (pageNumber) * itemsPerPage;

        return items.filter((item, index) => (index >= lower && index < upper));
    }

}
