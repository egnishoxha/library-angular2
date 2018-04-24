import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule,Http } from "@angular/http";

import {HttpClientModule, HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { TranslateCacheModule, TranslateCacheSettings, TranslateCacheService } from 'ngx-translate-cache';
import {TranslateService} from "@ngx-translate/core";

// used to create fake backend
import { fakeBackendProvider } from './helpers/app.fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AuthGuard } from "./infrastructure/routing/auth.guard";
import { routing } from "./infrastructure/routing/app.routing";

import { ConfirmDialogModule, ConfirmationService } from "primeng/primeng";
import { DialogDisplayService } from "./infrastructure/services/clientAPI/dialog-display.service";

import { UserService } from "./infrastructure/services/webAPI/user.service";
import { AuthenticationService } from './infrastructure/services/clientAPI/authentication.service';
import { LangService } from "./infrastructure/services/clientAPI/multi-lang.service";
import { TreeModule, DataTableModule, DataListModule, EditorModule, CheckboxModule, RadioButtonModule, DataScrollerModule, FieldsetModule, SharedModule, InputTextModule, ButtonModule, DropdownModule, DialogModule, PanelModule, GrowlModule, MenuModule } from "primeng/primeng";
import { AuthorsComponent } from './components/authors/authors.component';
import { AddAuthorFormComponent } from './directives/add-author-form/add-author-form.component';
import { RegisterComponent } from './components/register/register.component';
import { AddBookFormComponent } from './directives/add-book-form/add-book-form.component';
import { BookDetailComponent } from './components/books/book-detail/book-detail.component';

// AoT requires an exported function for factories
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
export function TranslateCacheFactory(translateService, translateCacheSettings) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    LoginComponent,
    MenuComponent,
    AuthorsComponent,
    AddAuthorFormComponent,
    RegisterComponent,
    AddBookFormComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    HttpClientModule,    
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: TranslateCacheFactory,
        deps: [ TranslateService, TranslateCacheSettings ]
      }
    }),
    routing,
    NoopAnimationsModule,
    DataScrollerModule,
    TreeModule,  
    DataTableModule,
    DataListModule,
    CheckboxModule,
    RadioButtonModule,
    FieldsetModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    PanelModule,
    GrowlModule,
    MenuModule,
    ConfirmDialogModule,
    EditorModule
  ],
 
  providers: [
    AuthGuard,            
    DialogDisplayService,
    UserService,
    AuthenticationService,
    LangService,
    ConfirmationService,
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
