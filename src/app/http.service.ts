import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private myhttp:HttpClient) { }
  APIURL:string="https://silentgamesapi.progressplay.net/services/clienthelper.svc/getgames?countryid=221&ismobile=false&playerid=0&"
  APIURL_img:string="https://data.progressplay.net/games/lobby/"
  GetGames(labelid:number,langid:number):Observable<any[]>{
    return this.myhttp.get<any>(this.APIURL+"languageid="+langid+"&lableid="+labelid)
  }
}
