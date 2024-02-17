const pages=[];
const pages_typ=[];
var parser=new DOMParser();
var search_text;
var results;
  
function onload_page()
{var s;
 var pos;
 var t;
 var p;
 var inner;
 var pos;
 var temp;

 if(window.location.pathname!="/sitesearch/" && localStorage.getItem("search_result")!=null && localStorage.getItem("search_result")!="")
  {s=localStorage.getItem("search_result");
   while(1)
    {pos=s.indexOf("||");
     if(pos<0)break;
     t=s.substr(0,pos);
     s=s.substr(pos+2);
     const a=t.split("|");
     if(window.location.pathname==a[0])
      {p=document.querySelectorAll(a[1]);
       t=p[parseInt(a[2])].innerHTML.toLowerCase();
       inner=p[parseInt(a[2])].innerHTML;
       pos=t.indexOf(a[3]);
       if(pos)temp=inner.substr(0,pos);else temp="";
       temp=temp + "<span style=" + String.fromCharCode(34) + "background-color:yellow;" + String.fromCharCode(34) + ">" + inner.substr(pos,a[3].length) + "</span>" + inner.substr(pos+a[3].length);
       p[parseInt(a[2])].innerHTML=temp;
      }
    }
   localStorage.removeItem("search_result");
  }
}

function search_pages()
{var doc;
 var elements;
 var xhr = new XMLHttpRequest();
 var index=pages.length-1;
 const tag_name=["p","li","span","h1","h2","h3"];
 var i;
 var a;
 var liste;
 var s;
 var pos;
 var start;
 var len;
 var t=["...","..."];
 var z= String.fromCharCode(34);
 var temp;
 const before_after = 20;

 liste="";
 localStorage.setItem("search_result","");
 xhr.open('GET', pages[index]);
 xhr.send();
 xhr.onload = function()
  {if (xhr.status == 200)
    {doc = parser.parseFromString(xhr.responseText, "text/html");
     for(i=0;i<tag_name.length;++i)
      {elements=doc.getElementsByTagName(tag_name[i]);
       for(a=0;a<elements.length;++a)
        {s=elements[a].innerHTML.toLowerCase();
         pos=s.indexOf(search_text);
         if(pos>=0)
          {++results;
           if(pos>before_after){start=pos-before_after;t[0]="...";}else {start=0;t[0]="";}
           if(pos + search_text.length+before_after<s.length){len=search_text.length+40;t[1]="...";}else {len=s.length-start;t[1]="";} 
           liste=liste+"<li><a href=" + z + "javascript:goto_result('" + pages[index] + "');" + z + ">" + pages_typ[index] + " " + t[0] + elements[a].innerHTML.substr(start,len) + t[1] + "</a></li>";
           temp=localStorage.getItem("search_result");
           temp=temp+pages[index]+"|"+tag_name[i]+"|"+a.toString()+"|"+search_text+"||";
           localStorage.setItem("search_result",temp);
          }
        }
      }
     --index;
     if(index>=0)
      {xhr.open('GET', pages[index]);
       xhr.send();
      }
      else
       {document.getElementById("list").innerHTML = liste;
        if(results==1)
         {document.getElementById("result").innerHTML = results.toString() + " " + "result";
         }
         else
          {document.getElementById("result").innerHTML =  results.toString() + " " + "results";
          }
        
        document.getElementById("list").style.visibility="visible";
        temp=localStorage.getItem("search_result");
        temp=temp+"!";
        localStorage.setItem("search_result",temp);
       }
    }
  };
}

function search_site()
{var pos;
 var s;
 var p=document.querySelectorAll("p");
 var temp;

 results=0;
 search_text=document.getElementById("search-input").value.toLowerCase();
 if(search_text=="")return;
 if(pages.length==0)
  {for(i=0;i<p.length;++i)
    {if(p[i].innerHTML.substr(0,4)=="zyx ")
      {s=p[i].innerHTML.substr(4);
       pos=s.indexOf("|");
       pages_typ.push("|"+s.substr(pos+1)+"|");
       s=s.substr(0,pos-1);
       if(s.substr(s.length-1,1)=="/")s=s+"index.html";
       pages.push(s);
      }
      else
       {if(p[i].innerHTML.substr(0,3)=="xyz")
         {s=p[i].innerHTML;
          while(1)
           {pos=s.indexOf("/");
            if(pos<0)break;
            s=s.substr(pos);
            pos=s.indexOf(String.fromCharCode(10));
            temp=s.substr(0,pos);
            if(temp.substr(temp.length-1,1)=="/")temp=temp+"index.html";
            pages.push(temp);
            pages_typ.push("|Updates|");
            s=s.substr(pos);
           }
         }
       }
    }
  }
  search_pages();
}

function evaluate_key()
{if(event.keyCode==13)search_site();
  else
   {document.getElementById("result").innerHTML = "";
    document.getElementById("list").style.visibility="hidden";
   }
}

function goto_result(url)
{window.open(url, "_self");
}

function test()
{var s;
/*<div>
Das ist <span style="background-color:yellow;">ein</span> Test.
</div>
*/
}