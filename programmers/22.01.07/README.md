## 필요조건

수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 
마라톤을 완주하였습니다.

마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열
completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

## 제한사항

```
1. 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
2. completion의 길이는 participant의 길이보다 1 작습니다.
3. 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
4. 참가자 중에는 동명이인이 있을 수 있습니다.
```

## 입출력예시

| participant | completion |  return |
|:----------:|:----------:|:----------:|
| ["leo", "kiki", "eden"] | ["eden", "kiki"]	 | "leo" |
| ["marina", "josipa", "nikola", "vinko", "filipa"] | ["josipa", "filipa", "marina", "nikola"]	 | "vinko" |
| ["mislav", "stanko", "mislav", "ana"] | ["stanko", "ana", "mislav"]	 | "mislav" |

## 수도코드

```
참가한 선수와 완주한 선수의 목록을 비교하여 참가한 선수중, 완주한 선수목록에 없다면 그 명단을
반환하면 되는데, 여기서 참고할 점은 참가한 인원과 완주한 인원은 같은 인원이란점이다, 완주자 명단이
순위로 인해 명단의 순서가 바뀌었다면 참가한 선수 명단과 같은 순서로 다시 정렬이 된다면
비교하기가 훨씬 수월해질 것이다. 
```

## 코드해석

```
비교를 수월하게 하기 위해 두개의 배열을 모두 같은 순서로 정렬해준다. 이렇게 정렬하면 두개의 배열 같은
인덱스의 순서에 같은 이름이 있을것이다, 누군가 빠져있지 않는다면 말이다. 그리고 빠져있다면 그 사람이
바로 완주하지 못한 인원이기에 그 이름을 반환하면 될텐데, 그것을 뽑아내는 방법은 일단 반복문을 이용해야
한다. 그 길이는 참가한 인원의 배열을 사용해야하고, 그 길이를 순회하면서 각각의 인덱스를 비교한다.
참가한인원의 배열의 i번째 순서와 완주한인원의 배열의 i번째 순서의 명단이 일치하지 않는다면,
해당 인덱스의 참가한 인원은 완주하지 못한 인원이므로 해당 인원을 리턴해주면 된다.

하지만 이 코드는 이 문제에서만 사용이 가능하다, 왜냐하면 이 문제에서는 단 한명의 인원만이 통과하지
못했다고 했기에 해당 로직이 가능했고, 만약 2명이상의 인원이 완주하지 못했다고 했다면, 해당 로직은
맨 처음 한명만을 가려내고 그 다음부터는 오류가 날 것이다. 
```