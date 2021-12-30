function solution(new_id) {
    var answer = '';
    
    // 1번 조건
    new_id = new_id.toLowerCase();
    
    // 2번 조건
    new_id = new_id.replace(/[^a-z0-9-._]/gi, '');
    
    // 3번 조건
    let idx = '';
    for(let i = 0 ; i < new_id.length ; i++){
        if(new_id[i] === '.' && new_id[i+1] === '.'){
            idx += '';
        }else{
            idx += new_id[i];
        }
    }
    new_id = idx;
    
    // 4번 조건
    const four = () => {
        if(new_id.substring(0, 1) === '.'){
            new_id = new_id.slice(1);
        }
        if(new_id.substring(new_id.length-1) === '.') {
            new_id = new_id.slice(0, new_id.length - 1);
        }
        return new_id;
    }
    
    new_id = four(new_id);
    
    // 5번 조건
    if(new_id.length === 0) {
        new_id = 'a';
    }
    
    // 6번 조건
    if(new_id.length >= 16) {
        new_id = new_id.substring(0,15);
    }
    new_id = four(new_id);
    
    // 7번 조건
    const seven = () => {
    if(new_id.length <= 2) {
        new_id = new_id + new_id.substring(new_id.length - 1);
        return seven(new_id);
    }else{
        return new_id;
    }
    }
    new_id = seven(new_id);
    
    // 최종 출력
    answer = new_id;  
    
    
    return answer;
}