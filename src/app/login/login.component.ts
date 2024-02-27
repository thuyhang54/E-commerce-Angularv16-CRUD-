import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginF : FormGroup = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required)
  
});
constructor(private loginSrv: LoginService){}
onLogin(): void {
  if (this.loginF.invalid){ return;}
  this.loginSrv.login(this.loginF.value).subscribe((data : any) => {
  console.log(data);

});

  
}
}
