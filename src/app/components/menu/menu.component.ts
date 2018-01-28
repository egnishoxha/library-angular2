import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from "../../infrastructure/services/clientAPI/multi-lang.service";

@Component({
    selector: 'sidenav-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    routes:any[] = [];
    logoPath: string;
  
    constructor(
        public _translateService: TranslateService,
        public _langService: LangService
    ) {
        //check for current lang set, otherwise pick up French language by default
        if (_langService.getLang) {
            _translateService.setDefaultLang(_langService.getLang);
            _translateService.use(_langService.getLang);
        } else {
            _translateService.setDefaultLang("fr");
            _translateService.use("fr");
            _langService.setLang("fr");
        }    
    }

    ngOnInit() {
        this.loadRoutes();
        this.logoPath = "./assets/images/img_avatar3.png";
    }

    loadRoutes(){
        this.routes = [
            {path: "/books", title: "Books", iconClass:"fa fa-book"},
            {path: "/authors", title: "Authors", iconClass:"fa fa-user"},
            {path: "/files", title: "File Manager", iconClass:"fa fa-file"}
        ];
    }
    
    switchLanguage = (lang: string) => {  
        this._translateService.setDefaultLang(lang);
        this._translateService.use(lang);
        this._langService.setLang(lang);        
    }

}
