$(function () {
    //歌曲的json
    var musicList = [
        {
            songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004SVr621zymKi.jpg?max_age=2592000',
            name: '大风吹',
            singer: '曾沛慈',
            src: 'http://mobileoc.music.tc.qq.com/C400001jkbBE3XT6Ez.m4a?vkey=9C88BD4BE94C61052E55D75AF810BEEFEC89CD2C2C922D4A32764ECD0EC418739FC5329332251B45562D9346FAC03AA2C8259E71C9156E99&guid=jlwz.cn&uin=0&fromtag=8'
        },
        {
            songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004NkJKq0GkHOa.jpg?max_age=2592000',
            name: '路过人间',
            singer: '郁可唯',
            src: 'http://mobileoc.music.tc.qq.com/C4000042jyJt0aQ0Gd.m4a?vkey=6E9CFE08D431358D5BD9F79FF66849192AF0817BF0EBD0F3841A39E97525B37AB4FA2453444291E74E1144B682DBC4F1C6FB185B37CE13C7&guid=jlwz.cn&uin=0&fromtag=8'

        },
        {
            songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000MPe4T3iM5bb.jpg?max_age=2592000',
            name: '沙文',
            singer: '林忆莲',
            src: 'http://mobileoc.music.tc.qq.com/C400003ppgkd1h2oGU.m4a?vkey=3430986B0840AE2BC9EDE894B81D906FCCCA36C60EF5DC940A3E2B8D2501A644B311E21E31144CC21C7E3BFB9D022BDDE0BE6F2CDDB71DD6&guid=jlwz.cn&uin=0&fromtag=8'
        },
        {
            songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001dQbq01b2bra.jpg?max_age=2592000',
            name: '你瞒我瞒',
            singer: '陈柏宇',
            src: 'http://mobileoc.music.tc.qq.com/C400000XJvlv11ltfF.m4a?vkey=C1571BCE54FB6E0283B0637A9432F06ED63AD4C18FF54B17305483AD1F381CA11FBA223F6EBDAE2FA1459AC27A24D45AA4C184664D9513B3&guid=jlwz.cn&uin=0&fromtag=8'
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











