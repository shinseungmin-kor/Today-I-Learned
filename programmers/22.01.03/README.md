## 필요조건

게임개발자인 "죠르디"는 크레인 인형뽑기 기계를 모바일 게임으로 만들려고 합니다.
"죠르디"는 게임의 재미를 높이기 위해 화면 구성과 규칙을 다음과 같이 게임 로직에 반영하려고 합니다.

![](https://images.velog.io/images/seungmini/post/8a68535c-45ba-4688-a23e-8d975a267acf/image.png)

모든 인형은 "1 x 1" 크기의 격자 한 칸을 차지하며 격자의 가장 아래 칸부터 차곡차곡 쌓여 있습니다. 
게임 사용자는 크레인을 좌우로 움직여서 멈춘 위치에서 가장 위에 있는 인형을 집어 올릴 수 있습니다. 
집어 올린 인형은 바구니에 쌓이게 되는 데, 이때 바구니의 가장 아래 칸부터 인형이 순서대로 쌓이게 됩니다.

만약 같은 모양의 인형 두 개가 바구니에 연속해서 쌓이게 되면 두 인형은 터뜨려지면서 바구니에서 
사라지게 됩니다.

크레인 작동 시 인형이 집어지지 않는 경우는 없으나 만약 인형이 없는 곳에서 크레인을 작동시키는 경우에는
아무런 일도 일어나지 않습니다. 또한 바구니는 모든 인형이 들어갈 수 있을 만큼 충분히 크다고 가정합니다.

게임 화면의 격자의 상태가 담긴 2차원 배열 board와 인형을 집기 위해 크레인을 작동시킨 위치가 담긴 
배열 moves가 매개변수로 주어질 때, 크레인을 모두 작동시킨 후 터트려져 사라진 인형의 개수를 
return 하도록 solution 함수를 완성해주세요.

## 제한사항

```
1. board 배열은 2차원 배열로 크기는 "5 x 5" 이상 "30 x 30" 이하입니다.
2. board의 각 칸에는 0 이상 100 이하인 정수가 담겨있습니다.
  2-1 0은 빈 칸을 나타냅니다.
  2-2 1 ~ 100의 각 숫자는 각기 다른 인형의 모양을 의미하며 같은 숫자는 같은 모양의 인형을 나타냅니다.
3. moves 배열의 크기는 1 이상 1,000 이하입니다.
4. moves 배열 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수입니다.
```

## 입출력예시

| board | moves |  result |
|:----------:|:----------:|:----------:|
| [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]] | [1,5,3,5,1,2,1,4]	 | 4 |

## 수도코드

```
 1. 일단 뽑은 인형을 담을 빈 배열을 생성해 줍니다.
 2. 빈 배열에서 같은 인형을 만나 사라지게 되었을때, 그 수를 카운트 할 변수를 생성합니다.
 3. moves 배열의 값을 가지고 board 배열을 순회했을때 0이 아니라면 빈배열에 담는 코드를 작성합니다.
 4. 만약 빈배열에 담긴 숫자가 동일하다면 두 숫자를 삭제하고 카운트 변수에 2를 더합니다.
 5. moves 배열을 모두 순회했다면 카운트 변수를 return 합니다.
```

## 코드해석

```
수도코드에서 이야기 했던것 처럼 일단 처음에는 빈 배열(basket) 을 하나 만들어주어야 한다.
이 배열이 그림에서 보이는 우측 빈 통이 된다.

그리고 생성한 result는 카운트를 세기위한 숫자이고 basket 안에서 같은 요소가 들어왔을때
두 요소가 사라지면서 카운트가 적립될것이다, 그렇기때문에 기본적으로 2씩 증가하게 될것이다.(짝수)

그 후 moves 배열을 하나씩 순회하며 board 안 요소를 뽑아내야하기에 forEach를 사용했고
그 안에서 board안의 숫자가 0인지 아닌지를 판별하는 함수 pickup 을 사용할것이다.
pickup함수는 주어진 2차원 borad 배열안에서 moves의 순서를 가지고 2차원 배열을 하나씩
순회할것이다, 그림으로 보자면 한칸씩 아래로 내려간다고 보면 될것 같다.

그렇게 한칸씩 내려가다가 0이 아닌 숫자를 만나게 된다면 그 숫자를 꺼내서 basket 배열에 push한다.
이런식으로 moves의 배열만큼 계속 진행하다가 basket 배열의 이전 숫자와 현재 push될 숫자가
같다면, 현재 숫자는 push되지 않고 기존에 있는 숫자마저 pop 하여 배열에서 제거한다.
그리고 카운트 변수 result에 2를 더하는것이다.

이런 과정을 계속 반복하다가 moves 배열을 모두 순회하면 최종적으로 남은 result 를 반환한다.
```