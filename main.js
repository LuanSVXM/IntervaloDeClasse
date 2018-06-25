function sortfunction(a, b) {
    return (a - b);
}
const tabela = document.getElementById('tabela');
const button = document.getElementById('comecar');
const cb = document.getElementById('cb');
const titulo = document.getElementById('titulo');
const a = 0;
function fa(a, b, d) {
    let r = 0;
    d.sort(sortfunction);
    console.log(d[d.length-1]);
    for (let i=0; i <= d.length; i++) {
        if (d[i] >= a && d[i] >= b && d[d.length-1] == b) {
            r++;
        }
        if (d[i] >= a && d[i]< b) {
            r++;
        }
    }
    return r;
}
function oi() {
    const FR = document.getElementById('FR').checked;// m3
    const FRA = document.getElementById('FRA').checked;// m4
    const Fi = document.getElementById('Fi').checked;// m1
    const FiA = document.getElementById('FiA').checked; // m2
    let  vida = document.getElementById('entrada').value;
    const busca = ',';
    const busca2 = ' ';
    const strbusca = eval('/'+busca+'/g');
    const strbusca2 = eval('/'+busca2+'/g'); 
    let outro = vida.replace(strbusca,'.')							
    var outro2 = outro.replace(strbusca2,'')				
    const entrada = outro2.split(';');
    const max = entrada.reduce(function(a, b) {
        return Math.max(a, b);
    });
    const min = entrada.reduce(function(a, b) {
        return Math.min(a, b);
    });
    const divisor = Math.round(1+(3.3*Math.log10(entrada.length)));
    const mediana = (max-min)/divisor;// somatorio
    const rt = intervalo(max, min, mediana); // intervalos
    const lm = separar(max, min, mediana); // vetor com intervalos divididos
    const fqa = [];
    for (let i= 0; i < rt.length; i++) {
        fqa[i] = fa(lm[0][i], lm[1][i], entrada);
    }
    let total = 0;
    for (let i=0; i< fqa.length; i++) {
        total+=fqa[i];
    }
    tabela.innerHTML += `<caption>${titulo.value}</caption>`;
    tabela.innerHTML += `<thead><tr><th>${cb.value}</th><th class="m1" hidden >Fi</th><th class="m2" hidden >FI</th><th class="m3" hidden >Fr</th><th class="m4" hidden>FR</th></tr></thead>`;
    let soma = 0;
    let eu = 0;
    for (let i=0; i<fqa.length; i++) {
		eu +=(((fqa[i]*100)/total).toFixed(2))*1;
		if (i === fqa.length-1) {
			eu = 100;
		}
        tabela.innerHTML+= `<tr><td>${rt[i]}</td><td class="m1" hidden>${fqa[i]}</td><td class="m2" hidden >${soma+=fqa[i]}</td><td class="m3" hidden>${((fqa[i]*100)/total).toFixed(2)}%</td><td class="m4" hidden>${eu}%</td></tr>`;
    }
    tabela.innerHTML+= `<tr><td>Total</td><td class="m1"hidden>${soma}</td><td class="m2"hidden>---</td><td class="m3"hidden>${100}%</td><td class="m4"hidden>---</td></tr><span>Fonte: ${document.getElementById('fonte').value}</span>`;
    if (Fi === true) {
        for (let i = 0; i < document.querySelectorAll('.m1').length; i++) {
            document.querySelectorAll('.m1')[i].hidden = false;
        }
    }
    if (FiA === true) {
        for (let i = 0; i < document.querySelectorAll('.m2').length; i++) {
            document.querySelectorAll('.m2')[i].hidden = false;
        }
    }
    if (FRA === true) {
        for (let i = 0; i < document.querySelectorAll('.m4').length; i++) {
            document.querySelectorAll('.m4')[i].hidden = false;
        }
    }
    if (FR === true) {
        for (let i = 0; i < document.querySelectorAll('.m3').length; i++) {
            document.querySelectorAll('.m3')[i].hidden = false;
        }
    }
}
function intervalo(max, min, mediana) {
    let a = min;
    const e = max;
    let b = 0;
    const c = '';
    let i = 0;
    const vetor = [];
    while ( b < max) {
        b = (a+mediana)*1;
        b= ((b*1).toFixed(2))*1;
        if (a === max-mediana) {
            vetor[i] = a+' |--| '+b;
            i++;
            a = b;
        } else {
            vetor[i] = a+' |-- '+b;
            i++;
            a = b;
        }
    }
    return vetor;
}
function separar(max, min, mediana) {
    let a = min;
    const e = max;
    let b = 0;
    const c = '';
    let i = 0;
    const vetor = [];
    const vetor2 = [];
    while ( b < max) {
        b = (a+mediana)*1;
        b= ((b*1).toFixed(2))*1;
        vetor2[i] = b;
        vetor[i] = a;
        i++;
        a = b;
    }
    const vetor3 = [vetor, vetor2];
    return vetor3;
}
button.addEventListener('click', function() {
    const e = tabela.children.length;
    for (let i=0; i < e; i++) {
        document.querySelector('#tabela').children[0].remove();
    }
    oi();
});

