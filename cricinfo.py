from BeautifulSoup import BeautifulSoup
import urllib2, re

page = urllib2.urlopen("http://www.espncricinfo.com/indian-premier-league-2014/content/series/695871.html?template=fixtures")
soup = BeautifulSoup(page)
soup.prettify()
dates = soup.findAll("li",{"venue":re.compile("[0-9]*")})


f1=open('./test','w+')
f2=open('./test2','w+')


for l in dates:
	nv1 = ''
	nv2 = ''
	date = l.find('span',{'class':'fixture_date'}).string
	team = l.find('span',{'class':'play_team'}).string
	mn = team[1:4]
	
	team1 = ""
	team2  = ""
	if team.find("Bangalore", 11, 24) != -1:
		t1 = "Royal Challengers Bangalore"
		team1 = "RCB"
		nv1 = 'g'
	if team.find("Hyderabad", 11, 24) != -1:
		t1 = "Sun Risers Hyderabad"
		team1 = "SRH"
		nv1 = 'h'
	if team.find("Chennai", 11, 24) != -1:
		team1 = "CSK"
		t1 = "Chennai Super Kings"
		nv1 = 'a'
	if team.find("Mumbai", 11, 24) != -1:
		team1 = "MI"
		t1 = "Mumbai Indians"
		nv1 = 'e'
	if team.find("Rajasthan", 11, 24) != -1:
		team1 = "RR"
		t1 = "Rajasthan Royals"
		nv1 = 'f'
	if team.find("Punjab", 11, 24) != -1:
		team1 = "KXIP"
		t1 = "Kings XI Punjab"
		nv1 = 'c'
	if team.find("Delhi", 11, 24) != -1:
		team1 = "DD"
		t1 = "Delhi Daredevils"
		nv1 = 'b'
	if team.find("Kolkata", 11, 24) != -1:
		team1 = "KKR"
		t1 = "Kolkata Knight Riders"
		nv1 = 'd'




	if team.find("Bangalore", 20) != -1:
		team2 = "RCB"
		t2 = "Royal Challengers Bangalore"
		nv2 = 'g'
	if team.find("Hyderabad", 20) != -1:
		team2 = "SRH"
		t2 = "Sun Risers Hyderabad"
		nv2 = 'h'
	if team.find("Chennai", 20) != -1:
		team2 = "CSK"
		t2 = "Chennai Super Kings"
		nv2 = 'a'
	if team.find("Mumbai", 20) != -1:
		team2 = "MI"
		t2 = "Mumbai Indians"
		nv2 = 'e'
	if team.find("Rajasthan", 20) != -1:
		team2 = "RR"
		t2 = "Rajasthan Royals"
		nv2 = 'f'
	if team.find("Punjab", 20) != -1:
		team2 = "KXIP"
		t2 = "Kings XI Punjab"
		nv2 = 'c'
	if team.find("Delhi", 20) != -1:
		team2 = "DD"
		t2 = "Delhi Daredevils"
		nv2 = 'b'
	if team.find("Kolkata", 20) != -1:
		team2 = "KKR"
		t2 = "Kolkata Knight Riders"
		nv2 = 'd'

	stri = """
		 <tr>
		  <td>{0}</td>
	      <td>{1}</td>
	      <td>{2}</td>
	      <td><input type="radio" name="{3}" value="{2}" onclick="newValues('{4}');" /></td>
	      <td>{5}</td>
	      <td><input type="radio" name="{3}" value="{5}" onclick="newValues('{6}');" /></td>
	    </tr>


		""".format(date,team,team1,mn,nv1+nv2,team2,nv2+nv1)
	f1.write(stri)



	stri2 = """
		 /*--------------{4}--------------*/
		if (result === "{0}") {{
		        for (i = 0; i < 8; i++) {{
		            if (teams[i].name === "{1}") {{
		                teams[i].won++;
		            }}
		            else if (teams[i].name === "{2}") {{
		                teams[i].lost++;
		            }}
		        }}
		}}else if (result === "{3}") {{
	        for (i = 0; i < 8; i++) {{
	            if (teams[i].name === "{1}") {{
	                teams[i].lost++;
	            }}
	            else if (teams[i].name === "{2}") {{
	                teams[i].won++;
	            }}
	        }}
		}} 



		""".format(nv1+nv2,t1,t2,nv2+nv1,date)
	f2.write(stri2)