(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(39)},37:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(11),l=t.n(u),c=t(2),o=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("p",null," ",n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){return t(n.id)}},"poista")," ")},i=function(e){var n=e.persons,t=e.deletePerson;return r.a.createElement("div",null,n.map(function(e){return r.a.createElement(o,{key:e.name,person:e,deletePerson:t})}))},m=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,u=e.newNumber,l=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:u,onChange:l})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},s=function(e){var n=e.findName,t=e.handleFindNameChange;return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4 ",r.a.createElement("input",{value:n,onChange:t}))},d=t(3),f=t.n(d),v="/api/persons",h=function(){return f.a.get(v)},g=function(e){return f.a.post(v,e)},E=function(e){return f.a.delete("".concat(v,"/").concat(e))},b=function(e,n){return f.a.put("".concat(v,"/").concat(e),n).then(function(e){return e.data})},p=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"success"},n)},j=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],l=Object(a.useState)(""),o=Object(c.a)(l,2),d=o[0],f=o[1],v=Object(a.useState)(""),w=Object(c.a)(v,2),N=w[0],O=w[1],C=Object(a.useState)(""),k=Object(c.a)(C,2),P=k[0],S=k[1],y=Object(a.useState)(null),L=Object(c.a)(y,2),F=L[0],J=L[1],T=Object(a.useState)(null),x=Object(c.a)(T,2),B=x[0],D=x[1];Object(a.useEffect)(function(){h().then(function(e){u(e.data)})},[]);var H=t.filter(function(e){return e.name.toLowerCase().includes(P.toLowerCase())});return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(p,{message:F}),r.a.createElement(j,{message:B}),r.a.createElement(s,{findName:P,handleFindNameChange:function(e){console.log(e.target.value),S(e.target.value)}}),r.a.createElement("h2",null," lis\xe4\xe4 uusi"),r.a.createElement(m,{addPerson:function(e){e.preventDefault();var n=t.filter(function(e){return e.name===d});if(0===n.length){var a={name:d,number:N,id:t.length+1};g(a).then(function(e){u(t.concat(e.data))}),u(t.concat(a)),f(""),O(""),J("Lis\xe4ttiin ".concat(a.name)),setTimeout(function(){J(null)},5e3)}else if(window.confirm("".concat(n[0].name," on jo luettelossa, korvataanko vanha numero uudella?"))){var r={name:d,number:N,id:t.length+1};b(n[0].id,r).then(function(e){u(t.map(function(t){return t.id!==n[0].id?t:e}))}).catch(function(e){D("Henkil\xf6 ".concat(n[0].name," oli jo poistettu")),setTimeout(function(){D(null)},5e3),u(t.filter(function(e){return e.id!==n[0].id}))})}},newName:d,handleNameChange:function(e){console.log(e.target.value),f(e.target.value)},newNumber:N,handleNumberChange:function(e){console.log(e.target.value),O(e.target.value)}}),r.a.createElement("h3",null,"Numerot"),r.a.createElement(i,{persons:H,deletePerson:function(e){var n=t.find(function(n){return n.id===e});window.confirm("Poistetaanko ".concat(n.name))&&(E(n.id),u(t.filter(function(e){return e.id!==n.id})))}}))};t(37);l.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.8f53b67b.chunk.js.map