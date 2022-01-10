function solution(d, budget) {    
    let a = 0;
    let b = 0;
    
     d.sort((a,b) => a - b);
    
    for(let i = 0; i < d.length; i++){
            a = a + d[i];
            b += 1;

        if(a > budget){
            b --
        }
    }
    return b;
}