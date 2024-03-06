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
 onSubmit() : void{
  if(this.registerForm.password !== this.registerForm.comfirm_password){
    alert('Mật khẩu không khớp với mật khẩu xác nhận. Vui lòng nhập lại.');
    return;
  }
  this.authService.register(this.registerForm);
 }
}
