$(function () {

    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请出入1 ~ 6 位字符'
            }
        }
    })

    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // formHTML(res.data)
                form.val('formUserIfon', res.data)
            }
        })
    }
    // 重置按钮还原
    $('#btnReset').click(function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 渲染页面
    // function formHTML(data) {
    //     console.log(data.username);
    //     $('.username-item').val(data.username)
    //     $('.nickname-item').val(data.nickname)
    //     $('.email').val(data.email)
    //     $('.ipt-hidden').attr('name', data.id)
    // }


    // 提交事件

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交修改信息失败')
                }
                layer.msg('更新信息成功')
                window.parent.getUserInfo()
            }
        })

    })


})

