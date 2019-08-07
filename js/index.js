$(function () {
    //歌曲的json
    var musicList = [
        {
            songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004SVr621zymKi.jpg?max_age=2592000',
            name: '大风吹',
            singer: '曾沛慈',
            src: 'http://music.163.com/song/media/outer/url?id=1378093025.mp3'
        },
        {
            songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004NkJKq0GkHOa.jpg?max_age=2592000',
            name: '路过人间',
            singer: '郁可唯',
            src: 'http://music.163.com/song/media/outer/url?id=1354477202.mp3'

        },
        {
            songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000MPe4T3iM5bb.jpg?max_age=2592000',
            name: '沙文',
            singer: '林忆莲',
            src: 'http://music.163.com/song/media/outer/url?id=1334667453.mp3'
        },
        {
            songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001dQbq01b2bra.jpg?max_age=2592000',
            name: '你瞒我瞒',
            singer: '陈柏宇',
            src: 'http://music.163.com/song/media/outer/url?id=25718007.mp3'
        },
    ]

    var index = 0;
    var flag = 0;
    var timeId;

    //音乐加载函数
    function loadMusic (music) {
        $('.name').text(music.name);
        $('.singer').text(music.singer);
        $('#audio')[0].src = music.src;
        $('.songPic').css('backgroundImage', 'url(' + music.songPic + ')');
    };

    //时间显示函数
    function time (totaltime) {
        var second = Math.round(totaltime) % 60;
        if (second < 10) {
            second = '0' + second;
        }
        var minute = (Math.round(totaltime) - second) / 60;
        if (minute < 10) {
            minute = '0' + minute;
        }

        var totalTime = minute + ':' + second;
        return totalTime;
    };

    //播放函数
    function play () {
        $('#audio')[0].play();
        $('.total').text(time($('#audio')[0].duration));
        timeId = setInterval(function () {
            $('.now').text(time($('#audio')[0].currentTime));
            $('.progress span').css('width', $('#audio')[0].currentTime * $('.player').width() / $('#audio')[0].duration + 'px');
        }, 1000)
        $('.pause i').css('backgroundImage', 'url(images/start.png)');
        flag = 1;
        //结束后自动播放
        $('#audio').bind('ended', function () {
            nextSong();
        });
    };


    loadMusic(musicList[index]);


    //暂停键
    $('.pause').click(function () {
        if (flag == 0) {
            play();
        } else {
            $('#audio')[0].pause();
            $('.pause i').css('backgroundImage', 'url(images/pause.png)');
            flag = 0;
            clearInterval(timeId);
        }
    });

    //下一首歌 
    $('.next').click(function () {
        nextSong();
    });

    var nextSong = function () {
        $('#audio').remove();
        $('.player').append('<audio id="audio"></audio>');
        index = index < musicList.length - 1 ? index + 1 : 0;
        loadMusic(musicList[index]);
        $('#audio').bind('canplay', function () {
            play();
        });
    }

    // 上一首歌
    $('.previous').click(function () {
        $('#audio').remove();
        $('.player').append('<audio id="audio"></audio>')
        index = index > 0 ? index - 1 : musicList.length - 1;
        loadMusic(musicList[index]);
        $('#audio').bind('canplay', function () {
            play();
        });
    });

    //进度条
    $('.progress').mousedown(function (e) {
        var x = e.pageX - $('.progress').offset().left;
        $('#audio')[0].currentTime = x / $('.progress').width() * $('#audio')[0].duration;
        $(this).mousemove(function (e) {
            var x = e.pageX - $('.progress').offset().left;
            $('#audio')[0].currentTime = x / $('.progress').width() * $('#audio')[0].duration;
        });

    });
    $('.progress').mouseup(function () {
        $(this).off('mousemove');
    });


});











