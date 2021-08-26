# 노마드코더 바닐라 JS 크롬 앱 만들기 챌린지

## JavaScript on the Browser**
자바스크립트가 어떻게 html과 연동되어 브라우저에 출력이 되는지를 학습했다.

브라우저의 콘솔에 `document` 를 입력하면, 현재 해당되는 html 파일이 출력된다.
여기서 document 는 브라우저에 이미 존재하는 `object` 이다. 우리가 접근할 수 있는 html을
가리키는 객체라고 할 수 있겠다. 그렇다면, document는 객체이기때문에 우리는 그 안에 있는
document의 키를 가져올 수 있다. document.xxx 으로 말이다.

이게 무슨말이냐면, 우리가 html의 어떠한것을 자바스크립트로 불러올 수 있다는 이야기다.
이것이 곧, 우리가 자바스크립트로 html을 움직이게 하는 시작점이 되겠다.
불러오는것도 가능하고, 불러온것을 다시 수정하는 일도 가능해진다. 획기적인 방법이다.

그럼 이제 자바스크립트에서 html을 호출하는 개념을 알았으니 제대로 사용해보도록 한다.

## document.getElementById()
html 내에 있는 id로 묶인 태그안의 data를 가져올 수 있게 해주는 역할을 한다.
괄호안에는 해당 `id` 를 `string` 타입으로 입력해야 한다.

## innerText
자바스크립트로 불러온 `id` 의 `text` 를 변경할 수 있게 해주는 키워드 이다.
html에서 변경하지 않아도 자바스크립트 내에서 html의 text 를 변경할 수 있게 됬다.

## document.getElementsByClassName()
html 내에 있는 class에 묶인 태그안의 data 를 가져올 수 있게 해주는 역할을 한다.
역시 괄호안에는 `string` 형식으로 입력이 되야 한다.

## document.getElementsByTagName()
html 내에 있는 특정 태그안에 있는 data 를 가져올 수 있게 해주는 역할을 한다.
역시 `string` 으로 입력을 해준다.

## document.querySelector()
CSS 탐색방식으로 html 의 `data` 를 가져올 수 있게 해주는 역할을 한다.
`( ex. document.querySelector(".hello h1") -> hello class의 h1 태그를 가져온다. )`

같은 조건의 class가 다수가 있어도 가장 첫번째 element 만 가져온다.
가장 많이 사용하게 될 함수이다.

## document.querySelectorAll()
위의 document.querySelector() 와는 다르게, 같은 조건을 가진 다수의 class 등을
전부 가져올 수 있는 함수이다.

## addEventListener()
말 그대로 `event` 를 `listen` 하는것이다. event 의 개념은 우리가 정적인 웹사이트를
동적으로 변하게 할 수 있는 모든 행위를 말한다.

괄호안에는 하고자하는 event 를 입력하고, 그 event가 동작할때 html에 변화를 주게하는
핸들러 함수의 위치를 입력한다. 이 함수도 함수의 형태로 입력해서, 리스너 함수의 event 가 동작할때만
함께 실행될 수 있게 해준다.

## mouseenter
html 상에 표시된 특정 dat 위에 마우스 커서를 올렸을 때 실행되는 이벤트를 가리킨다.

## mouseleave
html 상에 표시된 특정 dat 위에서 마우스 커서가 벗어났을 때 실행되는 이벤트를 가리킨다.

## contextmenu
html 상에 표시된 특정 dat 위에서 마우스 우클릭을 했을 때 실행되는 이벤트를 가리킨다.

## resize
브라우저의 window 창의 크기가 조절될때 실행되는 이벤트를 가리킨다.

