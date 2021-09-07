// 프로그래머스 1단계 "신규아이디 추천" 문제풀이

function solution(new_id) {
    // 아이디의 길이는 3 <= id <=15
    // 아이디는 소문자, 숫자, -, _, . 만 사용가능
    // 단, . 는 처음과 끝에 사용할 수 없으며, 연속으로도 사용 불가능
    // 정규표현식을 이용하면 쉽게 풀 수 있다고 한다.
    // 근데 나는 모르니까 일단 일반적으로 풀어본다.
    
    var answer = '';
    
    // 1. 소문자로 치환
    new_id = new_id.toLowerCase();
    
    // 2. 특정문자(- / _ / .) 외 제거
    new_id = new_id.replace(/[^a-z0-9-._]/gi, '');
    
    // 3. 연속된 마침표를 하나로 변경
    let idx = '';
    for(let i = 0 ; i < new_id.length ; i++){
        if(new_id[i] === '.' && new_id[i+1] === '.'){
            idx += '';
        }else{
            idx += new_id[i];
        }
    }
    new_id = idx;
    
    // 4. 마침표가 처음이나 끝에 있으면 제거 - 하단 four 함수 연결
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
    
    // 5. new_id 가 빈문자열이면 a를 대입해준다.
    if(new_id.length === 0) {
        new_id = 'a';
    }
    
    // 6. 길이가 16이상이면 그 전 15까지를 제외한 나머지를 모두 제거.
    //    그 후 문자열 끝에 마침표가 있다면 삭제.
    if(new_id.length >= 16) {
        new_id = new_id.substring(0,15);
    }
    new_id = four(new_id);
    
    // 7. new_id 의 길이가 2자 이하면 길이가 3이 될때까지 끝 문자를 뒤에 붙인다.
    const seven = () => {
    if(new_id.length <= 2) {
        new_id = new_id + new_id.substring(new_id.length - 1);
        return seven(new_id);
    }else{
        return new_id;
    }
    }
    new_id = seven(new_id);
    
    answer = new_id;  
    
    
    return answer;
}



function solution(new_id) {
    const answer = new_id
        .toLowerCase() // 1
        .replace(/[^\w-_.]/g, '') // 2
        .replace(/\.+/g, '.') // 3
        .replace(/^\.|\.$/g, '') // 4
        .replace(/^$/, 'a') // 5
        .slice(0, 15).replace(/\.$/, ''); // 6
    const len = answer.length;
    return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}