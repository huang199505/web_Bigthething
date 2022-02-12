$(function () {
    getUserInfo()

    let layer = layui.layer
    $('#btn-logout').click(function () {
        layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = './login.html'

            layer.close(index);
        });
    })
})


// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户失败')
            }
            renderAvatar(res.data)
        }

    })
}

function renderAvatar(user) {
    let uname = user.nickname || user.username
    $('.text-user').html('欢迎&nbsp;&nbsp;' + uname)

    // 判断头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-portrait').hide()
    } else {
        $('.layui-nav-img').hide()
        let text = uname[0].toUpperCase()
        $('.text-portrait').html(text)
    }
}