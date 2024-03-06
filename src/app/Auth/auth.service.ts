import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from './auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // xác thực người dùng
  isAuthenticated: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private http : HttpClient) { 
    // Get the initial users
    this.getUsers().subscribe((users : LoginForm[])=>{
      this.Users=users;
      console.log(this.Users);
      
    })
    }
    // Get Users from the API
  private getUsers(): Observable<LoginForm[]>{
    return this.http.get<LoginForm[]>(this.baseURL);
  }
  // init users
  Users: any[] = [];
  private baseURL = `http://localhost:3000/users`;
   // Login
   login(form: LoginForm) {
    // Giả sử API của bạn có một điểm cuối để xác thực người dùng
    this.getUsers().subscribe(
      (users: any[]) => {
        const matchingUser = users.find(
          (user) => user.email === form.email && user.password === form.password
        );

        if (matchingUser) {
          this.isAuthenticated = true;
          this.router.navigate(['']);
          console.log('Đăng nhập thành công', matchingUser);
        } else {
          this.isAuthenticated = false;
          console.log('Đăng nhập thất bại');
          alert('Đăng nhập không thành công');
        }
      },
      (error) => {
        console.log('Lỗi khi lấy thông tin người dùng', error);
        alert('Đăng nhập không thành công');
      }
    );
  }
  // Logout
  LogOut(){
    this.isAuthenticated=false;
    this.router.navigate(['/login']);
  }
   // Sign up
   register(form: RegisterForm) {
    // Assuming your API has an endpoint for user registration
    this.http.post(`${this.baseURL}`, form).subscribe(
      (response) => {
         // Xử lý đăng ký thành công
         console.log('Đăng ký thành công', response);
        this.router.navigate(['login']);
        this.isAuthenticated = true;
      },
      (error) => {
        console.log('Đăng ký thất bại', error);
        this.isAuthenticated = false;
        alert('Đăng ký không thành công');
      }
    );  
  }
}

