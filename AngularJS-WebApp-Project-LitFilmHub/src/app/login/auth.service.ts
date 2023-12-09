import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { environment } from 'src/environments/environment.development';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResult} from './login-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  key = "jonathan-token";
  private _authStatus = new Subject<boolean>();
  public authStatus = this._authStatus.asObservable();

  constructor(protected http: HttpClient) { }

  init(){
    if (this.isAuthenicated()){
      this.setAuthStatus(true);
    }
  }

  getToken(): string | null{
    return localStorage.getItem(this.key);
  }

  isAuthenicated(): boolean {
    return this.getToken() != null;
  }
  
  setAuthStatus(isAuthenicated: boolean){
    this._authStatus.next(isAuthenicated);
  }

  login(loginItem: LoginRequest) : Observable<LoginResult>{
    let url = environment.baseUrl + '/api/Admin';
    console.log(url);

    return this.http.post<LoginResult>(url, loginItem)
      .pipe(tap((loginResult: LoginResult) => {
        if(loginResult.success && loginResult.token){
          localStorage.setItem(this.key, loginResult.token)
          this.setAuthStatus(true);

        }
      }));
  }

  logout(){
    localStorage.removeItem(this.key);
    this.setAuthStatus(false);
  }

}
