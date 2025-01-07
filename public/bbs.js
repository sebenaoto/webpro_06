"use strict";

let number=0;
const bbs = document.querySelector('#bbs');


document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch("/post", params)
        .then(response => {
            if (!response.ok) {
                throw new Error('投稿に失敗しました');
            }
            return response.json();
        })
        .then(response => {
            const { post } = response;

            // 新しい投稿を表示
            const bbs = document.querySelector('#bbs');
            let cover = document.createElement('div');
            cover.className = 'cover';
            cover.id = `post-${post.id}`;

            let id_area = document.createElement('span');
            id_area.className = 'id';
            id_area.innerText = `ID: ${post.id}`;

            let name_area = document.createElement('span');
            name_area.className = 'name';
            name_area.innerText = post.name;

            let mes_area = document.createElement('span');
            mes_area.className = 'mes';
            mes_area.innerText = post.message;

    

            cover.appendChild(id_area);
            cover.appendChild(name_area);
            cover.appendChild(mes_area);
            bbs.appendChild(cover);

            // 入力欄をリセット
            document.querySelector('#name').value = '';
            document.querySelector('#message').value = '';
        })
        .catch(error => console.error(error));
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch("/check", params)
    .then(response => response.json())
    .then(response => {
        const bbs = document.querySelector('#bbs');
        bbs.innerHTML = ''; // 現在の内容をクリア

        // messages が存在しない場合は何もしない
        if (!response.messages || !Array.isArray(response.messages)) {
            console.error("無効なレスポンス形式:", response);
            return;
        }

        response.messages.forEach(post => {
            let cover = document.createElement('div');
            cover.className = 'cover';
            cover.id = `post-${post.id}`;

            let id_area = document.createElement('span');
            id_area.className = 'id';
            id_area.innerText = `ID: ${post.id}`;

            let name_area = document.createElement('span');
            name_area.className = 'name';
            name_area.innerText = post.name;

            let mes_area = document.createElement('span');
            mes_area.className = 'mes';
            mes_area.innerText = post.message;

            cover.appendChild(id_area);
            cover.appendChild(name_area);
            cover.appendChild(mes_area);
            bbs.appendChild(cover);
        });
    })
    .catch(error => console.error("エラーが発生しました:", error));
});
  
//削除機能
document.querySelector('#deleteID').addEventListener('click', () => {
    const postId = prompt("削除したい投稿のIDを入力してください：");
    if (!postId) return;

    const params = {
        method: "POST",
        body: JSON.stringify({ id: postId }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch("/deletePost", params)
        .then(response => {
            if (!response.ok) throw new Error('投稿の削除に失敗しました');
            return response.json();
        })
        .then(data => {
            alert(data.message);
            const postElement = document.querySelector(`#post-${postId}`);
            if (postElement) postElement.remove();
        })
        .catch(error => {
            console.error("エラー:", error);
            alert("エラーが発生しました。もう一度お試しください。");
        });
});

// 編集機能 
document.querySelector('#editMessage').addEventListener('click', () => {
    const postId = prompt("編集したい投稿のIDを入力してください：");
    if (!postId) return;

    const newName = prompt("新しい名前を入力してください（変更しない場合は空欄のまま）：");
    const newMessage = prompt("新しいメッセージを入力してください（変更しない場合は空欄のまま）：");

    const params = {
        method: "POST",
        body: JSON.stringify({ id: postId, name: newName, message: newMessage }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch("/editPost", params)
        .then(response => {
            if (!response.ok) throw new Error('投稿の編集に失敗しました');
            return response.json();
        })
        .then(data => {
            alert(data.message);
            const postElement = document.querySelector(`#post-${postId}`);
            if (postElement) {
                if (newName) postElement.querySelector('.name').innerText = newName;
                if (newMessage) postElement.querySelector('.mes').innerText = newMessage;
            }
        })
        .catch(error => {
            console.error("エラー:", error);
            alert("エラーが発生しました。もう一度お試しください。");
        });
});

//検索機能
document.querySelector('#search').addEventListener('click', () => {
    const keyword = prompt("検索キーワードを入力してください：");
    if (!keyword) return;

    fetch(`/search?keyword=${encodeURIComponent(keyword)}`)
        .then(response => {
            if (!response.ok) throw new Error('検索に失敗しました');
            return response.json();
        })
        .then(results => {
            bbs.innerHTML = '';
            results.forEach(post => {
                let cover = document.createElement('div');
                cover.className = 'cover';
                cover.id = `post-${post.id}`;

                let id_area = document.createElement('span');
                id_area.className = 'id';
                id_area.innerText = `ID: ${post.id}`;

                let name_area = document.createElement('span');
                name_area.className = 'name';
                name_area.innerText = post.name;

                let mes_area = document.createElement('span');
                mes_area.className = 'mes';
                mes_area.innerText = post.message;


                cover.appendChild(id_area);
                cover.appendChild(name_area);
                cover.appendChild(mes_area);
                bbs.appendChild(cover);
            });
        })
        .catch(error => console.error(error));
});
  