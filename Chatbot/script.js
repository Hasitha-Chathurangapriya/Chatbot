const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "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";

let ChatBotResponse;

sendBtn.onclick = function () {
  if (messageBar.value.length > 0) {
    // console.log("send message");
    let message = `        <div class="chat message">
        <img src="img/user.png" />
        <span>
          ${messageBar.value}
        </span>
      </div>`;

    let response = `        <div class="chat response">
      <img src="img/technology.png" />
      <span class="new">...
      </span>
    </div>`;

    messageBox.insertAdjacentHTML("beforeend", message);

    setTimeout(() => {
      messageBox.insertAdjacentHTML("beforeend", response);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: messageBar.value,
            },
          ],
        }),
      };

      fetch(API_URL, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          ChatBotResponse = document.querySelector(".response .new");
          ChatBotResponse.innerHTML = data.choices[0].message.content;
          ChatBotResponse.classList.remove("new");
        })
        .catch((error) => {
          //console.log(error);
          ChatBotResponse.innerHTML = "Opps! An error occured. Please try agin";
        });
    }, 1000);
  }
};
