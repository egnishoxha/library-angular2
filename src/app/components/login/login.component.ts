import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { User } from "../../dataModel/User";
import { IUserSearchRequest } from "./../../infrastructure/services/webAPI/UserSearchRequest";

import { AuthenticationService } from './../../infrastructure/services/clientAPI/authentication.service';
import { LangService } from "../../infrastructure/services/clientAPI/multi-lang.service";
import { UserService } from "../../infrastructure/services/webAPI/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    
    returnUrl: string;
    private user: User;
    private userSearchRequest: IUserSearchRequest = {};
    
    constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _authenticationService: AuthenticationService,
      private _langService: LangService,
      private _userSevice: UserService      
      
    ) { }

    ngOnInit() {
        this._authenticationService.logout();
        //Set return url
        this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/books";

        this._langService.setLang(null);        
        this.userSearchRequest = {
            userName: "",
            password: ""
        }
    }

    login(searchRequest: IUserSearchRequest, isValid: boolean, form: NgForm) {
        if (isValid) {
            this._authenticationService.login(searchRequest.userName, searchRequest.password)
                .subscribe(
                    data =>{
                        this._router.navigateByUrl(this.returnUrl);
                    },
                    error => {
                        console.log("ERROR login: ", error);
                        alert("ERROR login: ");
                    }
                );
        } else {
            alert("Unknown Error Login!");
        }
        form.reset();
    }
}
