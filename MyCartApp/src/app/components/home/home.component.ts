import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  isCollapsed = false;
  isAuthenticated:boolean=false;
  username:string |null|undefined;
  constructor(private authService:AuthService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
   this.authService.isAuthenticated().subscribe((authState:boolean)=>{
    this.isAuthenticated=authState;
    this.cdr.detectChanges();//manually trigger change detection
   });
   this.authService.getUsername().subscribe((username:string |null|undefined)=>{
    this.username=username;
    this.cdr.detectChanges();
   });
  }

}
