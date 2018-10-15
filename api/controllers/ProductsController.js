'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

const table = 'tbpt'

module.exports = {
    get: (req, res) => {
        var Matrix=[[],[],[],[],[]];var time=[];var DV=[]//don vi;
        let sql = "SELECT DONVI,SOLUONG,TUAN FROM tbpt where TUAN in('27','28','29','30')"
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            
            else {
              
              console.log(data);
              
              var i,j=0;
              data.map((item)=>{
                if(time.length==0){time.push(item.TUAN)}
                else{
                  for(i=0;i<time.length;i++){
                    if(item.TUAN==time[i])j++;
                  }
                  if(j==0){time.push(item.TUAN);}
                  j=0;
                }
              })
              console.log(time);
              data.map((item)=>{
                if(DV.length==0){DV.push(item.DONVI)}
                else{
                  for(i=0;i<DV.length;i++){
                    if(item.DONVI==DV[i])j++;
                  }
                  if(j==0){DV.push(item.DONVI);}
                  j=0;
                }
              })
              console.log(DV);
              
              data.map((item,index)=>{
                for(j=0;j<DV.length;j++){
                  switch(item.DONVI){
                    case DV[j]:{
                      for(i=0;i<time.length;i++){
                        switch(item.TUAN){
                          case time[i]:{Matrix[j][i]=item.SOLUONG;break;}
                        }
                      }
                      break;
                    }
                  }
                }
              })
        
            }  console.log(Matrix);
            console.log(DV[2]);
            
          
        
            
            return res.json({series:[
                              {name:'Mobifone',data:Matrix[0]},
                              {name:'Tổng FTV',data:Matrix[1]},
                              {name:'Tổng đại lí Huy Hùng',data:Matrix[2]},
                              {name:'Tổng đại lí TTS',data:Matrix[3]},
                              {name:'khác',data:Matrix[4]},
                              ]
                              ,
                              categories:time
                            })       
          })
    }
}