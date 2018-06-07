import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class NotAdminGuard implements CanActivate {

    type;


    constructor(private authService: AuthService,
                private router: Router    
    ){
        this.type=localStorage.getItem('type'); //Get type from localstorage
    }

    //Function to determine whether user is authorized to view route
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        //Check if the user is logged in
        if(this.type==='A'){
            this.router.navigate(['dashboard/home/']); // Return error, route to login
            return false;    // Return false: user not allowed to view route
        }else{
            return true;   // Return true: user is allowed to view route  
        }
    }
}