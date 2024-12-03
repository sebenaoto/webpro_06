let btn = document.querySelector('#btn1');
btn.addEventListener('click', () => {
    console.log( "ボタンが押された" );
});

var plus2 = function( x, y ) {
    return btn.textContent = "変更しました";;
};

var plus3 = ( x, y ) => {
    return x + y;
};


