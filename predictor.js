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
        "won": 8,
        "lost": 2,
        "tie":0
    };
    teams[2] = {
        "name": "Delhi Capitals",
        "won": 8,
        "lost": 2,
        "tie":0
    };
    teams[3] = {
        "name": "Punjab Kings",
        "won": 4,
        "lost": 6,
        "tie":0
    };
    teams[4] = {
        "name": "Kolkata Knight Riders",
        "won": 4,
        "lost": 6,
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
        "lost": 6,
        "tie":0
    };
    teams[7] = {
        "name": "Royal Challengers Bangalore",
        "won": 6,
        "lost": 4,
        "tie":0
    };
    teams[8] = {
        "name": "Sun Risers Hyderabad",
        "won": 1,
        "lost": 8,
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
                    if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Rajasthan Royals") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "df") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Delhi Capitals") {
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
                    if (teams[i].name === "Mumbai Indians") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Punjab Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ab") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Rajasthan Royals") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Royal Challenger Banglore") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Tue May 6
                        --------------*/
        if (result === "eg") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Chennai Super Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ge") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Kolkata Knight Riders") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Punjab Kings") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Wed May 7
                        --------------*/
        if (result === "bd") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Mumbai Indians ") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Delhi Capitals") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "db") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Rajasthan Royals") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Chennai Super Kings") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Wed May 7
                        --------------*/
        if (result === "ca") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Royal Challenger Banglore") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Punjab Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "ac") {
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
Thu May 8
                        --------------*/
        if (result === "fh") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Delhi Capitals") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Chennai Super Kings") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "hf") {
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
Fri May 9
                        --------------*/
        if (result === "gc") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Royal Challengers Bangalore") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Sun Risers Hyderabad") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "cg") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Chennai Super Kings") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Punjab Kings") {
                    teams[i].won++;
                }
            }
        } 



        
         /*--------------
Sat May 10
                        --------------*/
        if (result === "bh") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Kolkatta Knight Riders") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Rajasthan Royals") {
                        teams[i].lost++;
                    }
                }
        }else if (result === "hb") {
            for (i = 0; i < 8; i++) {
                if (teams[i].name === "Sun Risers Hyderabad") {
                    teams[i].lost++;
                }
                else if (teams[i].name === "Mumbai Indians") {
                    teams[i].won++;
                }
            }
        } 
 if (result === "bh") {
                for (i = 0; i < 8; i++) {
                    if (teams[i].name === "Royal Challenger Banglore") {
                        teams[i].won++;
                    }
                    else if (teams[i].name === "Delhi Capitals") {
                        teams[i].lost++;
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



