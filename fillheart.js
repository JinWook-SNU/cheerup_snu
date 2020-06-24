let percentinputs = [];
for (let i = 0;i<12;i++)
{
    percentinputs.push(0);
}
let currentcollege;

const setcollege = () => {
    document.getElementById("cba").addEventListener("click", (e)=>{
        e.preventDefault();
        currentcollege = 0;
        fillheart(percentinputs[0]);
        printpercent(percentinputs[0]);
    })
    document.getElementById("hum").addEventListener("click", (e)=>{
        e.preventDefault();
        currentcollege = 1;
        fillheart(percentinputs[1]);
        printpercent(percentinputs[1]);
    })
    document.getElementById("soc").addEventListener("click", (e)=>{
        currentcollege = 2;
        fillheart(percentinputs[2]);
        printpercent(percentinputs[2]);
    })
    document.getElementById("sci").addEventListener("click", (e)=>{
        currentcollege = 3;
        fillheart(percentinputs[3]);
        printpercent(percentinputs[3]);
    })
    document.getElementById("eng").addEventListener("click", (e)=>{
        currentcollege = 4;
        fillheart(percentinputs[4]);
        printpercent(percentinputs[4]);
    })
    document.getElementById("cals").addEventListener("click", (e)=>{
        currentcollege = 5;
        fillheart(percentinputs[5]);
        printpercent(percentinputs[5]);
    })
    document.getElementById("che").addEventListener("click", (e)=>{
        currentcollege = 6;
        fillheart(percentinputs[6]);
        printpercent(percentinputs[6]);
    })
    document.getElementById("mus").addEventListener("click", (e)=>{
        currentcollege = 7;
        fillheart(percentinputs[7]);
        printpercent(percentinputs[7]);
    })
    document.getElementById("vet").addEventListener("click", (e)=>{
        currentcollege = 8;
        fillheart(percentinputs[8]);
        printpercent(percentinputs[8]);
    })
    document.getElementById("pha").addEventListener("click", (e)=>{
        currentcollege = 9;
        fillheart(percentinputs[9]);
        printpercent(percentinputs[9]);
    })
    document.getElementById("med").addEventListener("click", (e)=>{
        currentcollege = 10;
        fillheart(percentinputs[10]);
        printpercent(percentinputs[10]);
    })
    document.getElementById("edu").addEventListener("click", (e)=>{
        currentcollege = 11;
        fillheart(percentinputs[11]);
        printpercent(percentinputs[11]);
    })
    console.log(currentcollege);
}

const setpercentage = () =>{
    setcollege();
    document.getElementById("form").addEventListener("submit", (e)=>{
        setcollege();
        let percentinput = document.getElementById("percent");
        for(let i = 0;i<12;i++)
        {
            if(i===currentcollege)
            {
                percentinputs[i] = percentinput.value;
            }
        }
        e.preventDefault();
    })
    setcollege();
    document.getElementById("confirm").addEventListener("submit", (e)=>{
        e.preventDefault();
        setcollege();
    })
}
const fillheart=(p)=>{
    let height =  (378*p)/100;
    const fill1 = document.getElementById("fill1");
    const fill2 = document.getElementById("fill2");
    const fill3 = document.getElementById("fill3");
    const fill4 = document.getElementById("fill4");
    const fill5 = document.getElementById("fill5");
    const fill6 = document.getElementById("fill6");
    const fill7 = document.getElementById("fill7");
    const fill8 = document.getElementById("fill8");
    const fill9 = document.getElementById("fill9");
    const fill10 = document.getElementById("fill10");
    fill1.style.height = (p<10? height+'px':'38px');
    fill2.style.height = (p<20? height+'px':'76px');
    fill3.style.height = (p<30? height+'px':'114px');
    fill4.style.height = (p<40? height+'px':'152px');
    fill5.style.height = (p<50? height+'px':'190px');
    fill6.style.height = (p<60? height+'px':'228px');
    fill7.style.height = (p<70? height+'px':'266px');
    fill8.style.height = (p<80? height+'px':'304px');
    fill9.style.height = (p<90? height+'px':'342px');
    fill10.style.height = height+'px';
}
const printpercent = (p) => {
    const print = document.getElementById('percentnumber');
    print.textContent = `${p}%`;
}
setpercentage();
