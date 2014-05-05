/*---------------------- tool tip ------------------*/

var tooltip=function(){
 var id = 'tt';
 var top = 3;
 var left = 3;
 var maxw = 300;
 var speed = 10;
 var timer = 20;
 var endalpha = 95;
 var alpha = 0;
 var tt,t,c,b,h;
 var ie = document.all ? true : false;
 return{
  show:function(v,w){
   if(tt == null){
    tt = document.createElement('div');
    tt.setAttribute('id',id);
    t = document.createElement('div');
    t.setAttribute('id',id + 'top');
    c = document.createElement('div');
    c.setAttribute('id',id + 'cont');
    b = document.createElement('div');
    b.setAttribute('id',id + 'bot');
    tt.appendChild(t);
    tt.appendChild(c);
    tt.appendChild(b);
    document.body.appendChild(tt);
    tt.style.opacity = 0;
    tt.style.filter = 'alpha(opacity=0)';
    document.onmousemove = this.pos;
   }
   tt.style.display = 'block';
   c.innerHTML = v;
   tt.style.width = w ? w + 'px' : 'auto';
   if(!w && ie){
    t.style.display = 'none';
    b.style.display = 'none';
    tt.style.width = tt.offsetWidth;
    t.style.display = 'block';
    b.style.display = 'block';
   }
  if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
  h = parseInt(tt.offsetHeight) + top;
  clearInterval(tt.timer);
  tt.timer = setInterval(function(){tooltip.fade(1)},timer);
  },
  pos:function(e){
   var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
   var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
   tt.style.top = (u - h) + 'px';
   tt.style.left = (l + left) + 'px';
  },
  fade:function(d){
   var a = alpha;
   if((a != endalpha && d == 1) || (a != 0 && d == -1)){
    var i = speed;
   if(endalpha - a < speed && d == 1){
    i = endalpha - a;
   }else if(alpha < speed && d == -1){
     i = a;
   }
   alpha = a + (i * d);
   tt.style.opacity = alpha * .01;
   tt.style.filter = 'alpha(opacity=' + alpha + ')';
  }else{
    clearInterval(tt.timer);
     if(d == -1){tt.style.display = 'none'}
  }
 },
 hide:function(){
  clearInterval(tt.timer);
   tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
  }
 };
}();
/*---------- predictor --------------*/
//author :sharan
//cндябеяs@ICF


/*
--short names for teams ---
# chennai super kings = a
# delhi daredevils = b
# kings xi punjab = c
# kolkata knight rider = d
# mumbai indian = e
# rajasthan royals = f
# royal challengers bangalore = g
# srh h

*/
/* ---------- update the results of matches here --------- */
teams = [];

function initVars() {
    teams[1] = {
        "name": "Chennai Super Kings",
        "won": 5,
        "lost": 1,
        "tie":0
    };
    teams[2] = {
        "name": "Delhi Daredevils",
        "won": 2,
        "lost": 4,
        "tie":0
    };
    teams[3] = {
        "name": "Kings XI Punjab",
        "won": 5,
        "lost": 1,
        "tie":0
    };
    teams[4] = {
        "name": "Kolkata Knight Riders",
        "won": 2,
        "lost": 4,
        "tie":0
    };
    teams[5] = {
        "name": "Mumbai Indians",
        "won": 1,
        "lost": 5,
        "tie":0
    };
    teams[6] = {
        "name": "Rajasthan Royals",
        "won": 4,
        "lost": 2,
        "tie":0
    };
    teams[7] = {
        "name": "Royal Challengers Bangalore",
        "won": 3,
        "lost": 3,
        "tie":0
    };
    teams[8] = {
        "name": "Sun Risers Hyderabad",
        "won": 2,
        "lost": 4,
        "tie":0
    };
}
/* --------- update end ------ */

function sortByWonAndPlayed(a, b) {
    console.log("sorting");
    var x = a.won;
    var xx = a.won + a.lost;
    var y = b.won;
    var yy = b.won + b.lost;
    return ((x < y) ? 1 : ((x > y) ? -1 : ((yy > xx) ? -1 : ((xx > yy) ? 1 : 0))));
}




function updateTable() {
    console.log("updating table");
    var table = document.getElementById("pointsTable");
    teams.sort(sortByWonAndPlayed);

    for (var i = 0; i < teams.length; i++) {
        var row = table.rows[i + 1];
        row.cells[1].innerHTML = teams[i].name;
        row.cells[2].innerHTML = teams[i].won + teams[i].lost + teams[i].tie;
        row.cells[3].innerHTML = teams[i].won;
        row.cells[4].innerHTML = teams[i].lost;
        row.cells[5].innerHTML = teams[i].tie;
        row.cells[6].innerHTML = teams[i].won * 2 + teams[i].tie * 1;
    }

}

function newValues(result) {
    console.log("newValues " + result);
    var i;
    /////////////////////////////////////////////////////////////////////////////////

   
             /*--------------
Mon May 5
                        --------------*/
        if (result === "fd") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Rajasthan Royals") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Kolkata Knight Riders") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "df") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Rajasthan Royals") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Mon May 5
                        --------------*/
        if (result === "ba") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Delhi Daredevils") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Chennai Super Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ab") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Delhi Daredevils") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Chennai Super Kings") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Tue May 6
                        --------------*/
        if (result === "eg") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Mumbai Indians") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ge") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Mumbai Indians") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Royal Challengers Bangalore") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Wed May 7
                        --------------*/
        if (result === "bd") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Delhi Daredevils") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Kolkata Knight Riders") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "db") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Delhi Daredevils") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Wed May 7
                        --------------*/
        if (result === "ca") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kings XI Punjab") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Chennai Super Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ac") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kings XI Punjab") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Chennai Super Kings") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Thu May 8
                        --------------*/
        if (result === "fh") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Rajasthan Royals") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "hf") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Rajasthan Royals") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Fri May 9
                        --------------*/
        if (result === "gc") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Kings XI Punjab") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "cg") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Royal Challengers Bangalore") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Kings XI Punjab") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sat May 10
                        --------------*/
        if (result === "bh") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Delhi Daredevils") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "hb") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Delhi Daredevils") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sat May 10
                        --------------*/
        if (result === "ea") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Mumbai Indians") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Chennai Super Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ae") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Mumbai Indians") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Chennai Super Kings") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sun May 11
                        --------------*/
        if (result === "cd") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kings XI Punjab") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Kolkata Knight Riders") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "dc") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kings XI Punjab") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sun May 11
                        --------------*/
        if (result === "gf") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Rajasthan Royals") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "fg") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Royal Challengers Bangalore") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Rajasthan Royals") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Mon May 12
                        --------------*/
        if (result === "he") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Mumbai Indians") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "eh") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Mumbai Indians") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Tue May 13
                        --------------*/
        if (result === "af") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Chennai Super Kings") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Rajasthan Royals") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "fa") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Chennai Super Kings") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Rajasthan Royals") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Tue May 13
                        --------------*/
        if (result === "gb") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Delhi Daredevils") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "bg") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Royal Challengers Bangalore") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Delhi Daredevils") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Wed May 14
                        --------------*/
        if (result === "hc") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Kings XI Punjab") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ch") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Kings XI Punjab") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Wed May 14
                        --------------*/
        if (result === "de") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kolkata Knight Riders") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Mumbai Indians") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ed") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Mumbai Indians") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Thu May 15
                        --------------*/
        if (result === "fb") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Rajasthan Royals") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Delhi Daredevils") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "bf") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Rajasthan Royals") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Delhi Daredevils") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sun May 18
                        --------------*/
        if (result === "ag") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Chennai Super Kings") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ga") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Chennai Super Kings") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Royal Challengers Bangalore") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sun May 18
                        --------------*/
        if (result === "hd") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Kolkata Knight Riders") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "dh") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Mon May 19
                        --------------*/
        if (result === "fe") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Rajasthan Royals") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Mumbai Indians") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ef") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Rajasthan Royals") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Mumbai Indians") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Mon May 19
                        --------------*/
        if (result === "bc") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Delhi Daredevils") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Kings XI Punjab") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "cb") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Delhi Daredevils") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Kings XI Punjab") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Tue May 20
                        --------------*/
        if (result === "hg") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "gh") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Royal Challengers Bangalore") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Tue May 20
                        --------------*/
        if (result === "da") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kolkata Knight Riders") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Chennai Super Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ad") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Chennai Super Kings") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Wed May 21
                        --------------*/
        if (result === "ce") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kings XI Punjab") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Mumbai Indians") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ec") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kings XI Punjab") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Mumbai Indians") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Thu May 22
                        --------------*/
        if (result === "dg") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kolkata Knight Riders") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "gd") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Royal Challengers Bangalore") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Thu May 22
                        --------------*/
        if (result === "ah") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Chennai Super Kings") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ha") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Chennai Super Kings") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Fri May 23
                        --------------*/
        if (result === "eb") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Mumbai Indians") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Delhi Daredevils") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "be") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Mumbai Indians") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Delhi Daredevils") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Fri May 23
                        --------------*/
        if (result === "cf") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kings XI Punjab") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Rajasthan Royals") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "fc") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kings XI Punjab") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Rajasthan Royals") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sat May 24
                        --------------*/
        if (result === "ga2") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Chennai Super Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ag2") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Royal Challengers Bangalore") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Chennai Super Kings") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sat May 24
                        --------------*/
        if (result === "dh2") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kolkata Knight Riders") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "hd2") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sun May 25
                        --------------*/
        if (result === "cb2") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kings XI Punjab") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Delhi Daredevils") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "bc2") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kings XI Punjab") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Delhi Daredevils") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sun May 25
                        --------------*/
        if (result === "ef2") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Mumbai Indians") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Rajasthan Royals") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "fe2") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Mumbai Indians") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Rajasthan Royals") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Tue May 27
                        --------------*/
        if (result === "") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Mumbai Indians") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Rajasthan Royals") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Mumbai Indians") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Rajasthan Royals") {
                    teams[i].won++;
                }
            }
        } 


    
    ///////////////////////////////////////////////////////////////////////////// 
    
    
    
    
    
    updateTable();
}


window.onload = function() {
    //console.log("started");
    initVars();
    updateTable();
};

function takeScreenshot(){

    console.log("take screenshot function");
    tableCanvas = document.getElementById("pointsTable");
    html2canvas(tableCanvas,{
        onrendered : function(canvas) {
        

    try {
        var img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
    } catch(e) {
        var img = canvas.toDataURL().split(',')[1];
    }

    $('.screenshot').first().val("uploading");
    //ajax
    var fd = new FormData(); 
    fd.append("image", img); 
    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", "https://api.imgur.com/3/image.json");
    xhr.onload = function() {
        
        var link = JSON.parse(xhr.responseText).data.link;
        prompt("image link" ,link);
        $('.screenshot').first().val("Take Screenshot");

    }
    xhr.setRequestHeader('Authorization', 'Client-ID ddaebf76a4cf924');
    xhr.send(fd);


    // ajax end 
    }
    });
}



