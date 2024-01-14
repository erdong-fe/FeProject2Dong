const orderForm = document.querySelector("#order-form");
const scrollToTopBtn = document.querySelector(".scroll-to-top");

const getOrderText = (formVal) => {
    const text = `
        【您的订单已经生成】
        ------------------------
        奶茶口味：${formVal.type}
        数量：${formVal.num}
        杯型：${formVal.size}
        甜度：${formVal.sugar}
        免费小料：${formVal["snack-free"] ? formVal["snack-free"] : "-"}
        加价小料：${formVal["snack"] ? formVal["snack"] : "-"}
        是否加冰：${formVal.ice}
        是否去茶底：${formVal["remove-tea"]}
        地址：${formVal.address}
        手机号：${formVal.phone}
        期待送达时间：${formVal.time}
        备注：${formVal.comment}
        支付方式：${formVal["pay-type"]}
    `;
    return text;
}

const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(orderForm);
    const formVals = {};
    for (var pair of formData.entries()) {
        const propName = pair[0];
        const propVal = pair[1];

        if (formVals[propName]) {
            formVals[propName] = [propVal].concat(formVals[propName]);
        } else {
            formVals[propName] = propVal;
        }
    }
    console.log(formVals);
    alert(getOrderText(formVals));
}

orderForm.addEventListener("submit", onSubmit);

scrollToTopBtn.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
})