import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterForm } from '../auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 registerForm: RegisterForm = { email: '', password:'', comfirm_password:''}
 constructor(private authService: AuthService){}
 onSubmit(){
  this.authService.Register(this.registerForm);
 }
}
