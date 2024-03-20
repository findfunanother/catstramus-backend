

const serverless = require('serverless-http');

const OpenAI = require("openai");

const openai = new OpenAI( {apiKey: "", 
});


const express = require('express')

const app = express()

var cors = require('cors')

// CORS 이슈 해결 , 내 사이트 주소가 아니면 모두 거절하겠다 

let corsOptions = {
    origin: 'https://catstramus-famillyjo.pages.dev',
    credentials: true
}

app.use(cors(corsOptions));

// POST 요청 받을 수 있게 만듦 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/fortunetell', async function (req, res) {

    let { myDateTime, userQuestion} = req.body;

    let todayDateTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul'});

    
    console.log(userQuestion);
    console.log(todayDateTime);
    console.log(myDateTime);


    const chatCompletion = await openai.chat.completions.create({
    messages: [
        {role: "system", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 캣스트라무스입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."},
        {role: "user", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 캣스트라무스입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."},
        {role: "assistant", content: "안녕하세요, 존경하는 분, 제가 도와들릴 수 있는 부분이 있을까요? 어떤 질문이든 해 주시면 제가 최선을 다해 답변해 드리겠습니다."},
        

        {role: "user", content: `저의 생년월일과 태어난 시간은 ${myDateTime}입니다. 오늘은 ${todayDateTime}입니다`},

        {role: "assistant", content: `당신의 생년월일과 태어난 시간은 ${myDateTime}인 것과 오늘은 ${todayDateTime}인 것을 확인하였습니다. 운세에 대해서 어떤 것이든 물어보세요`},

        {role: "user", content: userQuestion },
    ],    
    model: "gpt-3.5-turbo",
    
    });

    let fortune = chatCompletion.choices[0].message.content
    console.log(fortune);
    res.json({"assistant": fortune});
  });


//app.listen(3000)

module.exports.handler = serverless(app);





