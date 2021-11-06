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
  alldata:any //This value is the GET Response
  tab_name:string="Featured"
  all_gamestab:any
  search:string=""
  allimg_games:any[]=[]
  search_game:string=""
  indexes_games:number[]=[]
  tab_names:string[]=[]
  ngOnInit(){
    this.p.GetGames(68,254).subscribe((data:any)=>{this.alldata=data
      this.load_sort()
      this.showgames_id(this.tab_name)
      this.GetAllIMG()
    })
  }
  load_sort():void{ //First time I sort in the program
    for(var i=0;i<this.alldata.GameTypes.length;i++)
    this.indexes_games.push(this.alldata.GameTypes[i].Order)
      this.indexes_games.sort((n1,n2)=>n1-n2)
      for (var i:number=0,ii:number;i<this.alldata.GameTypes.length;i++){
        ii=0
      do{
if(this.indexes_games[i]==this.alldata.GameTypes[ii].Order){
  this.tab_names[i]=this.alldata.GameTypes[ii].Name
  break
}
      }while(++ii)
    }
  }
  GetAllIMG():void{ //From GET Response I set key value of url of the images and names
    for(var i=0;i<this.alldata.Games.length;i++)
      this.allimg_games[i]={url:this.p.APIURL_img+this.alldata.Games[i].ImageID+".jpg",name:this.alldata.Games[i].GameName}
  }
  showgames_id(tabname:string):void{//Show me the all games id in some category is selected
    alert(tabname)
    this.tab_name=tabname
    for (var i=0;i<this.alldata.GameTypes.length;i++)
    if (this.alldata.GameTypes[i].Name==tabname)
    this.all_gamestab=this.alldata.GameTypes[i].Games
  }

  GetSearch_id(s:string):void{ //Search the game id
    this.showgames_id(this.tab_name)
    if(s!=""){
      var tmp_list=[]
      for (let i=0;i<this.all_gamestab.length;i++)
      if(String(this.all_gamestab[i]).includes(s))
      tmp_list.push(this.all_gamestab[i])
      this.all_gamestab=tmp_list
    }
  }
  GetSearchGame(s:string):void{//Search the game
    this.GetAllIMG()
    if(s!=""){
      var tmp_list=[]
      for (let i=0;i<this.allimg_games.length;i++)
      if(String(this.allimg_games[i].name).includes(s))
      tmp_list.push({name:this.allimg_games[i].name,url:this.allimg_games[i].url})
      this.allimg_games=tmp_list
    }
}
val_sort:number=0
sort_names(name_sort:string[]):void{ //Everytime click on sort
var tmp_list:string[]=[]
for (let i=0;i<name_sort.length;i++)
tmp_list.unshift(name_sort[i])
this.tab_names=tmp_list
}
}