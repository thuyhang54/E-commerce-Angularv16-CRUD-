import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from './auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // xác thực người dùng
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  constructor(private router: Router) { }
  // init users
  Users: any[] = [
    { email: "itc.edu@gmail.com", password: "123456789" },
  ];
   // Login
  Login( form: LoginForm){
    // kiểm tra nếu valueemail, valuepassword của LoginForm === với user đã khởi tạo
    if(form.email === this.Users[0].email && form.password === this.Users[0].password){
      this.isAuthenticated= true;
     alert("Login success");
      // Login thành công đưa về Home hoặc products
      this.router.navigate(['/list']);
    }else{
      alert("Email or Password is incorrect!");
      this.isAuthenticated = false;
      this.router.navigate(['/login']);
    }
  }
  // Logout
  LogOut(){
    this.isAuthenticated=false;
    this.router.navigate(['/login']);
  }
  // Sign in
  Register( form : RegisterForm){
    if(form.password !== form.comfirm_password)
      return alert('Password does not match!');
    
    alert ('Sign up susccess')
    this.Users.push(form);
    this.router.navigate(['/login']);
    this.isAuthenticated = true;
    
  console.log(form);
  }
}

