<template>
    <div class="home">
        {{msg}}
    </div>
</template>

<script>
export default {
    name:'Home',
    data:()=>({
        msg: "hello home"
    }),
    mounted(){
        console.log("welcome to home")
        console.log(process.env.NODE_ENV)
    }
}
</script>
<style lang="less" scoped>
    .home{
        font-size: 0.14rem;
        color: red;
    }
</style>