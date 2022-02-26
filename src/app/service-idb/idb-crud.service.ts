import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IdbPersistenceService } from './idb-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class IdbCrudService {

  constructor(private idbPersistenceService: IdbPersistenceService) { }

  add(store:string, obj:any): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  put(store:string, obj:any): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  read(store:string, key:any): Observable<void> {
    return this.idbPersistenceService.read(store, key);
  }

  readAll(store:string): Observable<void> {
    return this.idbPersistenceService.readAll(store);
  }

  delete(store:string, key:number): Observable<void> {
    return this.idbPersistenceService.delete(store, key);
  }

  clear(store:string): Observable<void> {
    return this.idbPersistenceService.clear(store);
  }

}
