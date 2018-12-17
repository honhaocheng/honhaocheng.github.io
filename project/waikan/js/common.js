var common = common || {
    canvas: {
        /**
         * @desc 圆角矩形
         * @param ctx 画布对象
         * @param left x坐标
         * @param top y坐标
         * @param width 矩形的宽度
         * @param height 矩形的高度
         * @param r 圆角半径
         * @date 2018/11/23 09:13:03
         * @author honhaocheng
         */
        radiusRect: function (ctx, left, top, width, height, r) {
            var pi = Math.PI;
            ctx.beginPath();
            ctx.arc(left + r, top + r, r, -pi, -pi / 2);
            ctx.arc(left + width - r, top + r, r, -pi / 2, 0);
            ctx.arc(left + width - r, top + height - r, r, 0, pi / 2);
            ctx.arc(left + r, top + height - r, r, pi / 2, pi);
            // console.log(ctx);
            ctx.closePath();
        },
        /**
         * @desc 绘制文本函数
         * @param ctx 画布对象
         * @param font 字体粗细，字体大小，字体种类...
         * @param style 字体颜色
         * @param text 文本
         * @param x x轴坐标
         * @param y y轴坐标
         * @param align 对齐方式
         * @param baseLine 文本的基线
         * @date 2018/12/07 16:35:03
         * @author honhaocheng
         */
        drawText: function (ctx, font, style, text, x, y, align, baseLine) {
            ctx.font = font;
            ctx.fillStyle = style;
            ctx.textAlign = align || "center";
            ctx.textBaseline = baseLine || "top";
            ctx.fillText(text, x, y);
        }
    }
};