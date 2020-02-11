import { Injectable } from '@angular/core';
import { API_BASE, API_USERS} from '../config';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../_interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpHelperService } from './http-helper.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = API_BASE + API_USERS;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private helper: HttpHelperService
  ) { }

  public getUserById(_id: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${_id}`).pipe(
      tap(_ => this.helper.log('User Fetched successfully')),
      catchError(this.helper.handleError<User>('getUserById'))
    )
  }
}
