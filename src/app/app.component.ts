import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'PazAngularInterview';
  constructor(private p:HttpService){}
  alldata:any
  tab_name:string="Featured"
  all_gamestab:any
  search:string=""
  allimg_games:any[]=[]
  search_game:string=""
  ngOnInit(){
    this.p.GetGames(68,254).subscribe((data:any)=>{this.alldata=data
      this.showgames_id(this.tab_name)
      this.GetAllIMG()
    })
  }
  GetAllIMG():void{
    for(var i=0;i<this.alldata.Games.length;i++)
      this.allimg_games[i]={url:this.p.APIURL_img+this.alldata.Games[i].ImageID+".jpg",name:this.alldata.Games[i].GameName}
  }
  showgames_id(tabname:string):void{
    this.tab_name=tabname
    for (var i=0;i<this.alldata.GameTypes.length;i++)
    if (this.alldata.GameTypes[i].Name==tabname)
    this.all_gamestab=this.alldata.GameTypes[i].Games
  }

  GetSearch_id(s:string):void{
    this.showgames_id(this.tab_name)
    if(s!=""){
      var tmp_list=[]
      for (let i=0;i<this.all_gamestab.length;i++)
      if(String(this.all_gamestab[i]).includes(s))
      tmp_list.push(this.all_gamestab[i])
      this.all_gamestab=tmp_list
    }
  }
  GetSearchGame(s:string):void{
    this.GetAllIMG()
    if(s!=""){
      var tmp_list=[]
      for (let i=0;i<this.allimg_games.length;i++)
      if(String(this.allimg_games[i].name).includes(s))
      tmp_list.push({name:this.allimg_games[i].name,url:this.allimg_games[i].url})
      this.allimg_games=tmp_list
    }
}
}