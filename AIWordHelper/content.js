window.onload = function() {
    var style = document.createElement('style');
    style.innerHTML = `
    .boldText {
        font-weight: bold;
        cursor: pointer;
        position: relative; 
      }
      .popup-button {
              position: absolute;
              display: none;
              z-index: 1000;
          }
    `;
    document.head.appendChild(style);

    var div = document.createElement('button');
    div.id = 'translateBtn';
    div.className = 'popup-button';
    div.textContent = '翻译';
    document.body.appendChild(div);

    document.getElementById('translateBtn').addEventListener('click', function() {
        // document.ready(function(){
        //     $('#translateBtn').click(function(){
        const selection = window.getSelection();
        if (!selection.rangeCount) {
            alert('请选择一个单词！');
            return;
        }
    
        const range = selection.getRangeAt(0);
        const selectedText = range.toString().trim();
    
        if (!selectedText) {
            alert('请选择一个单词！');
            return;
        }
    
        // 获取选中文本的节点
        const anchorNode = selection.anchorNode;
        const focusNode = selection.focusNode;
    
        // 获取包含选中文本的最大文本块
        const textContent = anchorNode.parentNode.textContent;
        const sentence = textContent;
    
        if (sentence) {
            // alert('选中的单词：' + selectedText + ' 选中的句子：' + sentence);
            // 在这里调用翻译函数
        } else {
            alert('无法确定选中单词的句子。');
        };
    
        // 使用你的OpenAI API密钥
        const apiKey = 'your-api-key';
    
        // 设置请求头
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        };
    
        // 设置请求体
        var inputText = [
          {
            "role": "user",
            "content": selectedText + '在这个句子中的中文意思是什么？请只回答在该句中的含义、词性和发音即可，回答的格式按照"词性,发音,含义"的格式，不要回答其他的内容:' + sentence
          }
        ]
    
        const data = {
            model:"gpt-4-1106-preview",
            messages: inputText,
            // "response_format": { "type": "json_object" },
            max_tokens: 50
        };
    
        // 发送POST请求到OpenAI API
        const responseText = document.getElementById('responseText');
        fetch('https://api.openai.com//v1/chat/completions ', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(//response => response.json()
        response => {
            // responseText.textContent =response;
        console.log(response); // 查看原始响应
        return response.json();
    })
    .then(data => {
            // 在这里处理响应
            // responseText.textContent = data.choices[0].message.content;
            if (selection.rangeCount) {
                var range1 = selection.getRangeAt(0);
                var selectedText1 = range1.toString();
                if (selectedText1) {
                    var span = document.createElement('span');
                    span.classList.add('boldText');
                    span.textContent = selectedText1;
                    span.append('('+data.choices[0].message.content+') ');
                    range1.deleteContents();
                    range1.insertNode(span);
                    // 清除选择
                    selection.removeAllRanges();
                }
            }
        })
        .catch((error) => {
            console.log('Error:'+error);
        });
    // });
    });
    
};

// document.addEventListener('DOMContentLoaded', function() {  
//         });
document.addEventListener('dblclick', function(event) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();

    if (selectedText) {
        const popupButton = document.getElementById('translateBtn');
        const rect = range.getBoundingClientRect();
        const top = rect.top + window.scrollY - popupButton.offsetHeight*1.5;
        const left = rect.left + window.scrollX + (rect.width - popupButton.offsetWidth) / 2;

        popupButton.style.top = `${top}px`;
        popupButton.style.left = `${left}px`;
        popupButton.style.display = 'block';

        popupButton.onclick = function() {
            // alert('Button clicked for word: ' + selectedText);
            // Hide the button after 3 seconds
            setTimeout(function() {
                popupButton.style.display = 'none';
            }, 1000);
        };
    }
});

document.addEventListener('mouseup', function(event) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();

    if (selectedText) {
        const popupButton = document.getElementById('translateBtn');
        const rect = range.getBoundingClientRect();
        const top = rect.top + window.scrollY - popupButton.offsetHeight*1.5;
        const left = rect.left + window.scrollX + (rect.width - popupButton.offsetWidth) / 2;

        popupButton.style.top = `${top}px`;
        popupButton.style.left = `${left}px`;
        popupButton.style.display = 'block';

        popupButton.onclick = function() {
            // alert('Button clicked for word: ' + selectedText);
            // Hide the button after 3 seconds
            setTimeout(function() {
                popupButton.style.display = 'none';
            }, 1000);
        };
    }
});

