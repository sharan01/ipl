/*---------------------- tool tip ------------------*/
//author: Michael Leigeber
//website: http://http://sixrevisions.com

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
		  chennai super kings = a
		  decaan chargers = b
		  delhi daredevils = c
		  kings xi punjab = d
		  koch tuskers kerla = e
		  kolkata knight rider = f
		  mumbai indian = g
		  pune warriors = h
		  rajasthan royals = i
		  royal challengers bangalore = j
*/
/* ---------- update the results of matches here --------- */
teams = [];

function initVars() {
    teams[1] = {
        "name": "Chennai Super Kings",
        "won": 7,
        "lost": 4,
		"tie":0
    };
    teams[2] = {
        "name": "Deccan Chargers",
        "won": 3,
        "lost": 8,
		"tie":0
    };
    teams[3] = {
        "name": "Delhi Daredevils",
        "won": 4,
        "lost": 7,
		"tie":0
    };
    teams[4] = {
        "name": "Kings XI Punjab",
        "won": 4,
        "lost": 6,
		"tie":0
    };
	teams[5] = {
        "name": "Kochi Tuskers Kerala",
        "won": 5,
        "lost": 6,
		"tie":0
    };
    teams[6] = {
        "name": "Kolkata Knight Riders",
        "won": 7,
        "lost": 4,
		"tie":0
    };
    teams[7] = {
        "name": "Mumbai Indians",
        "won": 8,
        "lost": 3,
		"tie":0
    };
    teams[8] = {
        "name": "Pune Warriors",
        "won": 4,
        "lost": 7,
		"tie":0
    };
	teams[9] = {
        "name": "Rajasthan Royals",
        "won": 5,
        "lost": 6,
		"tie":1
    };
    teams[10] = {
        "name": "Royal Challengers Bangalore",
        "won": 7,
        "lost": 3,
		"tie":1
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
    if (result === "ab") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Chennai Super Kings") {
                teams[i].won++;
            }
            else if (teams[i].name === "Deccan Chargers") {
                teams[i].lost++;
            }
        }
    } else if (result === "ba") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Chennai Super Kings") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Deccan Chargers") {
                teams[i].won++;
            }
        }
    } 
	/*--------------40th match--------------*/
	else if (result === "gd") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Mumbai Indians") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kings XI Punjab") {
                teams[i].lost++;
            }
        }
    } else if (result === "dg") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Mumbai Indians") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kings XI Punjab") {
                teams[i].won++;
            }
        }
    } 
	/*---------- 41st match-----------*/
	else if (result === "ce") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Delhi Daredevils") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].lost++;
            }
        }
    } else if (result === "ec") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Delhi Daredevils") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].won++;
            }
        }
    } 
	/* ----------- 42nd match ---------------*/
	else if (result === "bf") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Deccan Chargers") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].lost++;
            }
        }
    } else if (result === "fb") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Deccan Chargers") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].won++;
            }
        }
    }
	/*------ 43rd match ---------*/
	else if (result === "ai") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Chennai Super Kings") {
                teams[i].won++;
            }
            else if (teams[i].name === "Rajasthan Royals") {
                teams[i].lost++;
            }
        }
    } else if (result === "ia") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Chennai Super Kings") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Rajasthan Royals") {
                teams[i].won++;
            }
        }
    }
	/*----------44th match-----------*/
	else if (result === "hg") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Pune Warriors") {
                teams[i].won++;
            }
            else if (teams[i].name === "Mumbai Indians") {
                teams[i].lost++;
            }
        }
    } else if (result === "gh") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Pune Warriors") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Mumbai Indians") {
                teams[i].won++;
            }
        }
    }
	/*------------45th match-------------------*/
	else if (result === "ef") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].lost++;
            }
        }
    } else if (result === "fe") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].won++;
            }
        }
    }
	/*-------------46th match-------------------*/
	else if (result === "bc") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Deccan Chargers") {
                teams[i].won++;
            }
            else if (teams[i].name === "Delhi Daredevils") {
                teams[i].lost++;
            }
        }
    } else if (result === "cb") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Deccan Chargers") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Delhi Daredevils") {
                teams[i].won++;
            }
        }
    }
	/*-----------47th match--------------*/
	else if (result === "jd") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kings XI Punjab") {
                teams[i].lost++;
            }
        }
    } else if (result === "dj") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kings XI Punjab") {
                teams[i].won++;
            }
        }
    }
	/*-----------48th macth--------------*/
	else if (result === "fa") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].won++;
            }
            else if (teams[i].name === "Chennai Super Kings") {
                teams[i].lost++;
            }
        }
    } else if (result === "af") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Chennai Super Kings") {
                teams[i].won++;
            }
        }
    }
	/*----------------- 49th match ----------*/
	else if (result === "gc") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Mumbai Indians") {
                teams[i].won++;
            }
            else if (teams[i].name === "Delhi Daredevils") {
                teams[i].lost++;
            }
        }
    } else if (result === "cg") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Mumbai Indians") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Delhi Daredevils") {
                teams[i].won++;
            }
        }
    }
	/*---------50th match--------*/
	else if (result === "je") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].lost++;
            }
        }
    } else if (result === "ej") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].won++;
            }
        }
    }
	/*------------------- 51st macth -----------------*/
	else if (result === "dh") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].won++;
            }
            else if (teams[i].name === "Pune Warriors") {
                teams[i].lost++;
            }
        }
    } else if (result === "hd") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Pune Warriors") {
                teams[i].won++;
            }
        }
    }
	/*--------- 52nd match-----------*/
	else if (result === "ia2") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Rajasthan Royals") {
                teams[i].won++;
            }
            else if (teams[i].name === "Chennai Super Kings") {
                teams[i].lost++;
            }
        }
    } else if (result === "ai2") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Rajasthan Royals") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Chennai Super Kings") {
                teams[i].won++;
            }
        }
    }
	/* ---------- 53rd match ---------- */ 
	else if (result === "bh") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Deccan Chargers") {
                teams[i].won++;
            }
            else if (teams[i].name === "Pune Warriors") {
                teams[i].lost++;
            }
        }
    } else if (result === "hb") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Deccan Chargers") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Pune Warriors") {
                teams[i].won++;
            }
        }
    }
	/*----- 54th match ------- */
	else if (result === "dg2") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].won++;
            }
            else if (teams[i].name === "Mumbai Indians") {
                teams[i].lost++;
            }
        }
    } else if (result === "gd2") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Mumbai Indians") {
                teams[i].won++;
            }
        }
    }
	/*----- 55th match ------- */
	else if (result === "ij") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Rajasthan Royals") {
                teams[i].won++;
            }
            else if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].lost++;
            }
        }
    } else if (result === "ji") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Rajasthan Royals") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].won++;
            }
        }
    }
	/*----- 56th match ------- */
	else if (result === "ac") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Chennai Super Kings") {
                teams[i].won++;
            }
            else if (teams[i].name === "Delhi Daredevils") {
                teams[i].lost++;
            }
        }
    } else if (result === "ca") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Chennai Super Kings") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Delhi Daredevils") {
                teams[i].won++;
            }
        }
    }
	/*----- 57th match ------- */
	else if (result === "ed") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kings XI Punjab") {
                teams[i].lost++;
            }
        }
    } else if (result === "de") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kings XI Punjab") {
                teams[i].won++;
            }
        }
    }
	/*----- 58th match ------- */
	else if (result === "jf") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].lost++;
            }
        }
    } else if (result === "fj") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].won++;
            }
        }
    }
	/*----- 59th match ------- */
	else if (result === "gb") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Mumbai Indians") {
                teams[i].won++;
            }
            else if (teams[i].name === "Deccan Chargers") {
                teams[i].lost++;
            }
        }
    } else if (result === "bg") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Mumbai Indians") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Deccan Chargers") {
                teams[i].won++;
            }
        }
    }
	/*----- 60th match ------- */
	else if (result === "dc") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].won++;
            }
            else if (teams[i].name === "Delhi Daredevils") {
                teams[i].lost++;
            }
        }
    } else if (result === "cd") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Delhi Daredevils") {
                teams[i].won++;
            }
        }
    }
	/*----- 61st match ------- */
	else if (result === "ei") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].won++;
            }
            else if (teams[i].name === "Rajasthan Royals") {
                teams[i].lost++;
            }
        }
    } else if (result === "ie") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Rajasthan Royals") {
                teams[i].won++;
            }
        }
    }
	/*----- 62nd match ------- */
	else if (result === "hb2") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Pune Warriors") {
                teams[i].won++;
            }
            else if (teams[i].name === "Deccan Chargers") {
                teams[i].lost++;
            }
        }
    } else if (result === "bh2") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Pune Warriors") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Deccan Chargers") {
                teams[i].won++;
            }
        }
    }
	/*----- 63rd match ------- */
	else if (result === "dj2") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].won++;
            }
            else if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].lost++;
            }
        }
    } else if (result === "jd2") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].won++;
            }
        }
    }
	/*----- 64th match ------- */
	else if (result === "ae") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Chennai Super Kings") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].lost++;
            }
        }
    } else if (result === "ea") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Chennai Super Kings") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kochi Tuskers Kerala") {
                teams[i].won++;
            }
        }
    }
	/*----- 65th match ------- */
	else if (result === "hf") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Pune Warriors") {
                teams[i].won++;
            }
            else if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].lost++;
            }
        }
    } else if (result === "fh") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Pune Warriors") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].won++;
            }
        }
    }
	/*----- 66th match ------- */
	else if (result === "gi") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Mumbai Indians") {
                teams[i].won++;
            }
            else if (teams[i].name === "Rajasthan Royals") {
                teams[i].lost++;
            }
        }
    } else if (result === "ig") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Mumbai Indians") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Rajasthan Royals") {
                teams[i].won++;
            }
        }
    }
	/*----- 67th match ------- */
	else if (result === "db") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].won++;
            }
            else if (teams[i].name === "Deccan Chargers") {
                teams[i].lost++;
            }
        }
    } else if (result === "bd") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kings XI Punjab") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Deccan Chargers") {
                teams[i].won++;
            }
        }
    }
	/*----- 68th match ------- */
	else if (result === "ch") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Delhi Daredevils") {
                teams[i].won++;
            }
            else if (teams[i].name === "Pune Warriors") {
                teams[i].lost++;
            }
        }
    } else if (result === "hc") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Delhi Daredevils") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Pune Warriors") {
                teams[i].won++;
            }
        }
    }
	/*----- 69th match ------- */
	else if (result === "ja") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].won++;
            }
            else if (teams[i].name === "Chennai Super Kings") {
                teams[i].lost++;
            }
        }
    } else if (result === "aj") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Royal Challengers Bangalore") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Chennai Super Kings") {
                teams[i].won++;
            }
        }
    }
	/*----- 70th match ------- */
	else if (result === "fg") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].won++;
            }
            else if (teams[i].name === "Mumbai Indians") {
                teams[i].lost++;
            }
        }
    } else if (result === "gf") {
        for (i = 0; i < 10; i++) {
            if (teams[i].name === "Kolkata Knight Riders") {
                teams[i].lost++;
            }
            else if (teams[i].name === "Mumbai Indians") {
                teams[i].won++;
            }
        }
    }
	
	
	
	
	
    updateTable();
}


window.onload = function() {
    //console.log("started");
    initVars();
    updateTable();
};


