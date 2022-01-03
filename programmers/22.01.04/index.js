function solution(array, commands) {
    const answer = [];
    
    for(let i = 0 ; i < commands.length ; i++){
        // 
        const number = 
        array
        .slice(commands[i][0]-1, commands[i][1])
        .sort((a,b) => {
            return a - b
        });
        answer.push(number[commands[i][2]-1]);
    }

    return answer;
}