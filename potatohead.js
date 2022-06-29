(function () {
    'use strict';

    let dragging = null;
    let draggingId = null;
    let offset;
    let nextZIndex = 1;
    let storageArray = [];
    let theId = 0;
    const music = document.getElementById('audio');
    let dragItem;

    $(document)
        .on('mousedown', '.features2', e => {
            dragging = $(e.target);
            dragItem = e.target;
            draggingId = e.target.getAttribute('id');
            if (e.target.src !== "http://127.0.0.1:5501/JavaScript/77/bodyParts/body.png") {
                dragging.css("z-index", nextZIndex++);
            }
            offset = { x: e.offsetX, y: e.offsetY };
        })
        .mousemove(e => {
            if (dragging) {
                e.preventDefault();
                dragging.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
            }
        })
        .mouseup((e) => {
            if (dragging) {
                document.getElementById('pop').play();
                //console.log(e.target.style.top, e.target.style.left);
                storageArray.forEach((item) => {
                    //trash bin
                    if (item.id === parseInt(draggingId)) {
                        if ((10 <= parseInt(e.target.style.top) && 100 >= parseInt(e.target.style.top)) &&
                            (10 <= parseInt(e.target.style.left) && 100 >= parseInt(e.target.style.left))) {
                            dragging.remove();
                            document.getElementById('boing').play();
                            item.source = null;
                            dragging = null;
                            localStorage.setItem('setUp', JSON.stringify(storageArray));
                        } else {
                            //save new location local storage
                            item.position = dragging.position();
                            dragging = null;
                            localStorage.setItem('setUp', JSON.stringify(storageArray));
                        }
                    }
                    
                });
            }
            
        });

    //add parts  
    $(document).on('click', '.features', e => {
        document.getElementById('pop').play();
        const part = $(`<img src="${e.target.src}" id="${theId}" class="features2">`)
            .appendTo($('#body')).css({ bottom: '50%', right: '10%' });
        storageArray.push({ id: theId++, source: e.target.src, position: part.position() });
        localStorage.setItem('setUp', JSON.stringify(storageArray));

    });

    //pull setup from cache
    const data = localStorage.getItem('setUp');
    if (data) {
        let storageArray = JSON.parse(data);
        storageArray.forEach(e => {
            if (e.source) {
                $(`<img src="${e.source}" id="${e.id}" class="features2">`)
                    .appendTo($('#body')).css(e.position);
            }
        });
        theId = storageArray.length + 1;
    }

    //refresh screen and clear cache:
    $('#clear').on('click', () => {
        document.getElementById('boing').play();
        storageArray = [];
        localStorage.setItem('setUp', JSON.stringify(storageArray));
        $('.features2').remove();
    });

    //instructions
    $('#bodyParts')
        .on('mouseover', () => {
            $(".text").css('visibility', 'visible');
        })
        .on('mouseout', () => {
            $(".text").css('visibility', 'hidden');
        });

    //music
    $('#playPause').on('click', () => {
        if (music.paused) {
            music.play();
            $('#pause').css('visibility', 'visible');
            $('#play').css('visibility', 'hidden');
        } else {
            music.pause();
            $('#pause').css('visibility', 'hidden');
            $('#play').css('visibility', 'visible');
        }
    });

}());