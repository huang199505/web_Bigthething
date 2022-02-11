$(function () {
    $('#link_reg').on('click', () => {
        $('.login').hide()
        $('.regBox').show()
    })

    $('#link_login').on('click', () => {
        $('.login').show()
        $('.regBox').hide()
    })



    // 表单效验规则
    let form = layui.form
    let layer = layui.layer
    form.verify({
        psd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: (value) => {
            let pwd = $('.regBox [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    // 表单注册事件



    $('#reg-form').on('submit', (e) => {
        e.preventDefault()

        let data = { username: $('#reg-form [name=username]').val(), password: $('#reg-form [name=password]').val() }

        $.post(
            '/api/reguser',
            data,
            (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg('注册成功,请登录')
                $('#link_login').click()
            }
        )
    })

    // 表单登录事件，获取服务器 token 字符并存储到本地存储 locastorage 中
    $('#login-check').on('submit', (e) => {
        e.preventDefault()

        let data = { username: $('#login-check [name=username]').val(), password: $('#login-check [name=password]').val() }



        $.post('/api/login', data, (res) => {
            if (res.status !== 0) {
                return layer.msg('登录失败,请确认账号密码')
            }
            layer.msg('登录成功')
            localStorage.setItem('token', res.token)
            // location.href = './index.html'
        })
    })



})