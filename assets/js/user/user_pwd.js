$(function () {
    let form = layui.form

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '不能跟原密码一致'
            }
        },
        newPwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码不一致'
            }
        }
    })



    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })

})