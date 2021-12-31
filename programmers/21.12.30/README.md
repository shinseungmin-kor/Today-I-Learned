## 필요조건

신규아이디로 입력된 문자열 `new_id` 를 조건에 맞게 변환하여 재 출력해야한다. 조건은 이렇다.

```
1. 문자열에 대문자가 포함되어 있으면, 소문자로 변환한다.
2. 문자열 안에 특정기호 [ - ] ,[ _ ] ,[ . ] 이 세가지를 제외한 나머지 기호들이 있다면 제거한다.
   (문자, 숫자 는 예외없이 포함한다.
3. 문자열 안에 마침표 ( . ) 가 연속으로 존재 한다면 하나로 변경한다.
4. 마침표가 문자열 맨 첫번째 또는 맨 끝에 존재한다면 해당 마침표는 제거한다.
5. 문자열이 빈 문자열이라면 그 안에 a 를 추가해준다.
6. 문자열의 길이가 16 이상이라면 15까지를 제외한 그 이상의 요소들은 모두 제거한다.
   (그 후에 끝자리에 마침표가 존재한다면 제거한다.)
7. 문자열의 길이가 2 이하라면 길이가 3 이상이 될때까지 문자열의 맨끝 요소를 추가해준다.
```

`new_id` 가 이 7가지의 조건을 거치며 필터링 되어 나오는 최종 문자열을 출력해야 한다.

## 수도코드

```
1. 해당 문자열을 무조건적으로 소문자로 치환하는 toLowerCase() 를 사용한다.
2. 여러 방법이 있겠지만, 정규표현식을 사용해본다.
3. 조건문과 반복문을 사용하여 해당 인덱스를 변경한다.
4. 조건문과 substring() 을 사용하여 해당 인덱스를 변경한다.
5. 조건문을 사용하여 문자열에 변화를 준다.
6. 조건문과 substring() 을 사용하여 문자열에 변화를 준다. 4번과 연결한다
7. 조건문, substring(), 재귀를 이용하여 문자열에 변화를 준다.
```


## 코드해석

```
1번조건 :
1번은 간단하다, 대문자든 소문자든, 그 안에 있는 모든 문자를 toLowerCase() 로 소문자화 시켜주면
해당 조건을 만족하게 된다.

2번조건 :
정규표현식을 사용한다, (/[^a-z0-9-._]/gi, '') 의 의미는..
"발생할 모든 pattern에 대한 전역 검색을 대소문자 구별없이 하고, 그 범위는 a 부터 z 까지, 
 0 부터 9까지, - 와 _ 와 . 을 포함하고 그 값을 새로운 빈 문자열에 넣어 치환한다.
 정도가.. 될거 같다.(확실하진 않음) "
 
3번조건 :
반복문을 사용해서 현재인덱스와 그 앞이나 뒤의 인덱스 또한 마침표로 인식이 된다면, 해당인덱스를
빈 문자열로 변환하여 위의 코드 기준 new_id[i+1] 만을 마침표로 남겨두게 한다. 그리고 그 외의 인덱스
는 그대로 출력한다. 그리고 이들을 새로만들어놓은 빈 문자열에 1차적으로 담아놓은다음, 반복이 종료된
모든 문자열을 다시 new_id 에 할당하여 갱신된 new_id 를 만든다.

4번조건 :
4번은 함수를 이용하는것이 조금 더 편하다. 여기서는 substring()을 사용해서 인덱스의 위치를 검색한다.
이번 조건은 앞이나 뒤에 마침표가 있냐는것을 걸러야 하는데, 굳이 두가지를 같이 검색할 필요는 없다.
맨 앞에있는지 하나, 맨 뒤에 있는지 하나를 따로따로 걸러낸 결과값을 한번에 출력하는 함수를 사용한것이다.
substring(0, 1) 에 마침표가 있다면 해당 인덱스를 제외한 나머지 문자열을 new_id 에 할당하고,
substring(new_id.length - 1) 에 마침표가 있다면 역시 똑같은 값을 new_id 에 할당한다.
그리고 두차례의 결과값이 갱신된 new_id 를 리턴시킨다, 그리고 그 함수에 new_id 를 인자로 준다.

5번조건 :
간단하게 조건문을 활용하여 a 를 할당시켜주면 된다.

6번조건 :
길이를 탐색하여 길이가 15보다 많다면 그 위의 인덱스를 삭제하는것이 아닌, 그저 0부터 15까지를 남기면
된다. 이 역시 substring(0,15) 을 이용하여 저 사이의 인덱스만을 출력한다, 그러면 알아서 그 외의
인덱스는 제외된다.

7번조건 :
재귀를 사용한다. 길이가 2자 이하 즉, 0, 1, 2 세가지의 경우가 있겠다. 그렇다면 최소 한번,
최대 세번의 요소추가가 이루어질텐데, 재귀를 사용해 문자열의 길이로써 탈출조건을 만들어 놓고, 조건에
해당될때까지 new_id 에 new_id의 끝 인덱스를 추가해주는 로직을 작성한다. 하지만, 해당 조건에
맞지 않는다면 (길이가 3이상) 그냥 그대로 리턴시킨다. 이 함수에 new_id 를 인자로 넣어 결과값을
출력받고, 그 값을 new_id 에 할당시킨다.

이렇게 1번부터 7번까지의 조건들을 거치면서 new_id 의 값은 계속 변화했을것이다.
이제 최종적으로 맨 처음 주어졌던 answer에 new_id 를 할당함으로써 최종 결과값을 answer 로
리턴시켜 결과를 확인한다.
```

## 그 외 풀이

```javascript
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

/* 정규표현식을 사용하면 위의 저 긴 코드가 이렇게 짧게 끝난다.. 이래서 공부를 해야되나보다.
```