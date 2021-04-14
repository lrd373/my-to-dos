(()=>{"use strict";const t=(()=>{let t=[];return{addToList:(e,n,i,d)=>{let l=((t,e,n,i)=>{let d=c(t,e),l=t,r=e,o=n,a=i;const c=(t,e)=>{let n="";return t&&(n+=t.charAt(0)),e&&(n+=e.charAt(0)),n+=Math.ceil(1e4*Math.random())*Math.ceil(1e4*Math.random()),n};return{getId:()=>d,getTitle:()=>l,setTitle:t=>{l=t},getDescription:()=>r,setDescription:t=>{r=t},getDueDate:()=>o,setDueDate:t=>{o=t},getPriority:()=>a,setPriority:t=>{a=t}}})(e,n,i,d);t.push(l)},removeFromList:e=>{let n=t.find((t=>t.getId()===e));-1!==n&&t.splice(n,1)},getList:()=>t}})(),e=document.querySelector("#content"),n=(()=>{let t=document.createElement("div");t.setAttribute("id","form-container"),t.classList.add("hide-form");const n=()=>{t.classList.add("hide-form"),t.classList.remove("show-form")};let i=document.createElement("button");i.setAttribute("id","form-exit-button"),i.textContent="x",i.addEventListener("click",n),t.appendChild(i);let d=document.createElement("form"),l=document.createElement("label");l.setAttribute("for","title-input"),l.textContent="Title";let r=document.createElement("input");r.setAttribute("type","text"),r.setAttribute("id","title-input"),d.appendChild(l),d.appendChild(r);let o=document.createElement("label");o.setAttribute("for","description-input"),o.textContent="Description";let a=document.createElement("textarea");a.setAttribute("id","description-input"),d.appendChild(o),d.appendChild(a);let c=document.createElement("label");c.setAttribute("for","due-date"),c.textContent="Due Date";let s=document.createElement("input");s.setAttribute("id","due-date"),s.setAttribute("type","date"),d.appendChild(c),d.appendChild(s);let u=document.createElement("label");u.setAttribute("for","priority"),u.setAttribute("id","priority-label"),u.textContent="Priority";let m=document.createElement("select");m.setAttribute("id","priority"),m.setAttribute("name","priority");let p=document.createElement("option");p.setAttribute("value","high"),p.textContent="High";let h=document.createElement("option");h.setAttribute("value","medium"),h.textContent="Medium";let C=document.createElement("option");C.setAttribute("value","low"),C.textContent="Low",m.appendChild(p),m.appendChild(h),m.appendChild(C),d.appendChild(u),d.appendChild(m);let b=document.createElement("button");return b.textContent="Add to list",d.appendChild(b),t.appendChild(d),e.appendChild(t),{launchForm:()=>{t.classList.add("show-form"),t.classList.remove("hide-form")},closeForm:n}})();(()=>{let t=document.createElement("div");t.setAttribute("id","header-container");let i=document.createElement("h1");i.textContent="My To-Dos",t.appendChild(i);let d=document.createElement("button");d.setAttribute("id","add-button"),d.textContent="+",d.addEventListener("click",(()=>{n.launchForm(),console.log("clicked")})),t.appendChild(d),e.appendChild(t)})(),(()=>{const e=document.querySelector("#content");t.getList().forEach((t=>{e.appendChild((t=>{let e=t.getId(),n=t.getTitle(),i=t.getDescription(),d=t.getDueDate(),l=t.getPriority(),r=document.createElement("div");r.classList.add("list-item-container"),r.setAttribute("id",e);let o=document.createElement("h3");o.classList.add("list-item-title"),o.textContent=n;let a=document.createElement("p");a.classList.add("list-item-description"),a.textContent=i;let c=document.createElement("p");c.classList.add("list-item-duedate"),c.textContent=d;let s=document.createElement("p");return s.classList.add("list-item-priority"),s.textContent=l,r.appendChild(o),r.appendChild(a),r.appendChild(c),r.appendChild(s),r})(t))}))})()})();