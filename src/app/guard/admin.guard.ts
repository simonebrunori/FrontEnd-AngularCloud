import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {


    type;


    constructor(private authService: AuthService,
                private router: Router    
    ){
        this.type=localStorage.getItem('type'); //Get type from localstorage
    }

    //Function to check if user is authorized to view route
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        //Check if the user is logged in
        if(this.type==='A'){
            return true;    // Return true: User is allowed to view route
        }else{
            this.router.navigate(['/dashboard/home']);   //return error and route to login page
            return false;   // Return false: user not authorized to view page    
        }
    }
}