<template>
    <div class="loading">
        <div class="cssloader">
        <div class="sh1"></div>
        <div class="sh2"></div>
        <h4 class="lt">加载中...</h4>
    </div>
    </div>
</template>

<style lang="scss" scoped>
/** just copy and paste this entire code in your stylesheet **/
@import url('https://fonts.googleapis.com/css?family=Roboto:100');

 .loading{
    background: #333;
    height: 100vh;
 }

/** page **/
.cssloader {
  padding-top: calc(45vh - 25px);

}

/** loader **/
.sh1 {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5rem 5rem 0 0;
  border-color: #354952 transparent transparent transparent;
  margin: 0 auto;
  animation: shk1 1s ease-in-out infinite normal;
}

.sh2 {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 5rem 5rem;
  border-color: transparent  transparent #df1a54 transparent ;
  margin: -5rem auto 0;
  animation: shk2 1s ease-in-out infinite alternate;
}

/** animation starts here **/
@keyframes shk1 {
  0% {
    transform: rotate(-360deg);
  }  
  
  100% {
  }
}

@keyframes shk2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
  }
}

.lt {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  margin: 3rem auto;
  text-align: center;
  font-weight: 100;
  letter-spacing: 1rem;
}
</style>