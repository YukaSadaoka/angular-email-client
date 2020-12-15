import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


// For checkUsernameAvail()
interface UserAvailResponse{
  available: boolean;
}

// For signup()
interface SignupCredentials{
  username: string;
  password: string;
  passwordConfirmation: string;
}

// For signup()
interface SignupResponse{
  username: string;
}

// For checkAuth()
interface SignedinResponse{
  authenticated: boolean;
  username: string;
}

// For signin()
interface SigninCredentials{
  password: string;
  username: string;
}

interface SinginResponse{
  username: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);
  username: string;

  constructor(private http: HttpClient) { }

  // POST request to username endpoint
  checkUsernameAvail(username: string){
    return this.http.post<UserAvailResponse>(`${this.rootUrl}/auth/username`,{
      username: username
    });
  }

  // POST request to sinup endpoint
  signup(credentials: SignupCredentials){
   
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
    .pipe(
      tap(({ username })=>{
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }

  // Check if user already logged in
  checkAuth(){
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
    )
  }

  // POST request to singout endpoint
  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      )
  }

  // POST request to signin endpoint
  signin(credentials: SigninCredentials){

    return this.http.post<SinginResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
