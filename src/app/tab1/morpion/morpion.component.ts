import { Component, AfterViewInit, OnInit} from '@angular/core';
import { Player } from '../../shared/classes/player';
import { GlobalVarsService} from '../../shared/services/global-vars.service';

import {tsParticles} from 'tsparticles';

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.component.html',
  styleUrls: ['./morpion.component.scss'],
})
export class MorpionComponent implements AfterViewInit, OnInit{

  public currentPlayer=1;
  public p1;
  public p2;
  public end=0;
  public win=[];
  public output;

  public matrix=
    [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];

  constructor(
    private glob: GlobalVarsService,
  ) {
    this.p1=new Player('1',this.glob.getNick1(), this.glob.getPic1());
    this.p2=new Player('2',this.glob.getNick2(), this.glob.getPic2());
  }

  ngOnInit() {
    this.firstPlayer();
  }

  ngAfterViewInit() {
    this.firstPlayerSprite();
  }

  firstPlayer=()=>{
    this.currentPlayer=Math.floor(Math.random()*2)+1;

    if(document.getElementsByClassName('glow')){
      const tmp = document.getElementsByClassName('glow');
      for(let i=0;i<tmp.length;i++){
        tmp[i].removeAttribute('class');
      }
    }

    if(this.currentPlayer===1){
      this.output='Le marteau du destin a frappé : '+this.glob.getNick1()+' commencera';
    }else{
      this.output='Malheureusement pour '+this.glob.getNick2()+' ce sera '+this.glob.getNick1()+' qui commencera';
    }

  };

  firstPlayerSprite=()=>{
    if(this.currentPlayer===1){
      document.getElementById('pic1').setAttribute('class','glow');
    }else{
      document.getElementById('pic2').setAttribute('class','glow');
    }
  };

  click=(line, col)=>{
    if(this.win.length===0) {
      if (this.matrix[line][col] === 0) {
        this.matrix[line][col] = this.currentPlayer;
        this.endTurn();
      }
    }
  };

  endTurn=()=>{
    this.win=this.checking();
    if(this.currentPlayer===1){
      this.currentPlayer+=1;
      document.getElementById('pic2').setAttribute('class','glow');
      document.getElementById('pic1').removeAttribute('class');
    } else{
      this.currentPlayer-=1;
      document.getElementById('pic1').setAttribute('class','glow');
      document.getElementById('pic2').removeAttribute('class');
    }
  };

  checking=()=>{
    const tmp=[];
    for(let i=0;i<3;i++) {
      if (this.matrix[i][0] !== 0 && this.matrix[i][1] !== 0 && this.matrix[i][2] !== 0 && this.matrix[i][0] === this.matrix[i][1] && this.matrix[i][0] === this.matrix[i][2]) {
        this.end = 1;
        tmp[0] = 'ligne';
        tmp[1] = i;
      } else {
        if (this.matrix[0][i] !== 0 && this.matrix[1][i] !== 0 && this.matrix[2][i] !== 0 && this.matrix[0][i] === this.matrix[1][i] && this.matrix[0][i] === this.matrix[2][i]) {
          this.end = 1;
          tmp[0] = 'colonne';
          tmp[1] = i;
        }
        }
      }
    if (this.matrix[0][0] !== 0 && this.matrix[1][1] !== 0 && this.matrix[2][2] !== 0 && this.matrix[0][0] === this.matrix[1][1] && this.matrix[0][0] === this.matrix[2][2]) {
      this.end = 1;
      tmp[0] = 'diagonale';
      tmp[1] = 'hautGauche';
    } else {
      if (this.matrix[0][2] !== 0 && this.matrix[1][1] !== 0 && this.matrix[2][0] !== 0 && this.matrix[0][2] === this.matrix[1][1] && this.matrix[0][2] === this.matrix[2][0]) {
        this.end = 1;
        tmp[0] = 'diagonale';
        tmp[1] = 'hautDroite';
      }
    }
    return tmp;
  };

  reset=()=>{
    this.win=[];
    this.firstPlayer();
    this.firstPlayerSprite();
    this.matrix=
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
  };
}
