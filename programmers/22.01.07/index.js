function solution(participant, completion) {
    
    const a = participant.sort()
    const b = completion.sort()
    
    for(let i = 0 ; i < participant.length ; i++) {
        if(a[i] !== b[i]){
           return a[i];
        }
    }
}