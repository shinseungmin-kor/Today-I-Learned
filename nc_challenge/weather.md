## Momentum 구현하기 - JavaScript / 날씨 편

우리는 앞서 Momentum 앱을 클론코딩하기 위해 어떤 요소들이 필요한지 확인했고,
구현할 위치의 순서에 맞게 html 로직을 짰다. 

![](https://images.velog.io/images/seungmini/post/24b54e40-423e-4b09-b742-525db431199f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.53.56.png)

하지만 아직 아무런 기능을 추가하지 않은 화면은 어떤 동작도 할 수 없는 상태이다.
이제 이 태그들이 동적으로 일할 수 있도록 **JavaScript** 를 이용해 변화를 줘보자.

위에서부터 순서대로 구현해보겠다.

## 날씨, 장소 구현하기

현재 내가 위치한 장소와 이곳의 온도, 날씨등을 구현해야 한다. 어렵게 느껴질 수 도 있지만
맞다, 어렵다. 그래도 하나하나 천천히 살피면서 하면 할 수 있다.
<br/>

### html 과 js 연결하기

일단 그 전에 html 과 js 를 연결해주도록 하자.

첫번째로, html 로 잠깐 돌아와서 html 의 body 태그에 script 태그로 이 js 파일을 연결하자.
나는 지금 작업할 파일의 이름을 `weather.js` 로 했어서, 이걸 연결해주겠다.

```html
<script src="weather.js"></script>
```

```
* 이 파일은 <body> 안에 들어있어야 한다, 기본적으로는 맨 아래에 둔다. 그 이유를 또 설명하자면 
길지만, 간단하게는, html 은 기본적으로 위에서 아래로 읽는 형식이기에  script 태그가 애매한곳에
위치한다면 html 의 태그들이 다 읽히기도 전에 script 가 실행되어서 만약에 js 파일로 가져온 태그들
중에서 script 태그 아래에 위치한 태그들이 있다면 그 태그들을 아직 읽히지 못했으므로 오류가 날 수 
있다. 그렇기 때문에 위에 모든 태그들을 다 읽게하고 마지막으로 script 태그를 읽히는게 좋다.
더 자세한건 구글링 ㄱㄱ
```

html 내에서 js 로의 연결까지 완료했으면, 이제는 js 파일로 넘어가보자.
<br/>

### js 파일에서 html 태그 불러오기

이제 html 의 태그를 js에서 활용할 수 있게 해주자.

이 전에 html에 적은 날씨와 위치의 태그는 이러했다.

```html
<span class="temp"></span>
<span class="place"></span>
```

class로 선언이 되어있는 상태이기 때문에 거기에 따라 불러오면 되겠다.
CSS 선택자를 사용하는 querySelector 를 이용해서 두개의 class 를 불러오겠다.

CSS 선택자에서 class 는 태그네임 앞에 `.` 을 추가 한다. 여기서도 동일하게 해준다.

```javascript
const temp = document.querySelector(".temp");
const place = document.querySelector(".place");
```

이렇게 두개의 태그를 html 과 연결하고 그것을 하나의 변수에 담았다, 변수의 이름은 아무거나 상관없다.
본인이 코드를 짜면서 읽기 편한것으로 만들면 된다, 대부분의 강의에서는 태그와 거의 동일한 이름으로
설정하던데, 참고하자.

자 이렇게 하면 js 파일 내에서 html 태그에 변화를 줄 수 있는 준비가 완료되었다.
<br/>

### 온도, 날씨 API 가져오기

본격적으로 온도(날씨) 와 장소를 가져와보자.
 
사용자(컴퓨터) 가 있는 위치에 따라 사용자가 직접 수정을 해야할까? 아니다, 자동적으로 바뀌게 해야한다.
우리는 여기서 날씨, 온도 API 를 이용할 것이다.

API는 "Application Programming Interface" 의 약자로 애플리케이션 소프트웨어를 구축하고 
통합하기 위한 정의 및 프로토콜 세트 라고 하는데, 어려운말은 집어치우고 쉽게 말해서
남이 이미 만들어놓은 유용한 기능들을 가져다 쓸 수 있게 해주는것 이라고 생각하면 되겠다.

그러니까 우리는 지금 남이 만들어놓은 "내 위치에 맞는 온도와 날씨를 알려주는 기능" 을 아주 편하게
내가 직접 만들지 않고 가져다가 쓰려고 하고있는 중이다. 선배님들에게 감사를 표하고 가져오도록 하자.

일단 이 API 가 있는 사이트를 가야되는데, 검색창에 [weatherAPI](https://openweathermap.org/api) 를 치면 사이트가 나온다.
이곳으로 들어가보자.

![](https://images.velog.io/images/seungmini/post/9a6f0004-ec6c-43c5-81fd-482298b746a7/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.33.51.png)

이런 사이트가 나온다면 맞게 찾아온거고, 아니라면 이상한데 가지말고 다시 찾아 들어오길 바란다.

우리는 여기서 맨 첫번째 Current Weather Data 에서 API 를 가져올것이다.
`API doc` 를 눌러서 들어가보자.

![](https://images.velog.io/images/seungmini/post/08b2419d-62ce-4e1f-8404-3afcf32737d3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.46.09.png)

이런 화면이 뜰텐데 영어라고 겁먹지 말자, 우리에겐 번역이라는 좋은 기능이 있으니,
여기서 우리는 위도와 경도를 이용해서 우리의 위치를 파악하고, 그 위치에 따라 온도와 날씨를 출력할거다.
여기서... 위도와.. 경도로.. 찾는...API...가....

![](https://images.velog.io/images/seungmini/post/12baf392-05fc-4a03-aa79-692a81fc37a9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.47.29.png)

여깄다, By geographic coordinates, 지리적 좌표에 해당하는 데이타를 보내주는것이다.
저 회색박스에 담겨있는것이 API를 호출할 수 있는 code다. 우리는 이 코드를 활용할 것이다.

그런데 코드를 잘 봐보자, 주황색으로 되어있는 { } 감싸져 있는 코드들이 보인다.
우리는 저 안을 우리만의 코드로 채워넣어야 한다, 총 세가지 `위도`, `경도`, `사용자 API key`.
위도, 경도는 그렇다 치고 사용자 API key 는 또 뭔가하면, 쉽게말해 해당 API 를 사용하는
사용자가 누군지를 인지하기 위해 사용하는 인증코드라고 보면 되겠다. 그럼 이 key는 어디서 받느냐?

오른쪽 상단의 Sign in으로 로그인을 하면 보이는 메뉴중 My Api key 라는 메뉴가 보일건데,
그 화면으로 들어가면 보이는 숫자와 영어가 섞여있는 긴 글씨가 사용자 API key 이다.
이건 유출이 되면 곤란하니 잘 신경쓰길 바란다.

어쨌든 API key 는 채워넣을 수 있게되었는데.. 위도와 경도는 어떻게 채워넣을까?

이것도 조금 복잡하긴 하지만, 방법이 있다.
<br/>

### 내 위치 (위도, 경도) 가져오기

`navigator.geolocation.getCurrentPosition(000, 000)` 을 이용하는것이다.
이건 내 컴퓨터의 현재 위치를 알 수 있게 해주는 메서드 이다. 하지만 이렇게는 작동하지 않는다.
뒤에 두가지의 인자가 추가되어야 하는데, 하나는 이 함수가 제대로 동작해서 정보를 가져왔을때의 함수,
그리고 하나는 제대로 동작하지 못해 날씨를 가져오지 못했을때의 함수를 차례대로 넣어주어야 한다.

```javascript
const onGeoOk = (position) => {
    console.log(position);
};

const onGeoErr = () => {
    alert('Can`t find you, No wather for you.')
};
 
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoErr)
```

이렇게 두개의 함수를 만들어준 다음, getCurrentPosition 에 인자로 추가해 주자.
onGeoOk 함수에서 성공적으로 정보를 가져올테니, 여기에 콘솔을 찍어 정말 받아오는지 확인해보자.

![](https://images.velog.io/images/seungmini/post/c275ddc2-8968-489a-9dcf-fb117dde87b5/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.25.51.png)

오, 정말로 내 위치에 대한 정보가 들어왔다, 온도도 표시된거 같고.. 
하지만 우리에게 필요한건 바로 저 latitude (위도), longitude (경도) 이다. 저 숫자가 바로
내가 지금 있는 곳의 위도와 경도를 나타내 주는것이다. 꽤 신기하다.

자, 그럼 우리는 getCurrentPosition 로 위도와 경도를 가져올 수 있다는것을 알아냈다.
그럼 이녀석들을 우리가 사용할 수 있게 끄집어 내와야된다. 어떻게 하면 될까?

아까 만들었던 `onGeoOk()` 안에 위도와 경도를 변수로 선언해주는것이다.
그리고 나서 그 변수들을 로컬스토리에 저장하거나, API 를 호출할 때 사용하면 될것이다.

위도와 경도는 position의 coords안에 위치해 있으니까 이렇게 호출하면 될것이다.

```javascript
const onGeoOk = (position) => {
    const latitude = position.coords.latitude;    // 위도
    const longitude = position.coords.longitude;  // 경도
};
```
이제 위도와 경도를 얻었는데, 우리는 이것을 두군데에 활용할것이다. 아까도 말했다.

1. 로컬스토리에 저장
2. 날씨 API 호출에 사용

날씨 API 호출에 위도 경도가 쓰이는건 아까 확인했으니 이해가 될텐데, 로컬스토리지에는 왜 저장하는걸까?
여러 탭이나 창 간에 데이터가 서로 공유되어 탭이나 창을 닫아도 데이터를 브라우저에 그대로 남겨두기
위해서 이다. 간단하게만 설명하고, 더 자세한건 구글링으로 공부하길 바란다.
<br/>

### 로컬스토리지에 위도, 경도 저장하기

자, 그럼 첫번째 로컬스토리지에 위도와 경도를 저장해보자.
새로운 함수를 하나 만들어주자.

```javascript
const saveCoords () => {}
```
그리고 아까 위도와 경도를 가져온 `onGeoOk()` 에서 그 둘을 하나의 객체에 묶어줘야 한다.
로컬스토리지에 JSON 의 형식으로 저장을 해야하기때문에, 변수의 상태로 JSON 화 시킬 수 없기때문이다.
아무데서나 해도 되지만, 그냥 저기서 먼저 작업을 해주고 여기서는 객체의 형태로 받아오도록 하자.

```javascript
const onGeoOk = (position) => {
    const latitude = position.coords.latitude;  
    const longitude = position.coords.longitude; 
  
    const coordsObj = {  // 위도와 경도를 객체에 담는다.
       latitude,
       longitude
     }
    
    saveCoords(coordsObj);  // 객체를 함수에 인자로 전달한다.
};
```

만들어진 객체를 아래의 `saveCoords(coordsObj)` 에 담아야 함수 밖으로 빠져나올 수 있게 된다.
그럼 다시 saveCoords() 로 넘어가서 받아온 객체 인자를 로컬스토리지에 JSON 화 시켜서 저장해주자.

```javascript
const saveCoords (coordsObj) => {
	localStorage.setItem("coords", JSON.stringify(coordsObj));
 }
```

이렇게 하면 내 위치가 담긴 객체가 로컬스토리 안에 JSON 형태로 저장된다.
<br/>

### 위도 경도로 날씨 받아오기

이제 로컬스토리에 저장은 됬고, 본격적으로 날씨를 가져와보도록 하자.
아까 weatherAPI 사이트에서 가져온 날씨 API code 와 사용자 API key를 가져오자.
그리고 사용자 API 키는 저 코드에 직접 추가하는것 보단 변수화 시켜서 입력하는게 더 깔끔하니
변수를 하나 만들어 나중에 API 코드에 담도록 하자,

```javascript
const MY_API_KEY = {your API key};
```

글자를 변수에 담을땐 그 변수의 이름을 대문자로 하던데, 그 이유는 잘 모르겠다. 그냥 그런가 보다 하자.

자, 그리고 위도와 경도를 다시 `onGeoOk()` 에서 가져오도록 하자.
그 전에 날씨를 가져올 함수부터 만들고..

```javascript
const getWeather = () => {}
```

이제 아까 로컬스토리에 저장하기위해 데이타를 가지고 나온것 처럼 이번에도 똑같이 해주겠다.

```javascript
const onGeoOk = (position) => {
    const latitude = position.coords.latitude;  
    const longitude = position.coords.longitude; 
  
    const coordsObj = { 
       latitude,
       longitude
     }
    
    saveCoords(coordsObj);
  
    getWeather(latitude, longitude);  // 변수를 함수의 인자에 전달해준다.
};
```

이렇게 `getWeaher()` 에 두가지 인자를 추가해줬으니, 자연스럽게 이 함수는 두가지의 파라미터를
사용하게 된다. 이름은 굳이 똑같이 사용하지 않아도 된다. 별칭을 사용해도 문제는 되지 않는다.
대부분의 별칭사용이유가, 전달받은 인자의 이름의 길이가 길기때문이니, 줄여서 사용하도록 하자.

그리고 함수안에 아까 가져온 API 코드를 추가해주겠다.

```javascript
const getWeather = (lat, lng) => {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?
                      lat=${lat}&lon=${lng}&appid=${MY_API_KEY}&units=metric`;
  
   console.log(weatherApi);
 }
```

lat 과 lng 은 아까 인자로 전달받았고, MY_API_KEY 또한 이미 할당이 되있기때문에 모든 부분이
채워졌을것이고, 콘솔에 어떤 결과가 나오는지 확인해 보도록 하자.

![](https://images.velog.io/images/seungmini/post/6975d01d-c77b-4b79-9cc5-d8eb9f7d8ba2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.18.58.png)

오, 어떤 url이 생겼다, 한번 클릭해보자.

![](https://images.velog.io/images/seungmini/post/c2960135-0aa9-41fc-b7fd-49ec97fff4fc/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.19.19.png)


오오오 내가 위치한 위도와 경도에 해당하는 이 지역 날씨를 알려주고 있다, 맑은 하늘이라고 한다
음.... 새벽이라서 모르겠지만 오늘이 맑기는 했다.

![](https://images.velog.io/images/seungmini/post/8f20a3e5-9313-4ccf-aa6f-401743d3bda7/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.19.26.png)

오오오 나라와 도시까지 알려준다. 대한민국의 용인이란 도시까지 나온다.. 신기하구만.
이제 다 나왔다, 이것들을 이용해 날씨와 장소를 출력하기만 하면 된다.

일단 저 url 을 사용하기 위해 호출을 해야될텐데, 우리는 `fetch` 를 사용할것이다.
fetch는 API 를 불러오기 위한 메서드이다, 여기에 url을 집어넣어야지 위에 있는 객체들을 사용할 수
있게 된다. 

```javascript
const getWeather = (lat, lng) => {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?
                      lat=${lat}&lon=${lng}&appid=${MY_API_KEY}&units=metric`;
  
  fetch(weatherApi);  // fetch에 API url 을 넣어준다.
 }
```

일단 제대로 작동하는지 확인하기 위해 이 상태로 다시 브라우저로 돌아가보자.

![](https://images.velog.io/images/seungmini/post/a95a82e9-6cb3-4289-bc8d-8e407d9d57a0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.30.03.png)

콘솔에는 아무것도 뜨지 않는다, console.log() 를 지웠기때문이다. 우리는 콘솔에서 확인하려는것이 아니라
네트워크를 확인하려는것이기때문에 네트워크쪽으로 이동해보자.

![](https://images.velog.io/images/seungmini/post/6600b65c-59f2-4135-ada5-004ce1abfc00/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.30%20%E1%84%87%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A1.jpg)

확인해보니 맨 아래에 우리가 요청한 API url이 정상적으로 들어온것을 확인할 수 있다.
그렇다면 요청이 제대로 들어가고 있고, 응답을 받을 수 있게 되었다. 이제 응답받은 데이터를 이용하여
진짜진짜진짜 화면에 출력해보자.

`fetch()` 를 사용하고 그 뒤에 `.then` 을 추가하여 그 응답받은 데이타를 가져올 수 있다.
그리고 그 데이타를 사용하기 위해서는 then 안에서 함수의 형태로 사용되야하기 때문에
안쪽에 함수를 추가해준다.

```javascript
const getWeather = (lat, lng) => {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?
                      lat=${lat}&lon=${lng}&appid=${MY_API_KEY}&units=metric`;
  
  fetch(weatherApi)
  .then((res) => {
  	return res.json();   // JSON 데이타를 받아오는 부분.
   }).then((data) => {
   console.log(data.name, data.weather[0].main);  // 출력여부 확인.
  })
 }
```

일단 처음에는 JSON화 되어있는 데이타를 가져와야하고, 그것들을 data 화 시켜줘야 비로소 우리가
사용가능한 data의 형태를 띄게된다, 그리고 그 안의 요소들 중, 도시와 날씨를 가져올것이다.
위의 사진에서도 보이지만, data의 name 이 도시이고, 날씨는 array의 상태인데, 그중에서 0번째 인덱스
의 main을 가져오면 날씨가 출력될것이다, 정상적으로 출력되는지 확인해보자.

![](https://images.velog.io/images/seungmini/post/44b5d0f9-ec86-41e7-985b-bb9954b32b16/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.46.19.png)

성공적으로 출력되는걸 확인할 수 있다. 다행이다....

자, 우리는 드디어 내 장치가 있는 위치의 정보를 가져와버렸다.. 대단하다..
그렇다면 이제 정말정말 진짜진짜 html의 태그안에 추가하여 저 텍스트를 바꿔보도록 하자.

콘솔에 넣었던 저 값들을 변수에 저장해주고, html에 text 형식으로 들어가야 하니, `innerText` 를
사용할것이다. 일단 변수에 할당시켜주자.

```javascript
const getWeather = (lat, lng) => {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?
                      lat=${lat}&lon=${lng}&appid=${MY_API_KEY}&units=metric`;
  
  fetch(weatherApi)
  .then((res) => {
  	return res.json(); 
   }).then((data) => {
    const nowTemp = data.main.temp;  // 생각해보니까, 온도를 받아와야 했다.
    const nowPlace = data.name;      // 얘는 도시 맞다.
    
    temp.innerText = `${nowTemp} °C`;   // 얘는 number type 이어서 리터럴을 사용한다.
    place.innerText = nowPlace;         // 얘는 text 라서 바로 사용한다.
  })
 }
```

과연.. 결과는.....
<br />
<br />

![](https://images.velog.io/images/seungmini/post/11cb7740-c89d-4185-a1e4-b10e775b51b1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.57.47.png)

## 완벽하다..

우리는 드디어 해냈다, 날씨정보를 받아왔고, 위치까지 가져왔다. 그리고 유지할 수 있게 되었다...
정말 고생했다.. 어후.. 이렇게 길어질지 몰랐는데.. 그래도 이게 좀 긴편이지, 나머지는 조금 쉽게 할 수
있을...거다.. 주말 내내 하려면 빡세겠네.. 열심히 써야지.

-끝-