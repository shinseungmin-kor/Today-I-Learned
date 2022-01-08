function solution(N, stages) {
    let result = [];
    let people = stages.length
    
    for (let i = 1; i <= N+1; i++) {
        let tmp = stages.filter(n => n === i).length
        result.push([i, tmp / people])
        people -= tmp
    }
    result.pop()
    result = result.sort((a,b) => b[1] - a[1])
    
    return result.map( a => a[0]);
}