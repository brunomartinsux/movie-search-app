import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _urlOmdb = 'http://www.omdbapi.com/?i=tt3896198&apikey=aa9dc7ad'

  constructor(private _httpClient: HttpClient) { }

  getMovies(title: string){
    const params = new HttpParams().append('t', title)
    return this._httpClient.get(this._urlOmdb, {params: params})
  }
}