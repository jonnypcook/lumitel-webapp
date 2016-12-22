import { Component, OnInit }            from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

    public date:Date;
    public disabled:boolean = false;
    public status:{isopen:boolean} = {isopen: false};

    constructor() {}

    public toggled(open:boolean):void {
        //console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        //console.log('up');
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit():void {
        this.date = new Date();
    }
}
