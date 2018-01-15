import { Injectable } from '@angular/core';

@Injectable()
export class LangService {

    setLang(lang: string) {
        if (lang) {
            sessionStorage.setItem("language", lang);
        } else {
            sessionStorage.removeItem("language");
        }
    }
    get getLang(): string {
        return sessionStorage.getItem("language");
    }
}

