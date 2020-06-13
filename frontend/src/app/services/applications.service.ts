import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private applicationsUrl = 'http://localhost:5000/api/wnioski';

  // private applicationsSubject: Subject<Application[]>;
  // public applications: Observable<Application[]>;

  constructor(
    private http: HttpClient
  ) {
    // this.applicationsSubject = new Subject<Application[]>();
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.applicationsUrl)
      .pipe(
        // map(applications => {
        //   this.applicationsSubject.next(applications);
        //   return applications;
        // }),
        catchError(this.handleError<Application[]>('getApplications', []))
      );
  }

  addNewApplication(idRodzajMaszyny: number, rejestracja: string, tresc: string): Observable<Application> {
    let body = { Rejestracja: rejestracja, Tresc: tresc, IdRodzajMaszyny: idRodzajMaszyny };

    return this.http.put<Application>(this.applicationsUrl, body)
      .pipe(
        tap(() => alert('Wniosek przesłany pomyślnie.')),
        catchError(this.handleError<Application>('addNewAppliaction'))
      );
  }

  editApplication(idWniosek: number, czyPoprawny: boolean): Observable<Application> {
    let body = { IdWniosek: idWniosek, CzyPoprawny: czyPoprawny };

    return this.http.patch<Application>(this.applicationsUrl, body)
      .pipe(
        catchError(this.handleError<Application>('editApplication'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert('Error: ' + error.message);
      return of(result as T);
    }
  }
}
